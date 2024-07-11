from PIL import Image
import os

def resize_images_in_folder(folder_path):
    # Create a subfolder named 'small' inside the original folder
    small_folder_path = os.path.join(folder_path, "small")
    os.makedirs(small_folder_path, exist_ok=True)

    # Iterate through all files in the specified folder
    for filename in os.listdir(folder_path):
        if filename.endswith(".webp"):
            image_path = os.path.join(folder_path, filename)
            try:
                # Open an image file
                with Image.open(image_path) as img:
                    # Resize image to 20x20 pixels
                    img_small = img.resize((20, 20), Image.Resampling.LANCZOS)
                    
                    # Create new file name
                    base, ext = os.path.splitext(filename)
                    new_file_name = base + "_small.webp"
                    new_file_path = os.path.join(small_folder_path, new_file_name)
                    
                    # Save resized image
                    img_small.save(new_file_path, "WEBP")
                    
                    print(f"Saved resized image as {new_file_path}")
            except Exception as e:
                print(f"Error processing {image_path}: {e}")

# Example usage
folder_path = "../paintings\webp"
resize_images_in_folder(folder_path)
