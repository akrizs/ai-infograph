import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import GPT from './pages/gpt/GPT'
import GPTSlides from './pages/gpt/GPTSlides'
import GPTFlashcards from './pages/gpt/GPTFlashcards'

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gpt" element={<GPT />} />
        <Route path="/gpt/slides" element={<GPTSlides />} />
        <Route path="/gpt/flashcards" element={<GPTFlashcards />} />
      </Routes>
    </MainLayout>
  )
}
