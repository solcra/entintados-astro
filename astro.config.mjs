// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';


// https://astro.build/config
export default defineConfig({
	site: 'https://entintados.com.co',
	output: 'static',
	integrations: [
		mdx(), 
		vue(), 
		sitemap(),
	],
	vite: {
		build: {
      		cssCodeSplit: true,
    	},
		plugins: [
			tailwindcss(),
			{
				name: 'defer-css',
				transformIndexHtml(html) {
					return html.replace(
						/<link rel="stylesheet" href="(.*?)">/g,
						`<link rel="stylesheet" href="$1" media="print" onload="this.media='all'">`
					);
				},
			},
		],
	}
});
