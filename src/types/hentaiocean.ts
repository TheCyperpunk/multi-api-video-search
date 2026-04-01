// Hentai Ocean API Types

// Info object returned by the Hentai Ocean API
export interface HentaiOceanInfo {
  id: number;
  urlname: string;         // slug used in URL/embed/thumbnail
  videoname: string;
  description: string;
  releasedate: string;
  uploaddate: string;
  coverimg: string;        // just the filename, use /assets/cover/<coverimg>
  series: string | null;
  status: number;
  recentrelease: number;
}

export interface HentaiOceanGenre {
  genre: string;
}

// Raw API response from /api?action=hentai&slug=<slug>
export interface HentaiOceanApiResponse {
  info: HentaiOceanInfo[];
  genres: HentaiOceanGenre[];
}

// RSS <item> shape (parsed from XML)
export interface HentaiOceanRssItem {
  title: string;
  link: string;
  slug: string;
  thumbnail: string;
  pubDate: string;
}

// Search params
export interface HentaiOceanSearchParams {
  query?: string;
  page?: number;
  per_page?: number;
}

// Unified video data returned to frontend (matches generic Video interface)
export interface HentaiOceanVideoData {
  id: string;          // slug
  title: string;
  thumbnail: string;   // /thumbnail/<slug>.webp
  url: string;         // /embed/<slug>  (embed page)
  releaseDate?: string;
  genres?: string[];
  description?: string;
  coverUrl?: string;
}
