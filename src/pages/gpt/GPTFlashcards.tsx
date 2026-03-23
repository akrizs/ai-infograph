import { Link } from 'react-router-dom'
import { SquareStack } from 'lucide-react'
import FlashcardSession from '../../components/Flashcard/FlashcardSession'
import { GPT_FLASHCARDS } from '../../content/gpt/flashcards'
import './GPTFlashcards.css'

export default function GPTFlashcards() {
  return (
    <div className="flashcards-page">
      <div className="flashcards-hero">
        <div className="flashcards-badge">
          <SquareStack size={14} />
          Flashcard Mode
        </div>
        <h1>GPT & LLMs Flashcards</h1>
        <p>
          Test your knowledge with flashcards covering key concepts,
          terminology, and practical skills from the learning path.
        </p>
        <span className="flashcards-count">{GPT_FLASHCARDS.totalCards} cards</span>
      </div>

      {/* Flashcard Study Session */}
      <FlashcardSession deck={GPT_FLASHCARDS} />

      {/* Back Link */}
      <div className="flashcards-back">
        <Link to="/gpt" className="back-link">
          ← Back to Learning
        </Link>
      </div>
    </div>
  )
}
