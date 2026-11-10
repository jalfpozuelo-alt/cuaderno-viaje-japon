import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig(() => {
  const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
  return {
    base: process.env.GITHUB_ACTIONS && repository ? `/${repository}/` : '/',
    plugins:[react(),VitePWA({registerType:'autoUpdate',manifest:{name:'Cuaderno de viaje · Japón',short_name:'Japón · guía',description:'Guía de autor para recorrer Japón',theme_color:'#f5f2eb',background_color:'#f5f2eb',display:'standalone',start_url:'./',icons:[{src:'icon.svg',sizes:'any',type:'image/svg+xml',purpose:'any maskable'}]},workbox:{globPatterns:['**/*.{js,css,html,svg}'],runtimeCaching:[{urlPattern:/^https:\/\/commons\.wikimedia\.org\//,handler:'CacheFirst',options:{cacheName:'cuaderno-fotos',expiration:{maxEntries:40,maxAgeSeconds:2592000}}}]}})]
  };
});
