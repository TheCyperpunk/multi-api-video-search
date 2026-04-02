import React, { useState, useEffect } from 'react';
import {
  TopHeroBanner,
  LeaderboardAds,
  SlimAds,
  SquareAds300,
  SquareAds315,
  SidebarLeftAds,
  SidebarRightAds,
  BottomBanners,
} from './Advertisements';

// Unified interface for all APIs
interface Video {
  id: string | number;
  title: string;
  thumbnail: string;
  url: string;
  source?: string;
  duration?: string;
  studio?: string;
  code?: string;
  views?: number;
  rating?: string;
  quality?: string;
  isPremium?: boolean;
}

type ApiSource = 'redtube' | 'apijav' | 'eporner' | 'faphouse' | 'hentaiocean' | 'haniapi';

const VideoSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [apiSource, setApiSource] = useState<ApiSource>('redtube');

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setVideos([]);
    try {
      let apiUrl = '';
      switch (apiSource) {
        case 'redtube':
          apiUrl = query.trim() ? `/api/redtube/search?q=${encodeURIComponent(query)}` : `/api/redtube/trending`;
          break;
        case 'apijav':
          apiUrl = query.trim() ? `/api/apijav/search?q=${encodeURIComponent(query)}` : `/api/apijav/trending`;
          break;
        case 'eporner':
          apiUrl = query.trim() ? `/api/eporner/search?q=${encodeURIComponent(query)}` : `/api/eporner/latest`;
          break;
        case 'faphouse':
          apiUrl = query.trim() ? `/api/faphouse/search?q=${encodeURIComponent(query)}` : `/api/faphouse/latest`;
          break;
        case 'hentaiocean':
          apiUrl = query.trim() ? `/api/hentaiocean/search?q=${encodeURIComponent(query)}` : `/api/hentaiocean/latest`;
          break;
        case 'haniapi':
          apiUrl = query.trim() ? `/api/haniapi/search?q=${encodeURIComponent(query)}` : `/api/haniapi/newest`;
          break;
      }
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch from the server');
      const data = await response.json();
      setVideos((data.videos || []).map((video: any) => ({
        id: video.id, title: video.title, thumbnail: video.thumbnail,
        url: video.url, source: data.source || apiSource, duration: video.duration,
        studio: video.studio, code: video.code, views: video.views,
        rating: video.rating, quality: video.quality, isPremium: video.isPremium,
      })));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setErrorMsg('Failed to connect to backend. Please ensure the TypeScript server is running on port 3001!');
      setLoading(false);
    }
  };

  useEffect(() => { handleSearch(); }, [apiSource]);

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'redtube': return '#e53e3e';
      case 'apijav': return '#2563eb';
      case 'eporner': return '#059669';
      case 'faphouse': return '#7c3aed';
      case 'hentaiocean': return '#db2777';
      case 'haniapi': return '#ea580c';
      default: return '#6b7280';
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'redtube': return 'RedTube';
      case 'apijav': return 'APIJAV';
      case 'eporner': return 'Eporner';
      case 'faphouse': return 'FapHouse';
      case 'hentaiocean': return 'HentaiOcean';
      case 'haniapi': return 'Hanime.tv';
      default: return source?.toUpperCase() || 'Unknown';
    }
  };

  const formatViews = (views?: number) => {
    if (!views) return '';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '10px', color: '#333' }}>🔥 Multi-API Video Search</h1>
      <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>Search and browse videos from multiple sources</p>

      {/* ── Ad Zone 1: Top Hero Banner (900×250) ── */}
      <TopHeroBanner />

      {/* ── Ad Zone 2: Leaderboards (728×90 × 6) ── */}
      <LeaderboardAds />

      {/* API Source Selector */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {(['redtube', 'apijav', 'eporner', 'faphouse', 'hentaiocean', 'haniapi'] as ApiSource[]).map((src) => (
          <button key={src} onClick={() => setApiSource(src)} style={{
            padding: '10px 20px',
            backgroundColor: apiSource === src ? getSourceBadgeColor(src) : '#f5f5f5',
            color: apiSource === src ? 'white' : '#333',
            border: 'none', borderRadius: '6px', cursor: 'pointer',
            fontSize: '14px', fontWeight: '500'
          }}>
            {src === 'redtube' && '🔴 RedTube API'}
            {src === 'apijav' && '🎌 APIJAV API'}
            {src === 'eporner' && '🟢 Eporner API'}
            {src === 'faphouse' && '🟣 FapHouse Scraper'}
            {src === 'hentaiocean' && '🌊 HentaiOcean'}
            {src === 'haniapi' && '🔥 Hanime.tv'}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${getSourceLabel(apiSource)} videos...`}
          style={{ flexGrow: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <button type="submit" disabled={loading} style={{
          padding: '12px 24px', backgroundColor: getSourceBadgeColor(apiSource),
          color: 'white', border: 'none', borderRadius: '8px',
          fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer'
        }}>
          {loading ? 'Searching...' : '🔍 Search'}
        </button>
      </form>

      {/* ── Ad Zone 3: Slim Banners (300×100 × 7) ── */}
      <SlimAds />

      {/* ── Ad Zone 4: 300×250 Square Ads (11 units) ── */}
      <SquareAds300 />

      {/* ── Ad Zone 5: 315×300 Square Ads (8 units) ── */}
      <SquareAds315 />

      {errorMsg && (
        <div style={{ padding: '15px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
          {errorMsg}
        </div>
      )}

      {!loading && videos.length > 0 && (
        <div style={{ padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', color: '#2c5aa0' }}>
          Found {videos.length} videos from {getSourceLabel(apiSource)} {query ? `for "${query}"` : '(latest/trending)'}
        </div>
      )}

      {/* Video Grid with Sidebar Ads */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start', justifyContent: 'center' }}>

        {/* ── Ad Zone 6: Left Sidebar (160×600 × 3) ── */}
        <SidebarLeftAds />

        {/* Center Video Grid */}
        <div style={{ flex: '1 1 300px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {videos.map((video) => (
            <div key={`${video.source}-${video.id}`} style={{
              border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.2s, box-shadow 0.2s',
              backgroundColor: 'white'
            }}>
              <div style={{ position: 'relative' }}>
                <img src={video.thumbnail} alt={video.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const color = getSourceBadgeColor(video.source || apiSource).replace('#', '');
                    const safeTitle = video.title.substring(0, 20).replace(/[^a-zA-Z0-9\s]/g, '');
                    target.src = `https://via.placeholder.com/640x360/${color}/ffffff?text=${encodeURIComponent(safeTitle)}`;
                    target.onerror = () => { target.src = `https://via.placeholder.com/640x360/${color}/ffffff?text=${getSourceLabel(video.source || apiSource)}+Video`; };
                  }}
                />
                <div style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: getSourceBadgeColor(video.source || apiSource), color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                  {getSourceLabel(video.source || apiSource)}
                </div>
                {video.duration && (
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                    {video.duration}
                  </div>
                )}
              </div>
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '500', color: '#333', lineHeight: '1.4', minHeight: '40px' }}>
                  {video.title}
                </h3>
                {(video.views || video.rating) && (
                  <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666', display: 'flex', gap: '10px' }}>
                    {video.views && <span>👁️ {formatViews(video.views)}</span>}
                    {video.rating && <span>⭐ {parseFloat(video.rating).toFixed(1)}</span>}
                  </div>
                )}
                {video.source === 'apijav' && (video.studio || video.code) && (
                  <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
                    {video.studio && <div>Studio: {video.studio}</div>}
                    {video.code && <div>Code: {video.code}</div>}
                  </div>
                )}
                {video.source === 'faphouse' && (video.studio || video.quality || video.isPremium) && (
                  <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
                    {video.studio && <div>Studio: {video.studio}</div>}
                    {video.quality && <div>Quality: {video.quality}</div>}
                    {video.isPremium && <div style={{ color: '#7c3aed', fontWeight: '600' }}>⭐ Premium Content</div>}
                  </div>
                )}
                <a href={video.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', backgroundColor: getSourceBadgeColor(video.source || apiSource), color: 'white', padding: '10px 15px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', textAlign: 'center', textDecoration: 'none', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => {
                    const c = getSourceBadgeColor(video.source || apiSource);
                    const h = c === '#e53e3e' ? '#c53030' : c === '#2563eb' ? '#1d4ed8' : c === '#059669' ? '#047857' : c === '#7c3aed' ? '#6d28d9' : c === '#db2777' ? '#be185d' : '#c2410c';
                    e.currentTarget.style.backgroundColor = h;
                  }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = getSourceBadgeColor(video.source || apiSource); }}
                >
                  ▶️ Watch on {getSourceLabel(video.source || apiSource)}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Ad Zone 7: Right Sidebar (160×600 × 4) ── */}
        <SidebarRightAds />
      </div>

      {!loading && videos.length === 0 && !errorMsg && (
        <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
          {query ? `No videos found for "${query}" on ${getSourceLabel(apiSource)}. Try a different search.` : `🎬 Enter a search term to find videos or browse latest content from ${getSourceLabel(apiSource)}`}
        </div>
      )}

      {/* ── Ad Zone 8: Bottom Banners (900×250 × 2) ── */}
      <BottomBanners />
    </div>
  );
};

export default VideoSearch;
