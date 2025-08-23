// src/pages/rss.xml.js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const productos = await getCollection('productos');

  return rss({
    title: 'Entintados RSS Feed',
    description: 'Últimas novedades y productos de Entintados',
    site: context.site, // 👈 importante para que genere bien las URLs absolutas
    items: productos.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/productos/${post.slug}/`,
      pubDate: post.data.date, // opcional si tienes fechas
    })),
    stylesheet: '/rss/styles.xsl', // opcional si quieres darle estilo
  });
}