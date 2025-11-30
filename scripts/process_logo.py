#!/usr/bin/env python3
"""
Process and optimize logo image:
- Center the content
- Remove metadata
- Save as optimized PNG
"""

import sys
from PIL import Image, ImageOps
import os

def process_logo(input_path, output_path):
    """Process logo: center, remove metadata, optimize."""
    try:
        img = Image.open(input_path)
        
        # Convert to RGBA if not already (for transparency)
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Get image dimensions
        width, height = img.size
        
        # Find bounding box of non-transparent content
        bbox = img.getbbox()
        
        if bbox:
            # Crop to content
            img_cropped = img.crop(bbox)
            crop_width, crop_height = img_cropped.size
            
            # Calculate padding for centering (add 20% padding on each side)
            padding_percent = 0.2
            target_width = int(crop_width * (1 + 2 * padding_percent))
            target_height = int(crop_height * (1 + 2 * padding_percent))
            
            # Create new image with transparent background
            centered = Image.new('RGBA', (target_width, target_height), (0, 0, 0, 0))
            
            # Calculate position to center the cropped image
            x_offset = (target_width - crop_width) // 2
            y_offset = (target_height - crop_height) // 2
            
            # Paste cropped image centered
            centered.paste(img_cropped, (x_offset, y_offset), img_cropped)
            
            # Make square if needed (use larger dimension)
            max_dim = max(target_width, target_height)
            if target_width != target_height:
                square = Image.new('RGBA', (max_dim, max_dim), (0, 0, 0, 0))
                x_square = (max_dim - target_width) // 2
                y_square = (max_dim - target_height) // 2
                square.paste(centered, (x_square, y_square), centered)
                centered = square
            
            img = centered
        else:
            # No content found, use original
            pass
        
        # Remove metadata by saving without EXIF
        # Create output directory if it doesn't exist
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Save without metadata
        img.save(output_path, 'PNG', optimize=True)
        
        print(f"Logo processed and saved to: {output_path}")
        print(f"Size: {img.size[0]}x{img.size[1]}px")
        return True
        
    except Exception as e:
        print(f"Error processing logo: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python process_logo.py <input_image> [output_path]")
        print("Example: python process_logo.py ~/Downloads/logo.png static/images/logo/anna_matrix_lab_logo.png")
        sys.exit(1)
    
    input_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else "static/images/logo/anna_matrix_lab_logo.png"
    
    if not os.path.exists(input_path):
        print(f"❌ Input file not found: {input_path}")
        sys.exit(1)
    
    # Make output path relative to script location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    web_dir = os.path.dirname(script_dir)
    output_path = os.path.join(web_dir, output_path)
    
    process_logo(input_path, output_path)

