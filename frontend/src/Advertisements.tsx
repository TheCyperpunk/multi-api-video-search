import React from 'react';

// ─── Helper ──────────────────────────────────────────────────────────────────
const Ad = (props: React.IframeHTMLAttributes<HTMLIFrameElement>) => (
  <iframe style={{ backgroundColor: 'white' }} scrolling="no" frameBorder={0} allowTransparency={true} marginHeight={0} marginWidth={0} {...props} />
);


// ─── 2. Leaderboard Ads (728×90) — 6 units ───────────────────────────────────
export const LeaderboardAds: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '30px', width: '100%', overflowX: 'auto' }}>
    <Ad width="728" height="90" name="spot_id_10001811" src="https://a.adtng.com/get/10001811?ata=Malludesi" title="Leaderboard 1" />
    <Ad width="728" height="90" name="spot_id_10002801" src="https://a.adtng.com/get/10002801?ata=Malludesi" title="Leaderboard 2" />
    <Ad width="728" height="90" name="spot_id_10008054" src="https://a.adtng.com/get/10008054?ata=Malludesi" title="Leaderboard 3" />
    <Ad width="728" height="90" name="spot_id_10008050" src="https://a.adtng.com/get/10008050?ata=Malludesi" title="Leaderboard 4" />
    <Ad width="728" height="90" name="spot_id_10008045" src="https://a.adtng.com/get/10008045?ata=Malludesi" title="Leaderboard 5" />
    <Ad width="728" height="90" name="spot_id_10002481" src="https://a.adtng.com/get/10002481?ata=Malludesi" title="Leaderboard 6" />
  </div>
);

// ─── 3. Slim Banners (300×100 / 305×99) — 7 units ────────────────────────────
export const SlimAds: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
    <Ad width="300" height="100" name="spot_id_10001817" src="https://a.adtng.com/get/10001817?ata=Malludesi" title="Slim 1" />
    <Ad width="300" height="100" name="spot_id_10001814" src="https://a.adtng.com/get/10001814?ata=Malludesi" title="Slim 2" />
    <Ad width="300" height="100" name="spot_id_10002802" src="https://a.adtng.com/get/10002802?ata=Malludesi" title="Slim 3" />
    <Ad width="300" height="100" name="spot_id_10008611" src="https://a.adtng.com/get/10008611?ata=Malludesi" title="Slim 4" />
    <Ad width="300" height="100" name="spot_id_10002483" src="https://a.adtng.com/get/10002483?ata=Malludesi" title="Slim 5" />
    <Ad width="300" height="100" name="spot_id_10002480" src="https://a.adtng.com/get/10002480?ata=Malludesi" title="Slim 6" />
    <Ad width="305" height="99"  name="spot_id_10007345" src="https://a.adtng.com/get/10007345?ata=Malludesi" title="Slim 7" />
  </div>
);

