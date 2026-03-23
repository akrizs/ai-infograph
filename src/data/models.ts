export interface ModelCost {
  input: number
  output: number
  cache_read?: number
  cache_write?: number
}

export interface Model {
  id: string
  name: string
  provider: string
  cost: ModelCost
  context?: number
}

export const MODELS: Model[] = [
  // OpenAI
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', cost: { input: 2.5, output: 10, cache_read: 1.25 }, context: 128000 },
  { id: 'gpt-4o-mini', name: 'GPT-4o mini', provider: 'OpenAI', cost: { input: 0.15, output: 0.6, cache_read: 0.075 }, context: 128000 },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI', cost: { input: 10, output: 30 }, context: 128000 },
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', cost: { input: 30, output: 60 }, context: 8192 },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', cost: { input: 0.5, output: 1.5 }, context: 16385 },
  { id: 'o3', name: 'o3', provider: 'OpenAI', cost: { input: 2, output: 8, cache_read: 0.5 }, context: 200000 },
  { id: 'o3-mini', name: 'o3-mini', provider: 'OpenAI', cost: { input: 1.1, output: 4.4, cache_read: 0.55 }, context: 200000 },
  { id: 'o1', name: 'o1', provider: 'OpenAI', cost: { input: 15, output: 60, cache_read: 7.5 }, context: 200000 },
  { id: 'o4-mini', name: 'o4-mini', provider: 'OpenAI', cost: { input: 1.1, output: 4.4, cache_read: 0.275 }, context: 200000 },
  // Anthropic
  { id: 'claude-opus-4', name: 'Claude Opus 4', provider: 'Anthropic', cost: { input: 15, output: 75, cache_read: 1.5, cache_write: 18.75 }, context: 200000 },
  { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', provider: 'Anthropic', cost: { input: 3, output: 15, cache_read: 0.3, cache_write: 3.75 }, context: 200000 },
  { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', provider: 'Anthropic', cost: { input: 3, output: 15, cache_read: 0.3, cache_write: 3.75 }, context: 200000 },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', cost: { input: 3, output: 15, cache_read: 0.3, cache_write: 3.75 }, context: 200000 },
  { id: 'claude-3-5-haiku', name: 'Claude 3.5 Haiku', provider: 'Anthropic', cost: { input: 0.8, output: 4, cache_read: 0.08, cache_write: 1 }, context: 200000 },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', cost: { input: 15, output: 75, cache_read: 1.5, cache_write: 18.75 }, context: 200000 },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', cost: { input: 0.25, output: 1.25, cache_read: 0.03, cache_write: 0.3 }, context: 200000 },
  // Google
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'Google', cost: { input: 1.25, output: 10, cache_read: 0.31 }, context: 1048576 },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google', cost: { input: 0.3, output: 2.5, cache_read: 0.075 }, context: 1048576 },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'Google', cost: { input: 0.1, output: 0.4, cache_read: 0.025 }, context: 1048576 },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', cost: { input: 1.25, output: 5, cache_read: 0.31 }, context: 2097152 },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'Google', cost: { input: 0.075, output: 0.3, cache_read: 0.019 }, context: 1048576 },
  // Mistral
  { id: 'mistral-large', name: 'Mistral Large', provider: 'Mistral', cost: { input: 0.5, output: 1.5 }, context: 131072 },
  { id: 'mistral-small', name: 'Mistral Small', provider: 'Mistral', cost: { input: 0.1, output: 0.3 }, context: 131072 },
  { id: 'open-mixtral-8x22b', name: 'Mixtral 8x22B', provider: 'Mistral', cost: { input: 2, output: 6 }, context: 65536 },
  { id: 'open-mistral-7b', name: 'Mistral 7B', provider: 'Mistral', cost: { input: 0.25, output: 0.25 }, context: 32768 },
  // DeepSeek
  { id: 'deepseek-chat', name: 'DeepSeek V3', provider: 'DeepSeek', cost: { input: 0.27, output: 1.1 }, context: 64000 },
  { id: 'deepseek-reasoner', name: 'DeepSeek R1', provider: 'DeepSeek', cost: { input: 0.55, output: 2.19 }, context: 64000 },
  // xAI
  { id: 'grok-4', name: 'Grok 4', provider: 'xAI', cost: { input: 3, output: 15 }, context: 256000 },
  { id: 'grok-3', name: 'Grok 3', provider: 'xAI', cost: { input: 3, output: 15 }, context: 131072 },
  { id: 'grok-3-mini', name: 'Grok 3 Mini', provider: 'xAI', cost: { input: 0.3, output: 0.5 }, context: 131072 },
  // Meta / Groq
  { id: 'llama-3.3-70b', name: 'Llama 3.3 70B', provider: 'Meta (via Groq)', cost: { input: 0.59, output: 0.79 }, context: 128000 },
  { id: 'llama-3.1-8b', name: 'Llama 3.1 8B', provider: 'Meta (via Groq)', cost: { input: 0.05, output: 0.08 }, context: 128000 },
]

export const PROVIDERS = [...new Set(MODELS.map((m) => m.provider))]
