import axios from 'axios';
import * as cheerio from 'cheerio';
import {
  HentaiOceanApiResponse,
  HentaiOceanVideoData,
  HentaiOceanSearchParams,
} from '../types/hentaiocean';

class HentaiOceanService {
  private readonly baseUrl = 'https://hentaiocean.com';
  private readonly rssUrl = 'https://hentaiocean.com/rss.xml';

  // Extract slug from a HentaiOcean URL like https://hentaiocean.com/watch/my-mother-1/
  private extractSlug(url: string): string {
    return url.replace(/\/$/, '').split('/').pop() || '';
  }

  // Build thumbnail URL from slug
  private thumbnailUrl(slug: string): string {
    return `${this.baseUrl}/thumbnail/${slug}.webp`;
  }

  // Build embed/watch URL from slug
  private watchUrl(slug: string): string {
    return `${this.baseUrl}/watch/${slug}/`;
  }

  // Fetch metadata for a single slug via the Hentai Ocean API
  async getVideoBySlug(slug: string): Promise<HentaiOceanVideoData | null> {
    try {
      const response = await axios.get<HentaiOceanApiResponse>(
        `${this.baseUrl}/api`,
        {
          params: { action: 'hentai', slug },
          timeout: 10000,
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VideoSearchBot/1.0)' },
        }
      );

      const info = response.data?.info?.[0];
      if (!info) return null;

      return {
        id: info.urlname,
        title: info.videoname,
        thumbnail: this.thumbnailUrl(info.urlname),
        url: this.watchUrl(info.urlname),
        releaseDate: info.releasedate,
        description: info.description,
        genres: (response.data.genres || []).map((g) => g.genre),
        coverUrl: `${this.baseUrl}/assets/cover/${info.coverimg}`,
      };
    } catch (error) {
      console.error(`HentaiOcean getVideoBySlug error for "${slug}":`, error);
      return null;
    }
  }

  // Fetch the latest videos from the RSS feed
  async getLatestVideos(page: number = 1, perPage: number = 20): Promise<HentaiOceanVideoData[]> {
    try {
      console.log(`HentaiOcean: fetching RSS feed (page ${page})`);
      const response = await axios.get<string>(this.rssUrl, {
        timeout: 15000,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VideoSearchBot/1.0)' },
        responseType: 'text',
      });

      const $ = cheerio.load(response.data, { xmlMode: true });
      const items = $('item').toArray();

      // Simple pagination over RSS items
      const start = (page - 1) * perPage;
      const pageItems = items.slice(start, start + perPage);

      const videos: HentaiOceanVideoData[] = pageItems.map((el) => {
        const link = $(el).find('link').next().text().trim() || $(el).find('link').text().trim();
        const thumb = $(el).find('media\\:thumbnail, thumbnail').attr('url') || '';
        const pubDate = $(el).find('pubDate').text().trim();
        const title = $(el).find('title').text().trim();

        // Extract slug from link
        const slug = this.extractSlug(link);

        return {
          id: slug || title,
          title,
          thumbnail: slug ? this.thumbnailUrl(slug) : thumb,
          url: link || this.watchUrl(slug),
          releaseDate: pubDate,
        };
      });

      console.log(`HentaiOcean: found ${videos.length} videos from RSS`);
      return videos;
    } catch (error) {
      console.error('HentaiOcean getLatestVideos error:', error);
      return [];
    }
  }

  // Search via HTML scraping of ?s=query
  async searchVideos(params: HentaiOceanSearchParams = {}): Promise<HentaiOceanVideoData[]> {
    const { query, page = 1, per_page = 20 } = params;

    if (!query || !query.trim()) {
      return this.getLatestVideos(page, per_page);
    }

    try {
      console.log(`HentaiOcean: searching for "${query}" (page ${page})`);
      const searchUrl = `${this.baseUrl}/`;
      const response = await axios.get<string>(searchUrl, {
        params: { s: query, paged: page },
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml',
        },
        responseType: 'text',
      });

      const $ = cheerio.load(response.data);
      const videos: HentaiOceanVideoData[] = [];

      // Most WordPress adult themes use article tags or .post elements for listings
      // Try multiple common selectors
      const selectors = [
        'article',
        '.post',
        '.video-item',
        '.entry',
        '.hentai-item',
        '.movie-item',
      ];

      let found = false;
      for (const sel of selectors) {
        const items = $(sel);
        if (items.length > 0) {
          items.slice(0, per_page).each((_, el) => {
            const linkEl = $(el).find('a').first();
            const href = linkEl.attr('href') || '';
            const title = linkEl.attr('title') || $(el).find('h2, h3, .title, .entry-title').first().text().trim() || '';
            const imgSrc = $(el).find('img').first().attr('src') || $(el).find('img').first().attr('data-src') || '';
            const slug = this.extractSlug(href);

            if (slug && title) {
              videos.push({
                id: slug,
                title,
                thumbnail: slug ? this.thumbnailUrl(slug) : imgSrc,
                url: href || this.watchUrl(slug),
              });
            }
          });
          if (videos.length > 0) {
            found = true;
            break;
          }
        }
      }

      // Fallback: scan all links that look like hentai watch pages
      if (!found || videos.length === 0) {
        $('a[href*="/watch/"]').slice(0, per_page).each((_, el) => {
          const href = $(el).attr('href') || '';
          const slug = this.extractSlug(href);
          if (!slug) return;

          // Avoid duplicates
          if (videos.find((v) => v.id === slug)) return;

          const title =
            $(el).attr('title') ||
            $(el).text().trim() ||
            slug.replace(/-/g, ' ');

          videos.push({
            id: slug,
            title,
            thumbnail: this.thumbnailUrl(slug),
            url: href,
          });
        });
      }

      console.log(`HentaiOcean: found ${videos.length} results for "${query}"`);
      return videos;
    } catch (error) {
      console.error('HentaiOcean searchVideos error:', error);
      return [];
    }
  }
}

export default new HentaiOceanService();
