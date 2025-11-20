import type { ComponentPropsWithoutRef } from "react"

interface MdxImageProps extends ComponentPropsWithoutRef<"img"> {
    caption?: string
}

export function MdxImage({ caption, className, alt, ...props }: MdxImageProps) {
    return (
        <figure className={className}>
            <img
                className="rounded-lg"
                alt={alt}
                {...props}
                style={{
                    width: "100%",
                    height: "auto",
                    ...props.style,
                }}
            />
            {caption && (
                <figcaption className="text-center text-sm text-muted-foreground mt-2 italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}
