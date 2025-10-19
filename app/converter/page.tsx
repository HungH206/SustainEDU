import { AppNavigation } from "../../components/app-navigation"
import { MathpixConverter } from "../../components/workspace/mathpix-converter"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { FileText, Zap, Download } from "lucide-react"

export default function ConverterPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mathpix Converter</h1>
          <p className="text-muted-foreground">Transform handwritten notes into LaTeX, PDF, or DOC format</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-base">Upload Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Upload images of handwritten equations and notes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-base">AI Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Mathpix converts your notes to clean LaTeX format</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <Download className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-base">Export Files</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Download as LaTeX, PDF, or DOC for easy sharing</p>
            </CardContent>
          </Card>
        </div>

        <MathpixConverter />
      </main>
    </div>
  )
}
