import { useState } from 'react'
import './ContextWindow.css'

type CompactionMethod = 'rolling' | 'summarization' | 'rag' | 'selective' | 'hybrid'

interface Method {
  id: CompactionMethod
  label: string
  tagline: string
  description: string
  pros: string[]
  cons: string[]
  bestFor: string
  diagram: React.ReactNode
}

function RollingDiagram() {
  return (
    <div className="diagram rolling-diagram">
      <div className="diagram-label">Conversation turns (oldest → newest)</div>
      <div className="turn-row">
        <div className="turn turn-evicted" title="Evicted">Turn 1</div>
        <div className="turn turn-evicted" title="Evicted">Turn 2</div>
        <div className="turn turn-evicted" title="Evicted">Turn 3</div>
        <div className="turn turn-kept">Turn 4</div>
        <div className="turn turn-kept">Turn 5</div>
        <div className="turn turn-kept">Turn 6</div>
        <div className="turn turn-active">Turn 7 ✦</div>
      </div>
      <div className="diagram-row-labels">
        <span className="label-evicted">evicted (over window)</span>
        <span className="label-kept">in context</span>
        <span className="label-active">current</span>
      </div>
      <div className="window-bracket">
        <div className="bracket-line" />
        <span>context window</span>
        <div className="bracket-line" />
      </div>
    </div>
  )
}

function SummarizationDiagram() {
  return (
    <div className="diagram summ-diagram">
      <div className="diagram-label">When context fills up...</div>
      <div className="summ-flow">
        <div className="summ-group">
          <div className="turn turn-evicted sm">T1</div>
          <div className="turn turn-evicted sm">T2</div>
          <div className="turn turn-evicted sm">T3</div>
          <div className="turn turn-evicted sm">T4</div>
        </div>
        <div className="summ-arrow">→</div>
        <div className="summ-box">
          <div className="summ-icon">&#8801;</div>
          <div className="summ-text">Summary<br/><span>~200 tokens</span></div>
        </div>
        <div className="summ-arrow">+</div>
        <div className="summ-group">
          <div className="turn turn-kept sm">T5</div>
          <div className="turn turn-kept sm">T6</div>
          <div className="turn turn-active sm">T7</div>
        </div>
      </div>
    </div>
  )
}

function RAGDiagram() {
  return (
    <div className="diagram rag-diagram">
      <div className="diagram-label">At each turn...</div>
      <div className="rag-flow">
        <div className="rag-step">
          <div className="rag-icon">&#128172;</div>
          <div className="rag-step-label">User query</div>
        </div>
        <div className="rag-arrow">↓</div>
        <div className="rag-step rag-retrieve">
          <div className="rag-icon">&#128270;</div>
          <div className="rag-step-label">Retrieve top-k<br/>relevant chunks</div>
        </div>
        <div className="rag-arrow">↓</div>
        <div className="rag-step">
          <div className="rag-icon">&#128196;</div>
          <div className="rag-step-label">Inject into<br/>prompt only</div>
        </div>
        <div className="rag-db">
          <div className="rag-db-icon">&#128452;</div>
          <div className="rag-step-label">Vector DB<br/>(external memory)</div>
        </div>
      </div>
    </div>
  )
}

function SelectiveDiagram() {
  return (
    <div className="diagram selective-diagram">
      <div className="diagram-label">Keep only what matters...</div>
      <div className="turn-row selective-row">
        <div className="turn turn-evicted sel" title="Low relevance">T1<span className="sel-score">0.12</span></div>
        <div className="turn turn-kept sel" title="High relevance">T2<span className="sel-score sel-hi">0.89</span></div>
        <div className="turn turn-evicted sel" title="Low relevance">T3<span className="sel-score">0.21</span></div>
        <div className="turn turn-kept sel" title="High relevance">T4<span className="sel-score sel-hi">0.76</span></div>
        <div className="turn turn-evicted sel" title="Low relevance">T5<span className="sel-score">0.08</span></div>
        <div className="turn turn-active sel">T6<span className="sel-score sel-hi">now</span></div>
      </div>
      <div className="selective-legend">
        <span className="label-evicted">low relevance — dropped</span>
        <span className="label-kept">high relevance — kept</span>
      </div>
    </div>
  )
}

