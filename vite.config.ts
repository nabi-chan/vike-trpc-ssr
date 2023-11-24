import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import vike from 'vike/plugin';
import vercel from 'vite-plugin-vercel';
import { UserConfig } from 'vite';

export default {
  plugins: [react(), vike({ prerender: true }), vercel()],
  resolve: {
    alias: {
      '#': resolve('./src'),
    },
  },
  vercel: {
    additionalEndpoints: [
      {
        source: 'server/trpc.ts',
        destination: `trpc(.*)`,
        edge: true,
        addRoute: true,
      },
    ],
  },
} as UserConfig;
