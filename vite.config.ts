import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    plugins: [
      react(),
      svgr({
        // svgr options: https://react-svgr.com/docs/options/
        svgrOptions: {
          exportType: 'default',
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: '**/*.svg',
      }),
    ],
    server: {
      proxy: {
        '/api': {
          target: 'https://api.manito.service.kimjunyoung.com',
          // secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          changeOrigin: true,
        },
      },
    },
  });
};
