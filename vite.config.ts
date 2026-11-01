import { previewPrerenderedRoutes } from './scripts/preview.mjs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss(), previewPrerenderedRoutes()],
  build: {
    manifest: true,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'three-core', test: /three\/build\/three\.core\.js/ },
            { name: 'three-renderer', test: /three\/build\/three\.module\.js/ },
          ],
        },
      },
    },
  },
})
