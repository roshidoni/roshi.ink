import fs from "fs"
import path from "path"
import matter from "gray-matter"

const blogDir = path.join(process.cwd(), "src/app/blog")

type blogData = {
    [key: string]: any;
}

export function getAllPosts() {
    const entries = fs.readdirSync(blogDir, {withFileTypes: true})
    let filteredEntries: blogData[] = []
    const allEntries: (blogData | null)[] = entries.map((entry)=> {
        let filePath: string;
        let slug: string;

        if(entry.isDirectory()){
            filePath = path.join(blogDir, entry.name, "page.mdx")
            slug = entry.name
        }
        else{
            return null
        }

        
        const fileContents = fs.readFileSync(filePath, "utf8")
        const { data } = matter(fileContents);

        return data
    })
    
    allEntries.forEach(val=> {
        if(val !== null){
            filteredEntries.push(val)
        }
    })
    return filteredEntries

}