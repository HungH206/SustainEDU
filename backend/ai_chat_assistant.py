import os
import io
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
from google.generativeai import protos

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

MODEL = "gemini-2.5-flash"

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}})



@app.route('/api/process_document', methods=['POST'])
def process_document():

    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    if 'prompt' not in request.form:
        return jsonify({"error": "No text prompt provided"}), 400

    file = request.files['file']
    text_input = request.form['prompt']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:

        file_bytes = file.read()
        mime_type = file.content_type or "application/pdf"  

        print(f"Processing file: {file.filename} ({mime_type})")

        media_blob = protos.Blob(data=file_bytes, mime_type=mime_type)

        model = genai.GenerativeModel(MODEL)
        response = model.generate_content([media_blob, text_input])

        return jsonify({"response_text": response.text}), 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": f"An error occurred during content generation: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)