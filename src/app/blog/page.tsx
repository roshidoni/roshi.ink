import { getAllPosts } from "@/lib/blogList"

export default function BlogPage() {
    const blogList = getAllPosts()
    return (
        <div className="flex flex-col">
            <h1>Hali hich narsa yo</h1>
        </div>
    )
} 