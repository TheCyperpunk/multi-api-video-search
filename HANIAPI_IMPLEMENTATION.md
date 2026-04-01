# HaniAPI Implementation Details

## Overview
The HaniAPI service integrates video search and trending capabilities from Hanime.tv. The actual API calls are proxied through standard Axios endpoints to the undocumented (but provided) `haniapi.vercel.app` routes.

## Endpoints

### 1. `GET /api/haniapi/newest`
- **Description:** Fetches the newest videos added to Hanime.tv
- **Query Params:**
  - `page` (optional): Page number (defaults to 0)

### 2. `GET /api/haniapi/recent`
- **Description:** Fetches recently updated/trending videos
- **Query Params:**
  - `page` (optional): Page number (defaults to 0)

### 3. `GET /api/haniapi/trending`
- **Description:** Fetches the trending videos based on the specified timeframe
- **Query Params:**
  - `page` (optional): Page number (defaults to 0)
  - `time` (optional): `day`, `week`, `month`, `3_month`, `6_month`, `year` (defaults to `month`)

### 4. `GET /api/haniapi/search`
- **Description:** Advanced search endpoint. Note: Upstream uses `POST`, but our unified platform exposes it as `GET`.
- **Query Params:**
  - `q` (optional): Search query string
  - `page` (optional): Page number (defaults to 0)
  - `order_by` (optional): `likes`, `views`, `created_at_unix`, `released_at_unix`, `title_sortable` (defaults to `views`)
  - `ordering` (optional): `asc` or `desc` (defaults to `desc`)

### 5. `GET /api/haniapi/video/:slug`
- **Description:** Fetches complete metadata for a specific video slug

## Architecture Updates
- **`src/types/haniapi.ts`**: Contains the TypeScript definitions mapping to the somewhat complex upstream schema, enforcing safety across our services.
- **`src/services/haniApiService.ts`**: Handles backend communication, response normalization, and cleanly mapping the returned `HaniVideo` schemas into the unified `VideoData` object expected by our React application.

## Frontend Integration
- Exposed as the **🔥 Hanime.tv** source in the API toggle
- Badge color assigned: `#ea580c` (Orange)
- The thumbnails use `cover_url` parsed from the APIs.

## Known Limitations
- The underlying API wraps search results in an object `{ page, results }`, differing slightly from the `/getLanding` array responses. This is actively caught and unified in the service layer.
- Hanime uses true 0-based pagination, while some other APIs in our stack use 1-based caching.
