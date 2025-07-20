import { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Tech Blog | Home",
  description: "Explore my latest thoughts, tutorials, and insights on web development, technology, and more.",
}

export default function HomePage() {

  return (
    <section className="w-full py-6 md:py-12 lg:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to My Blog
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Explore my latest thoughts, tutorials, and insights on web development, technology, and more.
            </p>
          </div>
        </div>
        <div className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          
        </div>
      </div>
    </section>
  )
}
