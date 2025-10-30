import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remoteOrders',
      filename: 'remoteEntry.js',
      exposes: {
        './Orders': './src/components/Orders',
      },
      remotes: {
        remoteCommon: 'http://localhost:5172/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
  },
  server: {
    port: 5175,
    cors: true,
  },
  preview: {
    port: 5175,
  },
});


