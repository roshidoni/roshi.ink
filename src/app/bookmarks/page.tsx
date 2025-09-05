export default function Bookmarks() {
    const groups: { title: string; items: { title: string; url: string }[] }[] = [
        {
            title: "tools",
            items: [
                { title: "WebTL", url: "https://web.dev/" },
                { title: "Anime.js", url: "https://animejs.com/" },
                { title: "SVG Logos", url: "https://svgporn.com/" },
                { title: "Fancy Components", url: "https://fancycomponents.dev/" },
            ],
        },
        {
            title: "articles",
            items: [
                { title: "Write Like You Talk", url: "https://www.paulgraham.com/talk.html" },
                { title: "Single Threaded Leadership", url: "https://fs.blog/single-threaded-leadership/" },
                { title: "The Day You Became A Better Writer", url: "https://kb.iu.edu/d/bfqu" },
                { title: "How To Be Successful", url: "https://blog.samaltman.com/how-to-be-successful" },
            ],
        },
    ];

    return (
        <main className="container" role="main">
            <section className="section" aria-label="Bookmarks">
                <h2 className="mb-2">bookmarks</h2>

                {groups.map((group) => (
                    <div key={group.title} className="mt-6">
                        <h3 className="mb-2">{group.title}</h3>
                        <ul className="space-y-1">
                            {group.items.map((item) => (
                                <li key={item.url} className="flex items-center gap-2">
                                    <span aria-hidden="true" className="select-none">•</span>
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
        </main>
    );
}