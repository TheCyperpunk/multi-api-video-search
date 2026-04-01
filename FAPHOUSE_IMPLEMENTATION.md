# FapHouse API Implementation

## Overview
Implementation of a FapHouse service based on the scraper documentation from https://github.com/babepedia/faphouse. Since FapHouse doesn't provide a public API, this implementation simulates the scraper functionality with in-memory data storage.

## Scraper Analysis Summary

### Original Scraper Features
- **PHP-based web scraper** for FapHouse content
- **Database storage** using MySQL/MariaDB
- **Studio and category crawling** with organized data structure
- **Premium content detection** and filtering
- **Pagination handling** and duplicate prevention
- **Video metadata extraction** including titles, slugs, durations, quality

### Database Structure (Original)
- `faphouse`: Video metadata storage
- `faphouse_studios`: Studio information
- `faphouse_cats`: Category information

## Implementation Details

### Simulated Service Architecture
Since no public API exists, this implementation provides:
- **In-memory data storage** simulating database functionality
- **Sample data generation** with realistic video metadata
- **Full search and filtering capabilities** matching scraper functionality
- **Studio and category management** with predefined data

### Backend Endpoints (Node.js/TypeScript)

#### FapHouse Endpoints
- `GET /api/faphouse/search` - Advanced search with studio, category, quality filters
- `GET /api/faphouse/latest` - Latest uploaded videos
- `GET /api/faphouse/trending` - Trending videos (views × rating algorithm)
- `GET /api/faphouse/popular` - Most viewed videos
- `GET /api/faphouse/premium` - Premium content only
- `GET /api/faphouse/studio/:studio` - Videos by specific studio
- `GET /api/faphouse/category/:category` - Videos by category
- `GET /api/faphouse/hd` - HD quality videos only
- `GET /api/faphouse/4k` - 4K quality videos only
- `GET /api/faphouse/video/:id` - Single video details

#### Multi-API Support
- **RedTube**: `/api/redtube/*` endpoints
- **APIJAV**: `/api/apijav/*` endpoints  
- **Eporner**: `/api/eporner/*` endpoints
- **FapHouse**: `/api/faphouse/*` endpoints
- **Legacy**: `/api/*` endpoints (RedTube compatibility)

### Frontend Features

#### Quad-API Interface
- Toggle between RedTube, APIJAV, Eporner, and FapHouse APIs
- Purple color scheme for FapHouse (🟣)
- Unified video card display with source-specific branding
- Consistent search experience across all APIs

#### Core Display Elements
- **Thumbnail**: High-quality video thumbnails
- **Title**: Full video titles with studio branding
- **Redirect URL**: Direct links to video pages
- **Source Badge**: API source identification with color coding
- **Duration**: Video length display
- **Quality Indicators**: HD, 4K, SD quality badges
- **Premium Badges**: Special marking for premium content
- **Studio Information**: Studio name and branding

### Service Layer

#### FapHouseService Methods
```typescript
searchVideos(params) // General search with filters
getVideoById(id) // Single video retrieval
getLatestVideos(page) // Latest uploads
getPopularVideos(page) // Most viewed
getTrendingVideos(page) // Trending algorithm
getPremiumVideos(page) // Premium content only
getVideosByStudio(studio, page) // Studio filtering
getVideosByCategory(category, page) // Category filtering
getHDVideos(page) // HD quality filter
get4KVideos(page) // 4K quality filter
getStudios() // Available studios list
getCategories() // Available categories list
checkVideoExists(videoId) // Duplicate checking (mimics scraper)
getVideoCount() // Total video count
```

### Search Parameters

#### Available Filters
- **query**: Search term across titles, studios, categories
- **page**: Page number for pagination
- **per_page**: Results per page
- **studio**: Filter by studio name or slug
- **category**: Filter by category name or slug
- **quality**: Filter by quality (HD, 4K, SD, all)
- **premium_only**: Show only premium content
- **sort**: Sort order (latest, popular, trending, longest, shortest)

#### Sample Data Structure
```typescript
{
  id: "fh_000001",
  title: "Hot Blonde Gets Hardcore Action - Brazzers",
  slug: "hot-blonde-gets-hardcore-action-1",
  duration: "25:30",
  quality: "HD",
  thumbnail: "https://cdn.faphouse.com/thumbs/1/thumb_5.jpg",
  url: "https://faphouse.com/video/1/hot-blonde-gets-hardcore-action",
  studio: "Brazzers",
  category: "Hardcore",
  is_premium: false,
  views: 245678,
  rating: "4.2"
}
```

