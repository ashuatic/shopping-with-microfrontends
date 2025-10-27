# Quick Caching Implementation Guide

## Quick Wins (Implement Now)

### 1. Frontend Product Cache (5 minutes)

Add to `host/src/services/api.ts`:

```typescript
// Simple in-memory cache
const productCache = new Map<string, { data: Product[], timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function fetchProducts(category?: string, type?: string): Promise<Product[]> {
  const cacheKey = type || 'all';
  const cached = productCache.get(cacheKey);
  
  // Return cached data if fresh
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  try {
    let url = 'http://localhost:3000/api/products';
    const params = new URLSearchParams();
    
    const filterParam = category || type;
    if (filterParam && filterParam !== 'all') {
      params.append('type', filterParam);
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse<Product[]> = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    // Cache the results
    productCache.set(cacheKey, { data: data.data, timestamp: Date.now() });
    
    return data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
```

### 2. App Config Cache (24 hours)

Add to `host/src/services/api.ts`:

```typescript
const CONFIG_CACHE_KEY = 'app-config-cache';
const CONFIG_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function fetchAppConfig(version?: string): Promise<AppConfig> {
  // Check localStorage cache
  const cached = localStorage.getItem(CONFIG_CACHE_KEY);
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CONFIG_CACHE_TTL) {
        return data;
      }
    } catch (e) {
      // Cache invalid, continue to fetch
    }
  }
  
  try {
    const url = version 
      ? `http://localhost:3000/api/app-config?version=${version}`
      : 'http://localhost:3000/api/app-config';
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse<AppConfig> = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    // Cache in localStorage
    localStorage.setItem(CONFIG_CACHE_KEY, JSON.stringify({
      data: data.data,
      timestamp: Date.now()
    }));
    
    return data.data;
  } catch (error) {
    console.error('Error fetching app config:', error);
    throw error;
  }
}
```

### 3. Backend Memory Cache (Server-Side)

Add to `backend/index.js`:

```javascript
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes

// Modified products endpoint
app.get('/api/products', (req, res) => {
  const { category, type } = req.query;
  const filterType = category || type;
  const cacheKey = `products-${filterType || 'all'}`;
  
  // Check cache
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }
  
  let products = allProducts;
  if (filterType && filterType !== 'all') {
    products = allProducts.filter(product => 
      product.category.toLowerCase() === filterType.toLowerCase()
    );
  }
  
  const response = { success: true, data: products, message: 'Products retrieved successfully' };
  
  // Cache the response
  cache.set(cacheKey, response);
  
  res.json(response);
});
```

Install NodeCache:
```bash
cd backend && npm install node-cache
```

## Production Recommendations

### 1. React Query Integration

Install:
```bash
npm install @tanstack/react-query
```

Setup in App.tsx:
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app */}
    </QueryClientProvider>
  );
}
```

Use in components:
```typescript
import { useQuery } from '@tanstack/react-query';

const { data: products } = useQuery({
  queryKey: ['products', category],
  queryFn: () => fetchProducts(undefined, category),
});
```

### 2. Service Worker for Offline

Create `host/src/sw.js`:

```javascript
const CACHE_NAME = 'shop-app-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/host/assets/',
  '/remote-common/assets/',
  '/remote-home/assets/'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

Register in `host/src/main.tsx`:

```typescript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

## Testing Cache Performance

### Browser DevTools

1. Open DevTools → Network tab
2. Look for "from cache" status
3. Check Response Headers for Cache-Control
4. Monitor cache hits/misses

### Cache Validation

```bash
# Test product cache
curl "http://localhost:3000/api/products?type=clothing"
# Should be fast on second call

# Test config cache
curl "http://localhost:3000/api/app-config?version=1.0.0"
# Should be instant on repeat calls
```

## Expected Results

- **First Load**: ~2-3 seconds
- **Cached Load**: ~200-500ms
- **Navigation**: Instant with cached data
- **Offline**: Works with Service Worker

## Next Steps

1. Implement frontend memory cache (now)
2. Add localStorage for config (now)
3. Install React Query (1 week)
4. Add Service Worker (2 weeks)
5. Setup CDN (1 month)

