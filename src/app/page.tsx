import Image from "next/image";

export default function EInkHome() {

  return (
    <div className="min-h-screen text-ink-900 antialiased">


        <main className="container" role="main">
            <section className="hero" id="about">
                <div className="hero-text">
                    <h1>Hello, I’m Roshi.</h1>
                    <p>
                        My Linkedin name is Abdussomad. I am in Software engineering for <b>3 years</b>. I like computers
                    </p>
                    <div className="flex gap-2 mt-2">
                        <a href="https://github.com/roshidoni" className="border border-black px-2 py-1 bg-black text-white">View Github</a>
                        <a href="https://linkedin.com/in/abdussomad" className="border border-black px-2 py-1 bg-black text-white">View LinkedIn</a>
                    </div>
                </div>
                <div className="hero-illustration">
                    <Image
                        src="/roshi_ink.webp"
                        alt="Ink style illustration"
                        className="select-none"
                        width={500}
                        height={500}
                        draggable={false}
                    />
                </div>
            </section>

            <section className="section" id="portfolio">
                <h2 className="mb-2 border-b border-[var(--muted)]">I made some colorful websites too</h2>
                <div className="portfolio-grid" aria-live="polite">
                    <div className="portfolio-item">
                        <div className="project-title">sodiqtech.com</div>
                        <div className="project-desc">
                            A performant dashboard with real-time vehicle
                            tracking and clean UI.
                        </div>
                    </div>
                    <div className="portfolio-item">
                        <div className="project-title">evrilish.uz</div>
                        <div className="project-desc">
                            A minimal blogging platform focused on
                            typography-first reading experiences.
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" id="blog">
                <h2>Latest Posts</h2>
                <div className="blog-list">
                    <div className="post">
                        <a href="#">Designing for Calm: Why Less Is More</a>
                        <p>A short reflection on quiet digital experiences.</p>
                    </div>
                    <div className="post">
                        <a href="#">The Joy of Monochrome</a>
                        <p>Exploring design without color distractions.</p>
                    </div>
                </div>
            </section>

            <section className="section" id="contact">
                <h2>Contact</h2>
                <p className="muted">
                    Interested in collaborating? Say hi at <span className="text-black">samadbekmahmudjonov@gmail.com</span>
                </p>
            </section>
        </main>
    </div>
  );
}
