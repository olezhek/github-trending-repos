import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/',
  plugins: [react()],
  test: { environment: 'jsdom', include: ['src/**/*.{test,spec}.{js,jsx}'], setupFiles: ['./vitest.setup.js'], globals: true }
})
