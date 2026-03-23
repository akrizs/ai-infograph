import './App.css'
import TokenVisualizer from './components/TokenVisualizer'
import PricingTable from './components/PricingTable'
import CostCalculator from './components/CostCalculator'
import ContextWindow from './components/ContextWindow'
import InfraStack from './components/InfraStack'

function App() {
  return (
    <>
      {/* ── Hero ── */}
      <header id="hero">
        <p className="eyebrow">LLM Fundamentals</p>
        <h1>Understanding&nbsp;Tokens&nbsp;&amp;&nbsp;Pricing</h1>
        <p className="subtitle">
          Everything you need to know about how large language models read text,
          measure usage, and charge for their compute.
        </p>
        <div className="hero-nav">
          <a href="#what-are-tokens">What are tokens?</a>
          <a href="#visualizer">Token visualizer</a>
          <a href="#context-window">Context &amp; compaction</a>
          <a href="#infrastructure">LLM infrastructure</a>
          <a href="#pricing">Pricing models</a>
          <a href="#calculator">Cost calculator</a>
        </div>
      </header>

      <div className="ticks" />

      {/* ── What are tokens ── */}
      <section id="what-are-tokens" className="content-section">
        <div className="section-header">
          <span className="section-tag">Concept 01</span>
          <h2>What are tokens?</h2>
          <p>
            Tokens are the basic units of text that an LLM processes. They are
            not simply words or characters — they are sub-word fragments
            produced by a compression algorithm called{' '}
            <strong>Byte-Pair Encoding (BPE)</strong>.
          </p>
        </div>

        <div className="cards">
          <div className="card">
            <div className="card-icon">&#9632;</div>
            <h3>Not words</h3>
            <p>
              A single English word can be 1, 2, or even 3+ tokens. "cat" is
              one token; "unbelievable" might be split into "un", "believ",
              "able".
            </p>
          </div>
          <div className="card">
            <div className="card-icon">&#9650;</div>
            <h3>Not characters</h3>
            <p>
              4 characters is a rough average per token in English. Other
              languages (e.g. Chinese) use more tokens per word because their
              characters are less common in training data.
            </p>
          </div>
          <div className="card">
            <div className="card-icon">&#9679;</div>
            <h3>Sub-word fragments</h3>
            <p>
              BPE merges the most frequent character pairs until a target
              vocabulary size is reached (GPT-4 uses ~100 k tokens). Common
              words stay whole; rare ones are split.
            </p>
          </div>
        </div>

        <div className="explainer-grid">
          <div className="explainer-box">
            <h3>How BPE works</h3>
            <ol className="steps">
              <li>
                <span className="step-num">1</span>
                Start with individual characters as the vocabulary.
              </li>
              <li>
                <span className="step-num">2</span>
                Count all adjacent character pairs in the training corpus.
              </li>
              <li>
                <span className="step-num">3</span>
                Merge the most frequent pair into a new token, add it to the
                vocabulary.
              </li>
              <li>
                <span className="step-num">4</span>
                Repeat until the vocabulary reaches its target size (~50 k–
                100 k entries).
              </li>
              <li>
                <span className="step-num">5</span>
                At inference time, encode new text using the learned merge
                rules.
              </li>
            </ol>
          </div>

          <div className="explainer-box">
            <h3>Why it matters</h3>
            <ul className="why-list">
              <li>
                <strong>Context window</strong> — models have a hard limit on
                total tokens (input + output). GPT-4o supports up to 128 k
                tokens at once.
              </li>
              <li>
                <strong>Speed</strong> — generating 1 000 tokens takes longer
                than 100 tokens. Response latency scales with output token
                count.
              </li>
              <li>
                <strong>Cost</strong> — every API call is billed by the token.
                Understanding token counts lets you estimate and control spend.
              </li>
              <li>
                <strong>Prompt engineering</strong> — shorter prompts use fewer
                tokens, reducing cost and freeing space for model output.
              </li>
            </ul>
          </div>
        </div>

        <div className="callout">
          <span className="callout-label">Rule of thumb</span>
          <p>
            In English, <strong>1 token ≈ 4 characters</strong> or{' '}
            <strong>~0.75 words</strong>. A page of text (~500 words) is
            roughly <strong>667 tokens</strong>.
          </p>
        </div>
      </section>

      <div className="ticks" />

      {/* ── Token Visualizer ── */}
      <section id="visualizer" className="content-section">
        <div className="section-header">
          <span className="section-tag">Interactive</span>
          <h2>Token visualizer</h2>
          <p>
            Type any text below to see how it might be split into tokens. Each
            colored segment represents one token. The counter shows the
            estimated token count.
          </p>
        </div>
        <TokenVisualizer />
      </section>

      <div className="ticks" />

      {/* ── Context Window & Compaction ── */}
      <section id="context-window" className="content-section">
        <div className="section-header">
          <span className="section-tag">Concept 02</span>
          <h2>Context windows &amp; compaction</h2>
          <p>
            Every LLM has a finite context window — the total number of tokens
            it can process at once. Understanding how it is structured, and
            how to manage it when conversations grow long, is essential for
            building reliable LLM-powered applications.
          </p>
        </div>
        <ContextWindow />
      </section>

      <div className="ticks" />

      {/* ── LLM Infrastructure ── */}
      <section id="infrastructure" className="content-section">
        <div className="section-header">
          <span className="section-tag">Concept 03</span>
          <h2>LLM infrastructure stack</h2>
          <p>
            A chat response travels through nine distinct layers of
            infrastructure before it reaches your screen. Each layer has a
            clear owner, distinct responsibilities, and its own set of
            engineering trade-offs. Click any layer to explore it.
          </p>
        </div>
        <InfraStack />
      </section>

      <div className="ticks" />

      {/* ── Input vs Output ── */}
      <section id="pricing" className="content-section">
        <div className="section-header">
          <span className="section-tag">Concept 04</span>
          <h2>Input vs. output tokens</h2>
          <p>
            LLM APIs distinguish between tokens you send (input) and tokens
            the model generates (output). Output tokens cost more because they
            require sequential computation — each token must be generated one
            at a time.
          </p>
        </div>

        <div className="io-diagram">
          <div className="io-box io-input">
            <div className="io-label">Input tokens</div>
            <div className="io-examples">
              <span>System prompt</span>
              <span>Conversation history</span>
              <span>Your message</span>
              <span>Retrieved documents (RAG)</span>
            </div>
            <div className="io-price-hint">Lower cost/token</div>
          </div>
          <div className="io-arrow">
            <div className="arrow-line" />
            <div className="arrow-model">Model</div>
            <div className="arrow-line" />
          </div>
          <div className="io-box io-output">
            <div className="io-label">Output tokens</div>
            <div className="io-examples">
              <span>Model's reply</span>
              <span>Generated code</span>
              <span>Summaries</span>
              <span>Reasoning traces</span>
            </div>
            <div className="io-price-hint">Higher cost/token</div>
          </div>
        </div>

        <div className="cards cards-2">
          <div className="card">
            <h3>Prompt caching</h3>
            <p>
              Some providers (Anthropic, OpenAI) offer a{' '}
              <strong>cache read</strong> discount — if your prompt starts with
              the same prefix as a recent call, the cached prefix is re-used
              and billed at a fraction of normal input cost (often{' '}
              <strong>50–90% cheaper</strong>). Ideal for system prompts or
              static context.
            </p>
          </div>
          <div className="card">
            <h3>Reasoning tokens</h3>
            <p>
              Models like OpenAI o1/o3/o4 and DeepSeek R1 produce internal{' '}
              <em>reasoning tokens</em> before the final answer. These are
              billed as output tokens but are typically hidden from the
              response. They can represent most of a call's cost on complex
              tasks.
            </p>
          </div>
        </div>

        <div className="section-subheader">
          <h2>Model pricing comparison</h2>
          <p>
            Prices per 1 million tokens (USD), sourced from{' '}
            <a href="https://models.dev" target="_blank" rel="noreferrer">
              models.dev
            </a>
            . Select providers to filter the table.
          </p>
        </div>

        <PricingTable />
      </section>

      <div className="ticks" />

      {/* ── Cost Calculator ── */}
      <section id="calculator" className="content-section">
        <div className="section-header">
          <span className="section-tag">Interactive</span>
          <h2>Cost calculator</h2>
          <p>
            Estimate the cost of an API call by specifying token counts and
            selecting a model.
          </p>
        </div>
        <CostCalculator />
      </section>

      <div className="ticks" />
      <footer id="footer">
        <p>
          Pricing data from{' '}
          <a href="https://models.dev" target="_blank" rel="noreferrer">
            models.dev
          </a>
          . Prices may change — always verify with the provider's official
          documentation.
        </p>
      </footer>
    </>
  )
}

export default App
