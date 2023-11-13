import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import vike from 'vike/plugin';
import { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [react(), vike()],
  resolve: {
    alias: {
      '#': resolve('./src'),
    },
  },
};

export default config;
