import axios from 'axios';
import { ApiJavVideo, ApiJavVideoData, ApiJavSearchParams, ApiJavPlayer } from '../types/apijav';

class ApiJavService {
  private readonly baseUrl = 'https://server.apijav.com/wp-json/myvideo/v1';

  async searchVideos(searchParams: ApiJavSearchParams = {}): Promise<ApiJavVideoData[]> {
    try {
      const params: any = {
        per_page: searchParams.per_page || 20,
        page: searchParams.page || 1,
        orderby: searchParams.orderby || 'date',
        order: searchParams.order || 'DESC'
      };

      // Add optional search parameters
      if (searchParams.search) {
        params.search = searchParams.search;
      }

      if (searchParams.category) {
        params.category = searchParams.category;
      }

      if (searchParams.tag) {
        params.tag = searchParams.tag;
      }

      if (searchParams.actor) {
        params.actor = searchParams.actor;
      }

      if (searchParams.studio) {
        params.studio = searchParams.studio;
      }

      if (searchParams.after) {
        params.after = searchParams.after;
      }

      console.log(`Fetching APIJAV videos with params:`, params);
      
      const response = await axios.get<ApiJavVideo[]>(`${this.baseUrl}/posts`, {
        params,
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'X-Client-Site': 'https://localhost:3000' // Optional client identification
        }
      });

      if (!response.data || !Array.isArray(response.data)) {
        console.log('No videos found in response');
        return [];
      }

      const videos = response.data.map(video => this.formatVideo(video));
      console.log(`Found ${videos.length} videos from APIJAV`);
      
      return videos;
    } catch (error) {
      console.error('APIJAV API error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
      }
      return [];
    }
  }

  async getVideoById(id: number): Promise<ApiJavVideoData | null> {
    try {
      console.log(`Fetching APIJAV video by ID: ${id}`);
      
      const response = await axios.get<ApiJavVideo>(`${this.baseUrl}/posts/${id}`, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'X-Client-Site': 'https://localhost:3000'
        }
      });

      if (!response.data) {
        console.log('Video not found');
        return null;
      }

      return this.formatVideo(response.data);
    } catch (error) {
      console.error('APIJAV get video error:', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log('Video not found (404)');
        return null;
      }
      return null;
    }
  }

  async getPlayerInfo(id: number): Promise<ApiJavPlayer | null> {
    try {
      console.log(`Fetching APIJAV player info for ID: ${id}`);
      
      const response = await axios.get<ApiJavPlayer>(`${this.baseUrl}/player/${id}`, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'X-Client-Site': 'https://localhost:3000'
        }
      });

      return response.data;
    } catch (error) {
      console.error('APIJAV player info error:', error);
      return null;
    }
  }

  async getTrendingVideos(page: number = 1): Promise<ApiJavVideoData[]> {
    return this.searchVideos({
      page,
      orderby: 'views',
      order: 'DESC',
      per_page: 20
    });
  }

  async getNewestVideos(page: number = 1): Promise<ApiJavVideoData[]> {
    return this.searchVideos({
      page,
      orderby: 'date',
      order: 'DESC',
      per_page: 20
    });
  }

  async getVideosByCategory(category: string, page: number = 1): Promise<ApiJavVideoData[]> {
    return this.searchVideos({
      category,
      page,
      orderby: 'date',
      order: 'DESC',
      per_page: 20
    });
  }

  async getVideosByStudio(studio: string, page: number = 1): Promise<ApiJavVideoData[]> {
    return this.searchVideos({
      studio,
      page,
      orderby: 'date',
      order: 'DESC',
      per_page: 20
    });
  }

  async getVideosByActor(actor: string, page: number = 1): Promise<ApiJavVideoData[]> {
    return this.searchVideos({
      actor,
      page,
      orderby: 'date',
      order: 'DESC',
      per_page: 20
    });
  }

  async getHDVideos(page: number = 1): Promise<ApiJavVideoData[]> {
    // Note: API doesn't have direct HD filter, so we'll get all and filter client-side
    const allVideos = await this.searchVideos({
      page,
      orderby: 'date',
      order: 'DESC',
      per_page: 100 // Get more to filter
    });
    
    return allVideos.filter(video => video.isHd);
  }

  private formatVideo(video: ApiJavVideo): ApiJavVideoData {
    return {
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
      url: video.embed_url, // Use embed_url as redirect URL
      duration: video.duration,
      views: video.views,
      studio: video.studio,
      code: video.code,
      categories: video.categories,
      actors: video.actors,
      isHd: video.is_hd
    };
  }
}

export default new ApiJavService();