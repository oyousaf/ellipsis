// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Placeholder until the concept has its own portfolio domain.
  site: 'https://ellipsis-concept.vercel.app',
  trailingSlash: 'never',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), sitemap()],

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },

  // Old Wix URLs, so links into the original site map cleanly onto the new structure.
  redirects: {
    '/home': '/',
    '/solution': '/earth',
    '/our-technology': '/earth#how-it-works',
    '/surveys': '/earth#surveys',
    '/demo': '/earth#platform',
    '/councils': '/earth',
    '/casestudies': '/earth/case-studies',
    '/case-studies': '/earth/case-studies',
    '/bcp': '/earth/case-studies#bournemouth',
    '/educate-students': '/educate#students',
    '/educate-teachers': '/educate#educators',
    '/educate-aboutus': '/about',
    '/educate-brochure': '/educate',
    '/educate-requestinfo': '/contact',
    '/webinars': '/educate',
    '/shop': '/educate',
    '/contact-us': '/contact',
    '/team': '/about',
    '/blog': '/stories',
    '/blog/[slug]': '/stories/[slug]',
    '/post/[slug]': '/stories/[slug]'
  },

  adapter: vercel()
});
