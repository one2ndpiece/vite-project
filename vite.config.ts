import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"  // Added

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES
    ? "/vite-project/"  // GitHub Pagesを使用する場合のパス
    : "/",  // ローカル開発やその他の環境での基本パス
  plugins: [react()],
  resolve: {  // Added
    alias: {  // Added
      "@": path.resolve(__dirname, "./src"),  // Added
      "src": path.resolve(__dirname, "./src"),  // Added
    },  // Added
  },  // Added
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'import.meta.env.BASE_URL': JSON.stringify(process.env.GITHUB_PAGES ? "/vite-project/" : "/"),
  },
  // build: {
  //   outDir: 'dist'
  // },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})