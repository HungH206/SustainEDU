import { AppNavigation } from "../../components/app-navigation"
import { FileSelector } from "../../components/assistant/file-selector"
import { ChatInterface } from "../../components/workspace/chat-interface"
import NotePad from "../../components/workspace/notepad"

export default function AssistantPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />

      <main className="container mx-auto px-4 py-8 max-w-[1600px]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Note Assistant</h1>
          <p className="text-muted-foreground">
            Select files, chat with Gemini AI, and create smart notes with audio summaries
          </p>
        </div>

        <div className="mb-6">
          {/* Provide required topics prop to FileSelector */}
          <FileSelector topics={[]} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <ChatInterface />
          <NotePad />
          
        </div>
      </main>
    </div>
  )
}
