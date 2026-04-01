// FapHouse Types based on scraper documentation

// Studio interface
export interface FapHouseStudio {
  id?: number;
  name: string;
  slug: string;
  url: string;
}

// Category interface
export interface FapHouseCategory {
  id?: number;
  name: string;
  slug: string;
  url: string;
}

// Main video interface
export interface FapHouseVideo {
  id?: number;
  video_id: string;
  title: string;
  slug: string;
  duration: string;
  quality: string;
  thumbnail: string;
  url: string;
  embed_url?: string;
  studio?: string;
  studio_slug?: string;
  category?: string;
  category_slug?: string;
  is_premium: boolean;
  views?: number;
  rating?: string;
  added_date?: string;
  description?: string;
  tags?: string[];
}

// Search parameters interface
export interface FapHouseSearchParams {
  query?: string;
  page?: number;
  per_page?: number;
  studio?: string;
  category?: string;
  quality?: 'HD' | '4K' | 'SD' | 'all';
  premium_only?: boolean;
  sort?: 'latest' | 'popular' | 'trending' | 'longest' | 'shortest';
}

// Simplified video data for frontend
export interface FapHouseVideoData {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  duration: string;
  quality: string;
  studio: string;
  category: string;
  isPremium: boolean;
  views?: number;
  rating?: string;
}

// Scraper response interfaces (simulated)
export interface FapHouseScrapedResponse {
  videos: FapHouseVideo[];
  total_count: number;
  current_page: number;
  total_pages: number;
  studios?: FapHouseStudio[];
  categories?: FapHouseCategory[];
}

// Database-like storage interface (for simulation)
export interface FapHouseStorage {
  videos: Map<string, FapHouseVideo>;
  studios: Map<string, FapHouseStudio>;
  categories: Map<string, FapHouseCategory>;
}