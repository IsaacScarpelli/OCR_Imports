# FutebolShop - Camisas de Futebol Online Store

## Overview
A React-based e-commerce website for football jerseys (soccer shirts) built with Vite, TypeScript, Tailwind CSS, and shadcn/ui components. The site features Brazilian teams, European clubs, and national team jerseys.

## Project Structure
- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components  
- **Routing**: React Router DOM
- **State Management**: TanStack React Query
- **Build Tool**: Vite
- **Package Manager**: npm/bun

## Current Status
✅ Project successfully imported and running in Replit environment
✅ Frontend (React/Vite) running on port 5000 with proper host settings (0.0.0.0)  
✅ Backend (Express API) running on port 3001 with Brazilian product catalog
✅ TypeScript configuration fixed for ES modules
✅ Stripe integration added and configured to handle missing keys gracefully
✅ Dependencies installed and LSP errors resolved
✅ Deployment configuration set up for VM deployment
✅ Both frontend and backend tested and working correctly

## Key Components
- **HeroCarousel**: Main banner with rotating jersey displays
- **Header/Navigation**: Site navigation with categories
- **ProductCard**: Individual product display components
- **CategorySection**: Product categorization and filtering

## Development Setup
- Server: Running on port 5000 (0.0.0.0:5000) 
- Dev command: `npm run dev`
- Build command: `npm run build`
- Preview command: `npm run preview`

## Technical Details
- Uses `@` alias for src imports
- Assets stored in `src/assets/` directory
- Product data in `src/data/products.json`
- Responsive design with mobile-first approach
- Brazilian Portuguese content and styling

## Recent Changes (Sep 29, 2025)
- **GitHub Import Setup**: Successfully imported and configured for Replit environment
- **Dependencies**: Installed all npm packages and resolved TypeScript issues
- **Frontend Setup**: Fixed Vite configuration with proper ES module support (__dirname → fileURLToPath)
- **Backend Setup**: Modified Express server to handle missing Stripe keys gracefully
- **Stripe Integration**: Added JavaScript Stripe integration with proper error handling
- **Workflows**: Set up concurrently running frontend (port 5000) and backend (port 3001)
- **Deployment**: Configured for VM deployment to support full-stack application
- **Testing**: Verified both frontend and backend are working correctly

## User Preferences
- Brazilian Portuguese language interface
- Football/soccer theme focused
- Clean, modern UI with shadcn/ui components