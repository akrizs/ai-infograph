import { Link } from 'react-router-dom'
import { SquareStack, Clock, Lightbulb, BookOpen, FileText, AlertCircle } from 'lucide-react'
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
      </div>

      {/* Coming Soon Notice */}
      <div className="flashcards-coming-soon">
        <div className="coming-soon-icon">
          <Clock size={32} />
        </div>
        <h2>Coming Soon</h2>
        <p>
          The flashcard feature is currently under development.
          We're working on smart card generation and spaced repetition algorithms.
        </p>
      </div>

      {/* Feature Preview */}
      <div className="flashcards-preview">
        <h3>What's Coming</h3>
        <div className="preview-grid">
          <div className="preview-card">
            <Lightbulb size={24} />
            <h4>Smart Generation</h4>
            <p>Flashcards automatically generated from learning content</p>
          </div>
          <div className="preview-card">
            <BookOpen size={24} />
            <h4>Spaced Repetition</h4>
            <p>Algorithm optimizes review timing for better retention</p>
          </div>
          <div className="preview-card">
            <FileText size={24} />
            <h4>Progress Tracking</h4>
            <p>Track your mastery of each topic with detailed stats</p>
          </div>
        </div>
      </div>

      {/* Beta Signup */}
      <div className="flashcards-cta">
        <AlertCircle size={20} />
        <p>
          Want early access? <a href="#signup">Sign up for updates</a> when this feature launches.
        </p>
      </div>

      {/* Back Link */}
      <div className="flashcards-back">
        <Link to="/gpt" className="back-link">
          ← Back to Learning
        </Link>
      </div>
    </div>
  )
}
