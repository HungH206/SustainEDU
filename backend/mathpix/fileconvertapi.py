from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os
import base64
import logging

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow all origins (Next.js frontend)

# Logging setup
logging.basicConfig(level=logging.INFO)

# Mathpix credentials
app_id = os.getenv("MATHPIX_APP_ID")
app_key = os.getenv("MATHPIX_APP_KEY")
api_url = os.getenv("MATHPIX_URL", "https://api.mathpix.com/v3/text")

@app.route("/convert", methods=["POST"])
def convert_image():
    try:
        # Check if file exists
        if "file" not in request.files:
            return jsonify({"status": "error", "message": "No file uploaded"}), 400

        file = request.files["file"]
        logging.info(f"📤 Received file: {file.filename}")

        # Read and encode to base64
        image_bytes = file.read()
        image_base64 = base64.b64encode(image_bytes).decode("utf-8")

        # Prepare Mathpix API payload
        payload = {
            "src": f"data:image/jpeg;base64,{image_base64}",
            "formats": ["text", "data"],
            "data_options": {"include_asciimath": True, "include_latex": True},
        }

        headers = {
            "app_id": app_id,
            "app_key": app_key,
            "Content-type": "application/json",
        }

        # Send request to Mathpix
        response = requests.post(api_url, json=payload, headers=headers)

        if response.status_code != 200:
            logging.error(f"❌ Mathpix API error: {response.text}")
            return jsonify({
                "status": "error",
                "message": f"Mathpix API error: {response.text}"
            }), 500

        result = response.json()
        logging.info(f"✅ Mathpix Response: {result}")

        # Extract recognized text
        extracted_text = result.get("text", "") or "No text detected in the image."

        return jsonify({"status": "success", "text": extracted_text})

    except Exception as e:
        logging.exception("❌ Error converting image")
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
