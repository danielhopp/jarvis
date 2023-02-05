import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSvgr from 'vite-plugin-svgr'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '#root': path.resolve(__dirname, './src'),
      '#actions': path.resolve(__dirname, './src/slices'),
      '#components': path.resolve(__dirname, './src/components')
    }
  },
  plugins: [
    ViteEjsPlugin(viteConfig => ({
      env: viteConfig.env
    })),
    vitePluginSvgr(),
    react()
  ]
})
