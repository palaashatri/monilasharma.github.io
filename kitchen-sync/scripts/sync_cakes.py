import os
import json
import subprocess
import sys

# Configuration
IMAGES_DIR = 'images'
METADATA_FILE = 'cakes.json'
SCRIPT_JS = 'script.js'
LOGO_FILE = 'logo.png'

def get_processed_files():
    if not os.path.exists(METADATA_FILE):
        return []
    with open(METADATA_FILE, 'r') as f:
        data = json.load(f)
        return [item['fileName'] for item in data]

def get_new_images():
    processed = get_processed_files()
    all_files = [f for f in os.listdir(IMAGES_DIR) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    new_files = [f for f in all_files if f not in processed and f != LOGO_FILE and not f.startswith('3d_')]
    return new_files

def analyze_and_rename(new_files):
    if not new_files:
        print("No new cakes found in the kitchen!")
        return []

    print(f"Found {len(new_files)} new cakes. Asking Gemini for descriptions...")
    
    # We use Gemini CLI to analyze the images. 
    # Since we are in a script, we'll construct a prompt for the Gemini CLI.
    # We'll pass the list of files.
    
    file_paths = [os.path.join(IMAGES_DIR, f) for f in new_files]
    
    prompt = f"""
    Analyze these {len(new_files)} new cake images. 
    For each image, provide:
    1. A descriptive, SEO-friendly filename (e.g., 'blue-floral-cake.jpg'). Ignore personal names.
    2. A catchy title.
    3. An appetizing description.
    4. A category (Birthday, Anniversary, Festive, Specialty).
    
    Return the result as a JSON array of objects with keys: 'oldFileName', 'newFileName', 'title', 'description', 'category'.
    Return ONLY the JSON array.
    """
    
    # In a real Gemini CLI environment, we'd use the `gemini` command.
    # For this simulation, we'll use a placeholder logic or assume the user runs it via gemini.
    # However, to make it fully automated, we'll output the command the user should run.
    
    print("\nRun this command to process the new images:\n")
    print(f"gemini \"Analyze the following images in {IMAGES_DIR}: {', '.join(new_files)}. {prompt}\"")
    print("\nAfter running, update cakes.json with the results.")

def update_website_files(new_metadata_items):
    # 1. Update cakes.json
    with open(METADATA_FILE, 'r+') as f:
        data = json.load(f)
        data.extend(new_metadata_items)
        f.seek(0)
        json.dump(data, f, indent=2)
        f.truncate()

    # 2. Update script.js (simple replacement of the arrays)
    # This part is tricky to do surgically via python without markers.
    # But we can regenerate the variable blocks.
    print("Metadata updated in cakes.json. Please sync script.js.")

if __name__ == "__main__":
    new_images = get_new_images()
    if new_images:
        analyze_and_rename(new_images)
    else:
        print("Kitchen is up to date!")
