# audio_manager.py
from elevenlabs import ElevenLabs
from dotenv import load_dotenv
from datetime import datetime, timezone
import sqlite3
import os

# --- Load API key from .env ---
load_dotenv()
API_KEY = os.getenv("ELEVENLABS_API_KEY")
VOICE_ID = os.getenv("VOICE_ID", "21m00Tcm4TlvDq8ikWAM")  # Default Rachel voice

if not API_KEY:
    raise ValueError("❌ Missing ELEVENLABS_API_KEY in .env file")

# --- Initialize ElevenLabs client ---
client = ElevenLabs(api_key=API_KEY)

# =====================================================
# 🔹 DATABASE SETUP
# =====================================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "library.db")  # stored inside elevenLabs_library folder

def init_db():
    """Ensure the SQLite database and table exist."""
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS library (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            input_type TEXT,
            user_input TEXT,
            file_path TEXT,
            created_at TEXT
        )
    """)
    conn.commit()
    conn.close()
    print(f"✅ Database initialized at: {DB_PATH}")

def add_entry(input_type, user_input, file_path):
    """Insert a record into the library database."""
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO library (input_type, user_input, file_path, created_at)
        VALUES (?, ?, ?, ?)
    """, (input_type, user_input.strip(), file_path, datetime.now(timezone.utc).isoformat()))
    conn.commit()
    conn.close()
    print(f"✅ Entry saved to {DB_PATH}:\n   • Type: {input_type}\n   • Text: {user_input}\n   • File: {file_path}\n")

# =====================================================
# 🔹 AUDIO CONVERSION
# =====================================================
def text_to_speech(text):
    """
    Converts text to speech, saves .wav in local /audio folder,
    and logs the user text + file path in library.db.
    """
    if not text.strip():
        raise ValueError("⚠️ No text provided to convert to speech.")

    # create folder inside this same directory
    audio_folder = os.path.join(BASE_DIR, "audio")
    os.makedirs(audio_folder, exist_ok=True)

    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}.wav"
    output_path = os.path.join(audio_folder, filename)

    print(f"🔊 Generating speech: {output_path}")

    audio_stream = client.text_to_speech.convert(
        voice_id=VOICE_ID,
        model_id="eleven_turbo_v2",
        text=text
    )

    with open(output_path, "wb") as f:
        for chunk in audio_stream:
            if chunk:
                f.write(chunk)

    print(f"✅ Done — audio saved at: {output_path}")

    # --- Always log the input and audio file ---
    add_entry("audio", text, output_path)

    return output_path

# =====================================================
# 🔹 MAIN PROGRAM (CLI TEST)
# =====================================================
if __name__ == "__main__":
    init_db()
    text = input("🎙️ Enter text to convert to speech: ").strip()

    if text:
        text_to_speech(text)
    else:
        print("⚠️ No valid text entered.")
else:
    # Ensure DB exists even when imported by Flask
    init_db()
