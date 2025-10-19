# app.py
import os
import sqlite3
from flask import Flask, render_template, request, redirect, url_for, send_file, jsonify
from audio_manager import text_to_speech  # uses its own internal audio path
from library_manager import init_db as init_text_db

# =====================================================
# 🔹 PATH CONFIGURATION
# =====================================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
AUDIO_DIR = os.path.join(BASE_DIR, "audio")
TEXT_DB_PATH = os.path.join(BASE_DIR, "library_data.db")
os.makedirs(AUDIO_DIR, exist_ok=True)

# Initialize text library DB
init_text_db()

app = Flask(__name__)
print(f"🎧 Audio folder: {AUDIO_DIR}")
print(f"📚 Text library database: {TEXT_DB_PATH}")


# =====================================================
# 🔹 HOME PAGE — Text to Speech + Save Text
# =====================================================
@app.route("/", methods=["GET", "POST"])
def index():
    audio_file = None
    text = ""

    if request.method == "POST":
        text = request.form.get("text", "").strip()

        if text:
            if "convert" in request.form:
                audio_path = text_to_speech(text)
                audio_file = os.path.basename(audio_path)
            elif "save_text" in request.form:
                save_text_to_library(text)
                return redirect(url_for("text_library"))

    return render_template("index.html", audio_file=audio_file, text=text)


# =====================================================
# 🔹 SERVE AUDIO FILES
# =====================================================
@app.route("/audio/<filename>")
def audio(filename):
    file_path = os.path.join(AUDIO_DIR, filename)
    if os.path.exists(file_path):
        return send_file(file_path, mimetype="audio/wav")
    return f"⚠️ File not found: {file_path}", 404


# =====================================================
# 🔹 VIEW TEXT LIBRARY PAGE
# =====================================================
@app.route("/text-library")
def text_library():
    if not os.path.exists(TEXT_DB_PATH):
        return "<h3>⚠️ No text library database found yet.</h3>"

    conn = sqlite3.connect(TEXT_DB_PATH)
    rows = conn.execute(
        "SELECT user_input, created_at FROM text_library ORDER BY id DESC"
    ).fetchall()
    conn.close()

    formatted_rows = [(i + 1, *r) for i, r in enumerate(rows)]
    return render_template("text_library.html", rows=formatted_rows)


# =====================================================
# 🔹 API ENDPOINTS — TTS JSON
# =====================================================
@app.route("/api/audio", methods=["POST"])
def api_audio():
    data = request.json
    text = data.get("text", "")
    if not text.strip():
        return jsonify({"status": "error", "message": "No text provided"}), 400
    try:
        audio_path = text_to_speech(text)
        return jsonify({"status": "success", "file_path": audio_path})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/api/audio/download", methods=["GET"])
def api_download():
    path = request.args.get("path")
    if not path or not os.path.isfile(path):
        return jsonify({"status": "error", "message": "File not found"}), 404
    return send_file(path, as_attachment=True)


# =====================================================
# 🔹 RUN FLASK APP
# =====================================================
if __name__ == "__main__":
    app.run(debug=True, port=5000)
