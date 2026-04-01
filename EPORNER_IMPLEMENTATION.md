# Eporner API Implementation

## Overview
Complete implementation of the Eporner API v2 based on the official documentation at https://www.eporner.com/api/v2/

## API Analysis Summary

### Base URL
- **Server**: `https://www.eporner.com/api/v2/video`
- **Authentication**: No authentication required (public API)
- **Rate Limiting**: Not specified in documentation

### Key Features Implemented

#### 1. Video Search (`/search/`)
- **Parameters**: query, per_page, page, thumbsize, order, gay, lq, format
- **Sorting Options**: latest, longest, shortest, top-rated, most-popular, top-weekly, top-monthly
- **Content Filters**: gay content (0/1), low quality content (0/1)
- **Thumbnail Sizes**: small, medium, big

#### 2. Single Video Retrieval (`/id/`)
- **Parameters**: id (required), thumbsize, format
- **Returns**: Complete video object with metadata
- **Use Case**: Get detailed info for specific video or check if video still exists

#### 3. Removed Videos List (`/removed/`)
- **Returns**: Array of removed video IDs
- **Use Case**: Cleanup/maintenance for applications storing video references

#### 4. Video Data Structure
```typescript
{
  id: string,
  title: string,
  keywords: string, // Comma-separated
  views: number,
  rate: string, // Rating as string (e.g., "4.13")
  url: string,
  added: string, // Date string
  length_sec: number,
  length_min: string, // Duration as MM:SS or HH:MM:SS
  embed: string,
  default_thumb: {
    size: string,
    width: number,
    height: number,
    src: string
  },
  thumbs: Array<{
    size: string,
    width: number,
    height: number,
    src: string
  }>
}
```

## Implementation Details

### Backend Endpoints (Node.js/TypeScript)

#### Eporner Endpoints
- `GET /api/eporner/search` - Advanced search with all filters
- `GET /api/eporner/latest` - Latest uploaded videos
- `GET /api/eporner/top-rated` - Highest rated videos
- `GET /api/eporner/popular` - Most popular videos
- `GET /api/eporner/video/:id` - Single video details
- Additional specialized endpoints for different sorting options

#### Multi-API Support
- **RedTube**: `/api/redtube/*` endpoints
- **APIJAV**: `/api/apijav/*` endpoints  
- **Eporner**: `/api/eporner/*` endpoints
- **Legacy**: `/api/*` endpoints (RedTube compatibility)

### Frontend Features

#### Triple API Interface
- Toggle between RedTube, APIJAV, and Eporner APIs
- Unified video card display with source-specific branding
- Green color scheme for Eporner (🟢)
- Consistent search experience across all APIs

#### Core Display Elements
- **Thumbnail**: High-quality video thumbnails (multiple sizes available)
- **Title**: Full video titles
- **Redirect URL**: Direct links to video pages
- **Source Badge**: API source identification with color coding
- **Duration**: Video length in MM:SS or HH:MM:SS format
- **Stats**: View counts and ratings (when available)

### Service Layer

#### EpornerService Methods
```typescript
searchVideos(params) // General search with filters
getVideoById(id, thumbsize) // Single video retrieval
getRemovedVideos() // List of removed video IDs
getLatestVideos(page) // Latest uploads
getTopRatedVideos(page) // Highest rated
getMostPopularVideos(page) // Most popular
getTopWeeklyVideos(page) // Top this week
getTopMonthlyVideos(page) // Top this month
getLongestVideos(page) // Longest duration
getShortestVideos(page) // Shortest duration
searchWithFilters(query, options) // Advanced search with filters
```

### Search Parameters

#### Available Filters
- **query**: Search term
- **per_page**: Results per page (default: 20)
- **page**: Page number (default: 1)
- **thumbsize**: Thumbnail size (small/medium/big)
- **order**: Sort order (latest, longest, shortest, top-rated, most-popular, top-weekly, top-monthly)
- **gay**: Include gay content (0 or 1)
- **lq**: Include low quality content (0 or 1)

#### Response Metadata
```typescript
{
  count: number, // Results in current page
  start: number, // Starting index
  per_page: number, // Results per page
  page: number, // Current page
  time_ms: number, // API response time
  total_count: number, // Total results available
  total_pages: number, // Total pages available
  videos: EpornerVideo[] // Video array
}
```

### Error Handling
- Comprehensive API error logging
- Graceful fallbacks for missing thumbnails
- 404 handling for non-existent videos
- Timeout protection (15 seconds)
- User-Agent headers for better API compatibility

### Security & Best Practices
- CORS enabled for cross-origin requests
- Input validation and sanitization
- Proper error responses
- User-Agent identification
- Safe thumbnail fallbacks

## Usage Examples

### Search Videos
```bash
# General search
GET /api/eporner/search?q=example&page=1

# Latest videos
GET /api/eporner/search?order=latest&per_page=20

# Top rated with filters
GET /api/eporner/search?order=top-rated&gay=0&lq=0

# Most popular this week
GET /api/eporner/search?order=top-weekly&thumbsize=big
```

### Specialized Endpoints
```bash
# Latest videos
GET /api/eporner/latest?page=1

# Top rated videos
GET /api/eporner/top-rated?page=1

# Most popular videos
GET /api/eporner/popular?page=1

# Single video details
GET /api/eporner/video/IsabYDAiqXa?thumbsize=big
```

## Files Created/Modified

### New Files
- `src/types/eporner.ts` - Complete TypeScript interfaces
- `src/services/epornerService.ts` - Service layer implementation
- `EPORNER_IMPLEMENTATION.md` - This documentation

### Modified Files
- `src/server.ts` - Added Eporner endpoints alongside RedTube and APIJAV
- `frontend/src/VideoSearch.tsx` - Triple API interface with Eporner support

## Key Features of Eporner API

1. **Rich Metadata**: Comprehensive video information including views, ratings, keywords
2. **Multiple Thumbnails**: Up to 15 thumbnail images per video in different sizes
3. **Flexible Sorting**: 7 different sorting options for content discovery
4. **Content Filters**: Options to include/exclude gay and low-quality content
5. **Pagination Support**: Full pagination with total count information
6. **Removed Videos Tracking**: API endpoint to get list of removed video IDs
7. **Performance Metrics**: API response time included in results

## Key Differences from Other APIs

1. **Thumbnail Variety**: Multiple thumbnail images (up to 15) vs single thumbnails
2. **Sorting Options**: More granular sorting (7 options) vs basic sorting
3. **Content Filtering**: Explicit gay/lq content filters
4. **Response Format**: Rich metadata with performance metrics
5. **Removed Videos**: Dedicated endpoint for cleanup operations
6. **Keywords**: Comma-separated keyword strings vs tag arrays

## Testing

The implementation includes comprehensive error handling and can be tested with:
1. Start backend: `npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Switch between APIs using the toggle buttons (🟢 Eporner API)
4. Test search functionality with various filters and sorting options

## Notes

- Eporner API provides rich metadata including view counts and ratings
- Multiple thumbnail sizes available for different use cases
- Content filtering options for different audience requirements
- No authentication required - fully public API
- Response includes performance metrics (time_ms)
- Removed videos endpoint useful for maintenance operations