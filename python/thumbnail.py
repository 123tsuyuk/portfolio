from PIL import Image
import os

def resize_images(source_dir, target_dir, size=(900, 1200)):
    """
    Resize images in the specified directory and save them to a target directory with adjusted filenames.

    Args:
    - source_dir (str): Directory containing the original images.
    - target_dir (str): Directory where the resized images will be saved.
    - size (tuple): Desired size of the thumbnails, default is (300, 400).
    """
    # Check if target directory exists, if not, create it
    os.makedirs(target_dir, exist_ok=True)

    # Loop through each file in the source directory
    for filename in os.listdir(source_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):  # Checking file extension
            # Open an image file
            with Image.open(os.path.join(source_dir, filename)) as img:
                # Calculate the new size maintaining aspect ratio
                img.thumbnail(size, Image.Resampling.LANCZOS)
                
                # Create a new filename
                base, extension = os.path.splitext(filename)
                new_filename = f"{base}{extension}"
                
                # Save the image to the target directory
                img.save(os.path.join(target_dir, new_filename))

                print(f"Resized and saved {new_filename}")

# Define your directories
source_directory = "../paintings"
target_directory = os.path.join(source_directory, "thumbnails")

# Resize and save images
resize_images(source_directory, target_directory)
