# Aether

A client-side game built with TypeScript, Phaser, and Vite.

## Getting Started

### Prerequisites

- Node.js and npm installed on your system

### Installation

Install dependencies:

```bash
npm install
```

### Launching the Game

To start the development server:

```bash
npm run dev
```

The server will start and your browser should open automatically at `http://localhost:3000`. If it doesn't open automatically, navigate to that URL manually.

**Features:**
- Hot module replacement (HMR) - changes to your code will automatically reload in the browser
- TypeScript support with type checking
- Fast development experience with Vite

**To stop the server:**
- Press `Ctrl+C` in the terminal where it's running

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This will compile your TypeScript and create optimized files in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

- `src/main.ts` - Main game code (TypeScript)
- `index.html` - HTML entry point
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration