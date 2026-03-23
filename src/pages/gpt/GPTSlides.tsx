import { Link } from 'react-router-dom'
import { Presentation, Clock, Image, FileText } from 'lucide-react'
import './GPTSlides.css'

export default function GPTSlides() {
  return (
    <div className="slides-page">
      <div className="slides-hero">
        <div className="slides-badge">
          <Presentation size={14} />
          Keynote Mode
        </div>
        <h1>GPT & LLMs Slides</h1>
        <p>
          Transform the learning content into beautiful presentations for teaching,
          team training, or conference talks.
        </p>
      </div>

      {/* Coming Soon Notice */}
      <div className="slides-coming-soon">
        <div className="coming-soon-icon">
          <Clock size={32} />
        </div>
        <h2>Coming Soon</h2>
        <p>
          The slide generation feature is currently under development.
          We're working on automatic content conversion and export options.
        </p>
      </div>

      {/* Feature Preview */}
      <div className="slides-preview">
        <h3>What's Coming</h3>
        <div className="preview-grid">
          <div className="preview-card">
            <Image size={24} />
            <h4>Auto-Generated Slides</h4>
            <p>Content automatically converted to presentation format with smart layouts</p>
          </div>
          <div className="preview-card">
            <FileText size={24} />
            <h4>Multiple Formats</h4>
            <p>Export to PDF, PowerPoint, or interactive HTML presentations</p>
          </div>
          <div className="preview-card">
            <Presentation size={24} />
            <h4>Presenter Notes</h4>
            <p>Detailed speaker notes generated for each slide automatically</p>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="slides-back">
        <Link to="/gpt" className="back-link">
          ← Back to Learning
        </Link>
      </div>
    </div>
  )
}
