from PIL import Image
import os

def convert_to_webp(source_dir, target_dir, quality=90):
    """
    Convert images in the specified directory to WebP format and save them to a target directory.

    Args:
    - source_dir (str): Directory containing the original images.
    - target_dir (str): Directory where the WebP images will be saved.
    - quality (int): Quality of the resulting WebP images, default is 90.
    """
    # Ensure the target directory exists, if not, create it
    os.makedirs(target_dir, exist_ok=True)

    # Loop through each file in the source directory
    for filename in os.listdir(source_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):  # Check for image files
            # Open an image file
            with Image.open(os.path.join(source_dir, filename)) as img:
                # Define the new filename with .webp extension
                base, _ = os.path.splitext(filename)
                new_filename = f"{base}.webp"
                
                # Save the image as WebP in the target directory
                img.save(os.path.join(target_dir, new_filename), 'WEBP', quality=quality)

                print(f"Converted and saved {new_filename} in WebP format")

# Define your directories
source_directory = "../paintings/thumbnails"
target_directory = os.path.join(source_directory, "webp")

# Convert and save images in WebP format
convert_to_webp(source_directory, target_directory)
