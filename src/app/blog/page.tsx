import { getAllPosts } from "@/lib/blogList"

export default function BlogPage() {
    const blogList = getAllPosts()
    return (
        <div className="flex flex-col">
            {blogList.map((blog, id) => 
                <div key={id}>
                    hey
                </div>
            )
    }
        </div>
    )
} 