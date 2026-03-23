import { useFlashcards } from '../../hooks/useFlashcards'
import Flashcard from './Flashcard'
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw, Trophy } from 'lucide-react'
import type { FlashcardDeck } from './types'
import './FlashcardSession.css'

interface FlashcardSessionProps {
  deck: FlashcardDeck
}

export default function FlashcardSession({ deck }: FlashcardSessionProps) {
  const {
    currentIndex,
    currentCard,
    progress,
    next,
    previous,
    shuffle,
    markKnown,
    markReview,
    reset,
    isComplete,
  } = useFlashcards({ path: deck.path, cards: deck.cards })

  return (
    <div className="flashcard-session">
      {/* Progress Bar */}
      <div className="session-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentIndex + 1) / progress.total) * 100}%` }}
          />
        </div>
        <div className="progress-stats">
          <span className="stat">
            <span className="stat-value">{currentIndex + 1}</span> / {progress.total}
          </span>
          <span className="stat known">
            <span className="stat-value">{progress.known}</span> known
          </span>
          <span className="stat review">
            <span className="stat-value">{progress.review}</span> to review
          </span>
        </div>
      </div>

      {/* Completion Message */}
      {isComplete && (
        <div className="completion-message">
          <Trophy size={32} />
          <h3>Great job!</h3>
          <p>You've completed all cards in this deck.</p>
        </div>
      )}

      {/* Flashcard */}
      <Flashcard
        card={currentCard}
        onKnown={markKnown}
        onReview={markReview}
        showControls={true}
      />

      {/* Controls */}
      <div className="session-controls">
        <button className="control-btn" onClick={previous} disabled={currentIndex === 0}>
          <ChevronLeft size={20} />
          <span>Previous</span>
        </button>

        <div className="control-center">
          <button className="control-btn secondary" onClick={shuffle}>
            <Shuffle size={18} />
            <span>Shuffle</span>
          </button>
          <button className="control-btn secondary" onClick={reset}>
            <RotateCcw size={18} />
            <span>Reset</span>
          </button>
        </div>

        <button className="control-btn" onClick={next} disabled={currentIndex === progress.total - 1}>
          <span>Next</span>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Card Dots */}
      <div className="card-dots">
        {deck.cards.slice(0, 20).map((card, i) => (
          <button
            key={card.id}
            className={`card-dot ${i === currentIndex ? 'active' : ''}`}
            disabled={true}
          />
        ))}
        {deck.cards.length > 20 && <span className="dots-more">+{deck.cards.length - 20}</span>}
      </div>
    </div>
  )
}
