# Backend API Versioning Guide

## Overview

The backend API supports versioned configurations to ensure backward compatibility across different client versions.

## Versioned Endpoints

### GET /api/app-config

Returns application configuration. Supports versioning via query parameter.

#### Usage Examples

**Get latest version (default):**
```bash
curl http://localhost:3000/api/app-config
```

**Get specific version:**
```bash
curl http://localhost:3000/api/app-config?version=1.0.0
curl http://localhost:3000/api/app-config?version=2.0.0
curl http://localhost:3000/api/app-config?version=3.0.0
```

#### Response Format

```json
{
  "success": true,
  "data": {
    "version": "3.0.0",
    "headerConfig": { ... },
    "leftNavConfig": { ... },
    "secondaryConfig": { ... },
    "theme": { ... },
    "features": { ... }
  },
  "requestedVersion": "3.0.0",
  "availableVersions": ["1.0.0", "2.0.0", "3.0.0"],
  "message": "App configuration retrieved successfully"
}
```

## Configuration Versions

### Version 1.0.0 (Basic)
- **Header Config**: Clothing, Electronics, Mobiles
- **Left Nav**: Profile, Cart, Orders
- **Secondary**: Checkout, Payment
- No additional features

### Version 2.0.0 (Enhanced)
- All features from v1.0.0
- **Icons** added to navigation items
- **Theme** configuration added
- Improved UI elements

### Version 3.0.0 (Advanced)
- All features from v2.0.0
- **Badges** on header items (New, Hot)
- **Features** flag:
  - `infiniteScroll`: true
  - `cartPersist`: true
  - `analytics`: true

## Version Compatibility

### Backward Compatibility
- Older clients can request their specific version
- If version not found, defaults to v1.0.0
- No breaking changes for existing functionality

### Forward Compatibility
- New features added in higher versions
- Optional features don't break older clients
- Graceful degradation

## Implementation Details

### Backend Structure

```
backend/
├── index.js              # Main server with versioning logic
├── configVersions.js     # Version configurations
└── products.js           # Product data
```

### Version Selection Logic

1. **With version parameter**: Returns requested version if available
2. **No version parameter**: Returns latest version (3.0.0)
3. **Invalid version**: Falls back to v1.0.0

### Adding New Versions

1. Create new version object in `configVersions.js`
2. Add to `configVersions` mapping
3. Update default version in index.js
4. Test backward compatibility

## Testing

```bash
# Test v1.0.0
curl "http://localhost:3000/api/app-config?version=1.0.0"

# Test v2.0.0
curl "http://localhost:3000/api/app-config?version=2.0.0"

# Test v3.0.0 (latest)
curl "http://localhost:3000/api/app-config?version=3.0.0"

# Test latest (no version)
curl "http://localhost:3000/api/app-config"
```

## Client Implementation

### Fetching Config

```typescript
import { fetchAppConfig } from './services/api';

// Get latest version
const config = await fetchAppConfig();

// Get specific version for compatibility
const config = await fetchAppConfig('2.0.0');
```

### Using Config Data

```typescript
// Works with all versions
const { headerConfig, leftNavConfig } = config;

// Version-specific features (check if exists)
if (config.theme) {
  // Use theme
}

if (config.features?.infiniteScroll) {
  // Enable infinite scroll
}
```

## Best Practices

1. **Always check for optional features** before using them
2. **Specify version** when you need specific functionality
3. **Handle gracefully** when features aren't available
4. **Test with different versions** during development
5. **Document version changes** for team members

