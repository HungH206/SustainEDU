"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Volume2, Pause, Loader2, Save } from "lucide-react"

export function NotePad() {
  const [notes, setNotes] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleListen = async () => {
    if (isPlaying) {
      setIsPlaying(false)
      // Stop audio playback
      return
    }

    if (!notes.trim()) {
      alert("Please write some notes first!")
      return
    }

    setIsGenerating(true)

    // Simulate ElevenLabs API call
    setTimeout(() => {
      setIsGenerating(false)
      setIsPlaying(true)

      // Simulate audio playback
      setTimeout(() => {
        setIsPlaying(false)
      }, 5000)
    }, 1500)
  }

  const handleSave = () => {
    console.log("[v0] Saving notes:", notes)
    alert("Notes saved successfully!")
  }

  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Smart Notepad</CardTitle>
            <CardDescription>Write notes and listen to AI-generated summaries</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleListen} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4 mr-2" />
                  Listen
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-6 pt-0">
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Start writing your notes here... Click 'Listen' to hear an AI-generated audio summary using ElevenLabs."
          className="flex-1 resize-none"
        />
        {isPlaying && (
          <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 20 + 10}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-primary font-medium">Playing audio summary...</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
