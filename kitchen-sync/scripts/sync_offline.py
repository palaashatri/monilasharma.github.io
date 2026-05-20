import os
import json
import sys
import subprocess
from PIL import Image

# This script replaces the Gemini analysis with a local Ollama model
# Requirements: 
# 1. Install Ollama (ollama.com)
# 2. Run: ollama pull moondream

try:
    import ollama
except ImportError:
    print("Error: 'ollama' python library not found. Run: pip install ollama")
    sys.exit(1)

IMAGES_DIR = 'images'
METADATA_FILE = 'cakes.json'

def get_new_images():
    if not os.path.exists(METADATA_FILE):
        processed = []
    else:
        with open(METADATA_FILE, 'r') as f:
            data = json.load(f)
            processed = [item['fileName'] for item in data]
    
    # We look for raw images (jpg/png) that aren't webp and aren't in the json
    all_files = [f for f in os.listdir(IMAGES_DIR) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    new_files = [f for f in all_files if f not in processed and f != 'logo.png' and not f.startswith('3d_')]
    return new_files

def analyze_locally(filename):
    path = os.path.join(IMAGES_DIR, filename)
    print(f"  Analyzing {filename} using Moondream...")
    
    prompt = """Analyze this cake image. 
    Return ONLY a JSON object with:
    'title': A catchy name.
    'description': An appetizing 1-sentence blurb.
    'category': One of [Birthday, Anniversary, Festive, Specialty, Cake Bowls].
    'slug': A lowercase-kebab-case filename based on the title (e.g. 'blue-floral-cake').
    """
    
    try:
        res = ollama.generate(model='moondream', prompt=prompt, images=[path])
        # Try to extract JSON from response
        response_text = res['response'].strip()
        # Basic cleanup in case the model adds markdown backticks
        if '```json' in response_text:
            response_text = response_text.split('```json')[1].split('```')[0].strip()
        elif '```' in response_text:
            response_text = response_text.split('```')[1].split('```')[0].strip()
            
        data = json.loads(response_text)
        return data
    except Exception as e:
        print(f"  Error analyzing {filename}: {e}")
        return None

def run_offline_sync():
    new_files = get_new_images()
    if not new_files:
        print("No new images to sync.")
        return

    print(f"Found {len(new_files)} new images. Starting local VLM sync...")
    
    new_metadata = []
    for f in new_files:
        analysis = analyze_locally(f)
        if analysis:
            old_path = os.path.join(IMAGES_DIR, f)
            new_ext = os.path.splitext(f)[1]
            new_filename = f"{analysis['slug']}{new_ext}"
            new_path = os.path.join(IMAGES_DIR, new_filename)
            
            # Rename locally
            os.rename(old_path, new_path)
            print(f"  Renamed: {f} -> {new_filename}")
            
            new_metadata.append({
                "title": analysis['title'],
                "description": analysis['description'],
                "category": analysis['category'],
                "fileName": new_filename
            })

    if new_metadata:
        # Update cakes.json
        with open(METADATA_FILE, 'r+') as f:
            data = json.load(f)
            data.extend(new_metadata)
            f.seek(0)
            json.dump(data, f, indent=2)
            f.truncate()
        print(f"Added {len(new_metadata)} items to {METADATA_FILE}")
        
        # Now run the enhancement script (it handles webp conversion and script.js sync)
        print("Running image enhancement and site sync...")
        subprocess.run([sys.executable, "kitchen-sync/scripts/enhance_images.py"])

if __name__ == "__main__":
    run_offline_sync()
