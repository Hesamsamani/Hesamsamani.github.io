import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://hesamsamani.me',
  integrations: [tailwind()],
  output: 'static',
});