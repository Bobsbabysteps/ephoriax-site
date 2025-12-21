# EphoriaX Site

## Overview
This is the EphoriaX platform website - a React + TypeScript + Vite application with an Express backend. It focuses on turning complexity into clarity through data searching, filtering, and comparison tools.

## Project Structure
- `/src` - Frontend source code
  - `/components` - Reusable React components (Header, Hero, Footer, etc.)
  - `/pages` - Page components for routing
  - `/styles` - Theme and styling files
  - `/context` - React context providers
- `/server` - Express backend
  - `/routes` - API route handlers (health, ask-gpt, property-gpt, sample)
- `/api` - Legacy Vercel serverless functions (deprecated, migrated to /server)
- `/public` - Static assets
- `/types` - TypeScript type definitions

## Tech Stack
- **Frontend**: React 19 with TypeScript
- **Backend**: Express.js
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS with custom themes
- **Routing**: React Router DOM 7
- **Animation**: Framer Motion
- **AI**: OpenAI API integration

## Development
- **Start both servers**: `npm run dev` (runs Express on 3001 + Vite on 5000)
- **Frontend only**: `npm run dev:frontend`
- **Backend only**: `npm run server:dev`
- Vite proxies `/api/*` requests to the Express backend

## API Endpoints
- `GET /api/health` - Health check
- `GET /api/sample` - Sample property data
- `POST /api/ask-gpt` - Generate property report with GPT
- `GET /api/property-gpt?address=...` - Property data analysis

## Testing
- **Framework**: Vitest with React Testing Library
- **Run tests**: `npm test`
- **Watch mode**: `npm run test:watch`
- **Coverage report**: `npm run test:coverage`
- **Test locations**:
  - Frontend: `src/components/*.test.tsx`
  - API: `api/*.test.ts` and `api/**/*.test.ts`

## Deployment
Configured as autoscale deployment:
- Build: `npm run build` (compiles TypeScript + Vite build)
- Run: `npm run start` (serves built frontend + API from Express)
- Production server: Express serves static files from `dist/` and API from routes
- Uses Express 5 wildcard syntax: `/{*splat}` for SPA fallback routing

## Recent Changes
- **Dec 21, 2025**: Phase 1 complete - Express backend migration from Vercel serverless
  - All API routes working: health, ask-gpt, property-gpt, sample
  - Production build tested and verified
  - 17 tests passing (API + frontend components)
  - Uses Node 20 native fetch (no undici import needed)

## Environment Variables
- `OPENAI_API_KEY` - Required for GPT features
- `OPENAI_PROJECT_ID` - Optional OpenAI project ID
