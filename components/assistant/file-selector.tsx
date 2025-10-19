"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { FileText, Check } from "lucide-react"

interface FileSelectorProps {
  topics: string[]
}

export function FileSelector({ topics }: FileSelectorProps) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  const toggleFile = (fileId: string) => {
    setSelectedFiles((prev: string[]) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Subject for Notes</CardTitle>
        <CardDescription>
          Choose a subject to add more notes to the notepad.
          {selectedFiles.length > 0 && ` (${selectedFiles.length} selected)`}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {(topics ?? []).length === 0 ? (
          <p className="text-muted-foreground">No topics available yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {topics.map((topic) => {
              const isSelected = selectedFiles.includes(topic)
              return (
                <Button
                  key={topic}
                  variant={isSelected ? "secondary" : "outline"}
                  className="h-auto p-4 justify-start relative"
                  onClick={() => toggleFile(topic)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-medium truncate">{topic}</p>
                      <p className="text-xs text-muted-foreground">Topic</p>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                </Button>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}