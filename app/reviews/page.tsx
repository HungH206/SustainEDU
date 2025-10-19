import { AppNavigation } from "../../components/app-navigation"
import { FlashcardDeck } from "../../components/reviews/flashcard-deck"

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Spaced Repetition Reviews</h1>
          <p className="text-muted-foreground">Practice with flashcards to retain knowledge long-term</p>
        </div>
        <FlashcardDeck />
      </main>
    </div>
  )
}
