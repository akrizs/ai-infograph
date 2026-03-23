import { useState, useMemo } from 'react'
import { tokenize, estimateTokenCount } from '../utils/tokenizer'
import './TokenVisualizer.css'

const EXAMPLES = [
  "The quick brown fox jumps over the lazy dog.",
  "function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }",
  "Artificial intelligence is transforming the way we interact with technology.",
  "北京是中国的首都。",  // Chinese: "Beijing is the capital of China."
]

export default function TokenVisualizer() {
  const [text, setText] = useState(EXAMPLES[0])

  const tokens = useMemo(() => tokenize(text), [text])
  const count = useMemo(() => estimateTokenCount(text), [text])

  return (
    <div className="visualizer">
      <div className="visualizer-controls">
        <div className="example-buttons">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              className={`example-btn ${text === ex ? 'active' : ''}`}
              onClick={() => setText(ex)}
            >
              Example {i + 1}
            </button>
          ))}
        </div>
      </div>

      <textarea
        className="visualizer-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text here..."
        rows={4}
      />

      <div className="visualizer-stats">
        <div className="stat">
          <span className="stat-value">{tokens.length}</span>
          <span className="stat-label">tokens (approx.)</span>
        </div>
        <div className="stat">
          <span className="stat-value">{text.length}</span>
          <span className="stat-label">characters</span>
        </div>
        <div className="stat">
          <span className="stat-value">{count > 0 ? (text.length / count).toFixed(1) : '–'}</span>
          <span className="stat-label">chars / token</span>
        </div>
        <div className="stat">
          <span className="stat-value">{text.split(/\s+/).filter(Boolean).length}</span>
          <span className="stat-label">words</span>
        </div>
      </div>

      <div className="token-display" aria-label="Tokenized text">
        {tokens.length === 0 ? (
          <span className="empty-hint">Start typing to see tokens...</span>
        ) : (
          tokens.map((tok, i) => (
            <span
              key={i}
              className="token-chip"
              style={{ '--token-color': tok.color } as React.CSSProperties}
            >
              {tok.text}
            </span>
          ))
        )}
      </div>

      <p className="visualizer-note">
        This is a simplified approximation. Real tokenizers like{' '}
        <code>tiktoken</code> (OpenAI) or{' '}
        <code>sentencepiece</code> (Google) may produce different splits. The
        rule of thumb for English is <strong>1 token ≈ 4 characters</strong>.
      </p>
    </div>
  )
}
