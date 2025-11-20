import Image, { type ImageProps } from "next/image"

interface MdxImageProps extends ImageProps {
    caption?: string
}

export function MdxImage({ caption, className, alt, ...props }: MdxImageProps) {
    return (
        <figure className={className}>
            <Image
                className="rounded-lg"
                alt={alt}
                {...props}
                style={{
                    maxWidth: "100%",
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
