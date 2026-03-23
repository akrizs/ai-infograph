import { useState } from 'react'
import { RotateCcw, Check } from 'lucide-react'
import type { Flashcard as FlashcardType } from './types'
import './Flashcard.css'

interface FlashcardProps {
  card: FlashcardType
  onKnown?: () => void
  onReview?: () => void
  showControls?: boolean
}

export default function Flashcard({ card, onKnown, onReview, showControls = true }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleKnown = (e: React.MouseEvent) => {
    e.stopPropagation()
    onKnown?.()
  }

  const handleReview = (e: React.MouseEvent) => {
    e.stopPropagation()
    onReview?.()
  }

  return (
    <div className="flashcard-container">
      <div
        className={`flashcard ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
      >
        <div className="flashcard-front">
          <span className="flashcard-label">Question</span>
          <p className="flashcard-text">{card.front}</p>
          <div className="flashcard-tags">
            {card.tags.map((tag) => (
              <span key={tag} className="flashcard-tag">{tag}</span>
            ))}
          </div>
          <span className="flashcard-hint">Click to reveal answer</span>
        </div>
        <div className="flashcard-back">
          <span className="flashcard-label">Answer</span>
          <p className="flashcard-text">{card.back}</p>
          {showControls && (
            <div className="flashcard-controls">
              <button className="flashcard-btn review" onClick={handleReview} title="Review again">
                <RotateCcw size={18} />
                <span>Review</span>
              </button>
              <button className="flashcard-btn known" onClick={handleKnown} title="I know this">
                <Check size={18} />
                <span>Got it</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
