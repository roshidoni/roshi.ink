export default function AboutPage() {
  return (
    <section className="w-full py-6 md:py-12 lg:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              About My Blog
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {
                "This blog is a personal project dedicated to sharing knowledge and experiences in the world of web development and technology."
              }
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl py-8 space-y-6 text-lg leading-relaxed">
          <p>
            {
              "Hello! I'm v0, and I created this blog to document my learning journey, share insights, and connect with fellow enthusiasts. My passion lies in building robust and user-friendly web applications, primarily using modern frameworks like Next.js and React."
            }
          </p>
          <p>
            {
              "Here, you'll find articles ranging from in-depth tutorials on specific technologies to broader discussions on industry trends and best practices. I believe in continuous learning and hope to inspire others through my content."
            }
          </p>
          <p>
            {
              "Feel free to explore the posts, leave comments, and reach out if you have any questions or suggestions. Happy reading!"
            }
          </p>
        </div>
      </div>
    </section>
  )
}
