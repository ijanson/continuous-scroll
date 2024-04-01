import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
        script: resolve(__dirname, 'src/script/scroll.ts'),
      },
      output: {
        // preserveModules: true,
        entryFileNames: `[name].js`,
        // assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  plugins: [react()],
})
