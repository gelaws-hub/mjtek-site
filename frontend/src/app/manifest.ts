import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MJ-Teknologi Store',
    short_name: 'MjTek',
    description: 'Sebuah toko online yang menyediakan berbagai macam kebutuhan komputer di Semarang',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#152547',
    icons: [
      {
        src: '/logo-circle-bg.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}