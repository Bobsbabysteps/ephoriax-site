# EphoriaX Site

## Overview
This is the EphoriaX platform website - a React + TypeScript + Vite application that focuses on turning complexity into clarity through data searching, filtering, and comparison tools.

## Project Structure
- `/src` - Main source code
  - `/components` - Reusable React components (Header, Hero, Footer, etc.)
  - `/pages` - Page components for routing
  - `/styles` - Theme and styling files
  - `/context` - React context providers
- `/api` - API routes (Vercel serverless functions)
- `/public` - Static assets
- `/types` - TypeScript type definitions

## Tech Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS with custom themes
- **Routing**: React Router DOM 7
- **Animation**: Framer Motion
- **PDF**: jspdf, pdf-lib

## Development
The development server runs on port 5000 using Vite.

## Testing
- **Framework**: Vitest with React Testing Library
- **Run tests**: `npm test`
- **Watch mode**: `npm run test:watch`
- **Coverage report**: `npm run test:coverage`
- **Test files**: Located alongside components with `.test.tsx` extension

## Deployment
Configured as a static deployment with `npm run build` outputting to `dist/` directory.
