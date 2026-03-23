import { useState, useEffect, useCallback } from 'react'
import type { Flashcard, StudyProgress } from '../components/Flashcard/types'

const STORAGE_KEY = 'ai-learn-flashcard-progress'

interface UseFlashcardsOptions {
  path: string
  cards: Flashcard[]
}

interface UseFlashcardsReturn {
  currentIndex: number
  currentCard: Flashcard
  isFlipped: boolean
  progress: { known: number; review: number; total: number }
  flip: () => void
  next: () => void
  previous: () => void
  shuffle: () => void
  markKnown: () => void
  markReview: () => void
  reset: () => void
  isComplete: boolean
}

export function useFlashcards({ path, cards }: UseFlashcardsOptions): UseFlashcardsReturn {
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>(cards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [progress, setProgress] = useState<Record<string, StudyProgress>>({})

  // Load progress from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}-${path}`)
      if (stored) {
        setProgress(JSON.parse(stored))
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [path])

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress: Record<string, StudyProgress>) => {
    try {
      localStorage.setItem(`${STORAGE_KEY}-${path}`, JSON.stringify(newProgress))
    } catch {
      // Ignore localStorage errors
    }
  }, [path])

  const currentCard = shuffledCards[currentIndex] || cards[0]

  const flip = useCallback(() => {
    setIsFlipped(!isFlipped)
  }, [isFlipped])

  const shuffle = useCallback(() => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setShuffledCards(shuffled)
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [cards])

  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < shuffledCards.length) {
      setCurrentIndex(index)
      setIsFlipped(false)
    }
  }, [shuffledCards.length])

  const next = useCallback(() => {
    if (currentIndex < shuffledCards.length - 1) {
      goToIndex(currentIndex + 1)
    }
  }, [currentIndex, shuffledCards.length, goToIndex])

  const previous = useCallback(() => {
    if (currentIndex > 0) {
      goToIndex(currentIndex - 1)
    }
  }, [currentIndex, goToIndex])

  const updateCardStatus = useCallback((status: 'known' | 'review') => {
    const newProgress = {
      ...progress,
      [currentCard.id]: {
        cardId: currentCard.id,
        status,
        lastReviewed: Date.now(),
        reviewCount: (progress[currentCard.id]?.reviewCount || 0) + 1,
      },
    }
    setProgress(newProgress)
    saveProgress(newProgress)

    // Auto-advance to next card
    if (currentIndex < shuffledCards.length - 1) {
      setTimeout(() => goToIndex(currentIndex + 1), 300)
    }
  }, [currentCard.id, currentIndex, shuffledCards.length, progress, saveProgress, goToIndex])

  const markKnown = useCallback(() => {
    updateCardStatus('known')
  }, [updateCardStatus])

  const markReview = useCallback(() => {
    updateCardStatus('review')
  }, [updateCardStatus])

  const reset = useCallback(() => {
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [])

  const knownCount = Object.values(progress).filter((p) => p.status === 'known').length
  const reviewCount = Object.values(progress).filter((p) => p.status === 'review').length

  return {
    currentIndex,
    currentCard,
    isFlipped,
    progress: {
      known: knownCount,
      review: reviewCount,
      total: shuffledCards.length,
    },
    flip,
    next,
    previous,
    shuffle,
    markKnown,
    markReview,
    reset,
    isComplete: currentIndex === shuffledCards.length - 1 && knownCount > 0,
  }
}
