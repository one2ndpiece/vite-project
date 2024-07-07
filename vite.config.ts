import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"  // Added

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES
    ? "/vite-project/"  // リポジトリ名に合わせて設定
    : "./",
  plugins: [react()],
  resolve: {  // Added
    alias: {  // Added
      "@": path.resolve(__dirname, "./src"),  // Added
      "src": path.resolve(__dirname, "./src"),  // Added
    },  // Added
  },  // Added
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    // 'import.meta.env.VITE_PUBLIC_URL': JSON.stringify(process.env.VITE_PUBLIC_URL || '')
  },
  // build: {
  //   outDir: 'dist'
  // },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})