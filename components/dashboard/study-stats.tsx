"use client"

import { useState } from 'react'
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { BookOpen, Clock, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: BookOpen,
    label: "Notes Captured",
    value: "0",
    color: "text-chart-1",
  },
  {
    icon: Clock,
    label: "Study Time",
    value: "0h",
    color: "text-chart-2",
  },
]

type StudyStatsProps = {
  onAddTopic: (topic: string) => void
}

export function StudyStats({ onAddTopic }: { onAddTopic: (topic: string) => void }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [topicName, setTopicName] = useState("")

  const handleSave = () => {
    const trimmed = topicName.trim()
    if (trimmed !== "") {
      onAddTopic(trimmed) // 🔁 Update global state
      setTopicName("")
      setIsDialogOpen(false)
    }
  }

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start justify-between mb-4">
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
          <div className="text-3xl font-bold mb-1">{stat.value}</div>
          <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
        </Card>
      ))}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Create new Topic</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Topic</DialogTitle>
            <DialogDescription>
              Enter a name for your new study topic below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter topic name..."
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
