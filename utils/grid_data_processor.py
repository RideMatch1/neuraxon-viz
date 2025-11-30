#!/usr/bin/env python3

from pathlib import Path
import json
from typing import Dict, Any


def process_grid_data() -> Dict[str, Any]:
    """Process grid structure data for visualization."""
    
    # Try local data directory first (for Vercel deployment)
    local_data_dir = Path(__file__).parent.parent / 'data'
    grid_file = local_data_dir / 'grid_word_cluster_analysis.json'
    
    # Fallback to parent directory (for local development)
    if not grid_file.exists():
        base_dir = Path(__file__).parent.parent.parent
        grid_file = base_dir / 'outputs' / 'derived' / 'grid_word_cluster_analysis.json'
    
    if not grid_file.exists():
        import sys
        print(f"ERROR: Grid file not found. Tried: {local_data_dir / 'grid_word_cluster_analysis.json'}", file=sys.stderr)
        print(f"ERROR: Also tried: {base_dir / 'outputs' / 'derived' / 'grid_word_cluster_analysis.json'}", file=sys.stderr)
        return {
            'error': 'Grid data not found',
            'grid_7x7': {},
            'block_end_positions': [],
            'column6_hub': {}
        }
    
    with open(grid_file, 'r') as f:
        grid_data = json.load(f)
    
    # Build 7x7 grid heatmap
    grid_7x7 = {}
    if 'grid_summary' in grid_data:
        for grid_cell in grid_data['grid_summary']:
            if 'grid_coord' in grid_cell and len(grid_cell['grid_coord']) == 2:
                x, y = grid_cell['grid_coord']
                word_count = grid_cell.get('word_count', 0)
                unique_words = grid_cell.get('unique_words', 0)
                grid_7x7[f"{x},{y}"] = {
                    'word_count': word_count,
                    'unique_words': unique_words,
                    'top_words': grid_cell.get('top_words', [])[:5]
                }
    
    # Block-end positions (13, 27, 41, 55) all in column 6
    block_end_positions = [
        {'position': 13, 'grid_x': 6, 'grid_y': 1, 'description': 'First block-end'},
        {'position': 27, 'grid_x': 6, 'grid_y': 3, 'description': 'Midpoint (Position 27)'},
        {'position': 41, 'grid_x': 6, 'grid_y': 5, 'description': 'Third block-end'},
        {'position': 55, 'grid_x': 6, 'grid_y': 7, 'description': 'Final block-end'}
    ]
    
    # Column 6 hub data
    column6_data = {
        'word_count': 1500,
        'percentage': 17.5,
        'top_words': [
            {'word': 'DO', 'count': 396},
            {'word': 'GO', 'count': 336},
            {'word': 'HI', 'count': 151}
        ]
    }
    
    if 'column_summary' in grid_data:
        for col_data in grid_data['column_summary']:
            if isinstance(col_data, dict) and col_data.get('column') == 6:
                column6_data = {
                    'word_count': col_data.get('word_count', 1500),
                    'percentage': col_data.get('percentage', 17.5),
                    'top_words': col_data.get('top_words', [])[:10]
                }
                break
    
    # Hotspots (cells with highest activity)
    hotspots = []
    if 'grid_summary' in grid_data:
        sorted_cells = sorted(
            grid_data['grid_summary'],
            key=lambda x: x.get('word_count', 0),
            reverse=True
        )[:10]
        
        for cell in sorted_cells:
            if 'grid_coord' in cell:
                x, y = cell['grid_coord']
                hotspots.append({
                    'x': x,
                    'y': y,
                    'word_count': cell.get('word_count', 0),
                    'unique_words': cell.get('unique_words', 0)
                })
    
    return {
        'grid_7x7': grid_7x7,
        'block_end_positions': block_end_positions,
        'column6_hub': column6_data,
        'hotspots': hotspots,
        'total_sentences': grid_data.get('total_sentences', 0),
        'total_words': grid_data.get('total_words', 0)
    }

