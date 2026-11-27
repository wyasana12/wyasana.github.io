import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  base: './',
  plugins: [react(), tailwindcss()],
  build: isSsrBuild
    ? undefined
    : {
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
                return 'react-vendor';
              }
            },
          },
        },
      },
}))
