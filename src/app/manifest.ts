import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gongsiri',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
  };
}
