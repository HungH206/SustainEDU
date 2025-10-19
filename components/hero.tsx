import { Button } from "./ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Sustainable Learning</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
          Learn Smarter,
          <br />
          <span className="text-primary">Retain Longer</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
          SustainEdu is your AI-powered learning companion that helps you capture, understand, and retain knowledge
          through intelligent note scanning, personalized explanations, and spaced repetition.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/dashboard">
              Start Learning Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#how-it-works">See How It Works</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
