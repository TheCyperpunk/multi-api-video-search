# RedTube API Integration

A TypeScript/Node.js backend with React frontend for searching and browsing RedTube videos.

## Features

- 🔍 Search RedTube videos by keyword
- 📈 Browse trending videos
- 🖼️ Display video thumbnails, titles, and metadata
- ⏱️ Show video duration, views, and ratings
- 🔗 Direct links to RedTube videos

## Project Structure

```
├── src/                    # Backend TypeScript source
│   ├── types/
│   │   └── redtube.ts     # TypeScript interfaces
│   ├── services/
│   │   └── redtubeService.ts  # RedTube API service
│   └── server.ts          # Express server
├── frontend/              # React frontend
│   └── src/
│       ├── VideoSearch.tsx
│       └── ...
├── package.json           # Backend dependencies
└── tsconfig.json         # TypeScript config
```

## Setup Instructions

### Backend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

- `GET /api/search?q=query&page=1` - Search videos
- `GET /api/trending?page=1` - Get trending videos
- `GET /health` - Health check

## Usage

1. Start both backend and frontend servers
2. Open your browser to the frontend URL
3. Search for videos or browse trending content
4. Click on any video to watch on RedTube

## Technologies Used

- **Backend**: TypeScript, Node.js, Express, Axios
- **Frontend**: React, TypeScript, Vite
- **API**: RedTube Public API

## Notes

- The app fetches data from RedTube's public API
- Videos redirect to RedTube's website for viewing
- Thumbnails are served directly from RedTube's CDN