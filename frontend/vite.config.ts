import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
  // server: {
  //   cors: {
  //     origin: 'http://localhost:5173', // 올바른 Origin 설정
  //     credentials: true,               // 인증 정보 허용 (쿠키 등)
  //   }
  // }
});