function HybridDiagram() {
  return (
    <div className="diagram hybrid-diagram">
      <div className="hybrid-layers">
        <div className="hybrid-layer layer-system">
          <span className="layer-label">System prompt</span>
          <span className="layer-tag always">always</span>
        </div>
        <div className="hybrid-layer layer-summary">
          <span className="layer-label">Running summary</span>
          <span className="layer-tag compressed">compressed</span>
        </div>
        <div className="hybrid-layer layer-pinned">
          <span className="layer-label">Pinned key facts</span>
          <span className="layer-tag selective">selective</span>
        </div>
        <div className="hybrid-layer layer-recent">
          <span className="layer-label">Recent turns (rolling)</span>
          <span className="layer-tag rolling">rolling</span>
        </div>
        <div className="hybrid-layer layer-rag">
          <span className="layer-label">Retrieved docs (RAG)</span>
          <span className="layer-tag rag">on-demand</span>
        </div>
      </div>
      <div className="hybrid-arrow">⬇</div>
      <div className="hybrid-window">
        <span>Context window</span>
      </div>
    </div>
  )
}

const METHODS: Method[] = [
  {
    id: 'rolling',
    label: 'Rolling Window',
    tagline: 'Forget the oldest, keep the latest',
    description:
      'The simplest strategy: maintain a fixed-size window of the most recent N tokens or turns. When the window fills, the oldest messages are permanently dropped. This is the default behaviour in most basic chat implementations.',
    pros: [
      'Zero overhead — no extra LLM calls',
      'Deterministic and easy to reason about',
      'Latency stays constant regardless of history length',
    ],
    cons: [
      'Early context is permanently lost — the model forgets the start of a long conversation',
      'Can break mid-task if critical instructions were given early',
      'No compression — discarded tokens provide zero value',
    ],
    bestFor: 'Short-lived chat sessions, customer support bots, or any use-case where recalling the full history is not required.',
    diagram: <RollingDiagram />,
  },
  {
    id: 'summarization',
    label: 'Summarization',
    tagline: 'Compress old turns into a summary',
    description:
      'When the context approaches its limit, an LLM call is used to summarize the oldest portion of the conversation. The summary replaces the original messages, freeing up tokens for new turns while retaining the gist of what was said.',
    pros: [
      'Preserves semantic meaning even as raw messages are dropped',
      'Works well for long, structured conversations',
      'Summary can be cached and re-used (prompt caching discount)',
    ],
    cons: [
      'Requires an extra LLM call — adds latency and cost',
      'Summaries lose fine-grained detail (exact numbers, quotes, code)',
      'Summarization quality degrades if the base model is weak',
    ],
    bestFor: 'Long-running assistants, research sessions, copilots where broad context matters more than verbatim recall.',
    diagram: <SummarizationDiagram />,
  },
  {
    id: 'rag',
    label: 'Retrieval-Augmented Generation (RAG)',
    tagline: 'External memory, injected on demand',
    description:
      'Instead of keeping history in the context window, past turns and documents are embedded and stored in a vector database. At each new user message, the top-k most semantically similar chunks are retrieved and injected into the prompt. The model never sees the full history — only what is relevant right now.',
    pros: [
      'Virtually unlimited long-term memory (bounded only by storage)',
      'Only relevant context is ever loaded — very token-efficient',
      'Works across sessions and multiple users sharing the same knowledge base',
    ],
    cons: [
      'Retrieval can miss important context if the query is ambiguous',
      'Requires infrastructure: embedding model + vector store',
      'Doesn\'t handle conversational flow well (e.g. "what did I say earlier?")',
    ],
    bestFor: 'Knowledge bases, document Q&A, enterprise search, and any scenario with large corpora that exceed context limits by orders of magnitude.',
    diagram: <RAGDiagram />,
  },
  {
    id: 'selective',
    label: 'Selective Retention',
    tagline: 'Score turns by relevance, keep the best',
    description:
      'Each past message is assigned a relevance score (often via embedding similarity to the current query, or heuristics like recency + importance). Only high-scoring turns are kept in context. The rest are dropped or archived. Sometimes called "memory distillation" or "memory prioritization".',
    pros: [
      'Focuses the model\'s attention on what actually matters',
      'More nuanced than a blunt rolling window',
      'Can combine with long-term memory stores',
    ],
    cons: [
      'Scoring heuristics can be wrong — relevant context may be silently dropped',
      'Implementation complexity is higher than rolling window',
      'Relevance of a past turn may only become apparent later',
    ],
    bestFor: 'Agents with long task horizons, personal assistants that track user preferences, or any system where not all turns carry equal value.',
    diagram: <SelectiveDiagram />,
  },
  {
    id: 'hybrid',
    label: 'Hybrid / Structured Memory',
    tagline: 'Layered context with different retention policies',
    description:
      'Production systems rarely use a single strategy. Instead they layer multiple techniques: a pinned system prompt (always present), a rolling window of recent turns, a compressed summary of older turns, selectively retained key facts, and RAG-retrieved documents — all assembled into a single context window at inference time. This gives the best of all worlds.',
    pros: [
      'Maximises the value of every token in the context window',
      'Gracefully handles all conversation lengths',
      'Can be tuned independently per layer (e.g. aggressive RAG, conservative rolling)',
    ],
    cons: [
      'Highest implementation complexity',
      'Requires careful token budgeting across layers',
      'Multiple failure modes to test and monitor',
    ],
    bestFor: 'Production AI assistants, autonomous agents, and any system that must reliably handle conversations of arbitrary length and complexity.',
    diagram: <HybridDiagram />,
  },
]

