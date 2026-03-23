import { Link } from 'react-router-dom'
import { Brain, Sparkles, Layers, BookOpen, Presentation, Zap, ArrowRight, SquareStack, Terminal, Package, Monitor, Network } from 'lucide-react'
import './Home.css'

const TOPICS = [
  {
    id: 'gpt',
    title: 'GPT & LLMs',
    subtitle: 'Large Language Models',
    icon: Brain,
    color: '#aa3bff',
    description: 'Learn about transformers, tokenization, training, and building with LLMs.',
    path: '/gpt',
    stats: '24 sections',
  },
  {
    id: 'linux',
    title: 'Linux',
    subtitle: 'Operating Systems',
    icon: Terminal,
    color: '#e95420',
    description: 'Master the command line, system administration, processes, and permissions.',
    path: '/linux',
    stats: 'Coming soon',
    disabled: true,
  },
  {
    id: 'containers',
    title: 'Containers',
    subtitle: 'Docker & Kubernetes',
    icon: Package,
    color: '#2496ed',
    description: 'Container fundamentals, Docker, Kubernetes, Helm, and production deployments.',
    path: '/containers',
    stats: 'Coming soon',
    disabled: true,
  },
  {
    id: 'virtualization',
    title: 'Virtualization',
    subtitle: 'VMs & Hypervisors',
    icon: Monitor,
    color: '#7c4dff',
    description: 'Virtual machines, hypervisors, VMware, KVM, and infrastructure virtualization.',
    path: '/virtualization',
    stats: 'Coming soon',
    disabled: true,
  },
  {
    id: 'networking',
    title: 'Networking',
    subtitle: 'Complete Network Guide',
    icon: Network,
    color: '#10b981',
    description: 'From physical cables to cloud networking: LAN, WAN, VLANs, routing, firewalls, VPNs, and more.',
    path: '/networking',
    stats: 'Coming soon',
    disabled: true,
  },
  {
    id: 'cv',
    title: 'Computer Vision',
    subtitle: 'Coming Soon',
    icon: Layers,
    color: '#6b7280',
    description: 'Deep learning for image recognition, object detection, and visual AI.',
    path: '/',
    stats: 'Coming soon',
    disabled: true,
  },
  {
    id: 'rl',
    title: 'Reinforcement Learning',
    subtitle: 'Coming Soon',
    icon: Zap,
    color: '#6b7280',
    description: 'Agent-based learning, rewards, policies, and game-playing AI systems.',
    path: '/',
    stats: 'Coming soon',
    disabled: true,
  },
]

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Learn by Doing',
    description: 'Interactive visualizations and examples help you understand concepts hands-on.',
  },
  {
    icon: Presentation,
    title: 'Slide Mode',
    description: 'Export content as presentations for teaching or sharing with your team.',
  },
  {
    icon: SquareStack,
    title: 'Flashcard Practice',
    description: 'Test your knowledge with smart flashcards and spaced repetition for better retention.',
  },
  {
    icon: Sparkles,
    title: 'Adaptive Learning',
    description: 'Toggle between simple and advanced content to match your experience level.',
  },
]

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="home-hero">
        <div className="hero-badge">
          <Sparkles size={14} />
          Interactive AI Education
        </div>
        <h1>Master Modern Technology</h1>
        <p className="hero-subtitle">
          Interactive guides for AI, Linux, containers, networking, and more.
          Learn through visualizations, hands-on examples, and practical exercises.
        </p>
      </section>

      {/* Topic Cards */}
      <section className="home-topics">
        <h2>Choose Your Path</h2>
        <div className="topics-grid">
          {TOPICS.map((topic) => {
            const Icon = topic.icon
            return (
              <Link
                key={topic.id}
                to={topic.path}
                className={`topic-card ${topic.disabled ? 'disabled' : ''}`}
                style={{ '--topic-color': topic.color } as React.CSSProperties}
              >
                <div className="topic-icon">
                  <Icon size={32} />
                </div>
                <div className="topic-content">
                  <span className="topic-subtitle">{topic.subtitle}</span>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                </div>
                <div className="topic-footer">
                  <span className="topic-stats">{topic.stats}</span>
                  {!topic.disabled && <ArrowRight size={18} className="topic-arrow" />}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Features */}
      <section className="home-features">
        <h2>How It Works</h2>
        <div className="features-grid">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div key={i} className="feature-card">
                <div className="feature-icon">
                  <Icon size={24} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
