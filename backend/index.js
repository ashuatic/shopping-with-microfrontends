import express from 'express';
import cors from 'cors';
import { allProducts } from './products.js';
import { appConfigV1, configVersions } from './configVersions.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// GET /api/products - Returns all products or filtered by category/type
app.get('/api/products', (req, res) => {
  const { category, type } = req.query;
  let products = allProducts;

  // Filter by category or type if provided
  const filterType = category || type;
  if (filterType && filterType !== 'all') {
    products = allProducts.filter(product => 
      product.category.toLowerCase() === filterType.toLowerCase()
    );
  }

  res.json({
    success: true,
    data: products,
    message: 'Products retrieved successfully'
  });
});

// GET /api/app-config - Returns app configuration with versioning support
app.get('/api/app-config', (req, res) => {
  const { version } = req.query;
  const requestedVersion = version || '1.0.0';
  
  // Get config for requested version or default to latest
  let appConfig;
  if (version && configVersions[version]) {
    appConfig = configVersions[version];
  } else if (!version) {
    // Default to latest version (3.0.0) when no version specified
    appConfig = configVersions['3.0.0'];
  } else {
    // If version not found, return default
    appConfig = appConfigV1;
  }

  res.json({
    success: true,
    data: appConfig,
    requestedVersion,
    availableVersions: Object.keys(configVersions),
    message: 'App configuration retrieved successfully'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Backend API Server',
    version: '1.0.0',
    endpoints: {
      appConfig: '/api/app-config',
      products: '/api/products'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/app-config`);
  console.log(`   GET  http://localhost:${PORT}/api/app-config?version=1.0.0`);
  console.log(`   GET  http://localhost:${PORT}/api/products`);
});