### Simulated Studios
- **Brazzers**: Premium hardcore content
- **Reality Kings**: Reality-based scenarios
- **Naughty America**: American adult content
- **Digital Playground**: High-production content
- **Evil Angel**: Gonzo-style content

### Simulated Categories
- **Hardcore**: Intense adult content
- **Anal**: Anal-focused content
- **MILF**: Mature women content
- **Teen**: Young adult content (18+)
- **Big Tits**: Large breast content
- **Blonde/Brunette**: Hair color categories

### Error Handling
- Comprehensive service error logging
- Graceful fallbacks for missing data
- 404 handling for non-existent videos
- Simulated API delays for realistic behavior
- Input validation and sanitization

### Security & Best Practices
- CORS enabled for cross-origin requests
- Input validation and sanitization
- Proper error responses
- Safe data generation and storage
- Premium content filtering

## Usage Examples

### Search Videos
```bash
# General search
GET /api/faphouse/search?q=blonde&page=1

# Studio filter
GET /api/faphouse/search?studio=brazzers&quality=HD

# Category filter
GET /api/faphouse/search?category=hardcore&premium_only=true

# Quality and sorting
GET /api/faphouse/search?quality=4K&sort=popular
```

### Specialized Endpoints
```bash
# Latest videos
GET /api/faphouse/latest?page=1

# Trending videos
GET /api/faphouse/trending?page=1

# Premium content only
GET /api/faphouse/premium?page=1

# Studio-specific content
GET /api/faphouse/studio/brazzers?page=1

# Category-specific content
GET /api/faphouse/category/hardcore?page=1

# Quality-specific content
GET /api/faphouse/hd?page=1
GET /api/faphouse/4k?page=1
```

## Files Created/Modified

### New Files
- `src/types/faphouse.ts` - Complete TypeScript interfaces
- `src/services/faphouseService.ts` - Simulated service implementation
- `FAPHOUSE_IMPLEMENTATION.md` - This documentation

### Modified Files
- `src/server.ts` - Added FapHouse endpoints alongside other APIs
- `frontend/src/VideoSearch.tsx` - Quad API interface with FapHouse support

## Key Features of FapHouse Implementation

1. **Premium Content Detection**: Identifies and filters premium content
2. **Studio Organization**: Content organized by major adult studios
3. **Quality Filtering**: HD, 4K, SD quality options
4. **Category System**: Comprehensive category organization
5. **Trending Algorithm**: Views × rating calculation for trending content
6. **Realistic Data**: Sample data mimics real FapHouse content structure
7. **Scraper Simulation**: Mimics original PHP scraper functionality

## Key Differences from Other APIs

1. **Premium Content**: Explicit premium/free content distinction
2. **Studio Focus**: Heavy emphasis on studio branding and organization
3. **Quality Emphasis**: Multiple quality tiers with filtering
4. **Simulated Data**: Uses generated data instead of live API calls
5. **Scraper Heritage**: Based on scraper architecture rather than API
6. **Content Organization**: Studio and category-first approach

## Testing

The implementation includes comprehensive functionality and can be tested with:
1. Start backend: `npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Switch between APIs using the toggle buttons (🟣 FapHouse API)
4. Test search functionality with studio, category, and quality filters

## Notes

- **Simulated Service**: This is not a real API but a simulation based on scraper documentation
- **Sample Data**: Uses generated sample data for demonstration purposes
- **Premium Content**: Includes premium content detection and filtering
- **Studio Branding**: Emphasizes studio organization and branding
- **Quality Focus**: Multiple quality tiers for different user preferences
- **Scraper Compatibility**: Maintains compatibility with original scraper concepts
- **No Rate Limiting**: No rate limiting implemented in simulation
- **In-Memory Storage**: Data stored in memory, resets on server restart

## Future Enhancements

If implementing a real scraper integration:
1. **Database Integration**: Connect to MySQL/MariaDB as per original design
2. **Real Scraping**: Implement actual web scraping functionality
3. **Rate Limiting**: Add appropriate delays between requests
4. **Caching**: Implement caching for frequently accessed data
5. **Error Recovery**: Add robust error handling for scraping failures
6. **Content Updates**: Implement periodic content updates and synchronization