// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

const SITE_URL = 'https://reheadsplease.ymmyi.wiki';

export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), sitemap()],
});
