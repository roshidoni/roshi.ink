import type { MDXComponents } from 'mdx/types'
 
// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontSize: '1.75rem', fontWeight: 'semibold', marginTop: '1.5rem', marginBottom: '1rem' }}>{children}</h2>,
    p: ({ children }) => <p style={{ lineHeight: '1.75' }}>{children}</p>,
    a: ({ href, children }) => <a href={href} style={{ color: '#3b82f6', textDecoration: 'underline' }}>{children}</a>,
    ...components,
  }
}