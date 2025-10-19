"use client"

import { useState } from 'react'
import { AppNavigation } from "../../components/app-navigation"
import { StudyStats } from "../../components/dashboard/study-stats"
import { RecentNotes } from "../../components/dashboard/recent-notes"
import { UpcomingReviews } from "../../components/dashboard/upcoming-reviews"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Lightbulb } from "lucide-react"

export default function DashboardPage() {
  const [topics, setTopics] = useState<string[]>([])

  const addTopic = (newTopic: string) => {
    setTopics((prev) => [...prev, newTopic])
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
          <StudyStats onAddTopic={addTopic}/>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <RecentNotes />
          <UpcomingReviews topics={topics}/>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <CardTitle>Future Ideas to Build Upon</CardTitle>
            </div>
            <CardDescription>Potential features to enhance your learning experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Learning Analytics</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Track study time and patterns</li>
                  <li>• Identify knowledge gaps</li>
                  <li>• Progress visualization charts</li>
                  <li>• Weekly/monthly reports</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Collaborative Learning</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Share notes with classmates</li>
                  <li>• Group study sessions</li>
                  <li>• Peer review system</li>
                  <li>• Discussion forums</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Advanced AI Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Personalized study plans</li>
                  <li>• Quiz generation from notes</li>
                  <li>• Concept mapping</li>
                  <li>• Multi-language support</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Integration & Export</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Calendar sync for reviews</li>
                  <li>• Export to Notion/Obsidian</li>
                  <li>• Mobile app companion</li>
                  <li>• Offline mode support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
