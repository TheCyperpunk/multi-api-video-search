// APIJAV API Types based on documentation

// Main video post interface
export interface ApiJavVideo {
  id: number;
  title: string;
  slug: string;
  date: string; // ISO 8601 format
  thumbnail: string;
  duration: string; // HH:MM:SS format
  categories: string[];
  tags: string[];
  actors: string[];
  studio: string;
  code: string; // Video code/product ID
  views: number;
  likes: number;
  dislikes: number;
  is_hd: boolean;
  embed_url: string;
  iframe_html: string;
  player_api: string;
}

// Player response interface
export interface ApiJavPlayer {
  post_id: number;
  embed_url: string;
  iframe_html: string;
  permanent: boolean;
}

// Search parameters interface
export interface ApiJavSearchParams {
  per_page?: number; // Max 1000, default 20
  page?: number; // Default 1
  search?: string; // Keyword search
  category?: string; // Category name or ID
  tag?: string; // Tag slug or name
  actor?: string; // Actor name or slug
  studio?: string; // Studio name or slug
  orderby?: 'date' | 'title' | 'views'; // Default 'date'
  order?: 'ASC' | 'DESC'; // Default 'DESC'
  after?: string; // ISO 8601 date
}

// Simplified video data for frontend
export interface ApiJavVideoData {
  id: number;
  title: string;
  thumbnail: string;
  url: string; // We'll use embed_url as the redirect URL
  duration: string;
  views: number;
  studio: string;
  code: string;
  categories: string[];
  actors: string[];
  isHd: boolean;
}

// API Response wrapper (array of videos)
export type ApiJavApiResponse = ApiJavVideo[];

// Webhook registration interface
export interface ApiJavWebhookRegister {
  url: string;
  secret: string;
}

// Webhook payload interface
export interface ApiJavWebhookPayload {
  action: string;
  post_id: number;
  server_url: string;
}