"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Upload, FileText, Download, Loader2 } from "lucide-react"
import { Textarea } from "../ui/textarea"

export function MathpixConverter() {
  const [isConverting, setIsConverting] = useState(false)
  const [convertedText, setConvertedText] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleConvert = async () => {
    if (!selectedImage) return
    setIsConverting(true)
    try {
      const res = await fetch(selectedImage) // data URL -> blob
      const blob = await res.blob()
      const form = new FormData()
      form.append("file", blob, "upload.png")

      const apiBase = (process.env.NEXT_PUBLIC_MATHPIX_API_URL || "http://127.0.0.1:5000").replace(/\/+$/, "")
      const candidates = [`${apiBase}/convert`,`${apiBase}/convert/file`]
      let r: Response | null = null
      let lastErrorText = ""
      for (const url of candidates) {
        try {
          const resp = await fetch(url, { method: "POST", body: form })
          if (resp.ok) {
            r = resp
            break
          }
          lastErrorText = await resp.text().catch(() => `${resp.status} ${resp.statusText}`)
        } catch (err) {
          lastErrorText = String(err)
          r = null
        }
      }

      if (!r || !r.ok) {
        throw new Error(`Conversion failed: ${lastErrorText || "no response from backend"}`)
      }

      const data = await r.json()
      const result = data?.result || data || {}
      const latex = result.latex_normalized || result.latex || result.text || JSON.stringify(result, null, 2)
      setConvertedText(typeof latex === "string" ? latex : JSON.stringify(latex, null, 2))
    } catch (err) {
      console.error("Conversion error", err)
      setConvertedText(`Conversion failed: ${String(err)}`)
    } finally {
      setIsConverting(false)
    }
  }


  const exportAs = async (format: "latex" | "pdf" | "doc") => {
  if (!convertedText) return
  const apiBase = (process.env.NEXT_PUBLIC_MATHPIX_API_URL || "http://127.0.0.1:5000").replace(/\/+$/, "")
  const endpoint = `${apiBase}/export/${format}`

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: convertedText }),
  })

  if (!response.ok) {
    alert(`Failed to export ${format.toUpperCase()}`)
    return
  }

  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `mathpix_export.${format === "doc" ? "docx" : format}`
  document.body.appendChild(a)
  a.click()
  a.remove()
}


  return (
    <Card>
      <CardHeader>
        <CardTitle>Mathpix Converter</CardTitle>
        <CardDescription>Convert handwritten notes to LaTeX, PDF, or DOC format</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
            <TabsTrigger value="result">Converted Result</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              {selectedImage ? (
                <div className="space-y-4">
                  <img
                    src={selectedImage || "/placeholder.svg"}
                    alt="Selected note"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <div className="flex gap-2 justify-center">
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="mathpix-upload"
                      accept="image/*"
                    />
                    <label htmlFor="mathpix-upload">
                      <Button variant="outline" size="sm" asChild>
                        <span>Change Image</span>
                      </Button>
                    </label>
                    <Button onClick={handleConvert} disabled={isConverting} size="sm">
                      {isConverting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Converting...
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4 mr-2" />
                          Convert to LaTeX
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm font-medium mb-2">Upload handwritten notes or equations</p>
                  <p className="text-xs text-muted-foreground mb-4">Supports PNG, JPG, JPEG</p>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="mathpix-upload"
                    accept="image/*"
                  />
                  <label htmlFor="mathpix-upload">
                    <Button variant="secondary" size="sm" asChild>
                      <span>Select Image</span>
                    </Button>
                  </label>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="result" className="space-y-4">
            {convertedText ? (
              <>
                <Textarea
                  value={convertedText}
                  onChange={(e) => setConvertedText(e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                  placeholder="Converted LaTeX will appear here..."
                />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => exportAs("latex")}>
                    <Download className="h-4 w-4 mr-2" />
                    Export LaTeX
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => exportAs("pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => exportAs("doc")}>
                    <Download className="h-4 w-4 mr-2" />
                    Export DOC
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Upload and convert an image to see results here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
