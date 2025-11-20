type BlogIntroProps = {
  title: string
  date?: string | Date | null
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
})

export function BlogIntro({ title, date }: BlogIntroProps) {
  const rawDate = typeof date === "string" || date instanceof Date ? new Date(date) : null
  const isValidDate = !!rawDate && !Number.isNaN(rawDate.getTime())
  const formattedDate = isValidDate ? dateFormatter.format(rawDate) : null

  return (
    <header className="mb-10 space-y-4 border-b border-border pb-2">
      
      <div className="space-y-2">
        <h1 className="font-serif text-3xl font-semibold text-[var(--text)]">{title}</h1>
      </div>
      {formattedDate ? (
        <time dateTime={rawDate!.toISOString()} className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {formattedDate}
        </time>
      ) : null}
    </header>
  )
}
