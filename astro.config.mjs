// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://entintados.com.co',
	integrations: [mdx(), vue(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
	}
});
