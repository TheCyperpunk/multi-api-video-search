import React, { useState, useEffect } from 'react';

// Unified interface for all APIs - focusing on core requirements: thumbnail, title, redirect URL
interface Video {
  id: string | number;
  title: string;
  thumbnail: string;
  url: string;
  source?: string; // 'redtube' | 'apijav' | 'eporner' | 'faphouse'
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
          apiUrl = query.trim() 
            ? `/api/redtube/search?q=${encodeURIComponent(query)}`
            : `/api/redtube/trending`;
          break;
        case 'apijav':
          apiUrl = query.trim() 
            ? `/api/apijav/search?q=${encodeURIComponent(query)}`
            : `/api/apijav/trending`;
          break;
        case 'eporner':
          apiUrl = query.trim() 
            ? `/api/eporner/search?q=${encodeURIComponent(query)}`
            : `/api/eporner/latest`;
          break;
        case 'faphouse':
          apiUrl = query.trim() 
            ? `/api/faphouse/search?q=${encodeURIComponent(query)}`
            : `/api/faphouse/latest`;
          break;
        case 'hentaiocean':
          apiUrl = query.trim()
            ? `/api/hentaiocean/search?q=${encodeURIComponent(query)}`
            : `/api/hentaiocean/latest`;
          break;
        case 'haniapi':
          apiUrl = query.trim()
            ? `/api/haniapi/search?q=${encodeURIComponent(query)}`
            : `/api/haniapi/newest`;
          break;
      }
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error("Failed to fetch from the server");
      }

      const data = await response.json();
      const fetchedVideos = (data.videos || []).map((video: any) => ({
        id: video.id,
        title: video.title,
        thumbnail: video.thumbnail,
        url: video.url,
        source: data.source || apiSource,
        duration: video.duration,
        studio: video.studio,
        code: video.code,
        views: video.views,
        rating: video.rating,
        quality: video.quality,
        isPremium: video.isPremium
      }));
      
      setVideos(fetchedVideos);
      setLoading(false);
      
    } catch (error) {
      console.error("Error fetching videos:", error);
      setErrorMsg("Failed to connect to backend. Please ensure the TypeScript server is running on port 3001!");
      setLoading(false);
    }
  };

  // Load trending/latest videos when API source changes or on component mount
  useEffect(() => {
    handleSearch();
  }, [apiSource]);

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
      
      {/* Top 900×250 Banner */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', width: '100%', overflowX: 'auto' }}>
        <iframe style={{ backgroundColor: 'white' }} width="900" height="250" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10001820" src="https://a.adtng.com/get/10001820?ata=Malludesi" title="Top Banner Ad"/>
      </div>

      {/* Leaderboard Ad Banners (728x90) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '30px', width: '100%', overflowX: 'auto' }}>
        <iframe 
          style={{ backgroundColor: 'white' }} 
          width="728" 
          height="90" 
          scrolling="no" 
          frameBorder={0} 
          allowTransparency={true} 
          marginHeight={0} 
          marginWidth={0} 
          name="spot_id_10001811" 
          src="https://a.adtng.com/get/10001811?ata=Malludesi"
          title="Leaderboard Ad 1"
        />
        <iframe 
          style={{ backgroundColor: 'white' }} 
          width="728" 
          height="90" 
          scrolling="no" 
          frameBorder={0} 
          allowTransparency={true} 
          marginHeight={0} 
          marginWidth={0} 
          name="spot_id_10002801" 
          src="https://a.adtng.com/get/10002801?ata=Malludesi"
          title="Leaderboard Ad 2"
        />
        <iframe style={{ backgroundColor: 'white' }} width="728" height="90" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10008054" src="https://a.adtng.com/get/10008054?ata=Malludesi" title="Leaderboard Ad 3"/>
        <iframe style={{ backgroundColor: 'white' }} width="728" height="90" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10008050" src="https://a.adtng.com/get/10008050?ata=Malludesi" title="Leaderboard Ad 4"/>
        <iframe style={{ backgroundColor: 'white' }} width="728" height="90" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10008045" src="https://a.adtng.com/get/10008045?ata=Malludesi" title="Leaderboard Ad 5"/>
        <iframe style={{ backgroundColor: 'white' }} width="728" height="90" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10002481" src="https://a.adtng.com/get/10002481?ata=Malludesi" title="Leaderboard Ad 6"/>
      </div>

      {/* API Source Selector */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => setApiSource('redtube')}
          style={{
            padding: '10px 20px',
            backgroundColor: apiSource === 'redtube' ? '#e53e3e' : '#f5f5f5',
            color: apiSource === 'redtube' ? 'white' : '#333',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          🔴 RedTube API
        </button>
        <button
          onClick={() => setApiSource('apijav')}
          style={{
            padding: '10px 20px',
            backgroundColor: apiSource === 'apijav' ? '#2563eb' : '#f5f5f5',
            color: apiSource === 'apijav' ? 'white' : '#333',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          🎌 APIJAV API
        </button>
        <button
          onClick={() => setApiSource('eporner')}
          style={{
            padding: '10px 20px',
            backgroundColor: apiSource === 'eporner' ? '#059669' : '#f5f5f5',
            color: apiSource === 'eporner' ? 'white' : '#333',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          🟢 Eporner API
        </button>
        <button
          onClick={() => setApiSource('faphouse')}
          style={{
            padding: '10px 20px',
            backgroundColor: apiSource === 'faphouse' ? '#7c3aed' : '#f5f5f5',
            color: apiSource === 'faphouse' ? 'white' : '#333',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          🟣 FapHouse Scraper
        </button>
        <button
          onClick={() => setApiSource('hentaiocean')}
          style={{
            padding: '10px 20px',
            backgroundColor: apiSource === 'hentaiocean' ? '#db2777' : '#f5f5f5',
            color: apiSource === 'hentaiocean' ? 'white' : '#333',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          🌊 HentaiOcean
        </button>
        <button
          onClick={() => setApiSource('haniapi')}
          style={{
            padding: '10px 20px',
            backgroundColor: apiSource === 'haniapi' ? '#ea580c' : '#f5f5f5',
            color: apiSource === 'haniapi' ? 'white' : '#333',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          🔥 Hanime.tv
        </button>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${getSourceLabel(apiSource)} videos...`}
          style={{ 
            flexGrow: 1, 
            padding: '12px', 
            borderRadius: '8px', 
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '12px 24px', 
            backgroundColor: getSourceBadgeColor(apiSource), 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Searching...' : '🔍 Search'}
        </button>
      </form>

      {/* Slim Ad Banners (300x100) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <iframe
          style={{ backgroundColor: 'white' }}
          width="300"
          height="100"
          scrolling="no"
          frameBorder={0}
          allowTransparency={true}
          marginHeight={0}
          marginWidth={0}
          name="spot_id_10001817"
          src="https://a.adtng.com/get/10001817?ata=Malludesi"
          title="Slim Ad"
        />
        <iframe
          style={{ backgroundColor: 'white' }}
          width="300"
          height="100"
          scrolling="no"
          frameBorder={0}
          allowTransparency={true}
          marginHeight={0}
          marginWidth={0}
          name="spot_id_10001814"
          src="https://a.adtng.com/get/10001814?ata=Malludesi"
          title="Slim Ad 2"
        />
        <iframe
          style={{ backgroundColor: 'white' }}
          width="300"
          height="100"
          scrolling="no"
          frameBorder={0}
          allowTransparency={true}
          marginHeight={0}
          marginWidth={0}
          name="spot_id_10002802"
          src="https://a.adtng.com/get/10002802?ata=Malludesi"
          title="Slim Ad 3"
        />
        <iframe style={{ backgroundColor: 'white' }} width="300" height="100" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10008611" src="https://a.adtng.com/get/10008611?ata=Malludesi" title="Slim Ad 4"/>
        <iframe style={{ backgroundColor: 'white' }} width="300" height="100" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10002483" src="https://a.adtng.com/get/10002483?ata=Malludesi" title="Slim Ad 5"/>
        <iframe style={{ backgroundColor: 'white' }} width="300" height="100" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10002480" src="https://a.adtng.com/get/10002480?ata=Malludesi" title="Slim Ad 6"/>
        <iframe style={{ backgroundColor: 'white' }} width="305" height="99" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10007345" src="https://a.adtng.com/get/10007345?ata=Malludesi" title="Slim Ad 7"/>
      </div>

      {/* ── 300×250 Ads (Rows 1–4) ─────────────────────────── */}

      {/* 300×250 Row 1 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <iframe style={{ backgroundColor: 'white' }} width="300" height="250" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10001807" src="https://a.adtng.com/get/10001807?ata=Malludesi" title="300x250 Ad 1"/>
        <iframe style={{ backgroundColor: 'white' }} width="300" height="250" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10002808" src="https://a.adtng.com/get/10002808?ata=Malludesi" title="300x250 Ad 2"/>
        <iframe style={{ backgroundColor: 'white' }} width="300" height="250" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10001808" src="https://a.adtng.com/get/10001808?ata=Malludesi" title="300x250 Ad 3"/>
      </div>

      {/* 300×250 Row 2 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <iframe style={{ backgroundColor: 'white' }} width="300" height="250" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10001813" src="https://a.adtng.com/get/10001813?ata=Malludesi" title="300x250 Ad 4"/>
        <iframe style={{ backgroundColor: 'white' }} width="300" height="250" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10002808_2" src="https://a.adtng.com/get/10002808?ata=Malludesi" title="300x250 Ad 5"/>
        <iframe style={{ backgroundColor: 'white' }} width="300" height="250" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10006955" src="https://a.adtng.com/get/10006955?ata=Malludesi" title="300x250 Ad 6"/>
      </div>

      {/* 300×250 Row 3 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <iframe style={{ backgroundColor: 'white' }} width="300" height="250" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10005507" src="https://a.adtng.com/get/10005507?ata=Malludesi" title="300x250 Ad 7"/>
        <iframe style={{ backgroundColor: 'white' }} width="300" height="250" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10007972" src="https://a.adtng.com/get/10007972?ata=Malludesi" title="300x250 Ad 8"/>
        <iframe style={{ backgroundColor: 'white' }} width="300" height="250" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10008039" src="https://a.adtng.com/get/10008039?ata=Malludesi" title="300x250 Ad 9"/>
      </div>

      {/* 300×250 Row 4 (last) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <iframe style={{ backgroundColor: 'white' }} width="300" height="250" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10002799" src="https://a.adtng.com/get/10002799?ata=Malludesi" title="300x250 Ad 10"/>
        <iframe style={{ backgroundColor: 'white' }} width="300" height="250" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10001807_bottom" src="https://a.adtng.com/get/10001807?ata=Malludesi" title="300x250 Ad 11"/>
      </div>

      {/* ── 315×300 Ads (Rows 5–7) ─────────────────────────── */}

      {/* 315×300 Row 1 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <iframe style={{ backgroundColor: 'white' }} width="315" height="300" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10001816" src="https://a.adtng.com/get/10001816?ata=Malludesi" title="315x300 Ad 1"/>
        <iframe style={{ backgroundColor: 'white' }} width="315" height="300" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10002488" src="https://a.adtng.com/get/10002488?ata=Malludesi" title="315x300 Ad 2"/>
        <iframe style={{ backgroundColor: 'white' }} width="315" height="300" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10002798" src="https://a.adtng.com/get/10002798?ata=Malludesi" title="315x300 Ad 3"/>
      </div>

      {/* 315×300 Row 2 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <iframe style={{ backgroundColor: 'white' }} width="315" height="300" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10005511" src="https://a.adtng.com/get/10005511?ata=Malludesi" title="315x300 Ad 4"/>
        <iframe style={{ backgroundColor: 'white' }} width="315" height="300" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10005508" src="https://a.adtng.com/get/10005508?ata=Malludesi" title="315x300 Ad 5"/>
        <iframe style={{ backgroundColor: 'white' }} width="315" height="300" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10008041" src="https://a.adtng.com/get/10008041?ata=Malludesi" title="315x300 Ad 6"/>
      </div>

      {/* 315×300 Row 3 (last) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <iframe style={{ backgroundColor: 'white' }} width="315" height="300" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10002484" src="https://a.adtng.com/get/10002484?ata=Malludesi" title="315x300 Ad 7"/>
        <iframe style={{ backgroundColor: 'white' }} width="315" height="300" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10002486" src="https://a.adtng.com/get/10002486?ata=Malludesi" title="315x300 Ad 8"/>
      </div>


      {errorMsg && (
        <div style={{ padding: '15px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
          {errorMsg}
        </div>
      )}

      {/* Results Summary */}
      {!loading && videos.length > 0 && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f0f8ff', 
          borderRadius: '8px', 
          marginBottom: '20px', 
          textAlign: 'center',
          color: '#2c5aa0'
        }}>
          Found {videos.length} videos from {getSourceLabel(apiSource)} {query ? `for "${query}"` : '(latest/trending)'}
        </div>
      )}

      {/* Video Grid with Sidebar Ad Wrapper */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start', justifyContent: 'center' }}>
        
        {/* Left Sidebar Ad (160x600 Skyscraper) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'flex-start', width: '100%', maxWidth: '160px', margin: '0 auto' }}>
          <div style={{ position: 'sticky', top: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <iframe
              style={{ backgroundColor: 'white' }}
              width="160"
              height="600"
              scrolling="no"
              frameBorder={0}
              allowTransparency={true}
              marginHeight={0}
              marginWidth={0}
              name="spot_id_10002487"
              src="https://a.adtng.com/get/10002487?ata=Malludesi"
              title="Sidebar Skyscraper Ad Left 1"
            />
            <iframe style={{ backgroundColor: 'white' }} width="160" height="600" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10008052" src="https://a.adtng.com/get/10008052?ata=Malludesi" title="Sidebar Skyscraper Ad Left 2"/>
            <iframe style={{ backgroundColor: 'white' }} width="160" height="600" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10008048" src="https://a.adtng.com/get/10008048?ata=Malludesi" title="Sidebar Skyscraper Ad Left 3"/>
          </div>
        </div>

        {/* Center Video Grid */}
        <div style={{ 
          flex: '1 1 300px',
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
        {videos.map((video) => (
          <div 
            key={`${video.source}-${video.id}`} 
            style={{ 
              border: '1px solid #eee',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              backgroundColor: 'white'
            }}
          >
            {/* Thumbnail */}
            <div style={{ position: 'relative' }}>
              <img 
                src={video.thumbnail}
                alt={video.title} 
                style={{ 
                  width: '100%', 
                  height: '200px', 
                  objectFit: 'cover',
                  display: 'block'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // Better fallback image with source-specific colors and video title
                  const color = getSourceBadgeColor(video.source || apiSource).replace('#', '');
                  const safeTitle = video.title.substring(0, 20).replace(/[^a-zA-Z0-9\s]/g, '');
                  target.src = `https://via.placeholder.com/640x360/${color}/ffffff?text=${encodeURIComponent(safeTitle)}`;
                  // If that also fails, use a simple source label
                  target.onerror = () => {
                    target.src = `https://via.placeholder.com/640x360/${color}/ffffff?text=${getSourceLabel(video.source || apiSource)}+Video`;
                  };
                }}
              />
              
              {/* Source Badge */}
              <div style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                backgroundColor: getSourceBadgeColor(video.source || apiSource),
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {getSourceLabel(video.source || apiSource)}
              </div>

              {/* Duration Badge (if available) */}
              {video.duration && (
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {video.duration}
                </div>
              )}
            </div>
            
            {/* Video Info */}
            <div style={{ padding: '15px' }}>
              {/* Title */}
              <h3 style={{ 
                margin: '0 0 10px 0', 
                fontSize: '16px', 
                fontWeight: '500', 
                color: '#333', 
                lineHeight: '1.4',
                minHeight: '40px'
              }}>
                {video.title}
              </h3>

              {/* Stats */}
              {(video.views || video.rating) && (
                <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666', display: 'flex', gap: '10px' }}>
                  {video.views && <span>👁️ {formatViews(video.views)}</span>}
                  {video.rating && <span>⭐ {parseFloat(video.rating).toFixed(1)}</span>}
                </div>
              )}

              {/* Additional Info for APIJAV */}
              {video.source === 'apijav' && (video.studio || video.code) && (
                <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
                  {video.studio && <div>Studio: {video.studio}</div>}
                  {video.code && <div>Code: {video.code}</div>}
                </div>
              )}

              {/* Additional Info for FapHouse */}
              {video.source === 'faphouse' && (video.studio || video.quality || video.isPremium) && (
                <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
                  {video.studio && <div>Studio: {video.studio}</div>}
                  {video.quality && <div>Quality: {video.quality}</div>}
                  {video.isPremium && <div style={{ color: '#7c3aed', fontWeight: '600' }}>⭐ Premium Content</div>}
                </div>
              )}
              
              {/* Redirect URL Button */}
              <a 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  backgroundColor: getSourceBadgeColor(video.source || apiSource),
                  color: 'white',
                  padding: '10px 15px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  const currentColor = getSourceBadgeColor(video.source || apiSource);
                  let hoverColor = '#333';
                  if (currentColor === '#e53e3e') hoverColor = '#c53030';
                  else if (currentColor === '#2563eb') hoverColor = '#1d4ed8';
                  else if (currentColor === '#059669') hoverColor = '#047857';
                  else if (currentColor === '#7c3aed') hoverColor = '#6d28d9';
                  else if (currentColor === '#db2777') hoverColor = '#be185d';
                  else if (currentColor === '#ea580c') hoverColor = '#c2410c';
                  e.currentTarget.style.backgroundColor = hoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = getSourceBadgeColor(video.source || apiSource);
                }}
              >
                ▶️ Watch on {getSourceLabel(video.source || apiSource)}
              </a>
            </div>
          </div>
        ))}
        </div>

        {/* Right Sidebar Ad (160x600 Skyscraper) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'flex-start', width: '100%', maxWidth: '160px', margin: '0 auto' }}>
          <div style={{ position: 'sticky', top: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <iframe
              style={{ backgroundColor: 'white' }}
              width="160"
              height="600"
              scrolling="no"
              frameBorder={0}
              allowTransparency={true}
              marginHeight={0}
              marginWidth={0}
              name="spot_id_10001821"
              src="https://a.adtng.com/get/10001821?ata=Malludesi"
              title="Sidebar Skyscraper Ad Right 1"
            />
            <iframe
              style={{ backgroundColor: 'white' }}
              width="160"
              height="600"
              scrolling="no"
              frameBorder={0}
              allowTransparency={true}
              marginHeight={0}
              marginWidth={0}
              name="spot_id_10002797"
              src="https://a.adtng.com/get/10002797?ata=Malludesi"
              title="Sidebar Skyscraper Ad Right 2"
            />
            <iframe style={{ backgroundColor: 'white' }} width="160" height="600" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10008036" src="https://a.adtng.com/get/10008036?ata=Malludesi" title="Sidebar Skyscraper Ad Right 3"/>
            <iframe style={{ backgroundColor: 'white' }} width="160" height="600" scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} name="spot_id_10002485" src="https://a.adtng.com/get/10002485?ata=Malludesi" title="Sidebar Skyscraper Ad Right 4"/>
          </div>
        </div>
      </div>
      
      {!loading && videos.length === 0 && !errorMsg && (
        <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
          {query ? `No videos found for "${query}" on ${getSourceLabel(apiSource)}. Try a different search.` : `🎬 Enter a search term to find videos or browse latest content from ${getSourceLabel(apiSource)}`}
        </div>
      )}



      {/* Large Ad Banners - Bottom (900x250) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '20px', width: '100%', overflowX: 'auto' }}>
        <iframe
          style={{ backgroundColor: 'white' }}
          width="900"
          height="250"
          scrolling="no"
          frameBorder={0}
          allowTransparency={true}
          marginHeight={0}
          marginWidth={0}
          name="spot_id_10001818"
          src="https://a.adtng.com/get/10001818?ata=Malludesi"
          title="Large Bottom Ad 2"
        />
        <iframe
          style={{ backgroundColor: 'white' }}
          width="900"
          height="250"
          scrolling="no"
          frameBorder={0}
          allowTransparency={true}
          marginHeight={0}
          marginWidth={0}
          name="spot_id_10002800"
          src="https://a.adtng.com/get/10002800?ata=Malludesi"
          title="Large Bottom Ad 3"
        />
      </div>
    </div>
  );
};

export default VideoSearch;
