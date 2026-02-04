import type { APIRoute } from 'astro';

const siteUrl = "https://roshi.ink";

export const GET: APIRoute = () => {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
Host: ${siteUrl}`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
};
