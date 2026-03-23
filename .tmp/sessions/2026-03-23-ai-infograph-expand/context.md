# Task Context: Phase 3 - Project Restructuring

Session ID: 2026-03-23-ai-infograph-expand
Created: 2026-03-23T00:00:00Z
Status: phase_3_complete

## Current Request
Restructure project into a multi-topic learning platform:
- Add routing with React Router
- Create landing page with topic selection
- Move GPT content to /gpt sub-path
- Add simple/advanced complexity toggle
- Create placeholder for /gpt/slides
- Design infrastructure for /gpt/flashcards (future)

## New URL Structure
```
/              → Landing page (topic selection)
/gpt          → AI/LLM learning path
/gpt/slides   → Keynote/slideshow mode (placeholder)
```

## Technical Changes
- Install react-router-dom
- Create src/pages/, src/context/, src/layouts/ folders
- Create ComplexityContext for toggle state
- Create MainLayout with header + complexity toggle
- Refactor existing components for routing

## Context Files (Standards to Follow)
- /home/akristensen.guest/.config/opencode/context/core/standards/code-quality.md

## Reference Files (Source Material to Look At)
- /home/akristensen.guest/ai-infograph/src/App.tsx - Main app structure
- /home/akristensen.guest/ai-infograph/src/index.css - Design tokens, colors, typography
- /home/akristensen.guest/ai-infograph/src/App.css - Section styles
- /home/akristensen.guest/ai-infograph/src/components/*.tsx - Component patterns
- /home/akristensen.guest/ai-infograph/src/components/*.css - Component styles
- /home/akristensen.guest/ai-infograph/src/data/models.ts - Data structure pattern

## External Docs Fetched
None yet - may need Context7 for current model landscape if needed.

## Existing Topics Covered (Do NOT duplicate)
1. Tokenization (BPE) - What are tokens
2. Context Windows & Compaction Strategies
3. LLM Infrastructure Stack (9 layers)
4. Input vs. Output Tokens / Pricing
5. Token Visualizer (Interactive)
6. Pricing Table (23 models)
7. Cost Calculator (Interactive)
8. Context Window Explainer (Interactive)
9. Transformer Architecture
10. Training Pipeline
11. VLM & Multimodal Models
12. Embeddings & Vector Search
13. RAG Architecture
14. Fine-tuning vs RAG
15. LLM Evaluation
16. LLM Limitations
17. Alignment & Safety
18. Code Models
19. Prompt Engineering
20. System Prompts
21. Temperature & Sampling
22. Memory & State
23. Streaming Responses
24. Agents & Tool Use

## New Topics to Implement (Phase 2)
1. **QuickStart** - Learning path overview, prerequisites, how to use the guide
2. **Glossary** - Searchable A-Z glossary of AI/LLM terms with links to sections
3. **ScalingLaws** - Compute scaling, emergent capabilities, Chinchilla law, parameter counts
4. **OpenSourceModels** - Llama, Mistral, Gemma, DeepSeek, Mistral, open weights landscape
5. **ImageGeneration** - DALL-E, Stable Diffusion, SDXL, Flux, image gen fundamentals

## Visual Style to Maintain
- **Primary accent**: Purple (#aa3bff / #c084fc)
- **Background**: White (#fff) / Dark (#16171d)
- **Layout**: 1126px max-width container, 3-column grids (desktop)
- **Typography**: system-ui, H1: 56px, H2: 24px, Body: 18px
- **Cards**: 24px padding, 12px border-radius, subtle border
- **Tags**: "Concept" (purple) / "Interactive" (green) labels
- **Dark mode**: Respects prefers-color-scheme
- **Animations**: Subtle hover transitions (0.15-0.2s ease)

## Component Patterns to Follow
- Section structure: tag + H2 + description paragraph
- 3-column card grids with icon + title + body
- Interactive tabbed panels (sidebar navigation)
- Color-coded badges for providers/types
- I/O diagrams, flowcharts, layer stacks
- Code blocks with warm cream (#f4f3ec) background

## Technical Stack
- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4 + CSS custom properties
- Component-scoped CSS files

## Constraints
- Maintain existing color scheme and design tokens
- Follow < 50 lines per component guideline
- Use pure functions for data transformations
- Create modular components with clear separation of concerns
- Interactive components should use React hooks (useState, useMemo)
- Dark mode support required

## Exit Criteria
- [x] Phase 1-2 complete: All previous sections implemented
- [x] All emojis replaced with Lucide icons
- [x] Build passes

### Phase 3 Exit Criteria (Complete)
- [x] React Router installed and configured
- [x] Landing page created with topic cards
- [x] MainLayout with complexity toggle
- [x] GPT page at /gpt with existing content
- [x] Placeholder slides page at /gpt/slides
- [x] Complexity context working
- [x] Build passes
