import type { FlashcardDeck } from '../../components/Flashcard'

export const GPT_FLASHCARDS: FlashcardDeck = {
  path: 'gpt',
  title: 'GPT & LLMs',
  description: 'Test your knowledge of large language models and AI concepts',
  totalCards: 15,
  cards: [
    {
      id: 'gpt-token',
      front: 'What is a token in the context of LLMs?',
      back: 'The basic unit of text that an LLM processes. Tokens can be whole words, sub-word fragments, or punctuation. Approximately 1 token ≈ 4 characters in English.',
      tags: ['fundamentals', 'tokens'],
    },
    {
      id: 'gpt-bpe',
      front: 'What is Byte-Pair Encoding (BPE)?',
      back: 'A tokenization algorithm that iteratively merges the most frequent adjacent character pairs to build a vocabulary. This allows models to handle both common words (as single tokens) and rare words (split into subwords).',
      tags: ['fundamentals', 'tokens'],
    },
    {
      id: 'gpt-transformer',
      front: 'What is the Transformer architecture?',
      back: 'A neural network architecture introduced in 2017 that uses self-attention mechanisms to process sequential data. It allows models to weigh relationships between all parts of a sequence simultaneously, enabling parallelization and capturing long-range dependencies.',
      tags: ['architecture', 'fundamentals'],
    },
    {
      id: 'gpt-attention',
      front: 'What is self-attention in transformers?',
      back: 'A mechanism that allows each token in a sequence to attend to (focus on) all other tokens, computing attention weights based on learned query, key, and value representations. This captures contextual relationships regardless of distance.',
      tags: ['architecture', 'attention'],
    },
    {
      id: 'gpt-context-window',
      front: 'What is a context window?',
      back: 'The maximum number of tokens an LLM can process in a single prompt. Everything outside this window is invisible to the model. Modern LLMs support 128K to 2M tokens, but longer contexts are more expensive and can dilute important information.',
      tags: ['architecture', 'context'],
    },
    {
      id: 'gpt-rag',
      front: 'What is RAG (Retrieval-Augmented Generation)?',
      back: 'A technique that augments LLM prompts with relevant information retrieved from a knowledge base. This helps models access up-to-date information and reduces hallucinations by grounding responses in retrieved documents.',
      tags: ['rag', 'architecture'],
    },
    {
      id: 'gpt-embedding',
      front: 'What is an embedding in the context of AI?',
      back: 'A dense vector representation of text that captures semantic meaning in high-dimensional space. Similar concepts have similar vectors, enabling similarity search and semantic understanding.',
      tags: ['embeddings', 'fundamentals'],
    },
    {
      id: 'gpt-finetuning',
      front: 'What is fine-tuning an LLM?',
      back: 'The process of continuing training a pre-trained model on a specific task or domain with curated data. This adapts the model\'s behavior, style, or knowledge without training from scratch.',
      tags: ['training', 'fundamentals'],
    },
    {
      id: 'gpt-rlhf',
      front: 'What is RLHF (Reinforcement Learning from Human Feedback)?',
      back: 'A training technique that uses human preference data to fine-tune models via reinforcement learning. Humans rank model outputs, and a reward model is trained to predict preferences, which then guides the LLM to produce better responses.',
      tags: ['training', 'alignment'],
    },
    {
      id: 'gpt-hallucination',
      front: 'What is hallucination in LLMs?',
      back: 'When a model generates confident but factually incorrect or fabricated responses. This happens because LLMs are trained to predict likely text, not to verify facts. Mitigation includes RAG, fact-checking, and lower temperature settings.',
      tags: ['limitations', 'safety'],
    },
    {
      id: 'gpt-temperature',
      front: 'What does temperature control in LLM sampling?',
      back: 'Temperature controls randomness in token selection. Lower values (0-0.3) produce deterministic, focused outputs. Higher values (0.7-1.0) add creativity and variation. Temperature of 0 always selects the highest probability token.',
      tags: ['sampling', 'configuration'],
    },
    {
      id: 'gpt-prompt-engineering',
      front: 'What is prompt engineering?',
      back: 'The practice of crafting effective inputs to a model to achieve desired outputs. Techniques include few-shot learning (providing examples), chain-of-thought (encouraging reasoning steps), and system prompts (setting context and behavior).',
      tags: ['prompting', 'practical'],
    },
    {
      id: 'gpt-chain-of-thought',
      front: 'What is Chain-of-Thought (CoT) prompting?',
      back: 'A prompting technique that encourages the model to show its reasoning step-by-step before giving the final answer. This often improves performance on complex reasoning tasks by making the model\'s logic explicit.',
      tags: ['prompting', 'reasoning'],
    },
    {
      id: 'gpt-agent',
      front: 'What is an LLM agent?',
      back: 'An LLM augmented with tools (like web search, code execution, or APIs) that can autonomously plan and execute multi-step tasks. Agents use a loop of observation, reasoning, and action to complete complex goals.',
      tags: ['agents', 'advanced'],
    },
    {
      id: 'gpt-function-calling',
      front: 'What is function calling in LLMs?',
      back: 'The ability for an LLM to invoke external tools or functions with structured parameters. The model decides when and how to use tools based on the conversation context, enabling integration with external systems.',
      tags: ['agents', 'tools'],
    },
  ],
}
