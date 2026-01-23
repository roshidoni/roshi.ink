interface TerminalProps {
    title?: string
    commands?: string[]
    className?: string
}

export function Terminal({ title = "Terminal", commands = [], className }: TerminalProps) {
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
            <div className="mdx-terminal-body">
                <div className="mdx-terminal-commands">
                    {commands.map((command, index) => (
                        <div key={`${command}-${index}`} className="mdx-terminal-command">
                            <span className="mdx-terminal-command-text">{command}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
