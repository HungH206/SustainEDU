"use client"

import type React from "react"

import { useState,useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"
import { Send, Bot, User, UploadCloud } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant" | "file"
  content: string
  timestamp: Date
}
export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI learning assistant. Ask me anything or upload a file with a prompt.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000"

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const form = new FormData()
      form.append("prompt", userMessage.content)
      if (selectedFile) {
        form.append("file", selectedFile, selectedFile.name)
      }

      const res = await fetch(`${backendUrl}/api/process_document`, {
        method: "POST",
        body: form,
      })

      const data = await res.json()
      const content =
        res.ok && data?.response_text
          ? data.response_text
          : `Error: ${data?.error || "Failed to get response"}`

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (err: any) {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Error contacting backend: ${err?.message || String(err)}`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } finally {
      setIsLoading(false)
      setSelectedFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const file = files[0]
    setSelectedFile(file)

    const fileMessage: Message = {
      id: Date.now().toString(),
      role: "file",
      content: `📄 Uploaded: ${file.name} (${Math.round(file.size / 1024)} KB)`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, fileMessage])
  }

  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader>
        <CardTitle>AI Chat Assistant</CardTitle>
        <CardDescription>Ask questions or upload a document with your prompt</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4 py-4">
            {messages.map((m) => (
              <div key={m.id} className="text-sm">
                <span className="font-medium mr-2">
                  {m.role === "user" ? "You" : m.role === "assistant" ? "Assistant" : "File"}
                </span>
                <span>{m.content}</span>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept=".pdf,.png,.jpg,.jpeg"
          />
          <button
            type="button"
            className="px-3 py-2 border rounded"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            Attach
          </button>

          <textarea
            className="flex-1 px-3 py-2 border rounded min-h-[44px]"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />

          <button
            type="button"
            className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
