import { useState, useMemo } from 'react'
import { MODELS, PROVIDERS } from '../data/models'
import './PricingTable.css'

const PROVIDER_COLORS: Record<string, string> = {
  OpenAI: '#10b981',
  Anthropic: '#f97316',
  Google: '#3b82f6',
  Mistral: '#8b5cf6',
  DeepSeek: '#06b6d4',
  'xAI': '#ec4899',
  'Meta (via Groq)': '#f59e0b',
}

function fmt(n: number | undefined): string {
  if (n === undefined) return '—'
  if (n === 0) return '$0'
  return `$${n.toFixed(n < 0.1 ? 3 : n < 1 ? 2 : 2)}`
}

type SortKey = 'name' | 'provider' | 'input' | 'output'

export default function PricingTable() {
  const [selectedProviders, setSelectedProviders] = useState<Set<string>>(
    new Set(PROVIDERS)
  )
  const [sortKey, setSortKey] = useState<SortKey>('input')
  const [sortAsc, setSortAsc] = useState(true)

  const toggleProvider = (p: string) => {
    setSelectedProviders((prev) => {
      const next = new Set(prev)
      if (next.has(p)) {
        if (next.size === 1) return prev // keep at least one
        next.delete(p)
      } else {
        next.add(p)
      }
      return next
    })
  }

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((v) => !v)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  const filtered = useMemo(() => {
    return MODELS.filter((m) => selectedProviders.has(m.provider)).sort(
      (a, b) => {
        let av: string | number, bv: string | number
        if (sortKey === 'name') { av = a.name; bv = b.name }
        else if (sortKey === 'provider') { av = a.provider; bv = b.provider }
        else if (sortKey === 'input') { av = a.cost.input; bv = b.cost.input }
        else { av = a.cost.output; bv = b.cost.output }

        if (av < bv) return sortAsc ? -1 : 1
        if (av > bv) return sortAsc ? 1 : -1
        return 0
      }
    )
  }, [selectedProviders, sortKey, sortAsc])

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (
      <span className="sort-icon">{sortAsc ? '↑' : '↓'}</span>
    ) : (
      <span className="sort-icon sort-icon-idle">↕</span>
    )

  return (
    <div className="pricing-table-wrap">
      {/* Provider filter */}
      <div className="provider-filters">
        {PROVIDERS.map((p) => (
          <button
            key={p}
            className={`provider-btn ${selectedProviders.has(p) ? 'active' : ''}`}
            style={
              {
                '--provider-color': PROVIDER_COLORS[p] ?? '#6b7280',
              } as React.CSSProperties
            }
            onClick={() => toggleProvider(p)}
          >
            <span className="provider-dot" />
            {p}
          </button>
        ))}
      </div>

      <div className="table-scroll">
        <table className="pricing-table">
          <thead>
            <tr>
              <th
                className="sortable"
                onClick={() => handleSort('name')}
              >
                Model <SortIcon col="name" />
              </th>
              <th
                className="sortable"
                onClick={() => handleSort('provider')}
              >
                Provider <SortIcon col="provider" />
              </th>
              <th
                className="sortable"
                onClick={() => handleSort('input')}
              >
                Input / 1M tokens <SortIcon col="input" />
              </th>
              <th
                className="sortable"
                onClick={() => handleSort('output')}
              >
                Output / 1M tokens <SortIcon col="output" />
              </th>
              <th>Cache read / 1M</th>
              <th>Context window</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((model) => (
              <tr key={model.id}>
                <td className="model-name">{model.name}</td>
                <td>
                  <span
                    className="provider-badge"
                    style={
                      {
                        '--provider-color':
                          PROVIDER_COLORS[model.provider] ?? '#6b7280',
                      } as React.CSSProperties
                    }
                  >
                    {model.provider}
                  </span>
                </td>
                <td className="price-cell price-input">
                  {fmt(model.cost.input)}
                </td>
                <td className="price-cell price-output">
                  {fmt(model.cost.output)}
                </td>
                <td className="price-cell price-cache">
                  {fmt(model.cost.cache_read)}
                </td>
                <td className="context-cell">
                  {model.context
                    ? `${(model.context / 1000).toFixed(0)}k`
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="table-note">
        Prices are per 1 million tokens in USD. Sorted by{' '}
        <strong>{sortKey}</strong> {sortAsc ? '(ascending)' : '(descending)'}.
        Click column headers to sort.
      </p>
    </div>
  )
}
