# audio_manager.py
from elevenlabs import ElevenLabs
from dotenv import load_dotenv
from datetime import datetime, timezone
import os
import sqlite3
# =====================================================
# 🔹 LOAD API KEY
# =====================================================
load_dotenv()
API_KEY = os.getenv("ELEVENLABS_API_KEY")
VOICE_ID = os.getenv("VOICE_ID", "21m00Tcm4TlvDq8ikWAM")  # Rachel default

if not API_KEY:
    raise ValueError("❌ Missing ELEVENLABS_API_KEY in .env file")

# Initialize ElevenLabs client
client = ElevenLabs(api_key=API_KEY)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = "library_data.db"

def init_db():
    """Create the text library database and table if they don't exist."""
    if os.path.isdir(DB_PATH):
        raise RuntimeError(f"'library_data.db' is a directory at {DB_PATH}. Remove or rename it.")

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS text_library (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_input TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

def save_text_to_library(text: str):
    """Insert a text entry into the text library."""
    if not text or not text.strip():
        raise ValueError("No text provided to save.")
    init_db()
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO text_library (user_input, created_at)
        VALUES (?, ?)
    """, (text.strip(), datetime.now(timezone.utc).isoformat()))
    conn.commit()
    conn.close()

# =====================================================
# 🔹 TEXT TO SPEECH FUNCTION
# =====================================================
def text_to_speech(text, folder="audio"):
    """Converts text to speech and saves as .wav file."""
    if not text.strip():
        raise ValueError("⚠️ No text provided to convert to speech.")

    # Ensure output folder exists
    os.makedirs(folder, exist_ok=True)

    # Create filename with timestamp
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}.wav"
    output_path = os.path.join(folder, filename)

    print(f"🔊 Generating speech into: {output_path}")

    # Generate audio stream
    audio_stream = client.text_to_speech.convert(
        voice_id=VOICE_ID,
        model_id="eleven_turbo_v2",  # Free plan compatible
        text=text
    )

    # Save audio file
    with open(output_path, "wb") as f:
        for chunk in audio_stream:
            if chunk:
                f.write(chunk)

    print(f"✅ Done — audio saved to: {output_path}")
    return output_path

# =====================================================
# 🔹 MAIN TEST PROGRAM
# =====================================================
if __name__ == "__main__":
    text = input("🎙️ Enter text to convert to speech: ").strip()

    # Basic input cleaning
    if any(x.lower() in text.lower() for x in ["python.exe", ".py", "Users", "Documents", "hackathon", "C:/"]):
        print("⚠️ Ignored accidental command-line text.")
        text = ""

    if text:
        text_to_speech(text)
    else:
        print("⚠️ No valid text entered.")
