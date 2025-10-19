# C:\Users\realm\OneDrive\Documents\Thuy One Drive\OneDrive\hackathon\elevenLabs_library\library_manager.py

import sqlite3
import os
from tabulate import tabulate  # pip install tabulate

def init_db():
    """Create text_library table if not exist."""
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
    print(f"✅ Text library database initialized at: {DB_PATH}")

# =====================================================
# 🔹 PATH CONFIGURATION
# =====================================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # elevenLabs_library folder
DB_PATH = os.path.join(BASE_DIR, "library.db")         # ✅ same as audio_manager.py

# =====================================================
# 🔹 DISPLAY ALL SAVED AUDIO ENTRIES
# =====================================================
def show_audio_library():
    """Show saved audio generation logs (from audio_manager)."""
    if not os.path.exists(DB_PATH):
        print(f"⚠️ Database not found at: {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    rows = conn.execute(
        "SELECT user_input, file_path, created_at FROM library ORDER BY id DESC"
    ).fetchall()
    conn.close()

    if not rows:
        print("\n📭 No entries found in your audio library yet.\n")
        return

    formatted_rows = [(i + 1, *row) for i, row in enumerate(rows)]
    headers = ["Order", "User Input", "File Path", "Created At"]

    print("\n🎧 Saved Audio Entries:\n")
    print(tabulate(formatted_rows, headers=headers, tablefmt="grid"))
    print(f"\n✅ Total Entries: {len(formatted_rows)}\n")

# =====================================================
# 🔹 MAIN PROGRAM LOOP
# =====================================================
if __name__ == "__main__":
    print(f"📁 Using database: {DB_PATH}")

    while True:
        print("\n🎵 Audio Library Options:")
        print("1️⃣  View saved entries")
        print("2️⃣  Exit")

        choice = input("Select option (1-2): ").strip()

        if choice == "1":
            show_audio_library()
        elif choice == "2":
            print("👋 Exiting Library Viewer. Bye!")
            break
        else:
            print("⚠️ Invalid option. Try again.")
