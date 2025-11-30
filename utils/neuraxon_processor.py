#!/usr/bin/env python3

from pathlib import Path
import json
import math
from typing import Dict, Any, List, Optional


def load_neuraxon_data(network_file: Path) -> Optional[Dict[str, Any]]:
    if not network_file.exists():
        return None
    
    try:
        with open(network_file, 'r') as f:
            return json.load(f)
    except Exception:
        return None


def compute_3d_layout_spring(node_ids: List[int], connections: List[Dict], seed: int = 42) -> Dict[int, tuple]:
    try:
        import networkx as nx
    except ImportError:
        return compute_3d_layout_simple(node_ids, seed)
    
    if len(node_ids) == 0:
        return {}
    
    if len(node_ids) > 1000:
        return compute_3d_layout_simple(node_ids, seed)
    
    g = nx.Graph()
    for node_id in node_ids:
        g.add_node(node_id)
    
    for conn in connections[:100]:
        pre_id = conn.get('pre_id')
        post_id = conn.get('post_id')
        if pre_id is not None and post_id is not None and pre_id in node_ids and post_id in node_ids:
            weight = abs(conn.get('weight', 1.0))
            g.add_edge(pre_id, post_id, weight=weight)
    
    if g.number_of_nodes() == 0:
        return compute_3d_layout_simple(node_ids, seed)
    
    try:
        layout = nx.spring_layout(g, dim=3, seed=seed, scale=1.0, k=1.8, iterations=30)
    except Exception:
        return compute_3d_layout_simple(node_ids, seed)
    
    max_abs = max((max(abs(coord) for coord in pos) for pos in layout.values()), default=1.0)
    if max_abs == 0:
        max_abs = 1.0
    scale = 1.2 / max_abs
    for node in layout:
        layout[node] = tuple(c * scale for c in layout[node])
    
    for node_id in node_ids:
        if node_id not in layout:
            layout[node_id] = (0.0, 0.0, 0.0)
    
    return layout


def compute_3d_layout_simple(node_ids: List[int], seed: int = 42) -> Dict[int, tuple]:
    import random
    random.seed(seed)
    
    layout = {}
    num_nodes = len(node_ids)
    if num_nodes == 0:
        return layout
    
    for idx, node_id in enumerate(node_ids):
        angle1 = (idx * 2 * math.pi / max(num_nodes, 1)) + random.uniform(-0.1, 0.1)
        angle2 = (idx * math.pi / max(num_nodes, 1)) + random.uniform(-0.1, 0.1)
        radius = 1.0 + random.uniform(-0.2, 0.2)
        
        x = radius * math.sin(angle2) * math.cos(angle1)
        y = radius * math.sin(angle2) * math.sin(angle1)
        z = radius * math.cos(angle2)
        
        layout[node_id] = (x, y, z)
    
    return layout


def extract_frames(data: Dict[str, Any]) -> List[Dict[str, Any]]:
    metadata = data.get('metadata', {})
    frames = metadata.get('frames', [])
    
    sanitized_frames = []
    for idx, frame in enumerate(frames):
        annotations = frame.get('annotations', {})
        node_ids = frame.get('node_ids', [])
        states = frame.get('states', [])
        top_connections = frame.get('top_connections', [])
        
        layout = compute_3d_layout_simple(node_ids, seed=42 + idx)
        
        nodes_map = {}
        display_nodes = []
        
        for i, node_id in enumerate(node_ids):
            if str(node_id) in annotations:
                ann = annotations[str(node_id)]
                x, y, z = layout.get(node_id, (0.0, 0.0, 0.0))
                state = states[i] if i < len(states) else ann.get('state_from_hash', 0)
                
                node_data = {
                    'neuron_id': node_id,
                    'id': node_id,
                    'real_id': ann.get('real_id', ''),
                    'seed': ann.get('seed', ''),
                    'seed_hash': ann.get('seed_hash', ''),
                    'doc_id': ann.get('doc_id', ''),
                    'state': state,
                    'state_from_hash': ann.get('state_from_hash', 0),
                    'x': x,
                    'y': y,
                    'z': z,
                    'neuron_type': 'input' if node_id < 512 else ('hidden' if node_id < 896 else 'output'),
                }
                nodes_map[str(node_id)] = node_data
                display_nodes.append(node_data)
        
        sanitized_connections = []
        for conn in top_connections:
            sanitized_connections.append({
                'pre_id': conn.get('pre_id'),
                'post_id': conn.get('post_id'),
                'weight': abs(conn.get('weight', 0)),
                'w_fast': conn.get('w_fast', 0),
                'w_slow': conn.get('w_slow', 0),
                'w_meta': conn.get('w_meta', 0),
                'synapse_type': conn.get('synapse_type', ''),
            })
        
        sanitized_frame = {
            'index': idx,
            'frame_id': frame.get('frame_id', f'chunk_{idx}'),
            'start_index': frame.get('start_index', 0),
            'end_index': frame.get('end_index', 0),
            'nodes': nodes_map,
            'display_nodes': display_nodes,
            'connections': sanitized_connections,
        }
        
        sanitized_frames.append(sanitized_frame)
    
    return sanitized_frames


def get_frame_statistics(frames: List[Dict[str, Any]]) -> Dict[str, Any]:
    if not frames:
        return {}
    
    total_nodes = sum(len(f.get('display_nodes', [])) for f in frames)
    
    return {
        'total_frames': len(frames),
        'total_nodes': total_nodes,
        'total_display_nodes': total_nodes,
    }
