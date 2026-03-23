# AI Learn

An interactive learning platform for understanding AI, LLMs, and machine learning concepts.

## Features

- **Comprehensive Coverage**: From tokens and transformers to deployment and cost optimization
- **Interactive Content**: Visualizers, calculators, and hands-on examples
- **Adaptive Learning**: Toggle between simple and advanced content modes
- **Multi-Topic Platform**: Designed to expand with additional learning paths
- **Dark Mode**: Automatic dark/light mode based on system preferences
- **Responsive Design**: Works on desktop and mobile devices

## Learning Paths

### GPT & LLMs
- Tokenization and BPE
- Transformer Architecture
- Training Pipeline (Pre-training, SFT, RLHF, DPO)
- Scaling Laws & Emergent Capabilities
- Open Source Models (Llama, Mistral, Qwen, DeepSeek)
- VLM & Multimodal Models
- Image Generation (DALL-E, Stable Diffusion, Flux)
- Embeddings & Vector Search
- RAG Architecture
- Fine-tuning vs RAG
- LLM Evaluation & Benchmarks
- Alignment & Safety
- Prompt Engineering
- System Prompts
- Temperature & Sampling
- Memory & State
- Streaming Responses
- Agents & Tool Use
- Pricing & Infrastructure
- Cost Calculator

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/akrizs/ai-infograph.git
cd ai-infograph

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
│   ├── Home.tsx    # Landing page
│   └── gpt/        # GPT learning path
├── layouts/         # Layout components
├── context/         # React context providers
├── data/           # Static data files
└── App.tsx         # Router configuration
```

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons

## Deployment

The project is automatically deployed to GitHub Pages on push to the `main` branch via GitHub Actions.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

MIT
