# Backend Server

Express.js server providing application configuration for the microfrontend shopping app.

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## API Endpoints

### GET /api/app-config

Returns the application configuration with navigation settings.

**Response:**
```json
{
  "success": true,
  "data": {
    "version": "1.0.0",
    "headerConfig": {
      "clothing": {
        "path": "/shopping/clothing",
        "title": "Clothing"
      },
      "electronics": {
        "path": "/shopping/electronics",
        "title": "Electronics"
      },
      "mobiles": {
        "path": "/shopping/mobiles",
        "title": "Mobiles"
      }
    },
    "leftNavConfig": {
      "profile": {
        "path": "/profile",
        "title": "Profile"
      },
      "cart": {
        "path": "/cart",
        "title": "Cart"
      },
      "orders": {
        "path": "/orders",
        "title": "Orders"
      }
    },
    "secondaryConfig": {
      "checkout": {
        "path": "/cart/checkout",
        "title": "Checkout"
      },
      "payment": {
        "path": "/orders/payment",
        "title": "Payment"
      }
    }
  },
  "message": "App configuration retrieved successfully"
}
```

### GET /

Root endpoint with API information.

**Response:**
```json
{
  "message": "Backend API Server",
  "version": "1.0.0",
  "endpoint": "/api/app-config"
}
```

## Server Configuration

- **Port**: 3000 (default) or set via `PORT` environment variable
- **CORS**: Enabled for all origins
- **JSON**: Automatic JSON parsing

## Example Usage

### Fetch App Config

```javascript
fetch('http://localhost:3000/api/app-config')
  .then(res => res.json())
  .then(data => console.log(data));
```

## Development

The server uses Node.js watch mode for hot reloading during development.

## CORS Configuration

CORS is enabled for all origins to allow the microfrontend applications to access the API.
