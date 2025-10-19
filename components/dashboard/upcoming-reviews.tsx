"use client"

import { useState, useEffect } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog"
import { ArrowRight } from "lucide-react"

const initialReviews = [
  { title: "Calculus - Derivatives" },
  { title: "Biology - Cell Structure" },
  { title: "History - World War II" },
  { title: "Chemistry - Atomic Structure" },
  { title: "English - Shakespeare" },
]

export function UpcomingReviews({ topics }: { topics: string[] }) {
  const [reviews, setReviews] = useState(
    (topics ?? []).map((title) => ({ title }))
  )

  const [open, setOpen] = useState(false)
  const [openNotes, setOpenNotes] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  // Update state when new topics are passed in
  useEffect(() => {
    setReviews((topics ?? []).map((title) => ({ title })))
  }, [topics])

  const handleOpenNotes = (topic: string) => {
    setSelectedTopic(topic)
    setOpenNotes(true)
  }

  const handleDelete = (title: string) => {
    setReviews((prev) => prev.filter((r) => r.title !== title))
  }

  const handleRemoveAll = () => {
    setReviews([])
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Review Topics</h2>

        {/* View All Button (opens modal) */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>All Topics</DialogTitle>
              <DialogDescription>
                Here’s a list of all topics you’ve created.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-4">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="font-medium">{review.title}</div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleOpenNotes(review.title)}
                      >
                        Review
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(review.title)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No topics available.
                </p>
              )}
            </div>

            {reviews.length > 0 && (
              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={handleRemoveAll}>
                  Remove All
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* List of Upcoming Reviews Maxed at 4 */}
      <div className="space-y-3">
        {reviews.slice(0, 5).map((review, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="font-medium mb-1">{review.title}</div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleOpenNotes(review.title)}>
                Review
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(review.title)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Large Popup for Notes */}
      <Dialog open={openNotes} onOpenChange={setOpenNotes}>
        <DialogContent className="max-w-3xl h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTopic}</DialogTitle>
            <DialogDescription>
              Review your notes for this topic.
            </DialogDescription>
          </DialogHeader>

          {/* Placeholder for notes content */}
          <div className="mt-6 text-muted-foreground text-center border border-dashed border-gray-300 rounded-lg p-8">
            <p className="text-lg">📘 Notes content will appear here...</p>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
