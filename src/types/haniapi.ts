// HaniAPI (Hanime.tv) Types

// A single video result from getLanding or search
export interface HaniVideo {
  brand: string;
  brand_id: number;
  cover_url: string;        // poster / thumbnail image URL
  created_at: string;
  description?: string;
  downloads_count?: number;
  duration_in_ms?: number;
  id: number;
  is_censored: boolean;
  likes?: number;
  monthly_rank?: number;
  name: string;             // video title
  number_of_comments?: number;
  poster_url?: string;
  released_at?: string;
  released_at_unix?: number;
  series?: string[];
  slug: string;             // used to build watch & embed URLs
  tags?: string[];
  titles?: string[];
  views: number;
  weekly_rank?: number;
}

// Landing endpoint wrapper
export interface HaniLandingResponse {
  page?: number;
  results: HaniVideo[];
}

// Search POST body
export interface HaniSearchParams {
  search?: string;
  tags?: string[];
  brands?: string[];
  blacklist?: string[];
  order_by?: 'likes' | 'created_at_unix' | 'views' | 'released_at_unix' | 'title_sortable';
  ordering?: 'asc' | 'desc';
  page?: number;
}

// getInfo response
export interface HaniInfoResponse {
  description: string;
  downloadURL: string;
  info: {
    brand: string;
    censored: boolean;
    released_date: string;
    uploaded_date: string;
  };
  views: string;
  tags: string[];
  poster: string;
  video: string;
}

// Unified video data returned to frontend
export interface HaniVideoData {
  id: string;           // slug
  title: string;
  thumbnail: string;    // cover_url
  url: string;          // hanime.tv watch URL
  views?: number;
  tags?: string[];
  brand?: string;
  isCensored?: boolean;
  releaseDate?: string;
}
