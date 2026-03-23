import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Presentation, Layers, Github, SquareStack } from 'lucide-react'
import { useComplexity } from '../context/ComplexityContext'
import './MainLayout.css'

interface MainLayoutProps {
  children: ReactNode
  showNav?: boolean
}

export default function MainLayout({ children, showNav = true }: MainLayoutProps) {
  const { complexity, toggleComplexity } = useComplexity()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          {showNav && !isHome && (
            <nav className="header-nav">
              <Link to="/gpt" className={`nav-link ${location.pathname.startsWith('/gpt') && !location.pathname.includes('/slides') && !location.pathname.includes('/flashcards') ? 'active' : ''}`}>
                <BookOpen size={16} />
                Learn
              </Link>
              <Link to="/gpt/slides" className={`nav-link ${location.pathname.includes('/slides') ? 'active' : ''}`}>
                <Presentation size={16} />
                Slides
              </Link>
              <Link to="/gpt/flashcards" className={`nav-link ${location.pathname.includes('/flashcards') ? 'active' : ''}`}>
                <SquareStack size={16} />
                Flashcards
              </Link>
            </nav>
          )}

          <div className="header-actions">
            <button
              className={`complexity-toggle ${complexity === 'advanced' ? 'advanced' : ''}`}
              onClick={toggleComplexity}
              aria-label="Toggle complexity"
            >
              <Layers size={18} />
              <span className="toggle-label">
                {complexity === 'simple' ? 'Simple' : 'Advanced'}
              </span>
              <span className="toggle-indicator" />
            </button>

            <a
              href="https://github.com/akrizs/ai-infograph"
              target="_blank"
              rel="noopener noreferrer"
              className="header-github"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </header>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <p>Built with care for learning AI concepts</p>
      </footer>
    </div>
  )
}
