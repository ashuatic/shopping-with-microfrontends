# Shopping App - Microfrontend Architecture

A shopping application with microfrontend architecture built with React, TypeScript, Tailwind CSS, Vite Module Federation, and Express.js backend.

## 📁 Project Structure

```
.
├── host/              # Host/shell application (port 5170)
├── remote-home/       # Home page remote (port 5171)
├── remote-common/     # Shared UI components remote (port 5172)
├── backend/           # Express.js backend server (port 3000)
└── package.json       # Root package.json with workspaces
```

## 🎯 Architecture Overview

- **Host**: The main shopping application with dynamic header and product filtering (port 5170)
- **Remote Home**: Home page microfrontend (port 5171)
- **Remote Common**: Shared UI components - Button, Card (port 5172)
- **Backend**: Express.js server providing app configuration API (port 3000)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
npm install
```

### Running the Application

**Start everything:**
```bash
npm run dev
```

This starts all applications:
- **Shopping App (Host)**: http://localhost:5170
- **Backend API**: http://localhost:3000

Access the shopping app at http://localhost:5170

### Individual Development

You can also start each application individually:

```bash
# Start host only
npm run dev:host

# Start backend only
npm run dev:backend

# Start remote-home only
npm run dev:home

# Start remote-common only
npm run dev:common
```

## 🏗️ Building

Build all applications for production:

```bash
npm run build
```

This creates production builds in each application's `dist` folder.

## 📦 Applications

### Host (Shell Application)
- **Port**: 5170
- **Purpose**: Main container that loads and orchestrates microfrontends
- **Entry**: `host/src/main.tsx`
- **Remotes**: Consumes `remoteHome` and `remoteCommon`

### Remote Home
- **Port**: 5171
- **Purpose**: Home page microfrontend
- **Exposes**: `./Home` component
- **Consumes**: `remoteCommon` for UI components

### Remote Common
- **Port**: 5172
- **Purpose**: Shared UI component library
- **Exposes**:
  - `./Button` - Reusable button component with variants
  - `./Card` - Card component for content display

### Backend
- **Port**: 3000
- **Purpose**: REST API server for app configuration
- **Endpoints**:
  - `GET /api/app-config` - Returns application configuration (header, navigation)

## 🎨 Features

- ✅ Module Federation for independent deployment
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Hot Module Replacement (HMR)
- ✅ Shared dependencies (React, React-DOM)
- ✅ Independent development and deployment
- ✅ Component reusability across microfrontends
- ✅ Error Boundaries at all levels for resilient error handling
- ✅ Graceful fallback UI when remotes fail to load

## 🔧 Tech Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **@originjs/vite-plugin-federation**: Module Federation plugin
- **Tailwind CSS**: Utility-first CSS framework
- **NPM Workspaces**: Monorepo management

## 📝 Development Notes

### Error Boundaries

The application includes comprehensive error boundaries at multiple levels:

1. **Host Level**: Wraps the remote Home component
2. **Remote Home Level**: Wraps remote Common components (Button, Card)
3. **Component Level**: Individual components have error boundaries for content

Error boundaries provide:
- Graceful degradation when remotes fail to load
- User-friendly error messages
- Detailed error information in development
- Page reload functionality
- Isolated error containment (one failed component doesn't crash the entire app)

### Adding New Components to Remote Common

1. Create a new component in `remote-common/src/components/`
2. Export it in `remote-common/vite.config.ts` under `exposes`
3. Import it in your consuming applications using: `import Component from 'remoteCommon/Component'`
4. Wrap with ErrorBoundary and Suspense for proper error handling

### Module Federation Configuration

Each microfrontend has its own `vite.config.ts` with:
- **Host**: Defines remotes to consume
- **Remotes**: Define exposed components and shared remotes

### Shared Dependencies

React and React-DOM are marked as shared dependencies to avoid multiple instances:
- Prevents React context conflicts
- Reduces bundle size
- Ensures consistent behavior

## 🎯 Use Cases

This architecture is ideal for:
- Large applications with multiple teams
- Independent development and deployment
- Component sharing across applications
- Progressive migration strategies
- Microservices-like frontend architecture

## 📚 Additional Resources

- [Vite Module Federation Documentation](https://github.com/originjs/vite-plugin-federation)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Create feature branches from `main`
2. Develop features in the appropriate microfrontend
3. Test interactions between microfrontends
4. Submit pull requests for review

## 📄 License

MIT

