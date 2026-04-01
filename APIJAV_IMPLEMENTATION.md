# APIJAV API Implementation

## Overview
Complete implementation of the APIJAV REST API for JAV Videos based on the official documentation at https://apijav.com/api-reference.html

## API Analysis Summary

### Base URL
- **Server**: `https://server.apijav.com/wp-json/myvideo/v1`
- **Authentication**: Public endpoints, optional X-API-Key header support
- **Rate Limiting**: HTTP 429 for excessive requests

### Key Features Implemented

#### 1. Video Search & Filtering
- **Endpoint**: `/posts`
- **Parameters**: per_page (max 1000), page, search, category, tag, actor, studio, orderby, order, after
- **Sorting**: By date, title, or views (ASC/DESC)
- **Filtering**: By category, tags, actors, studios

#### 2. Single Video Retrieval
- **Endpoint**: `/posts/{id}`
- **Returns**: Complete video object with metadata

#### 3. Player Embed URLs
- **Endpoint**: `/player/{id}`
- **Features**: Permanent tokens that never expire
- **Returns**: embed_url and ready-to-use iframe_html

#### 4. Video Data Structure
```typescript
{
  id: number,
  title: string,
  slug: string,
  date: string, // ISO 8601
  thumbnail: string,
  duration: string, // HH:MM:SS
  categories: string[],
  tags: string[],
  actors: string[],
  studio: string,
  code: string, // Product ID
  views: number,
  likes: number,
  dislikes: number,
  is_hd: boolean,
  embed_url: string, // Permanent
  iframe_html: string,
  player_api: string
}
```

## Implementation Details

### Backend Endpoints (Node.js/TypeScript)

#### APIJAV Endpoints
- `GET /api/apijav/search` - Advanced search with all filters
- `GET /api/apijav/trending` - Most viewed videos
- `GET /api/apijav/newest` - Latest videos by date
- `GET /api/apijav/category/:category` - Videos by category
- `GET /api/apijav/studio/:studio` - Videos by studio
- `GET /api/apijav/actor/:actor` - Videos by actor
- `GET /api/apijav/hd` - HD quality videos only
- `GET /api/apijav/video/:id` - Single video details

#### Multi-API Support
- **RedTube**: `/api/redtube/*` endpoints
- **APIJAV**: `/api/apijav/*` endpoints
- **Legacy**: `/api/*` endpoints (RedTube compatibility)

### Frontend Features

#### Dual API Interface
- Toggle between RedTube and APIJAV APIs
- Unified video card display
- Source-specific branding and colors
- Consistent search experience

#### Core Display Elements
- **Thumbnail**: High-quality video thumbnails
- **Title**: Full video titles
- **Redirect URL**: Direct links to embed URLs
- **Source Badge**: API source identification
- **Duration**: Video length (when available)
- **Studio/Code**: APIJAV-specific metadata

### Service Layer

#### ApiJavService Methods
```typescript
searchVideos(params) // General search with filters
getVideoById(id) // Single video retrieval
getPlayerInfo(id) // Embed URL and iframe
getTrendingVideos(page) // Most viewed
getNewestVideos(page) // Latest uploads
getVideosByCategory(category, page) // Category filter
getVideosByStudio(studio, page) // Studio filter
getVideosByActor(actor, page) // Actor filter
getHDVideos(page) // HD quality filter
```

### Error Handling
- Comprehensive API error logging
- Graceful fallbacks for missing data
- 404 handling for non-existent videos
- Timeout protection (15 seconds)
- Rate limiting awareness

### Security & Best Practices
- CORS enabled for cross-origin requests
- Input validation and sanitization
- Proper error responses
- Client site identification headers
- Permanent embed URL storage safe

## Usage Examples

### Search Videos
```bash
# General search
GET /api/apijav/search?q=example&page=1

# Category filter
GET /api/apijav/search?category=Uncensored&orderby=views&order=DESC

# Studio filter
GET /api/apijav/search?studio=Prestige&per_page=50

# Actor filter
GET /api/apijav/search?actor=Yua%20Mikami&orderby=date
```

### Specialized Endpoints
```bash
# Trending videos
GET /api/apijav/trending?page=1

# Latest videos
GET /api/apijav/newest?page=1

# Videos by category
GET /api/apijav/category/Amateur?page=1

# HD videos only
GET /api/apijav/hd?page=1
```

## Files Created/Modified

### New Files
- `src/types/apijav.ts` - Complete TypeScript interfaces
- `src/services/apijavService.ts` - Service layer implementation
- `APIJAV_IMPLEMENTATION.md` - This documentation

### Modified Files
- `src/server.ts` - Added APIJAV endpoints alongside RedTube
- `frontend/src/VideoSearch.tsx` - Multi-API interface with source switching

## Key Differences from RedTube API

1. **Data Structure**: More comprehensive metadata (studio, code, actors)
2. **Filtering**: More granular filtering options (category, studio, actor)
3. **Embed URLs**: Permanent tokens vs temporary URLs
4. **Content Type**: JAV-specific vs general adult content
5. **Pagination**: Higher limits (1000 vs typical limits)

## Testing

The implementation includes comprehensive error handling and can be tested with:
1. Start backend: `npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Switch between APIs using the toggle buttons
4. Test search functionality with various filters

## Notes

- APIJAV API provides permanent embed URLs safe for database storage
- The API supports webhook notifications for new content (not implemented in this basic version)
- Rate limiting may apply depending on server configuration
- All endpoints are public by default, no API key required