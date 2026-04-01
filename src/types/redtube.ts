// Thumbnail interface for different sizes
export interface RedTubeThumb {
  size: 'small' | 'medium' | 'medium1' | 'medium2' | 'big';
  width: number;
  height: number;
  src: string;
}

// Tag interface
export interface RedTubeTag {
  tag_name: string;
}

// Complete RedTube video interface based on API documentation
export interface RedTubeVideo {
  duration: string;
  views: string;
  video_id: string;
  rating: string;
  ratings: string;
  title: string;
  url: string;
  embed_url: string;
  default_thumb: string;
  thumb: string;
  publish_date: string | false;
  thumbs?: RedTubeThumb[];
  tags?: RedTubeTag[];
}

// API response wrapper for JSON format
export interface RedTubeApiResponse {
  videos: { video: RedTubeVideo }[];
  count: number;
}

// Search parameters interface
export interface RedTubeSearchParams {
  search?: string;
  tags?: string[];
  thumbsize?: 'small' | 'medium' | 'medium1' | 'medium2' | 'big' | 'all';
  page?: number;
  ordering?: 'newest' | 'mostviewed' | 'rating';
  period?: 'weekly' | 'monthly' | 'alltime';
}

// Simplified video data for frontend
export interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  duration: string;
  views: string;
  rating: string;
  embedUrl: string;
  tags: string[];
  thumbs: RedTubeThumb[];
}