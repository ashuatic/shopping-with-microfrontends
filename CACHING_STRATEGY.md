# Caching Strategy for Production

## Overview

This document outlines caching strategies to enhance user experience and reduce server load for the microfrontend shopping application.

## Caching Layers

### 1. Browser Caching (Client-Side)

#### Static Assets
- **Service Worker**: Cache app shell and static resources
- **Cache-Control**: Proper headers for immutable assets
- **IndexedDB**: Store product data locally
- **LocalStorage**: Cache app config and user preferences

#### Implementation Strategy

```javascript
// Service Worker - Cache static assets
const CACHE_NAME = 'shop-app-v1';
const STATIC_ASSETS = [
  '/',
  '/host/index.html',
  '/remote-common/assets/',
  '/remote-home/assets/'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
});
```

### 2. API Response Caching

#### App Configuration
- **Cache**: 24 hours (rarely changes)
- **Strategy**: CDN + browser cache
- **Versioning**: Cache-bust with version parameter

```javascript
// Cache app config
const CACHE_KEY = 'app-config-v3';
const config = await caches.match(CACHE_KEY);
if (config) {
  return config.json();
}
```

#### Products Data
- **Cache**: 5 minutes (frequently updated)
- **Strategy**: Memory cache in frontend
- **Invalidation**: On category change

```typescript
// Product cache with TTL
const productCache = new Map<string, { data: Product[], timestamp: number }>();

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCachedProducts(category: string): Product[] | null {
  const cached = productCache.get(category);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}
```

### 3. CDN Caching (Edge Caching)

#### Microfrontend Assets
- **Strategy**: Aggressive caching for remotes
- **TTL**: 1 year with cache-busting via filename hashes
- **Distribution**: Geo-distributed CDN

```
remoteEntry.js?v=hash123 -> Cache 1 year
Remote components -> Cache 1 year
```

### 4. Server-Side Caching

#### Backend API Responses

**Node.js Memory Cache:**
```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes

app.get('/api/products', (req, res) => {
  const cacheKey = `products-${req.query.type || 'all'}`;
  
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }
  
  // Fetch and cache
  const products = allProducts;
  cache.set(cacheKey, { success: true, data: products });
  res.json({ success: true, data: products });
});
```

**Redis Cache (Production):**
```javascript
const redis = require('redis');
const client = redis.createClient();

app.get('/api/products', async (req, res) => {
  const cacheKey = `products:${req.query.type || 'all'}`;
  
  const cached = await client.get(cacheKey);
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  const data = { success: true, data: allProducts };
  await client.setex(cacheKey, 300, JSON.stringify(data));
  res.json(data);
});
```

## Recommended Caching Strategy

### For This Application

#### 1. App Configuration Cache
**Duration**: 24 hours
**Location**: Browser localStorage
**Invalidation**: Manual refresh or version change

```typescript
// Cache app config in localStorage
localStorage.setItem('app-config-v3', JSON.stringify(config));
```

#### 2. Products Cache
**Duration**: 5-10 minutes
**Location**: Memory (in-frontend) + API response cache
**Invalidation**: Category change triggers new fetch

```typescript
// Frontend product cache
const productCache = new Map();

async function getProducts(category: string) {
  const cacheKey = category || 'all';
  
  // Check memory cache first
  if (productCache.has(cacheKey)) {
    return productCache.get(cacheKey);
  }
  
  // Fetch from API
  const products = await fetchProducts(category);
  productCache.set(cacheKey, products);
  
  return products;
}
```

#### 3. Cart Cache
**Duration**: Session
**Location**: IndexedDB or localStorage
**Persist**: Survive page refresh

```typescript
// Persist cart in IndexedDB
const cartStore = new IDBObjectStore('cart', 'readwrite');
await cartStore.put(cartItems);
```

#### 4. Static Assets Cache
**Duration**: 1 year
**Location**: Service Worker
**Strategy**: Cache-first with network fallback

### Production Recommendations

#### Immediate (Quick Wins)

1. **Browser Cache Headers**
   ```javascript
   // Add to backend/server
   res.setHeader('Cache-Control', 'public, max-age=3600');
   ```

2. **Frontend Memory Cache**
   - Cache products in Map
   - 5-minute TTL
   - Clear on navigation

3. **localStorage for App Config**
   - Cache for 24 hours
   - Check version on fetch

#### Short-term (1-2 weeks)

1. **Service Worker**
   - Cache static assets
   - Offline support
   - Push notifications

2. **Redis Cache (Backend)**
   - Cache API responses
   - 5-minute TTL for products
   - Persistent across restarts

#### Long-term (1+ months)

1. **CDN Distribution**
   - CloudFlare/AWS CloudFront
   - Geo-distributed edge caches
   - DDoS protection

2. **Advanced Strategies**
   - GraphQL with DataLoader
   - HTTP/2 Server Push
   - Prefetching on hover

## Implementation Priority

### High Priority (Do First)
1. ✅ Browser memory cache for products
2. ✅ localStorage for app config
3. ✅ React Query for data fetching with caching
4. ✅ Backend API response cache

### Medium Priority (Next)
1. Service Worker for offline support
2. Redis for backend caching
3. CDN for static assets
4. Image lazy loading

### Low Priority (Future)
1. Advanced prefetching
2. WebRTC peer caching
3. Progressive Web App features
4. IndexedDB for large datasets

## Performance Metrics

### Expected Improvements

- **First Load**: 40% faster with cached static assets
- **Navigation**: 60% faster with memory cache
- **API Calls**: 80% reduction with response caching
- **Offline**: 100% functional with Service Worker

### Cache Hit Rates

- **Static Assets**: 95%+ hit rate
- **API Responses**: 60-80% hit rate
- **Product Images**: 90%+ hit rate

## Tools & Libraries

### Recommended Libraries

**React Query (TanStack Query)**
```typescript
import { useQuery } from '@tanstack/react-query';

const { data, isLoading } = useQuery({
  queryKey: ['products', category],
  queryFn: () => fetchProducts(category),
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});
```

**Workbox (Service Workers)**
```javascript
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [{ expiration: { maxAgeSeconds: 86400 } }]
  })
);
```

**Redis (Backend)**
```javascript
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379
});
```

## Security Considerations

1. **Cache Poisoning Prevention**
   - Validate cache keys
   - Sanitize inputs
   - Use HTTPS

2. **Sensitive Data**
   - Never cache user credentials
   - Clear cache on logout
   - Use secure storage for tokens

3. **Cache Invalidation**
   - Proper cache-busting
   - Version management
   - Manual invalidation endpoints

## Monitoring

### Metrics to Track

1. **Cache Hit Rate**: Percentage of requests served from cache
2. **Load Time**: Time reduction due to caching
3. **API Calls**: Reduction in backend requests
4. **Memory Usage**: Frontend cache size
5. **Network Usage**: Data transfer savings

### Tools

- **Chrome DevTools**: Network tab for cache analysis
- **Lighthouse**: Performance audits
- **WebPageTest**: Detailed caching metrics
- **Monitoring Tools**: Cache hit rates in production

