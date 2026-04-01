import axios from 'axios';
import { EpornerSearchResponse, EpornerVideo, EpornerVideoData, EpornerSearchParams, EpornerVideoResponse, EpornerRemovedResponse } from '../types/eporner';

class EpornerService {
  private readonly baseUrl = 'https://www.eporner.com/api/v2/video';

  async searchVideos(searchParams: EpornerSearchParams = {}): Promise<EpornerVideoData[]> {
    try {
      const params: any = {
        per_page: searchParams.per_page || 20,
        page: searchParams.page || 1,
        thumbsize: searchParams.thumbsize || 'big',
        format: 'json',
        order: searchParams.order || 'latest'
      };

      // Add optional search parameters
      if (searchParams.query) {
        params.query = searchParams.query;
      }

      if (searchParams.gay !== undefined) {
        params.gay = searchParams.gay;
      }

      if (searchParams.lq !== undefined) {
        params.lq = searchParams.lq;
      }

      console.log(`Fetching Eporner videos with params:`, params);
      
      const response = await axios.get<EpornerSearchResponse>(`${this.baseUrl}/search/`, {
        params,
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; VideoSearchBot/1.0)'
        }
      });

      if (!response.data || !response.data.videos || !Array.isArray(response.data.videos)) {
        console.log('No videos found in response');
        return [];
      }

      const videos = response.data.videos.map(video => this.formatVideo(video));
      console.log(`Found ${videos.length} videos from Eporner (${response.data.total_count} total)`);
      
      return videos;
    } catch (error) {
      console.error('Eporner API error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
      }
      return [];
    }
  }

  async getVideoById(id: string, thumbsize: 'small' | 'medium' | 'big' = 'big'): Promise<EpornerVideoData | null> {
    try {
      console.log(`Fetching Eporner video by ID: ${id}`);
      
      const response = await axios.get<EpornerVideoResponse>(`${this.baseUrl}/id/`, {
        params: {
          id,
          thumbsize,
          format: 'json'
        },
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; VideoSearchBot/1.0)'
        }
      });

      if (!response.data || !response.data.id) {
        console.log('Video not found or removed');
        return null;
      }

      return this.formatVideo(response.data);
    } catch (error) {
      console.error('Eporner get video error:', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log('Video not found (404)');
        return null;
      }
      return null;
    }
  }

  async getRemovedVideos(): Promise<string[]> {
    try {
      console.log('Fetching Eporner removed videos list');
      
      const response = await axios.get<EpornerRemovedResponse>(`${this.baseUrl}/removed/`, {
        params: {
          format: 'json'
        },
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; VideoSearchBot/1.0)'
        }
      });

      if (!response.data || !Array.isArray(response.data)) {
        console.log('No removed videos data');
        return [];
      }

      const removedIds = response.data.map(item => item.id);
      console.log(`Found ${removedIds.length} removed video IDs`);
      
      return removedIds;
    } catch (error) {
      console.error('Eporner removed videos error:', error);
      return [];
    }
  }

  async getLatestVideos(page: number = 1): Promise<EpornerVideoData[]> {
    return this.searchVideos({
      page,
      order: 'latest',
      per_page: 20,
      thumbsize: 'big'
    });
  }

  async getTopRatedVideos(page: number = 1): Promise<EpornerVideoData[]> {
    return this.searchVideos({
      page,
      order: 'top-rated',
      per_page: 20,
      thumbsize: 'big'
    });
  }

  async getMostPopularVideos(page: number = 1): Promise<EpornerVideoData[]> {
    return this.searchVideos({
      page,
      order: 'most-popular',
      per_page: 20,
      thumbsize: 'big'
    });
  }

  async getTopWeeklyVideos(page: number = 1): Promise<EpornerVideoData[]> {
    return this.searchVideos({
      page,
      order: 'top-weekly',
      per_page: 20,
      thumbsize: 'big'
    });
  }

  async getTopMonthlyVideos(page: number = 1): Promise<EpornerVideoData[]> {
    return this.searchVideos({
      page,
      order: 'top-monthly',
      per_page: 20,
      thumbsize: 'big'
    });
  }

  async getLongestVideos(page: number = 1): Promise<EpornerVideoData[]> {
    return this.searchVideos({
      page,
      order: 'longest',
      per_page: 20,
      thumbsize: 'big'
    });
  }

  async getShortestVideos(page: number = 1): Promise<EpornerVideoData[]> {
    return this.searchVideos({
      page,
      order: 'shortest',
      per_page: 20,
      thumbsize: 'big'
    });
  }

  async searchWithFilters(query: string, options: {
    includeGay?: boolean;
    includeLowQuality?: boolean;
    order?: EpornerSearchParams['order'];
    page?: number;
  } = {}): Promise<EpornerVideoData[]> {
    return this.searchVideos({
      query,
      page: options.page || 1,
      order: options.order || 'most-popular',
      gay: options.includeGay ? 1 : 0,
      lq: options.includeLowQuality ? 1 : 0,
      per_page: 20,
      thumbsize: 'big'
    });
  }

  private formatVideo(video: EpornerVideo): EpornerVideoData {
    // Parse keywords into array
    const keywords = video.keywords ? video.keywords.split(',').map(k => k.trim()).filter(Boolean) : [];
    
    return {
      id: video.id,
      title: video.title,
      thumbnail: video.default_thumb?.src || '',
      url: video.url,
      duration: video.length_min,
      views: video.views,
      rating: video.rate,
      embedUrl: video.embed,
      keywords,
      addedDate: video.added,
      thumbs: video.thumbs || []
    };
  }
}

export default new EpornerService();