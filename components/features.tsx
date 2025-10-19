import { Card } from "./ui/card"
import { Camera, Brain, Volume2, RefreshCw, Leaf, Users } from "lucide-react"

const features = [
  {
    icon: Camera,
    title: "Capture Learning",
    description:
      "Upload handwritten notes, equations, or textbook content. Our AI instantly parses and digitizes your materials.",
    color: "text-chart-1",
  },
  {
    icon: Brain,
    title: "AI Explanations",
    description:
      "Get personalized concept explanations, smart summaries, and answers to your questions powered by Google AI.",
    color: "text-chart-2",
  },
  {
    icon: Volume2,
    title: "Audio Learning",
    description:
      "Listen to your notes and summaries with natural voice narration. Perfect for auditory learners and on-the-go review.",
    color: "text-chart-3",
  },
  {
    icon: RefreshCw,
    title: "Spaced Repetition",
    description: "AI-curated refresh sessions help you revisit materials at optimal intervals for long-term retention.",
    color: "text-chart-4",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious",
    description:
      "Reduce paper waste and resource repetition. Digital-first learning that's better for you and the planet.",
    color: "text-chart-5",
  },
  {
    icon: Users,
    title: "Inclusive Learning",
    description: "Multiple learning modes (visual, auditory, text) ensure everyone can learn in their preferred style.",
    color: "text-chart-1",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-card/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything You Need to Learn Better</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to promote sustainable, long-term knowledge growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:border-primary/50 transition-colors">
              <feature.icon className={`w-10 h-10 mb-4 ${feature.color}`} />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
