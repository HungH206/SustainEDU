"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { RotateCcw, ThumbsUp, ThumbsDown, Lightbulb } from "lucide-react"

const mockFlashcards = [
  {
    id: "1",
    front: "What is the derivative of x²?",
    back: "2x",
    subject: "Calculus",
  },
  {
    id: "2",
    front: "What is Newton's Second Law?",
    back: "F = ma (Force equals mass times acceleration)",
    subject: "Physics",
  },
  {
    id: "3",
    front: "What is the chemical formula for water?",
    back: "H₂O (Two hydrogen atoms and one oxygen atom)",
    subject: "Chemistry",
  },
]

export function FlashcardDeck() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [reviewedCount, setReviewedCount] = useState(0)

  const currentCard = mockFlashcards[currentIndex]

  const handleFlip = () => setIsFlipped((s) => !s)

  const handleResponse = (difficulty?: "easy" | "hard") => {
    setReviewedCount((prev) => prev + 1)
    setIsFlipped(false)

    if (currentIndex < mockFlashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setReviewedCount(0)
  }

  /* Inline styles guarantee consistent 3D behaviour */
  const containerStyle: React.CSSProperties = {
    perspective: "1000px",
  }

  const flipperStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    transition: "transform 500ms ease",
    transformStyle: "preserve-3d",
    transform: isFlipped ? "rotateY(180deg)" : "none",
  }

  const faceStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "2rem",
    borderRadius: "0.5rem",
  }

  const frontStyle: React.CSSProperties = {
    ...faceStyle,
    background: "var(--card)", // keep using your css vars if you have them
    border: "2px solid rgba(0,0,0,0.04)",
  }

  const backStyle: React.CSSProperties = {
    ...faceStyle,
    background: "rgba(0,0,0,0.02)",
    border: "2px solid rgba(59,130,246,0.12)",
    transform: "rotateY(180deg)", // flip the back so it faces forward when container is rotated
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Flashcard Practice</CardTitle>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Card {currentIndex + 1} of {mockFlashcards.length}
            </span>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* clickable area with inline perspective */}
        <div
          style={containerStyle}
          className="relative h-[300px] cursor-pointer"
          onClick={handleFlip}
        >
          <div style={flipperStyle}>
            {/* FRONT */}
            <div style={frontStyle}>
              <span className="text-xs font-medium text-primary mb-4 px-3 py-1 rounded-full bg-primary/10">
                {currentCard.subject}
              </span>
              <p className="text-xl font-medium">{currentCard.front}</p>
              <p className="text-sm text-muted-foreground mt-4">
                Click to reveal answer
              </p>
            </div>

            {/* BACK - note transform rotateY(180deg) so text is upright */}
            <div style={backStyle}>
              <Lightbulb className="h-8 w-8 text-primary mb-4" />
              <p className="text-xl font-medium mb-2">{currentCard.back}</p>
              <p className="text-sm text-muted-foreground mt-4">
                How well did you know this?
              </p>
            </div>
          </div>
        </div>

        {/* Response buttons shown only when flipped */}
        {isFlipped && (
          <div className="flex gap-4 justify-center">
            <Button variant="outline" size="lg" onClick={() => handleResponse("hard")} className="gap-2">
              <ThumbsDown className="h-5 w-5" />
              Need Practice
            </Button>
            <Button size="lg" onClick={() => handleResponse("easy")} className="gap-2">
              <ThumbsUp className="h-5 w-5" />
              Got It!
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
