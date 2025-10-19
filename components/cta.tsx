import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12 text-center border border-primary/20">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who are learning smarter and retaining more with SustainEdu's AI-powered
            platform.
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/dashboard">
              Start Learning Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">No credit card required • Free forever</p>
        </div>
      </div>
    </section>
  )
}
