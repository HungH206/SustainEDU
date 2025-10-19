"use client"

import { useState } from 'react'
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { FileText, Volume2, MoreVertical, Trash2 } from "lucide-react"


export function RecentNotes() {
  const [notes, setNotes] = useState([
    {
      title: "Quantum Mechanics - Wave Functions",
      subject: "Physics",
    },
    {
      title: "Organic Chemistry - Reactions",
      subject: "Chemistry",
    },
    {
      title: "Linear Algebra - Matrices",
      subject: "Mathematics",
    },
    {
      title: "American Literature - Modernism",
      subject: "English",
    },
  ])

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const handleDelete = (index: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Notes</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {notes.map((note, index) => (
          <Card key={index} className="p-4 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{note.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{note.subject}</span>
                </div>
              </div>

              {/* Dropdown Menu for delete */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleDelete(index)}
                    className="text-red-600 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex gap-2">
              {/* Each note gets its own dialog trigger */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 flex-1 bg-transparent"
                    onClick={() => setSelectedTopic(note.title)}
                  >
                    <FileText className="w-4 h-4" />
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{selectedTopic}</DialogTitle>
                    <DialogDescription>
                      Review your notes for this topic.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-6 text-muted-foreground text-center border border-dashed border-gray-300 rounded-lg p-8">
                    <p className="text-lg">
                      📘 Notes content will appear here...
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm" className="gap-2 flex-1 bg-transparent">
                <Volume2 className="w-4 h-4" />
                Listen
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}
