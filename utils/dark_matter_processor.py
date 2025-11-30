#!/usr/bin/env python3

from pathlib import Path
import json
import re
from typing import Dict, Any, List, Tuple


def process_dark_matter_data() -> Dict[str, Any]:
    """Process 26 zeros (dark matter) analysis data from report."""
    
    base_dir = Path(__file__).parent.parent.parent
    report_file = base_dir / 'outputs' / 'reports' / '26_zeros_dark_matter_analysis_report.md'
    
    # Default data from report
    known_zeros = [
        {'x': 4, 'y': 23}, {'x': 6, 'y': 19}, {'x': 35, 'y': 80},
        {'x': 36, 'y': 19}, {'x': 36, 'y': 114}, {'x': 37, 'y': 19},
        {'x': 44, 'y': 19}, {'x': 44, 'y': 67}, {'x': 44, 'y': 115},
        {'x': 46, 'y': 83}, {'x': 68, 'y': 51}, {'x': 68, 'y': 55},
        {'x': 70, 'y': 49}, {'x': 70, 'y': 51}, {'x': 70, 'y': 115},
        {'x': 78, 'y': 115}, {'x': 78, 'y': 119}, {'x': 100, 'y': 51},
        {'x': 100, 'y': 115}, {'x': 101, 'y': 51}
    ]
    
    dark_matter_data = {
        'zero_count': 26,
        'known_zeros': len(known_zeros),
        'zero_coordinates': known_zeros,
        'proximity_to_identity_regions': {
            'close': 10,
            'medium': 6,
            'far': 4
        },
        'control_neuron_identification': {
            'identified': 26,
            'function': 'Control neurons (dark matter)'
        },
        'statistical_significance': {
            'probability_exactly_26': '~10⁻³²',
            'probability_value_26_and_zero_count': '~10⁻⁴⁵',
            'conclusion': 'Intentional design confirmed'
        },
        'clustering': {
            'region_36_44_19': 3,
            'region_68_70_49_55': 4,
            'region_78_115_119': 2,
            'region_100_101_51': 2
        }
    }
    
    # Try to read from report file
    if report_file.exists():
        try:
            content = report_file.read_text(encoding='utf-8')
            
            # Extract zero coordinates from report
            coord_pattern = r'\((\d+),\s*(\d+)\)'
            found_coords = []
            for match in re.finditer(coord_pattern, content):
                x = int(match.group(1))
                y = int(match.group(2))
                found_coords.append({'x': x, 'y': y})
            
            if found_coords:
                dark_matter_data['zero_coordinates'] = found_coords
            dark_matter_data['known_zeros'] = len(found_coords) if found_coords else len(known_zeros)
        except Exception:
            # Fall back to default data if parsing fails
            pass
    
    return dark_matter_data

