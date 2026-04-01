# RedTube API Implementation

## Overview
Complete implementation of the RedTube API based on the official documentation at https://api.redtube.com/docs

## Features Implemented

### Backend (Node.js/TypeScript)
- **Complete API Integration**: Full support for all RedTube API parameters
- **Enhanced Type Safety**: Comprehensive TypeScript interfaces matching API structure
- **Multiple Endpoints**: 
  - `/api/search` - Advanced search with filters
  - `/api/trending` - Trending videos by period
  - `/api/newest` - Latest videos
  - `/api/top-rated` - Highest rated videos
  - `/api/tags/:tags` - Videos by specific tags

### Frontend (React/TypeScript)
- **Tabbed Interface**: Search, Trending, Newest, Top Rated sections
- **Advanced Filters**: Tags, ordering, time periods
- **Rich Video Display**: Duration, views, ratings, tags
- **Pagination**: Load more functionality
- **Interactive Tags**: Click to add tags to search

### API Parameters Supported
- `search` - Text search query
- `tags[]` - Multiple tag filtering
- `thumbsize` - Thumbnail size selection
- `page` - Pagination support
- `ordering` - newest, mostviewed, rating
- `period` - weekly, monthly, alltime

### Video Data Fields
- Video ID, title, URL, embed URL
- Duration, views, rating
- Thumbnails (multiple sizes)
- Tags array
- Publish date

## Usage

### Start Backend
```bash
npm run dev
```

### Start Frontend
```bash
cd frontend
npm run dev
```

### API Examples
```bash
# Search with query
GET /api/search?q=example&page=1&ordering=newest

# Search with tags
GET /api/search?tags=tag1,tag2&ordering=mostviewed

# Trending videos
GET /api/trending?period=weekly&page=1

# Top rated videos
GET /api/top-rated?period=alltime&page=1
```

## Implementation Details

### Error Handling
- Comprehensive error logging
- Graceful API failure handling
- Timeout protection (15s)
- Response validation

### Data Processing
- Handles nested API response structure
- Formats video data for frontend consumption
- Supports both single and array video responses
- Tag processing and display

### Performance
- Efficient pagination
- Optimized thumbnail loading
- Responsive grid layout
- Load more functionality

## Files Modified
- `src/types/redtube.ts` - Complete type definitions
- `src/services/redtubeService.ts` - Enhanced service layer
- `src/server.ts` - Multiple API endpoints
- `frontend/src/VideoSearch.tsx` - Rich UI implementation