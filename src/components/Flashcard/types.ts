export interface Flashcard {
  id: string
  front: string
  back: string
  tags: string[]
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface FlashcardDeck {
  path: string
  title: string
  description: string
  cards: Flashcard[]
  totalCards: number
}

export interface StudyProgress {
  cardId: string
  status: 'new' | 'learning' | 'known' | 'review'
  lastReviewed: number | null
  reviewCount: number
}
