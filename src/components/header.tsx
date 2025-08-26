export const Header = () => {
  return (
    <header className="max-w-[900px] mx-auto py-2 px-1 border-b border-[var(--muted)]" role="banner">
        <nav className="flex justify-between items-center gap-1rem">
            <div className="font-semibold ">Roshi</div>
            <div className="controls">
                <div className="nav-links flex" id="navLinks">
                    <a href="#about">About</a>
                    <a href="#portfolio">Portfolio</a>
                    <a href="#blog">Blog</a>
                    <a href="#contact">Contact</a>
                </div>
            </div>
        </nav>
    </header>
  )
}
