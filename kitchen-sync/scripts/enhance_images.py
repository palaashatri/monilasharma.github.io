import os
import json
from PIL import Image, ImageEnhance

# Configuration
IMAGES_DIR = 'images'
OUTPUT_DIR = 'images' # We will save them as .webp in the same folder
METADATA_FILE = 'cakes.json'
SCRIPT_JS = 'script.js'

def enhance_image(input_path, output_path):
    """
    Enhances an image for vibrancy and optimizes for web (WebP).
    Does NOT crop to maintain full visibility.
    """
    try:
        with Image.open(input_path) as img:
            # 1. Resize if too large (max 1200px dimension)
            max_size = 1200
            if max(img.size) > max_size:
                img.thumbnail((max_size, max_size), Image.LANCZOS)
            
            # 2. Convert to RGB if necessary (e.g. for PNG with alpha)
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            
            # 3. Enhance Vibrancy (Saturation)
            # 1.25 is a 25% boost - noticeable but not overdone
            converter = ImageEnhance.Color(img)
            img = converter.enhance(1.25) 
            
            # 4. Enhance Contrast
            # 1.1 is a 10% boost for depth
            contrast = ImageEnhance.Contrast(img)
            img = contrast.enhance(1.1)
            
            # 5. Sharpness (slightly crispier)
            sharpness = ImageEnhance.Sharpness(img)
            img = sharpness.enhance(1.2)
            
            # 6. Save as WebP
            img.save(output_path, 'WEBP', quality=82, optimize=True)
            return True
    except Exception as e:
        print(f"Error processing {input_path}: {e}")
        return False

def batch_process():
    if not os.path.exists(METADATA_FILE):
        print(f"Error: {METADATA_FILE} not found.")
        return

    with open(METADATA_FILE, 'r') as f:
        cakes = json.load(f)

    updated_cakes = []
    processed_count = 0

    for cake in cakes:
        filename = cake['fileName']
        base_name = os.path.splitext(filename)[0]
        target_filename = f"{base_name}.webp"
        
        target_path = os.path.join(IMAGES_DIR, target_filename)

        # 1. If WebP already exists, we're good
        if os.path.exists(target_path):
            cake['fileName'] = target_filename
            updated_cakes.append(cake)
            continue
            
        # 2. Try to find a source file with various extensions
        source_found = False
        for ext in ['.jpg', '.jpeg', '.png', '.JPG', '.PNG', '.JPEG']:
            source_path = os.path.join(IMAGES_DIR, f"{base_name}{ext}")
            if os.path.exists(source_path):
                print(f"Enhancing: {source_path} -> {target_path}")
                if enhance_image(source_path, target_path):
                    cake['fileName'] = target_filename
                    processed_count += 1
                    # Clean up source to save space
                    try:
                        os.remove(source_path)
                        print(f"Removed source: {source_path}")
                    except Exception as e:
                        print(f"Could not remove {source_path}: {e}")
                source_found = True
                break
        
        if not source_found:
            print(f"Warning: Could not find source image for {filename}. Removing from metadata.")
            continue # Skip adding this cake to updated_cakes
        
        updated_cakes.append(cake)

    # Save updated metadata
    with open(METADATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(updated_cakes, f, indent=2, ensure_ascii=False)

    print(f"\nSuccessfully enhanced {processed_count} images and updated {METADATA_FILE}.")

def sync_script_js():
    """Updates script.js with the new contents of cakes.json."""
    if not os.path.exists(METADATA_FILE) or not os.path.exists(SCRIPT_JS):
        print("Required files missing for script sync.")
        return

    with open(METADATA_FILE, 'r') as f:
        cakes = json.load(f)

    with open(SCRIPT_JS, 'r') as f:
        content = f.read()

    # This is a bit brute-force, but we replace the entire cakeCatalog array.
    # We look for "const cakeCatalog = [" and its closing "];"
    # Use simple string replacement to avoid regex escape issues
    start_marker = 'const cakeCatalog = ['
    end_marker = '];'
    
    start_idx = content.find(start_marker)
    if start_idx != -1:
        end_idx = content.find(end_marker, start_idx)
        if end_idx != -1:
            cakes_json_str = json.dumps(cakes, indent=2, ensure_ascii=False)
            new_content = content[:start_idx] + f'const cakeCatalog = {cakes_json_str};' + content[end_idx + len(end_marker):]
            content = new_content

    # Update 'const images'
    images_list = [c['fileName'] for c in cakes]
    start_marker_img = 'const images = ['
    start_idx_img = content.find(start_marker_img)
    if start_idx_img != -1:
        end_idx_img = content.find(end_marker, start_idx_img)
        if end_idx_img != -1:
            images_json_str = json.dumps(images_list, indent=2, ensure_ascii=False)
            new_content = content[:start_idx_img] + f'const images = {images_json_str};' + content[end_idx_img + len(end_marker):]
            content = new_content

    # Update 'const imageToCakeTitle'
    title_map = {c['fileName']: c['title'] for c in cakes}
    start_marker_map = 'const imageToCakeTitle = {'
    end_marker_map = '};'
    start_idx_map = content.find(start_marker_map)
    if start_idx_map != -1:
        end_idx_map = content.find(end_marker_map, start_idx_map)
        if end_idx_map != -1:
            map_json_str = json.dumps(title_map, indent=2, ensure_ascii=False)
            new_content = content[:start_idx_map] + f'const imageToCakeTitle = {map_json_str};' + content[end_idx_map + len(end_marker_map):]
            content = new_content

    with open(SCRIPT_JS, 'w') as f:
        f.write(content)
    
    print(f"Updated {SCRIPT_JS} with new image references.")

if __name__ == "__main__":
    batch_process()
    sync_script_js()
