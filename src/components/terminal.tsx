import type { ReactNode } from "react"

interface TerminalProps {
    title?: string
    children: ReactNode
    className?: string
}

export function Terminal({ title = "Terminal", children, className }: TerminalProps) {
    return (
        <div className={className ? `mdx-terminal ${className}` : "mdx-terminal"}>
            <div className="mdx-terminal-header">
                <span className="mdx-terminal-dots" aria-hidden="true">
                    <span className="mdx-terminal-dot" />
                    <span className="mdx-terminal-dot" />
                    <span className="mdx-terminal-dot" />
                </span>
                <span className="mdx-terminal-title">{title}</span>
            </div>
            <div className="mdx-terminal-body">{children}</div>
        </div>
    )
}
