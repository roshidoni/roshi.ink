import type { MetadataRoute } from "next"
import fs from "fs"
import path from "path"

const siteUrl = "https://roshi.ink"
const blogDir = path.join(process.cwd(), "src/app/blog")

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] =
  [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.7, changeFrequency: "monthly" },
    { path: "/bookmarks", priority: 0.6, changeFrequency: "monthly" },
  ]

function getBlogRoutes(): MetadataRoute.Sitemap {
  if (!fs.existsSync(blogDir)) {
    return []
  }

  return fs
    .readdirSync(blogDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const filePath = path.join(blogDir, entry.name, "page.mdx")
      const hasPost = fs.existsSync(filePath)
      const stats = hasPost ? fs.statSync(filePath) : undefined

      return {
        url: `${siteUrl}/blog/${encodeURIComponent(entry.name)}`,
        lastModified: stats?.mtime ?? new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }
    })
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const baseEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  return [...baseEntries, ...getBlogRoutes()]
}
