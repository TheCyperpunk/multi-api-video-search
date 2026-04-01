import axios from 'axios';
import { RedTubeApiResponse, RedTubeVideo, VideoData, RedTubeSearchParams } from '../types/redtube';

class RedTubeService {
  private readonly baseUrl = 'https://api.redtube.com';

  async searchVideos(searchParams: RedTubeSearchParams = {}): Promise<VideoData[]> {
    try {
      const params: any = {
        data: 'redtube.Videos.searchVideos',
        output: 'json',
        thumbsize: searchParams.thumbsize || 'big',
        page: searchParams.page?.toString() || '1'
      };

      // Add optional search parameters
      if (searchParams.search) {
        params.search = searchParams.search;
      }

      if (searchParams.tags && searchParams.tags.length > 0) {
        // Handle multiple tags as separate parameters
        searchParams.tags.forEach((tag, index) => {
          params[`tags[${index}]`] = tag;
        });
      }

      if (searchParams.ordering) {
        params.ordering = searchParams.ordering;
      }

      if (searchParams.period) {
        params.period = searchParams.period;
      }

      console.log(`Fetching RedTube videos with params:`, params);
      
      const response = await axios.get<RedTubeApiResponse>(this.baseUrl, {
        params,
        timeout: 15000
      });

      if (!response.data || !response.data.videos) {
        console.log('No videos found in response');
        return [];
      }

      // Handle the nested structure: videos.video can be array or single object
      let videoArray: RedTubeVideo[] = [];
      if (Array.isArray(response.data.videos)) {
        videoArray = response.data.videos.map((item: any) => item.video);
      } else if ((response.data.videos as any).video) {
        const videoData = (response.data.videos as any).video;
        videoArray = Array.isArray(videoData) 
          ? videoData 
          : [videoData];
      }

      const videos = videoArray.map(video => this.formatVideo(video));
      console.log(`Found ${videos.length} videos from RedTube`);
      
      return videos;
    } catch (error) {
      console.error('RedTube API error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
      }
      return [];
    }
  }

  async getTrendingVideos(page: number = 1, period: 'weekly' | 'monthly' | 'alltime' = 'weekly'): Promise<VideoData[]> {
    return this.searchVideos({
      page,
      ordering: 'mostviewed',
      period,
      thumbsize: 'big'
    });
  }

  async getVideosByTags(tags: string[], page: number = 1): Promise<VideoData[]> {
    return this.searchVideos({
      tags,
      page,
      thumbsize: 'big',
      ordering: 'newest'
    });
  }

  async getNewestVideos(page: number = 1): Promise<VideoData[]> {
    return this.searchVideos({
      page,
      ordering: 'newest',
      thumbsize: 'big'
    });
  }

  async getTopRatedVideos(page: number = 1, period: 'weekly' | 'monthly' | 'alltime' = 'alltime'): Promise<VideoData[]> {
    return this.searchVideos({
      page,
      ordering: 'rating',
      period,
      thumbsize: 'big'
    });
  }

  private formatVideo(video: RedTubeVideo): VideoData {
    return {
      id: video.video_id,
      title: video.title,
      thumbnail: video.thumb || video.default_thumb,
      url: video.url,
      duration: video.duration,
      views: video.views,
      rating: video.rating,
      embedUrl: video.embed_url,
      tags: video.tags?.map(tag => tag.tag_name) || [],
      thumbs: video.thumbs || []
    };
  }
}

export default new RedTubeService();