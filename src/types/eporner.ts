// Eporner API Types based on documentation

// Thumbnail interface
export interface EpornerThumb {
  size: string; // 'small', 'medium', 'big'
  width: number;
  height: number;
  src: string;
}

// Default thumbnail interface
export interface EpornerDefaultThumb {
  size: string;
  width: number;
  height: number;
  src: string;
}

// Main video interface
export interface EpornerVideo {
  id: string;
  title: string;
  keywords: string;
  views: number;
  rate: string; // Rating as string (e.g., "4.13")
  url: string;
  added: string; // Date string
  length_sec: number;
  length_min: string; // Duration as MM:SS or HH:MM:SS
  embed: string;
  default_thumb: EpornerDefaultThumb;
  thumbs: EpornerThumb[];
}

// Search API response interface
export interface EpornerSearchResponse {
  count: number;
  start: number;
  per_page: number;
  page: number;
  time_ms: number;
  total_count: number;
  total_pages: number;
  videos: EpornerVideo[];
}

// Single video API response interface (for /id endpoint)
export interface EpornerVideoResponse extends EpornerVideo {}

// Removed videos response interface
export interface EpornerRemovedVideo {
  id: string;
}

export type EpornerRemovedResponse = EpornerRemovedVideo[];

// Search parameters interface
export interface EpornerSearchParams {
  query?: string; // Search query
  per_page?: number; // Results per page (default: 10)
  page?: number; // Page number (default: 1)
  thumbsize?: 'small' | 'medium' | 'big'; // Thumbnail size (default: medium)
  order?: 'latest' | 'longest' | 'shortest' | 'top-rated' | 'most-popular' | 'top-weekly' | 'top-monthly'; // Sort order
  gay?: 0 | 1; // Include gay content (0: no, 1: yes)
  lq?: 0 | 1; // Include low quality content (0: no, 1: yes)
  format?: 'json' | 'xml'; // Response format (default: json)
}

// Simplified video data for frontend
export interface EpornerVideoData {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  duration: string;
  views: number;
  rating: string;
  embedUrl: string;
  keywords: string[];
  addedDate: string;
  thumbs: EpornerThumb[];
}