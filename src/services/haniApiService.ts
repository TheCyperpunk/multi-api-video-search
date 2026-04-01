import axios from 'axios';
import {
  HaniLandingResponse,
  HaniVideo,
  HaniVideoData,
  HaniSearchParams,
  HaniInfoResponse,
} from '../types/haniapi';

class HaniApiService {
  private readonly baseUrl = 'https://haniapi.vercel.app';
  private readonly hanimeBase = 'https://hanime.tv/videos/hentai';

  // Build the hanime.tv watch URL from a slug
  private watchUrl(slug: string): string {
    return `${this.hanimeBase}/${slug}`;
  }

  // Map the raw API video object to our unified VideoData shape
  private formatVideo(v: HaniVideo): HaniVideoData {
    return {
      id: v.slug,
      title: v.name,
      thumbnail: v.cover_url || v.poster_url || '',
      url: this.watchUrl(v.slug),
      views: v.views,
      tags: v.tags || [],
      brand: v.brand,
      isCensored: v.is_censored,
      releaseDate: v.released_at,
    };
  }

  // GET /getLanding/newest
  async getNewestVideos(page: number = 0): Promise<HaniVideoData[]> {
    try {
      console.log(`HaniAPI: fetching newest (page ${page})`);
      const response = await axios.get<HaniLandingResponse | HaniVideo[]>(
        `${this.baseUrl}/getLanding/newest`,
        {
          params: { p: page },
          timeout: 12000,
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VideoSearchBot/1.0)' },
        }
      );
      const list: HaniVideo[] = Array.isArray(response.data)
        ? (response.data as HaniVideo[])
        : (response.data as HaniLandingResponse).results || [];

      console.log(`HaniAPI: got ${list.length} newest videos`);
      return list.map((v) => this.formatVideo(v));
    } catch (error) {
      console.error('HaniAPI getNewestVideos error:', error);
      return [];
    }
  }

  // GET /getLanding/recent
  async getRecentVideos(page: number = 0): Promise<HaniVideoData[]> {
    try {
      console.log(`HaniAPI: fetching recent (page ${page})`);
      const response = await axios.get<HaniLandingResponse | HaniVideo[]>(
        `${this.baseUrl}/getLanding/recent`,
        {
          params: { p: page },
          timeout: 12000,
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VideoSearchBot/1.0)' },
        }
      );
      const list: HaniVideo[] = Array.isArray(response.data)
        ? (response.data as HaniVideo[])
        : (response.data as HaniLandingResponse).results || [];

      console.log(`HaniAPI: got ${list.length} recent videos`);
      return list.map((v) => this.formatVideo(v));
    } catch (error) {
      console.error('HaniAPI getRecentVideos error:', error);
      return [];
    }
  }

  // GET /getLanding/trending?time=week&p=0
  async getTrendingVideos(page: number = 0, time: string = 'month'): Promise<HaniVideoData[]> {
    try {
      console.log(`HaniAPI: fetching trending (time=${time}, page=${page})`);
      const response = await axios.get<HaniLandingResponse | HaniVideo[]>(
        `${this.baseUrl}/getLanding/trending`,
        {
          params: { p: page, time },
          timeout: 12000,
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VideoSearchBot/1.0)' },
        }
      );
      const list: HaniVideo[] = Array.isArray(response.data)
        ? (response.data as HaniVideo[])
        : (response.data as HaniLandingResponse).results || [];

      console.log(`HaniAPI: got ${list.length} trending videos`);
      return list.map((v) => this.formatVideo(v));
    } catch (error) {
      console.error('HaniAPI getTrendingVideos error:', error);
      return [];
    }
  }

  // POST /search with body params
  async searchVideos(params: HaniSearchParams): Promise<HaniVideoData[]> {
    const { search, tags = [], brands = [], blacklist = [], order_by = 'views', ordering = 'desc', page = 0 } = params;

    if (!search || !search.trim()) {
      // No query → return newest as default
      return this.getNewestVideos(page);
    }

    try {
      console.log(`HaniAPI: searching for "${search}" (page ${page})`);
      const response = await axios.post<{ page: number; results: HaniVideo[] } | HaniVideo[]>(
        `${this.baseUrl}/search`,
        { search: search.trim(), tags, brands, blacklist, order_by, ordering, page },
        {
          timeout: 15000,
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (compatible; VideoSearchBot/1.0)',
          },
        }
      );

      const list: HaniVideo[] = Array.isArray(response.data)
        ? (response.data as HaniVideo[])
        : ((response.data as { page: number; results: HaniVideo[] }).results || []);
      console.log(`HaniAPI: search returned ${list.length} results`);
      return list.map((v) => this.formatVideo(v));
    } catch (error) {
      console.error('HaniAPI searchVideos error:', error);
      return [];
    }
  }

  // GET /getInfo/:slug — detailed metadata for a single video
  async getVideoInfo(slug: string): Promise<HaniInfoResponse | null> {
    try {
      console.log(`HaniAPI: getting info for slug "${slug}"`);
      const response = await axios.get<HaniInfoResponse>(
        `${this.baseUrl}/getInfo/${slug}`,
        {
          timeout: 10000,
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VideoSearchBot/1.0)' },
        }
      );
      return response.data;
    } catch (error) {
      console.error('HaniAPI getVideoInfo error:', error);
      return null;
    }
  }
}

export default new HaniApiService();
