import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remoteCart',
      filename: 'remoteEntry.js',
      exposes: {
        './Cart': './src/components/Cart',
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
    port: 5173,
    cors: true,
  },
  preview: {
    port: 5173,
  },
});


