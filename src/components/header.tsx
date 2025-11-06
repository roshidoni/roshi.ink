import BookmarkIcon from "./BookmarkIcon"
import Link from "next/link"

export const Header = () => {
  return (
    <header className="max-w-[900px] w-full mx-auto py-2 px-1 border-b border-[var(--muted)]" role="banner">
        <nav className="flex justify-between items-center gap-1rem">
            <Link href="/" className="font-semibold ">Roshi</Link>
            <div className="">
                <div className="nav-links flex" id="navLinks">
                    <Link href="/blog">Blog </Link>
                    <Link href="/bookmarks"><BookmarkIcon/> </Link>
                </div>
            </div>
        </nav>
    </header>
  )
}
