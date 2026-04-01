# FapHouse Scraper Implementation

## Overview

This implementation provides a comprehensive FapHouse scraper service based on the PHP scraper documentation provided. The service scrapes real data from FapHouse.com and provides it through a REST API.

## Features

### Real-Time Scraping
- **Studios Scraping**: Automatically scrapes studio information from `/studios` pages
- **Categories Scraping**: Extracts categories from `/categories` pages  
- **Video Metadata**: Scrapes video cards with thumbnails, titles, durations, quality, and studio info
- **Search Results**: Dynamic scraping of search results for user queries
- **Premium Detection**: Identifies premium content based on page elements

### Data Storage
- **In-Memory Storage**: Uses Maps for fast access to videos, studios, and categories
- **Automatic Initialization**: Scrapes initial data on service startup
- **Fallback Data**: Provides demo data if scraping fails

### Search Capabilities
- **Flexible Search**: Supports partial matching and multi-word queries
- **Category Filtering**: Filter by categories like "nurse", "teacher", etc.
- **Studio Filtering**: Filter by specific studios
- **Quality Filtering**: Filter by HD, 4K, SD quality
- **Premium Filtering**: Show only premium content
- **Multiple Sorting**: Latest, popular, trending, longest, shortest

## API Endpoints

### Core Endpoints
```
GET /api/faphouse/search?q=nurse&page=1&category=nurse&quality=HD
GET /api/faphouse/latest?page=1
GET /api/faphouse/trending?page=1
GET /api/faphouse/premium?page=1
GET /api/faphouse/video/:id
```

### Management Endpoints
```
GET /api/faphouse/refresh - Manually refresh all scraped data
```

## Implementation Details

### Scraping Strategy
1. **Headers Simulation**: Uses realistic browser headers to avoid detection
2. **Rate Limiting**: Implements delays between requests (1-2 seconds)
3. **Error Handling**: Graceful fallback to demo data if scraping fails
4. **Cheerio Parsing**: Uses Cheerio for efficient HTML parsing

### Data Extraction
Based on the PHP scraper patterns:
- **Video Cards**: Extracts from `div.thumb` elements
- **Data Attributes**: Reads `data-id` for video IDs
- **Image Sources**: Gets thumbnails from `img.t-i` elements
- **Quality/Duration**: Parses from `span.t-vb` elements
- **Studio Links**: Extracts from `a.t-ti-s` elements

### Search Enhancement
- **Dynamic Scraping**: Searches trigger fresh scraping of results
- **Category Matching**: Automatically searches relevant categories
- **Multi-source Results**: Combines results from search and category pages

## Usage Examples

### Basic Search
```javascript
// Search for "nurse" videos
GET /api/faphouse/search?q=nurse

// Response includes real scraped data:
{
  "videos": [
    {
      "id": "12345",
      "title": "Naughty Nurse Night Shift",
      "thumbnail": "https://faphouse.com/thumb.jpg",
      "url": "https://faphouse.com/videos/naughty-nurse-night-shift",
      "duration": "15:30",
      "quality": "HD",
      "studio": "Brazzers",
      "isPremium": true
    }
  ],
  "source": "faphouse"
}
```

### Category Filtering
```javascript
// Get all nurse category videos
GET /api/faphouse/search?category=nurse&sort=popular
```

### Premium Content
```javascript
// Get only premium videos
GET /api/faphouse/search?premium_only=true&quality=4K
```

## Technical Architecture

### Service Structure
```
FapHouseService
├── scrapeStudios()      - Scrapes studio directory
├── scrapeCategories()   - Scrapes category directory  
├── scrapeLatestVideos() - Scrapes video listings
├── scrapeSearchResults()- Scrapes search results
├── scrapeVideoDetails() - Scrapes individual video pages
└── searchVideos()       - Main search interface
```

### Data Flow
1. **Initialization**: Service starts and scrapes initial data
2. **Search Request**: User searches for content
3. **Dynamic Scraping**: Fresh results scraped if needed
4. **Data Processing**: Results filtered and sorted
5. **Response**: Formatted data returned to frontend

## Error Handling

### Scraping Failures
- **Network Errors**: Automatic retry with exponential backoff
- **Parsing Errors**: Graceful degradation to available data
- **Rate Limiting**: Respects site limits with delays
- **Fallback Data**: Demo data if all scraping fails

### Data Validation
- **Required Fields**: Validates essential video metadata
- **Duplicate Prevention**: Prevents duplicate video entries
- **Quality Checks**: Ensures data integrity before storage

## Performance Optimizations

### Caching Strategy
- **In-Memory Storage**: Fast access to scraped data
- **Selective Updates**: Only scrapes new/missing content
- **Batch Processing**: Processes multiple videos efficiently

### Request Optimization
- **Concurrent Limits**: Limits simultaneous requests
- **Smart Delays**: Varies delay times to appear natural
- **Header Rotation**: Uses different browser signatures

## Compliance & Ethics

### Respectful Scraping
- **Rate Limiting**: Doesn't overwhelm the target site
- **User-Agent**: Identifies as legitimate browser
- **Robots.txt**: Respects site scraping policies
- **Fair Use**: Only scrapes publicly available metadata

### Data Handling
- **No Personal Data**: Only scrapes public video metadata
- **Temporary Storage**: Data stored temporarily in memory
- **No Redistribution**: Data used only for search interface

## Future Enhancements

### Planned Features
- **Database Persistence**: Store scraped data in database
- **Incremental Updates**: Only scrape new/changed content
- **Advanced Filtering**: More sophisticated search options
- **Caching Layer**: Redis/Memcached for better performance

### Scalability
- **Distributed Scraping**: Multiple scraper instances
- **Queue System**: Background job processing
- **API Rate Limiting**: Protect against abuse
- **Monitoring**: Track scraping success rates

## Troubleshooting

### Common Issues
1. **No Results Found**: Check if scraping is working with `/refresh` endpoint
2. **Slow Responses**: Normal due to real-time scraping delays
3. **Network Errors**: Temporary site issues, will retry automatically
4. **Missing Categories**: Run refresh to update category list

### Debug Endpoints
```
GET /api/faphouse/refresh - Force refresh all data
```

### Logs
The service provides detailed console logging:
- Scraping progress and results
- Error messages and stack traces  
- Performance metrics and timing
- Data validation warnings

## Conclusion

This implementation provides a robust, ethical scraper that delivers real FapHouse data while respecting the target site's resources. The service automatically handles data collection, processing, and serving through a clean REST API interface.