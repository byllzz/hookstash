const KEYWORDS = new Set([
  'import', 'export', 'from', 'const', 'let', 'return', 'function', 'if',
  'else', 'typeof', 'try', 'catch', 'new', 'default', 'as', 'type',
  'interface', 'extends', 'void', 'window', 'document',
])
const TYPES = new Set([
  'T', 'string', 'number', 'boolean', 'HTMLElement', 'IntersectionObserverInit',
  'MediaQueryListEvent', 'PointerEvent', 'StorageEvent', 'undefined', 'null',
])

function tokenize(line: string) {
  const parts = line.split(/(\s+|[(){}[\],;.<>]|'[^']*'|"[^"]*"|`[^`]*`)/)
  return parts.map((part, i) => {
    if (!part) return null
    if (/^\/\/.*/.test(part)) {
      return (
        <span key={i} className="text-ink-faint">
          {part}
        </span>
      )
    }
    if (/^['"`]/.test(part)) {
      return (
        <span key={i} className="text-emerald-400">
          {part}
        </span>
      )
    }
    if (KEYWORDS.has(part)) {
      return (
        <span key={i} className="text-sky-400">
          {part}
        </span>
      )
    }
    if (TYPES.has(part)) {
      return (
        <span key={i} className="text-amber-300">
          {part}
        </span>
      )
    }
    if (/^use[A-Z]\w*$/.test(part)) {
      return (
        <span key={i} className="text-violet-300">
          {part}
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export function CodeBlock({ code }: { code: string }) {
  const lines = code.replace(/\n$/, '').split('\n')

  // handle full-line comments separately so the whole line dims
  return (
    <pre className="scrollbar-thin overflow-x-auto rounded-lg bg-code-bg p-4 text-[13px] leading-relaxed">
      <code className="font-mono">
        {lines.map((line, i) => {
          const isComment = /^\s*(\/\/|\*|\/\*)/.test(line)
          return (
            <div key={i} className="flex">
              <span className="mr-4 w-5 shrink-0 select-none text-right text-zinc-600">
                {i + 1}
              </span>
              <span className={isComment ? 'text-zinc-500' : 'text-zinc-200'}>
                {isComment ? line : tokenize(line)}
              </span>
            </div>
          )
        })}
      </code>
    </pre>
  )
}
