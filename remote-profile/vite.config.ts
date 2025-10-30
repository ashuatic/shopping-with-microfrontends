import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remoteProfile',
      filename: 'remoteEntry.js',
      exposes: {
        './Profile': './src/components/Profile',
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
    port: 5174,
    cors: true,
  },
  preview: {
    port: 5174,
  },
});


