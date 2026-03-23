import { useState, useMemo } from 'react'
import { MODELS } from '../data/models'
import { calcCost, formatCost } from '../utils/tokenizer'
import './CostCalculator.css'

export default function CostCalculator() {
  const [modelId, setModelId] = useState(MODELS[0].id)
  const [inputTokens, setInputTokens] = useState(1000)
  const [outputTokens, setOutputTokens] = useState(500)
  const [cacheHit, setCacheHit] = useState(false)

  const model = useMemo(
    () => MODELS.find((m) => m.id === modelId) ?? MODELS[0],
    [modelId]
  )

  const inputPrice = cacheHit && model.cost.cache_read != null
    ? model.cost.cache_read
    : model.cost.input

  const inputCost = useMemo(
    () => calcCost(inputTokens, inputPrice),
    [inputTokens, inputPrice]
  )
  const outputCost = useMemo(
    () => calcCost(outputTokens, model.cost.output),
    [outputTokens, model.cost.output]
  )
  const totalCost = inputCost + outputCost

  const per1kCalls = totalCost * 1000

  return (
    <div className="calc">
      <div className="calc-grid">
        {/* Model selector */}
        <div className="calc-field full-width">
          <label className="calc-label">Model</label>
          <select
            className="calc-select"
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.provider})
              </option>
            ))}
          </select>
        </div>

        {/* Input tokens */}
        <div className="calc-field">
          <label className="calc-label">
            Input tokens
            <span className="calc-sublabel">prompt + context</span>
          </label>
          <div className="calc-input-row">
            <input
              type="number"
              className="calc-number"
              min={0}
              value={inputTokens}
              onChange={(e) => setInputTokens(Math.max(0, Number(e.target.value)))}
            />
            <span className="calc-unit">tokens</span>
          </div>
          <input
            type="range"
            className="calc-range"
            min={0}
            max={100000}
            step={100}
            value={inputTokens}
            onChange={(e) => setInputTokens(Number(e.target.value))}
          />
          <div className="calc-range-labels">
            <span>0</span><span>50k</span><span>100k</span>
          </div>
        </div>

        {/* Output tokens */}
        <div className="calc-field">
          <label className="calc-label">
            Output tokens
            <span className="calc-sublabel">model response</span>
          </label>
          <div className="calc-input-row">
            <input
              type="number"
              className="calc-number"
              min={0}
              value={outputTokens}
              onChange={(e) => setOutputTokens(Math.max(0, Number(e.target.value)))}
            />
            <span className="calc-unit">tokens</span>
          </div>
          <input
            type="range"
            className="calc-range"
            min={0}
            max={16000}
            step={50}
            value={outputTokens}
            onChange={(e) => setOutputTokens(Number(e.target.value))}
          />
          <div className="calc-range-labels">
            <span>0</span><span>8k</span><span>16k</span>
          </div>
        </div>

        {/* Cache toggle */}
        {model.cost.cache_read != null && (
          <div className="calc-field full-width">
            <label className="calc-toggle-label">
              <input
                type="checkbox"
                checked={cacheHit}
                onChange={(e) => setCacheHit(e.target.checked)}
                className="calc-checkbox"
              />
              <span>
                Prompt cache hit{' '}
                <span className="calc-sublabel">
                  (input billed at{' '}
                  <strong>${model.cost.cache_read}/M</strong> instead of{' '}
                  <strong>${model.cost.input}/M</strong> —{' '}
                  {(
                    (1 - model.cost.cache_read / model.cost.input) *
                    100
                  ).toFixed(0)}
                  % saving)
                </span>
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="calc-results">
        <div className="calc-result-row">
          <div className="result-item">
            <span className="result-label">Input cost</span>
            <span className="result-value result-input">
              {formatCost(inputCost)}
            </span>
            <span className="result-detail">
              {inputTokens.toLocaleString()} tokens ×{' '}
              {formatCost(inputPrice / 1_000_000)} each
              {cacheHit && model.cost.cache_read != null && (
                <span className="cache-badge">cached</span>
              )}
            </span>
          </div>
          <div className="result-plus">+</div>
          <div className="result-item">
            <span className="result-label">Output cost</span>
            <span className="result-value result-output">
              {formatCost(outputCost)}
            </span>
            <span className="result-detail">
              {outputTokens.toLocaleString()} tokens ×{' '}
              {formatCost(model.cost.output / 1_000_000)} each
            </span>
          </div>
          <div className="result-equals">=</div>
          <div className="result-item result-total-item">
            <span className="result-label">Total</span>
            <span className="result-value result-total">
              {formatCost(totalCost)}
            </span>
            <span className="result-detail">per API call</span>
          </div>
        </div>

        <div className="calc-scale-hint">
          <span>At scale:</span>
          <span className="scale-value">{formatCost(per1kCalls)}</span>
          <span>per 1,000 calls</span>
          <span className="scale-sep">·</span>
          <span className="scale-value">{formatCost(per1kCalls * 1000)}</span>
          <span>per 1,000,000 calls</span>
        </div>
      </div>

      {/* Rate card */}
      <div className="calc-rate-card">
        <div className="rate-title">{model.name} rate card</div>
        <div className="rate-grid">
          <div className="rate-item">
            <span className="rate-label">Input</span>
            <span className="rate-price rate-input">${model.cost.input}</span>
            <span className="rate-unit">/ 1M tokens</span>
          </div>
          <div className="rate-item">
            <span className="rate-label">Output</span>
            <span className="rate-price rate-output">${model.cost.output}</span>
            <span className="rate-unit">/ 1M tokens</span>
          </div>
          {model.cost.cache_read != null && (
            <div className="rate-item">
              <span className="rate-label">Cache read</span>
              <span className="rate-price rate-cache">${model.cost.cache_read}</span>
              <span className="rate-unit">/ 1M tokens</span>
            </div>
          )}
          {model.cost.cache_write != null && (
            <div className="rate-item">
              <span className="rate-label">Cache write</span>
              <span className="rate-price rate-cache">${model.cost.cache_write}</span>
              <span className="rate-unit">/ 1M tokens</span>
            </div>
          )}
          {model.context && (
            <div className="rate-item">
              <span className="rate-label">Context window</span>
              <span className="rate-price" style={{ color: 'var(--text-h)' }}>
                {(model.context / 1000).toFixed(0)}k
              </span>
              <span className="rate-unit">tokens max</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
