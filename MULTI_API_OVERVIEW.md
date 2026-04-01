# Multi-API Video Search Platform

## Overview
A comprehensive video search platform integrating six different adult / anime content APIs/services into a unified interface. The platform provides a consistent search experience while maintaining the unique features of each source.

## Integrated APIs

### 1. RedTube API 🔴
- **Type**: Official REST API
- **Base URL**: `https://api.redtube.com`
- **Features**: Search, trending, tags, ratings, multiple sorting options
- **Strengths**: Reliable API, comprehensive metadata, multiple thumbnail sizes
- **Documentation**: [RedTube API Docs](https://api.redtube.com/docs)

### 2. APIJAV API 🎌
- **Type**: JAV-focused REST API
- **Base URL**: `https://server.apijav.com/wp-json/myvideo/v1`
- **Features**: Studio filtering, actor search, category organization, permanent embed URLs
- **Strengths**: JAV-specific content, rich metadata, high pagination limits
- **Documentation**: [APIJAV API Reference](https://apijav.com/api-reference.html)

### 3. Eporner API 🟢
- **Type**: Official REST API v2
- **Base URL**: `https://www.eporner.com/api/v2/video`
- **Features**: Multiple sorting options, content filtering, removed video tracking
- **Strengths**: Rich metadata, multiple thumbnails, performance metrics
- **Documentation**: [Eporner API v2](https://www.eporner.com/api/v2/)

### 4. FapHouse Service 🟣
- **Type**: Simulated service (based on scraper documentation)
- **Base URL**: Simulated in-memory service
- **Features**: Premium content detection, studio organization, quality filtering
- **Strengths**: Studio-focused content, quality tiers, premium/free distinction
- **Documentation**: [FapHouse Scraper](https://github.com/babepedia/faphouse)

### 5. Hentai Ocean API 🌊
- **Type**: RSS / Scraper Hybrid API
- **Base URL**: `https://hentaiocean.com/api`
- **Features**: Direct embed linking, thumbnail rendering, recent RSS extraction
- **Strengths**: No rate limits, direct MP4 playback
- **Documentation**: [Hentai Ocean Docs](https://hentaiocean.com/api-docs)

### 6. Hanime.tv (HaniAPI) 🔥
- **Type**: Unofficial Wrapper API (POST requests)
- **Base URL**: `https://haniapi.vercel.app`
- **Features**: Advanced search arrays, tags, blacklists, monthly/daily trending
- **Strengths**: Extensively vast database of uncensored / censored anime
- **Documentation**: [HaniAPI Docs](https://haniapi-docs.vercel.app/)

## Architecture

### Backend (Node.js/TypeScript)
```
src/
├── types/
│   ├── redtube.ts      # RedTube API interfaces
│   ├── apijav.ts       # APIJAV API interfaces
│   ├── eporner.ts      # Eporner API interfaces
│   └── faphouse.ts     # FapHouse service interfaces
├── services/
│   ├── redtubeService.ts   # RedTube API integration
│   ├── apijavService.ts    # APIJAV API integration
│   ├── epornerService.ts   # Eporner API integration
│   ├── faphouseService.ts  # FapHouse simulation
│   ├── hentaioceanService.ts # Hentai Ocean RSS & Scraper integration
│   └── haniApiService.ts   # Hanime.tv API integration
└── server.ts           # Express server with all endpoints
```

### Frontend (React/TypeScript)
```
frontend/src/
├── VideoSearch.tsx     # Unified search interface
├── App.tsx            # Main application
└── main.tsx           # Application entry point
```

## API Endpoints

### RedTube Endpoints
- `GET /api/redtube/search` - Search with tags, ordering, period filters
- `GET /api/redtube/trending` - Trending videos by period

### APIJAV Endpoints
- `GET /api/apijav/search` - Search with studio, actor, category filters
- `GET /api/apijav/trending` - Most viewed videos

### Eporner Endpoints
- `GET /api/eporner/search` - Search with content and quality filters
- `GET /api/eporner/latest` - Latest uploaded videos
- `GET /api/eporner/video/:id` - Single video details

### FapHouse Endpoints
- `GET /api/faphouse/search` - Search with studio, category, quality filters
- `GET /api/faphouse/latest` - Latest videos
- `GET /api/faphouse/trending` - Trending videos
- `GET /api/faphouse/premium` - Premium content only
- `GET /api/faphouse/video/:id` - Single video details

### Legacy Endpoints
- `GET /api/search` - Default search (RedTube)
- `GET /api/trending` - Default trending (RedTube)

## Core Features

### Unified Interface
- **Single Search Bar**: Works across all APIs
- **API Toggle**: Switch between sources with colored buttons
- **Consistent Display**: Unified video card layout
- **Source Identification**: Color-coded badges for each API

### Video Card Display
All video cards display the core requirements:
- **Thumbnail**: High-quality video thumbnail
- **Title**: Full video title
- **Redirect URL**: Direct link to source video page

### Additional Metadata (when available)
- **Duration**: Video length
- **Views**: View count
- **Rating**: User ratings
- **Studio**: Content studio/producer
- **Quality**: Video quality (HD, 4K, SD)
- **Premium Status**: Premium content indicators

## Color Scheme

| API | Color | Hex Code | Emoji |
|-----|-------|----------|-------|
| RedTube | Red | #e53e3e | 🔴 |
| APIJAV | Blue | #2563eb | 🎌 |
| Eporner | Green | #059669 | 🟢 |
| FapHouse | Purple | #7c3aed | 🟣 |
| HentaiOcean | Pink | #db2777 | 🌊 |
| Hanime.tv | Orange | #ea580c | 🔥 |

## Search Capabilities

### RedTube
- Text search across titles and content
- Tag-based filtering
- Sorting by newest, most viewed, rating
- Time period filtering (weekly, monthly, all-time)

### APIJAV
- Text search with comprehensive metadata
- Studio and actor filtering
- Category organization
- High-volume pagination (up to 1000 per page)

### Eporner
- Text search with keyword matching
- Content filtering (gay, low-quality options)
- Multiple sorting options (7 different methods)
- Thumbnail size selection

### FapHouse
- Text search across titles, studios, categories
- Studio-based organization
- Category filtering
- Quality-based filtering (HD, 4K, SD)
- Premium content filtering

## Error Handling

### Comprehensive Error Management
- **API Failures**: Graceful fallbacks with user-friendly messages
- **Network Issues**: Timeout protection and retry logic
- **Invalid Responses**: Data validation and sanitization
- **Missing Content**: Placeholder images and empty state handling

### Logging
- **Request Logging**: All API calls logged with parameters
- **Error Logging**: Detailed error information for debugging
- **Performance Metrics**: Response times and success rates

## Security & Best Practices

### CORS Configuration
- Cross-origin requests enabled for frontend integration
- Proper headers for secure communication

### Input Validation
- Query parameter sanitization
- Type checking for all inputs
- SQL injection prevention (where applicable)

### Rate Limiting Awareness
- Timeout protection for all API calls
- User-Agent headers for proper identification
- Respectful request patterns

## Performance Optimization

### Caching Strategy
- In-memory caching for frequently accessed data
- Thumbnail lazy loading
- Efficient pagination handling

### Response Optimization
- Minimal data transfer with focused interfaces
- Compressed responses where possible
- Efficient error handling

## Development Setup

### Prerequisites
- Node.js 16+
- npm or yarn
- TypeScript knowledge

### Installation
```bash
# Backend setup
npm install
npm run dev

# Frontend setup
cd frontend
npm install
npm run dev
```

### Environment
- Backend runs on `http://localhost:3001`
- Frontend runs on `http://localhost:5173`
- All APIs accessible through unified backend

## Testing

### Manual Testing
1. Start both backend and frontend servers
2. Test each API source using the toggle buttons
3. Verify search functionality across different sources
4. Check error handling with invalid queries

### API Testing
```bash
# Test RedTube
curl "http://localhost:3001/api/redtube/search?q=test"

# Test APIJAV
curl "http://localhost:3001/api/apijav/search?q=test"

# Test Eporner
curl "http://localhost:3001/api/eporner/search?q=test"

# Test FapHouse
curl "http://localhost:3001/api/faphouse/search?q=test"
```

## Future Enhancements

### Potential Improvements
1. **Database Integration**: Persistent storage for favorites and history
2. **User Accounts**: Personal preferences and saved searches
3. **Advanced Filtering**: Cross-API filtering and sorting
4. **Content Aggregation**: Combine results from multiple sources
5. **Mobile Optimization**: Responsive design improvements
6. **Caching Layer**: Redis or similar for improved performance
7. **Analytics**: Usage tracking and performance monitoring

### Additional APIs
- Integration with other adult content APIs
- Custom scraper implementations
- Social features and community integration

## Documentation Files

- `API_IMPLEMENTATION.md` - RedTube API implementation details
- `APIJAV_IMPLEMENTATION.md` - APIJAV API implementation details
- `EPORNER_IMPLEMENTATION.md` - Eporner API implementation details
- `FAPHOUSE_IMPLEMENTATION.md` - FapHouse service implementation details
- `HENTAIOCEAN_IMPLEMENTATION.md` - Hentai Ocean service implementation details
- `HANIAPI_IMPLEMENTATION.md` - Hanime.tv service implementation details
- `MULTI_API_OVERVIEW.md` - This comprehensive overview
- `MULTI_API_OVERVIEW.md` - This comprehensive overview

## License & Usage

This implementation is for educational and development purposes. Ensure compliance with all applicable terms of service for the integrated APIs and respect rate limiting guidelines.