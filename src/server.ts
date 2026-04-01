import express from 'express';
import cors from 'cors';
import redtubeService from './services/redtubeService';
import apijavService from './services/apijavService';
import epornerService from './services/epornerService';
import faphouseService from './services/faphouseService';
import hentaioceanService from './services/hentaioceanService';
import haniApiService from './services/haniApiService';
import { RedTubeSearchParams } from './types/redtube';
import { ApiJavSearchParams } from './types/apijav';
import { EpornerSearchParams } from './types/eporner';
import { FapHouseSearchParams } from './types/faphouse';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ===== REDTUBE API ENDPOINTS =====

// Enhanced search endpoint with full parameter support
app.get('/api/redtube/search', async (req, res) => {
  try {
    const { 
      q: search, 
      page = '1', 
      tags, 
      thumbsize, 
      ordering, 
      period 
    } = req.query;
    
    const pageNum = parseInt(page as string) || 1;
    
    // Parse tags if provided (can be comma-separated string or array)
    let tagsArray: string[] | undefined;
    if (tags) {
      if (typeof tags === 'string') {
        tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
      } else if (Array.isArray(tags)) {
        tagsArray = tags.map(tag => String(tag).trim()).filter(Boolean);
      }
    }

    const searchParams: RedTubeSearchParams = {
      page: pageNum,
      thumbsize: thumbsize as any || 'big'
    };

    if (search && typeof search === 'string' && search.trim()) {
      searchParams.search = search.trim();
    }

    if (tagsArray && tagsArray.length > 0) {
      searchParams.tags = tagsArray;
    }

    if (ordering && ['newest', 'mostviewed', 'rating'].includes(ordering as string)) {
      searchParams.ordering = ordering as any;
    }

    if (period && ['weekly', 'monthly', 'alltime'].includes(period as string)) {
      searchParams.period = period as any;
    }
    
    console.log(`RedTube search request with params:`, searchParams);
    
    const videos = await redtubeService.searchVideos(searchParams);
    
    res.json({
      videos,
      query: search || 'all',
      page: pageNum,
      count: videos.length,
      params: searchParams,
      source: 'redtube'
    });
  } catch (error) {
    console.error('RedTube search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Trending videos endpoint
app.get('/api/redtube/trending', async (req, res) => {
  try {
    const { page = '1', period = 'weekly' } = req.query;
    const pageNum = parseInt(page as string) || 1;
    const periodValue = ['weekly', 'monthly', 'alltime'].includes(period as string) 
      ? period as 'weekly' | 'monthly' | 'alltime' 
      : 'weekly';
    
    console.log(`RedTube trending request: page=${pageNum}, period=${periodValue}`);

    const videos = await redtubeService.getTrendingVideos(pageNum, periodValue);
    
    res.json({
      videos,
      page: pageNum,
      period: periodValue,
      count: videos.length,
      source: 'redtube'
    });
  } catch (error) {
    console.error('RedTube trending error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== APIJAV API ENDPOINTS =====

// APIJAV search endpoint
app.get('/api/apijav/search', async (req, res) => {
  try {
    const { 
      q: search, 
      page = '1', 
      category,
      tag,
      actor,
      studio,
      orderby = 'date',
      order = 'DESC',
      per_page = '20'
    } = req.query;
    
    const pageNum = parseInt(page as string) || 1;
    const perPageNum = Math.min(parseInt(per_page as string) || 20, 1000); // Max 1000 per API docs

    const searchParams: ApiJavSearchParams = {
      page: pageNum,
      per_page: perPageNum,
      orderby: orderby as any || 'date',
      order: order as any || 'DESC'
    };

    if (search && typeof search === 'string' && search.trim()) {
      searchParams.search = search.trim();
    }

    if (category && typeof category === 'string') {
      searchParams.category = category;
    }

    if (tag && typeof tag === 'string') {
      searchParams.tag = tag;
    }

    if (actor && typeof actor === 'string') {
      searchParams.actor = actor;
    }

    if (studio && typeof studio === 'string') {
      searchParams.studio = studio;
    }
    
    console.log(`APIJAV search request with params:`, searchParams);
    
    const videos = await apijavService.searchVideos(searchParams);
    
    res.json({
      videos,
      query: search || 'all',
      page: pageNum,
      per_page: perPageNum,
      count: videos.length,
      params: searchParams,
      source: 'apijav'
    });
  } catch (error) {
    console.error('APIJAV search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// APIJAV trending videos
app.get('/api/apijav/trending', async (req, res) => {
  try {
    const { page = '1' } = req.query;
    const pageNum = parseInt(page as string) || 1;
    
    console.log(`APIJAV trending request: page=${pageNum}`);

    const videos = await apijavService.getTrendingVideos(pageNum);
    
    res.json({
      videos,
      page: pageNum,
      count: videos.length,
      source: 'apijav'
    });
  } catch (error) {
    console.error('APIJAV trending error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== EPORNER API ENDPOINTS =====

// Eporner search endpoint
app.get('/api/eporner/search', async (req, res) => {
  try {
    const { 
      q: query, 
      page = '1', 
      per_page = '20',
      thumbsize = 'big',
      order = 'latest',
      gay = '0',
      lq = '0'
    } = req.query;
    
    const pageNum = parseInt(page as string) || 1;
    const perPageNum = parseInt(per_page as string) || 20;

    const searchParams: EpornerSearchParams = {
      page: pageNum,
      per_page: perPageNum,
      thumbsize: thumbsize as any || 'big',
      order: order as any || 'latest',
      gay: parseInt(gay as string) as 0 | 1 || 0,
      lq: parseInt(lq as string) as 0 | 1 || 0
    };

    if (query && typeof query === 'string' && query.trim()) {
      searchParams.query = query.trim();
    }
    
    console.log(`Eporner search request with params:`, searchParams);
    
    const videos = await epornerService.searchVideos(searchParams);
    
    res.json({
      videos,
      query: query || 'all',
      page: pageNum,
      per_page: perPageNum,
      count: videos.length,
      params: searchParams,
      source: 'eporner'
    });
  } catch (error) {
    console.error('Eporner search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Eporner latest videos
app.get('/api/eporner/latest', async (req, res) => {
  try {
    const { page = '1' } = req.query;
    const pageNum = parseInt(page as string) || 1;
    
    console.log(`Eporner latest request: page=${pageNum}`);

    const videos = await epornerService.getLatestVideos(pageNum);
    
    res.json({
      videos,
      page: pageNum,
      count: videos.length,
      source: 'eporner'
    });
  } catch (error) {
    console.error('Eporner latest error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Eporner top rated videos
app.get('/api/eporner/top-rated', async (req, res) => {
  try {
    const { page = '1' } = req.query;
    const pageNum = parseInt(page as string) || 1;
    
    console.log(`Eporner top-rated request: page=${pageNum}`);

    const videos = await epornerService.getTopRatedVideos(pageNum);
    
    res.json({
      videos,
      page: pageNum,
      count: videos.length,
      source: 'eporner'
    });
  } catch (error) {
    console.error('Eporner top-rated error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Eporner most popular videos
app.get('/api/eporner/popular', async (req, res) => {
  try {
    const { page = '1' } = req.query;
    const pageNum = parseInt(page as string) || 1;
    
    console.log(`Eporner popular request: page=${pageNum}`);

    const videos = await epornerService.getMostPopularVideos(pageNum);
    
    res.json({
      videos,
      page: pageNum,
      count: videos.length,
      source: 'eporner'
    });
  } catch (error) {
    console.error('Eporner popular error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Eporner get single video
app.get('/api/eporner/video/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { thumbsize = 'big' } = req.query;
    
    console.log(`Eporner video request: id=${id}`);

    const video = await epornerService.getVideoById(id, thumbsize as any);
    
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    
    res.json({
      video,
      source: 'eporner'
    });
  } catch (error) {
    console.error('Eporner video error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== FAPHOUSE API ENDPOINTS =====

// FapHouse search endpoint
app.get('/api/faphouse/search', async (req, res) => {
  try {
    const { 
      q: query, 
      page = '1', 
      per_page = '20',
      studio,
      category,
      quality = 'all',
      premium_only = 'false',
      sort = 'latest'
    } = req.query;
    
    const pageNum = parseInt(page as string) || 1;
    const perPageNum = parseInt(per_page as string) || 20;

    const searchParams: FapHouseSearchParams = {
      page: pageNum,
      per_page: perPageNum,
      sort: sort as any || 'latest',
      premium_only: premium_only === 'true'
    };

    if (query && typeof query === 'string' && query.trim()) {
      searchParams.query = query.trim();
    }

    if (studio && typeof studio === 'string') {
      searchParams.studio = studio;
    }

    if (category && typeof category === 'string') {
      searchParams.category = category;
    }

    if (quality && quality !== 'all') {
      searchParams.quality = quality as any;
    }
    
    console.log(`FapHouse search request with params:`, searchParams);
    
    const videos = await faphouseService.searchVideos(searchParams);
    
    res.json({
      videos,
      query: query || 'all',
      page: pageNum,
      per_page: perPageNum,
      count: videos.length,
      params: searchParams,
      source: 'faphouse'
    });
  } catch (error) {
    console.error('FapHouse search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// FapHouse latest videos
app.get('/api/faphouse/latest', async (req, res) => {
  try {
    const { page = '1' } = req.query;
    const pageNum = parseInt(page as string) || 1;
    
    console.log(`FapHouse latest request: page=${pageNum}`);

    const videos = await faphouseService.getLatestVideos(pageNum);
    
    res.json({
      videos,
      page: pageNum,
      count: videos.length,
      source: 'faphouse'
    });
  } catch (error) {
    console.error('FapHouse latest error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// FapHouse trending videos
app.get('/api/faphouse/trending', async (req, res) => {
  try {
    const { page = '1' } = req.query;
    const pageNum = parseInt(page as string) || 1;
    
    console.log(`FapHouse trending request: page=${pageNum}`);

    const videos = await faphouseService.getTrendingVideos(pageNum);
    
    res.json({
      videos,
      page: pageNum,
      count: videos.length,
      source: 'faphouse'
    });
  } catch (error) {
    console.error('FapHouse trending error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// FapHouse premium videos
app.get('/api/faphouse/premium', async (req, res) => {
  try {
    const { page = '1' } = req.query;
    const pageNum = parseInt(page as string) || 1;
    
    console.log(`FapHouse premium request: page=${pageNum}`);

    const videos = await faphouseService.getPremiumVideos(pageNum);
    
    res.json({
      videos,
      page: pageNum,
      count: videos.length,
      source: 'faphouse'
    });
  } catch (error) {
    console.error('FapHouse premium error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// FapHouse refresh scraped data
app.get('/api/faphouse/refresh', async (req, res) => {
  try {
    console.log('Manual refresh of FapHouse scraped data requested');
    
    await faphouseService.refreshScrapedData();
    
    res.json({
      success: true,
      message: 'FapHouse scraped data refreshed successfully',
      timestamp: new Date().toISOString(),
      source: 'faphouse'
    });
  } catch (error) {
    console.error('FapHouse refresh error:', error);
    res.status(500).json({ error: 'Failed to refresh scraped data' });
  }
});

// FapHouse get single video
app.get('/api/faphouse/video/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`FapHouse video request: id=${id}`);

    const video = await faphouseService.getVideoById(id);
    
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    
    res.json({
      video,
      source: 'faphouse'
    });
  } catch (error) {
    console.error('FapHouse video error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== HENTAI OCEAN API ENDPOINTS =====

// HentaiOcean search endpoint
app.get('/api/hentaiocean/search', async (req, res) => {
  try {
    const { q: query, page = '1', per_page = '20' } = req.query;
    const pageNum = parseInt(page as string) || 1;
    const perPageNum = parseInt(per_page as string) || 20;

    console.log(`HentaiOcean search request: query="${query}", page=${pageNum}`);

    const videos = await hentaioceanService.searchVideos({
      query: query as string | undefined,
      page: pageNum,
      per_page: perPageNum,
    });

    res.json({
      videos,
      query: query || 'latest',
      page: pageNum,
      count: videos.length,
      source: 'hentaiocean',
    });
  } catch (error) {
    console.error('HentaiOcean search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// HentaiOcean latest videos endpoint
app.get('/api/hentaiocean/latest', async (req, res) => {
  try {
    const { page = '1', per_page = '20' } = req.query;
    const pageNum = parseInt(page as string) || 1;
    const perPageNum = parseInt(per_page as string) || 20;

    console.log(`HentaiOcean latest request: page=${pageNum}`);

    const videos = await hentaioceanService.getLatestVideos(pageNum, perPageNum);

    res.json({
      videos,
      page: pageNum,
      count: videos.length,
      source: 'hentaiocean',
    });
  } catch (error) {
    console.error('HentaiOcean latest error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// HentaiOcean single hentai by slug
app.get('/api/hentaiocean/video/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(`HentaiOcean video request: slug=${slug}`);

    const video = await hentaioceanService.getVideoBySlug(slug);

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json({ video, source: 'hentaiocean' });
  } catch (error) {
    console.error('HentaiOcean video error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== HANIAPI (HANIME.TV) ENDPOINTS =====

// HaniAPI search — uses POST internally, exposed as GET for consistency
app.get('/api/haniapi/search', async (req, res) => {
  try {
    const { q: query, page = '0', order_by = 'views', ordering = 'desc' } = req.query;
    const pageNum = parseInt(page as string) || 0;

    console.log(`HaniAPI search request: query="${query}", page=${pageNum}`);

    const videos = await haniApiService.searchVideos({
      search: (query as string) || '',
      order_by: (order_by as any) || 'views',
      ordering: (ordering as any) || 'desc',
      page: pageNum,
    });

    res.json({
      videos,
      query: query || 'newest',
      page: pageNum,
      count: videos.length,
      source: 'haniapi',
    });
  } catch (error) {
    console.error('HaniAPI search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// HaniAPI newest videos
app.get('/api/haniapi/newest', async (req, res) => {
  try {
    const { page = '0' } = req.query;
    const pageNum = parseInt(page as string) || 0;

    const videos = await haniApiService.getNewestVideos(pageNum);
    res.json({ videos, page: pageNum, count: videos.length, source: 'haniapi' });
  } catch (error) {
    console.error('HaniAPI newest error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// HaniAPI trending videos
app.get('/api/haniapi/trending', async (req, res) => {
  try {
    const { page = '0', time = 'month' } = req.query;
    const pageNum = parseInt(page as string) || 0;

    const videos = await haniApiService.getTrendingVideos(pageNum, time as string);
    res.json({ videos, page: pageNum, count: videos.length, source: 'haniapi' });
  } catch (error) {
    console.error('HaniAPI trending error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// HaniAPI single video info
app.get('/api/haniapi/video/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const info = await haniApiService.getVideoInfo(slug);
    if (!info) return res.status(404).json({ error: 'Video not found' });
    res.json({ info, source: 'haniapi' });
  } catch (error) {
    console.error('HaniAPI video info error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== LEGACY ENDPOINTS (for backward compatibility) =====

// Legacy search endpoint (defaults to RedTube)
app.get('/api/search', async (req, res) => {
  try {
    const { q: query = '', page = '1' } = req.query;
    const pageNum = parseInt(page as string) || 1;
    
    console.log(`Legacy search request: query="${query}", page=${pageNum}`);
    
    let videos;
    if (query && typeof query === 'string' && query.trim()) {
      videos = await redtubeService.searchVideos({ search: query, page: pageNum });
    } else {
      videos = await redtubeService.getTrendingVideos(pageNum);
    }
    
    res.json({
      videos,
      query: query || 'trending',
      page: pageNum,
      count: videos.length,
      source: 'redtube'
    });
  } catch (error) {
    console.error('Legacy search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Legacy trending endpoint (defaults to RedTube)
app.get('/api/trending', async (req, res) => {
  try {
    const { page = '1' } = req.query;
    const pageNum = parseInt(page as string) || 1;
    
    console.log(`Legacy trending request: page=${pageNum}`);

    const videos = await redtubeService.getTrendingVideos(pageNum);
    
    res.json({
      videos,
      page: pageNum,
      count: videos.length,
      source: 'redtube'
    });
  } catch (error) {
    console.error('Legacy trending error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Only start the server if we're not running on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Multi-API Video Server running on http://localhost:${PORT}`);
    console.log(`📡 HentaiOcean API endpoints:`);
    console.log(`   GET /api/hentaiocean/latest?page=1&per_page=20`);
    console.log(`   GET /api/hentaiocean/search?q=query&page=1`);
    console.log(`   GET /api/hentaiocean/video/:slug`);
    console.log(`📡 RedTube API endpoints:`);
    console.log(`   GET /api/redtube/search?q=query&page=1&tags=tag1,tag2&ordering=newest&period=weekly`);
    console.log(`   GET /api/redtube/trending?page=1&period=weekly`);
    console.log(`📡 APIJAV API endpoints:`);
    console.log(`   GET /api/apijav/search?q=query&page=1&category=Uncensored&studio=Prestige&actor=name`);
    console.log(`   GET /api/apijav/trending?page=1`);
    console.log(`📡 Eporner API endpoints:`);
    console.log(`   GET /api/eporner/search?q=query&page=1&order=latest&gay=0&lq=0`);
    console.log(`   GET /api/eporner/latest?page=1`);
    console.log(`   GET /api/eporner/top-rated?page=1`);
    console.log(`   GET /api/eporner/popular?page=1`);
    console.log(`   GET /api/eporner/video/:id?thumbsize=big`);
    console.log(`📡 FapHouse API endpoints:`);
    console.log(`   GET /api/faphouse/search?q=query&page=1&studio=brazzers&category=hardcore&quality=HD`);
    console.log(`   GET /api/faphouse/latest?page=1`);
    console.log(`   GET /api/faphouse/trending?page=1`);
    console.log(`   GET /api/faphouse/premium?page=1`);
    console.log(`   GET /api/faphouse/video/:id`);
    console.log(`   GET /api/faphouse/refresh (manually refresh scraped data)`);
    console.log(`📡 Legacy endpoints (RedTube):`);
    console.log(`   GET /api/search?q=query&page=1`);
    console.log(`   GET /api/trending?page=1`);
    console.log(`   GET /health`);
  });
}

// Export the Express API
export default app;