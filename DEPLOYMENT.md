# Independent Deployment Guide

## Overview

Yes, all applications (host, remote-home, remote-common, backend) are **separate and independently deployable**. Each has its own `package.json`, build process, and can be deployed to different servers.

## Application Independence

### 1. **Backend** (`backend/`)
- **Framework**: Express.js
- **Port**: 3000
- **Dependencies**: express, cors
- **Deployment**: Any Node.js hosting (Heroku, AWS, Railway, etc.)
- **Independent**: ✅ Yes - No dependencies on other apps

**Build & Deploy:**
```bash
cd backend
npm install
npm run build  # Optional
# Deploy the entire backend folder
```

### 2. **Remote Common** (`remote-common/`)
- **Framework**: Vite + React
- **Port**: 5172 (dev)
- **Build Output**: `remote-common/dist/`
- **Deployment**: Static hosting (CDN, S3, Netlify, Vercel)
- **Exposes**: Button, Card components
- **Independent**: ✅ Yes - No dependencies on other apps

**Build & Deploy:**
```bash
cd remote-common
npm install
npm run build
# Deploy the dist/ folder to CDN
# Example: https://cdn.example.com/remote-common/
```

### 3. **Remote Home** (`remote-home/`)
- **Framework**: Vite + React
- **Port**: 5171 (dev)
- **Build Output**: `remote-common/dist/`
- **Deployment**: Static hosting (CDN, S3, Netlify, Vercel)
- **Exposes**: Home component
- **Consumes**: remote-common (at runtime)
- **Independent**: ✅ Yes - Only needs remote-common URL

**Build & Deploy:**
```bash
cd remote-home
npm install
npm run build
# Deploy the dist/ folder to CDN
# Example: https://cdn.example.com/remote-home/
```

### 4. **Host** (`host/`)
- **Framework**: Vite + React
- **Port**: 5170 (dev)
- **Build Output**: `host/dist/`
- **Deployment**: Static hosting (CDN, S3, Netlify, Vercel)
- **Consumes**: remote-home, remote-common (at runtime)
- **Independent**: ✅ Yes - Only needs remote URLs

**Build & Deploy:**
```bash
cd host
npm install
npm run build
# Deploy the dist/ folder to CDN
# Example: https://app.example.com/
```

## Deployment Configuration

### For Independent Deployment

Each app needs to be configured with the correct remote URLs:

#### Host Configuration (`host/vite.config.ts`)

```typescript
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        remoteHome: 'https://cdn.example.com/remote-home/assets/remoteEntry.js',
        remoteCommon: 'https://cdn.example.com/remote-common/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  // ...
});
```

#### Remote Home Configuration (`remote-home/vite.config.ts`)

```typescript
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remoteHome',
      filename: 'remoteEntry.js',
      exposes: {
        './Home': './src/components/Home',
      },
      remotes: {
        remoteCommon: 'https://cdn.example.com/remote-common/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  // ...
});
```

#### Backend Configuration

Update CORS if needed for cross-origin requests:
```javascript
app.use(cors({
  origin: ['https://app.example.com'],
  credentials: true
}));
```

## Deployment Workflow

### 1. Build All Applications

```bash
# From root
npm run build
```

This builds:
- `host/dist/`
- `remote-home/dist/`
- `remote-common/dist/`

### 2. Deploy Each Application

#### Option A: Separate Hosting

**Backend (Express.js):**
```bash
cd backend
npm install --production
# Deploy to Node.js hosting
```

**Frontend Apps (Static):**
```bash
# Deploy each dist/ folder to CDN
cd host/dist && deploy-to-cdn
cd remote-home/dist && deploy-to-cdn
cd remote-common/dist && deploy-to-cdn
```

#### Option B: Using Docker

Create `Dockerfile` for each app:

```dockerfile
# backend/Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

```dockerfile
# host/Dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html
EXPOSE 80
```

### 3. Update URLs in Configuration

After deployment, update the URLs in vite config files to point to production URLs.

## Independent Benefits

### 1. **Team Independence**
- Different teams can own different apps
- Deploy independently without coordination
- No shared codebase dependencies

### 2. **Technology Flexibility**
- Can use different tech stacks for different apps
- Independent upgrade paths
- Technology agnostic

### 3. **Scaling**
- Scale each app independently based on load
- Different deployment strategies per app
- Independent infrastructure

### 4. **CI/CD**
- Separate CI/CD pipelines
- Independent testing and deployment
- Rollback one app without affecting others

### 5. **Development**
- Develop locally with all apps running
- Or develop just one app at a time
- Mock other remotes during development

## Development vs Production

### Development (Monorepo)
```bash
npm run dev  # Runs all apps locally
```

### Production (Separate Deployments)
```bash
# Deploy each app to different servers/CDNs
# Configure remote URLs appropriately
```

## Example Deployment URLs

```
Backend:        https://api.example.com
Host:           https://app.example.com
Remote Home:    https://cdn.example.com/remote-home/
Remote Common:  https://cdn.example.com/remote-common/
```

## Runtime Loading

The apps are loaded **at runtime** via Module Federation:
- Host loads remote-home and remote-common when the page loads
- No build-time dependencies
- Can update remotes independently

## Summary

✅ **All apps are independent**
✅ **Each has its own package.json**
✅ **Each can be built and deployed separately**
✅ **No shared runtime dependencies**
✅ **Module Federation enables runtime integration**
✅ **Backend is completely separate**

The monorepo structure is for **development convenience** only. In production, each app can be deployed to completely different infrastructure.

