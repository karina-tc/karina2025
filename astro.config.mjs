import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import prefetch from '@astrojs/prefetch';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), prefetch(), mdx()],
  adapter: netlify(),
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'night-owl',
      wrap: true,
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      langs: ['astro', 'typescript', 'javascript', 'python', 'bash', 'markdown', 'css', 'html', 'json', 'ruby'],
    },
  },
});