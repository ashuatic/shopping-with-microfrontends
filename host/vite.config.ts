import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        remoteHome: 'http://localhost:5171/assets/remoteEntry.js',
        remoteCommon: 'http://localhost:5172/assets/remoteEntry.js',
        remoteCart: 'http://localhost:5173/assets/remoteEntry.js',
        remoteProfile: 'http://localhost:5174/assets/remoteEntry.js',
        remoteOrders: 'http://localhost:5175/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5170,
  },
  preview: {
    port: 5170,
  },
});

