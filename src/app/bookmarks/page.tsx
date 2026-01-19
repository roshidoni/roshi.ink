export default function Bookmarks() {
  const groups: { title: string; items: { title: string; url?: string }[] }[] =
    [
      {
        title: "articles",
        items: [
          {
            title: "Write Like You Talk",
            url: "https://www.paulgraham.com/talk.html",
          },
          {
            title: "Single Threaded Leadership",
            url: "https://fs.blog/single-threaded-leadership/",
          },
          {
            title: "The Day You Became A Better Writer",
            url: "https://kb.iu.edu/d/bfqu",
          },
          {
            title: "How To Be Successful",
            url: "https://blog.samaltman.com/how-to-be-successful",
          },
        ],
      },
      {
        title: "blogs",
        items: [{ title: "leerob.com", url: "https://leerob.com/" }],
      },
      {
        title: "VS Code Extensions",
        items: [{ title: "Error Lens" }, { title: "Pretty Typescript Errors" }],
      },
      {
        title: "apps",
        items: [{ title: "spokenly", url: "https://spokenly.app" }],
      },
    ];

  return (
    <main className="container" role="main">
      <section className="section" aria-label="Bookmarks">
        <h2 className="mb-2">bookmarks</h2>

        {groups.map((group) => (
          <div key={group.title} className="mt-6">
            <h3 className="mb-2">{group.title}</h3>
            <ul className="space-y-1 list-di">
              {group.items.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  {item.url ? (
                    <a
                      href={item.url}
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <span>{item.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
