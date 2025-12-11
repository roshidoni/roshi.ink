import Link from "next/link";
import { getAllPosts } from "@/lib/blogList";

export default function BlogPage() {
  const blogList = getAllPosts();
  return (
    <section className="flex flex-col space-y-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          Blog
        </p>
        <h1 className="text-3xl font-semibold">Writing Experiments</h1>
      </header>

      {blogList.length === 0 ? (
        <p className="text-muted-foreground">No posts yet. Check back soon!</p>
      ) : (
        <ul className="space-y-4">
          {blogList.map((post) => {
            const displayDate =
              (post.date as string | undefined) ??
              (post.publishedAt as string | undefined);
            const formattedDate = displayDate
              ? new Date(displayDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : null;

            return (
              <li
                key={post.slug}
                className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/40"
              >
                <Link href={`/blog/${post.slug}`} className="block space-y-2">
                  <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-xl font-semibold">
                      {(post.title as string) ?? post.slug}
                    </h2>
                    {formattedDate ? (
                      <time
                        dateTime={displayDate}
                        className="text-sm text-muted-foreground md:text-right"
                      >
                        {formattedDate}
                      </time>
                    ) : null}
                  </div>
                  {post.summary ? (
                    <p className="text-muted-foreground">
                      {post.summary as string}
                    </p>
                  ) : (
                    <p className="text-muted-foreground">
                      Read the full story →
                    </p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
