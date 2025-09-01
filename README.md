# GFG Student Chapter Website

Website for the GeeksforGeeks Student Chapter at MIT ADT University. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Overview

This is the official website for the GFG Student Chapter, featuring event management, team information, and educational resources. The site includes an admin panel for event management and is deployed at gfgmitadt.in.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Backend**: Next.js API Routes with JSON storage
- **Authentication**: Environment variable-based

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd GFG-WEBSITE--main
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   # Frontend
   cp .env.example .env.local

   # Backend
   cd gfg-backend-main
   cp .env.example .env
   npm install
   ```

4. Start development
   ```bash
   # Frontend (port 3000)
   npm run dev

   # Backend (port 5000)
   cd gfg-backend-main
   npm start
   ```

## Project Structure

```
├── app/                    # Next.js App Router pages
├── components/            # React components
├── hooks/                # Custom hooks
├── lib/                  # Utilities
├── public/               # Static assets
├── types/                # TypeScript definitions
└── gfg-backend-main/     # Backend server
```

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
```

## Environment Variables

Set up the following environment variables:

### Frontend (.env.local)
```
ADMIN_SECRET_KEY=your_admin_key
```

### Backend (gfg-backend-main/.env)
```
ADMIN_SECRET_KEY=your_admin_key
PORT=5000
```

## Production Build

```bash
npm run build
npm start
```

## Admin Panel

Access the admin panel at `/admin/addevent` with the configured admin key.