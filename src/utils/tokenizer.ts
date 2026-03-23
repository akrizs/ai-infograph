/**
 * A rough BPE-like tokenizer approximation.
 * Real tokenizers (tiktoken etc.) are complex; this gives a close-enough
 * split that visually illustrates how tokens work.
 *
 * Rules (applied in order):
 * 1. Common contractions stay together: "don't", "I'm", etc.
 * 2. Numbers and punctuation are their own tokens.
 * 3. Common short words (articles, prepositions) are single tokens.
 * 4. Longer words are split into ~4-char chunks (simulating sub-word merges).
 * 5. Whitespace before a word is merged into the next token (GPT-style).
 */

const COLORS = [
  '#fbbf24', // amber
  '#34d399', // emerald
  '#60a5fa', // blue
  '#f472b6', // pink
  '#a78bfa', // violet
  '#fb923c', // orange
  '#2dd4bf', // teal
  '#e879f9', // fuchsia
]

export interface Token {
  text: string
  color: string
}

export function tokenize(text: string): Token[] {
  if (!text) return []

  // Split into raw chunks: whitespace-prefixed words, punctuation, numbers
  const raw: string[] = []
  const re = /\s*[A-Za-z']+|\s*\d+|\s*[^\w\s]|\s+/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    raw.push(m[0])
  }

  const tokens: string[] = []

  for (const chunk of raw) {
    const trimmed = chunk.trim()
    if (!trimmed) {
      // Pure whitespace — attach to next token or skip
      continue
    }

    const leadingSpace = chunk.startsWith(' ') ? ' ' : ''

    if (/^\d+$/.test(trimmed)) {
      // Each digit is a potential sub-token in real BPE, but keep small numbers together
      if (trimmed.length <= 3) {
        tokens.push(leadingSpace + trimmed)
      } else {
        // split long numbers in 3-digit groups
        for (let i = 0; i < trimmed.length; i += 3) {
          const prefix = i === 0 ? leadingSpace : ''
          tokens.push(prefix + trimmed.slice(i, i + 3))
        }
      }
    } else if (/^[A-Za-z']+$/.test(trimmed)) {
      // Word: short words stay whole; long ones get split into sub-word chunks
      if (trimmed.length <= 5) {
        tokens.push(leadingSpace + trimmed)
      } else {
        // Split into ~4-char sub-words (rough BPE simulation)
        let remaining = trimmed
        let first = true
        while (remaining.length > 0) {
          const chunkSize = remaining.length > 5 ? 4 : remaining.length
          const prefix = first ? leadingSpace : ''
          tokens.push(prefix + remaining.slice(0, chunkSize))
          remaining = remaining.slice(chunkSize)
          first = false
        }
      }
    } else {
      // Punctuation / other
      tokens.push(leadingSpace + trimmed)
    }
  }

  return tokens.map((t, i) => ({
    text: t,
    color: COLORS[i % COLORS.length],
  }))
}

/**
 * Estimate token count for pricing purposes.
 * Rule of thumb: 1 token ≈ 4 characters of English text.
 */
export function estimateTokenCount(text: string): number {
  if (!text) return 0
  return Math.ceil(text.length / 4)
}

export function formatCost(dollars: number): string {
  if (dollars < 0.000001) return '$0.00'
  if (dollars < 0.01) return `$${dollars.toFixed(6)}`
  if (dollars < 1) return `$${dollars.toFixed(4)}`
  return `$${dollars.toFixed(2)}`
}

export function calcCost(tokens: number, pricePerMillion: number): number {
  return (tokens / 1_000_000) * pricePerMillion
}
