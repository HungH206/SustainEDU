# ...existing code...
import os
import sys
import logging
from mpxpy.mathpix_client import MathpixClient
from dotenv import load_dotenv

load_dotenv()

# Validate credentials before creating client / calling endpoints
app_id = os.getenv("MATHPIX_APP_ID")
app_key = os.getenv("MATHPIX_APP_KEY")
api_url = os.getenv("MATHPIX_URL")

if not app_id or not app_key:
    print("Error: MATHPIX_APP_ID and MATHPIX_APP_KEY must be set (env, ~/.mpx/config, or .env).")
    sys.exit(1)

client = MathpixClient(
    app_id=app_id,
    app_key=app_key,
    api_url=api_url
)
# Process an image file
image = client.image_new(
    file_path='/Users/hunghoanggia/Downloads/IMG_8121.jpg',
    include_line_data=True,
    # Optional image-level improve_mathpix argument is default True
)

# Process an image file with various options
tagged_image = client.image_new(
    file_path='/Users/hunghoanggia/Downloads/IMG_8121.jpg',
    tags=['tag']
)
include_line_data = client.image_new(
    file_path='/Users/hunghoanggia/Downloads/IMG_8121.jpg',
    include_line_data=True
)

# Get the full response
result = image.results()
print(result)

# Get the Mathpix Markdown (MMD) representation
mmd = image.mmd()
print(mmd)

# Get line-by-line OCR data
lines = image.lines_json()
print(lines)

# Make an async image request and get its results
async_image = client.image_new(
    file_path='/Users/hunghoanggia/Downloads/IMG_8121.jpg',
    is_async=True
)
async_image.wait_until_complete(timeout=5)
result = async_image.results()