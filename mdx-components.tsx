import type { MDXComponents } from "mdx/types"
import type { ComponentPropsWithoutRef, CSSProperties } from "react"
import { MdxImage } from "./src/components/mdx-image"

const baseListSpacing: CSSProperties = {
  paddingInlineStart: "1.25rem",
  marginBlock: "0.8rem",
}

function UnorderedList({
  className,
  style,
  ...props
}: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      {...props}
      className={className}
      style={{ listStyleType: "disc", ...baseListSpacing, ...style }}
    />
  )
}

function OrderedList({
  className,
  style,
  ...props
}: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      {...props}
      className={className}
      style={{ listStyleType: "decimal", ...baseListSpacing, ...style }}
    />
  )
}

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Wrap MDX pages with a styled article container for consistent typography.
    wrapper: ({ children }) => (
      <article className="mdx-article">
        {children}
      </article>
    ),
    ul: (props) => <UnorderedList {...props} />,
    ol: (props) => <OrderedList {...props} />,
    Image: MdxImage,
    ...components,
  }
}