// ─── 4. Square Ads 300×250 — 11 units across 4 rows ─────────────────────────
export const SquareAds300: React.FC = () => (
  <>
    {/* Row 1 */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
      <Ad width="300" height="250" name="spot_id_10001807"      src="https://a.adtng.com/get/10001807?ata=Malludesi" title="300x250 #1" />
      <Ad width="300" height="250" name="spot_id_10002808"      src="https://a.adtng.com/get/10002808?ata=Malludesi" title="300x250 #2" />
      <Ad width="300" height="250" name="spot_id_10001808"      src="https://a.adtng.com/get/10001808?ata=Malludesi" title="300x250 #3" />
    </div>
    {/* Row 2 */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
      <Ad width="300" height="250" name="spot_id_10001813"      src="https://a.adtng.com/get/10001813?ata=Malludesi" title="300x250 #4" />
      <Ad width="300" height="250" name="spot_id_10002808_2"    src="https://a.adtng.com/get/10002808?ata=Malludesi" title="300x250 #5" />
      <Ad width="300" height="250" name="spot_id_10006955"      src="https://a.adtng.com/get/10006955?ata=Malludesi" title="300x250 #6" />
    </div>
    {/* Row 3 */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
      <Ad width="300" height="250" name="spot_id_10005507"      src="https://a.adtng.com/get/10005507?ata=Malludesi" title="300x250 #7" />
      <Ad width="300" height="250" name="spot_id_10007972"      src="https://a.adtng.com/get/10007972?ata=Malludesi" title="300x250 #8" />
      <Ad width="300" height="250" name="spot_id_10008039"      src="https://a.adtng.com/get/10008039?ata=Malludesi" title="300x250 #9" />
    </div>
    {/* Row 4 */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
      <Ad width="300" height="250" name="spot_id_10002799"      src="https://a.adtng.com/get/10002799?ata=Malludesi" title="300x250 #10" />
      <Ad width="300" height="250" name="spot_id_10001807_bottom" src="https://a.adtng.com/get/10001807?ata=Malludesi" title="300x250 #11" />
    </div>
  </>
);

// ─── 5. Square Ads 315×300 — 8 units across 3 rows ──────────────────────────
export const SquareAds315: React.FC = () => (
  <>
    {/* Row 1 */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
      <Ad width="315" height="300" name="spot_id_10001816" src="https://a.adtng.com/get/10001816?ata=Malludesi" title="315x300 #1" />
      <Ad width="315" height="300" name="spot_id_10002488" src="https://a.adtng.com/get/10002488?ata=Malludesi" title="315x300 #2" />
      <Ad width="315" height="300" name="spot_id_10002798" src="https://a.adtng.com/get/10002798?ata=Malludesi" title="315x300 #3" />
    </div>
    {/* Row 2 */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
      <Ad width="315" height="300" name="spot_id_10005511" src="https://a.adtng.com/get/10005511?ata=Malludesi" title="315x300 #4" />
      <Ad width="315" height="300" name="spot_id_10005508" src="https://a.adtng.com/get/10005508?ata=Malludesi" title="315x300 #5" />
      <Ad width="315" height="300" name="spot_id_10008041" src="https://a.adtng.com/get/10008041?ata=Malludesi" title="315x300 #6" />
    </div>
    {/* Row 3 */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
      <Ad width="315" height="300" name="spot_id_10002484" src="https://a.adtng.com/get/10002484?ata=Malludesi" title="315x300 #7" />
      <Ad width="315" height="300" name="spot_id_10002486" src="https://a.adtng.com/get/10002486?ata=Malludesi" title="315x300 #8" />
    </div>
  </>
);

// ─── 6. Left Sidebar Skyscrapers (160×600) — 3 units ─────────────────────────
export const SidebarLeftAds: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'flex-start', width: '100%', maxWidth: '160px', margin: '0 auto' }}>
    <div style={{ position: 'sticky', top: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Ad width="160" height="600" name="spot_id_10002487" src="https://a.adtng.com/get/10002487?ata=Malludesi" title="Left Skyscraper 1" />
      <Ad width="160" height="600" name="spot_id_10008052" src="https://a.adtng.com/get/10008052?ata=Malludesi" title="Left Skyscraper 2" />
      <Ad width="160" height="600" name="spot_id_10008048" src="https://a.adtng.com/get/10008048?ata=Malludesi" title="Left Skyscraper 3" />
    </div>
  </div>
);

// ─── 7. Right Sidebar Skyscrapers (160×600) — 4 units ────────────────────────
export const SidebarRightAds: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'flex-start', width: '100%', maxWidth: '160px', margin: '0 auto' }}>
    <div style={{ position: 'sticky', top: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Ad width="160" height="600" name="spot_id_10001821" src="https://a.adtng.com/get/10001821?ata=Malludesi" title="Right Skyscraper 1" />
      <Ad width="160" height="600" name="spot_id_10002797" src="https://a.adtng.com/get/10002797?ata=Malludesi" title="Right Skyscraper 2" />
      <Ad width="160" height="600" name="spot_id_10008036" src="https://a.adtng.com/get/10008036?ata=Malludesi" title="Right Skyscraper 3" />
      <Ad width="160" height="600" name="spot_id_10002485" src="https://a.adtng.com/get/10002485?ata=Malludesi" title="Right Skyscraper 4" />
    </div>
  </div>
);

// ─── 8. Bottom Banners (900×250) — 3 units ───────────────────────────────────
export const BottomBanners: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '20px', width: '100%', overflowX: 'auto' }}>
    <Ad width="900" height="250" name="spot_id_10001820" src="https://a.adtng.com/get/10001820?ata=Malludesi" title="Bottom Banner" />
    <Ad width="900" height="250" name="spot_id_10001818" src="https://a.adtng.com/get/10001818?ata=Malludesi" title="Bottom Banner 1" />
    <Ad width="900" height="250" name="spot_id_10002800" src="https://a.adtng.com/get/10002800?ata=Malludesi" title="Bottom Banner 2" />
  </div>
);
