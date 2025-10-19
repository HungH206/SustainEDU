"use client"

import { useState } from "react"
import Link from "next/link"

export default function Notepad() {
  const [text, setText] = useState("")
  const [audioFile, setAudioFile] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000"

  const handleGenerate = async () => {
    if (!text.trim()) return
    setLoading(true)
    setAudioFile(null)

    try {
      const res = await fetch(`${backendUrl}/api/audio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })
      const data = await res.json()
      if (res.ok && data.status === "success" && data.file_path) {
        setAudioFile(data.file_path as string)
      } else {
        alert(data.message || "Failed to generate audio")
      }
    } catch (err) {
      console.error(err)
      alert("Error generating audio")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!audioFile) return
    window.open(`${backendUrl}/api/audio/download?path=${encodeURIComponent(audioFile)}`, "_blank")
  }

  return (
    <div className="space-y-3">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter text to convert with ElevenLabs…"
        className="w-full h-40 border rounded p-2"
      />
      <div className="flex items-center gap-2">
        <Link href="http://127.0.0.1:5000" className="px-3 py-2 border rounded inline-flex items-center">
        {loading ? "Generating..." : "Generate Audio"}
        </Link>
        {audioFile && (
          <>
            <button onClick={handleDownload} className="px-3 py-2 border rounded">
              Download Audio
            </button>
            <audio
              controls
              src={`${backendUrl}/api/audio/stream?path=${encodeURIComponent(audioFile)}`}
              className="ml-2"
            />
          </>
        )}
      </div>
    </div>
  )
}