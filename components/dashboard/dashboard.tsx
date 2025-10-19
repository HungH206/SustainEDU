import { useState } from "react"
import { AppNavigation } from "../../components/app-navigation"
import { StudyStats } from "../../components/dashboard/study-stats"
import { RecentNotes } from "../../components/dashboard/recent-notes"
import { UpcomingReviews } from "../../components/dashboard/upcoming-reviews"
import { FileSelector } from "../assistant/file-selector"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Lightbulb } from "lucide-react"

export default function DashboardPage() {
  const [topics, setTopics] = useState<string[]>([
    "Calculus - Derivatives",
    "Biology - Cell Structure",
    "History - World War II",
    "Chemistry - Atomic Structure",
    "English - Shakespeare",
  ])

  const handleAddTopic = (newTopic: string) => {
    if (!topics.includes(newTopic)) {
      setTopics((prev) => [...prev, newTopic])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Your learning overview and progress</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <StudyStats onAddTopic={handleAddTopic} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <RecentNotes />
          <UpcomingReviews topics={topics} />
        </div>

        {/* ✅ Add this if FileSelector is part of the same tab layout */}
        <div className="mb-8">
          <FileSelector topics={topics} />
        </div>

        {/* Idea Section */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <CardTitle>Future Ideas to Build Upon</CardTitle>
            </div>
            <CardDescription>
              Potential features to enhance your learning experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* ...your feature grid... */}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
