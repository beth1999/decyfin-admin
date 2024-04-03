import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
    },
    define: {
      'process.env': env
    },
    plugins: [react()],
    server: {
      port: 9000,
      host: '0.0.0.0',
      open: true
    }
  };
});
