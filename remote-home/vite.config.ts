import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

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
    port: 5171,
    cors: true,
  },
  preview: {
    port: 5171,
  },
});

