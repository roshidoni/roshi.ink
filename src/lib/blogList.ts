import fs from "fs"
import path from "path"
const blogDir = path.join(process.cwd(), "src/app/blog")
const POST_METADATA_FILENAME = "metadata.json"

type BlogData = {
    slug: string;
    [key: string]: any;
}

function readMetadata(slug: string): BlogData | null {
    const filePath = path.join(blogDir, slug, POST_METADATA_FILENAME)

    if (!fs.existsSync(filePath)) {
        return null
    }

    const fileContents = fs.readFileSync(filePath, "utf8")

    let parsed: Record<string, unknown>

    try {
        parsed = JSON.parse(fileContents)
    } catch (error) {
        throw new Error(`Unable to parse metadata for slug "${slug}": ${(error as Error).message}`)
    }

    return {
        slug,
        ...parsed,
    }
}

export function getAllPosts() {
    const entries = fs.readdirSync(blogDir, {withFileTypes: true})
    const posts: BlogData[] = []

    entries.forEach((entry)=> {
        if (!entry.isDirectory()) {
            return
        }

        const metadata = readMetadata(entry.name)
        if (metadata) {
            posts.push(metadata)
        }
    })

    return posts
}

export function getPostMetadata(slug: string) {
    const metadata = readMetadata(slug)

    if (!metadata) {
        throw new Error(`Unable to find blog post for slug "${slug}"`)
    }

    return metadata
}