export default function ContextWindow() {
  const [activeMethod, setActiveMethod] = useState<CompactionMethod>('rolling')
  const method = METHODS.find((m) => m.id === activeMethod)!

  return (
    <div className="cw-wrap">
      {/* Context window explainer */}
      <div className="cw-explainer">
        <div className="cw-visual">
          <div className="cw-bar-label">
            <span>Context window</span>
            <span className="cw-bar-size">e.g. 128 000 tokens</span>
          </div>
          <div className="cw-bar">
            <div className="cw-segment cw-system" style={{ width: '8%' }}>
              <span>System</span>
            </div>
            <div className="cw-segment cw-history" style={{ width: '42%' }}>
              <span>Chat history</span>
            </div>
            <div className="cw-segment cw-docs" style={{ width: '22%' }}>
              <span>Docs / RAG</span>
            </div>
            <div className="cw-segment cw-input" style={{ width: '14%' }}>
              <span>Your message</span>
            </div>
            <div className="cw-segment cw-output" style={{ width: '14%' }}>
              <span>Output</span>
            </div>
          </div>
          <div className="cw-bar-legend">
            <span className="leg cw-system">System prompt</span>
            <span className="leg cw-history">History</span>
            <span className="leg cw-docs">Retrieved docs</span>
            <span className="leg cw-input">Input</span>
            <span className="leg cw-output">Output (reserved)</span>
          </div>
        </div>

        <div className="cw-facts">
          <div className="cw-fact">
            <strong>What is it?</strong>
            <p>
              The context window is the total number of tokens an LLM can
              "see" at once — a sliding read-buffer that includes your system
              prompt, all prior conversation turns, any injected documents,
              your current message, and space reserved for the model's reply.
              Nothing outside this window exists to the model.
            </p>
          </div>
          <div className="cw-fact">
            <strong>Why is it limited?</strong>
            <p>
              Transformer self-attention has quadratic memory and compute
              complexity with respect to sequence length — doubling the context
              quadruples the work. While techniques like sliding-window
              attention and sparse attention mitigate this, there is always a
              practical limit, currently 128 k–2 M tokens depending on the
              model.
            </p>
          </div>
          <div className="cw-fact">
            <strong>What happens when it fills?</strong>
            <p>
              If you exceed the limit the API returns an error. In practice,
              applications proactively manage context using one of the{' '}
              <em>compaction strategies</em> below to stay within budget while
              preserving as much useful information as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Compaction methods */}
      <div className="compaction-header">
        <h3>Context compaction strategies</h3>
        <p>
          Select a strategy to see how it works, its trade-offs, and when to
          use it.
        </p>
      </div>

      <div className="compaction-layout">
        {/* Sidebar nav */}
        <nav className="compaction-nav" aria-label="Compaction methods">
          {METHODS.map((m) => (
            <button
              key={m.id}
              className={`compaction-nav-btn ${activeMethod === m.id ? 'active' : ''}`}
              onClick={() => setActiveMethod(m.id)}
            >
              <span className="nav-btn-label">{m.label}</span>
              <span className="nav-btn-tagline">{m.tagline}</span>
            </button>
          ))}
        </nav>

        {/* Detail panel */}
        <div className="compaction-detail">
          <div className="detail-top">
            <div className="detail-title-group">
              <h4>{method.label}</h4>
              <p className="detail-tagline">{method.tagline}</p>
            </div>
          </div>

          {method.diagram}

          <p className="detail-description">{method.description}</p>

          <div className="detail-grid">
            <div className="detail-box pros-box">
              <div className="detail-box-label">Advantages</div>
              <ul>
                {method.pros.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="detail-box cons-box">
              <div className="detail-box-label">Drawbacks</div>
              <ul>
                {method.cons.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="detail-best-for">
            <span className="best-for-label">Best for</span>
            <span>{method.bestFor}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
