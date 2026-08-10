import { useRef } from 'react'
import { tokenizeLine } from '../lib/highlight'

export function CodeEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const preRef = useRef<HTMLPreElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lines = value.split('\n')

  const syncScroll = () => {
    if (preRef.current && textareaRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop
      preRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab inserts two spaces instead of moving focus, like a real editor.
    if (e.key === 'Tab') {
      e.preventDefault()
      const el = e.currentTarget
      const start = el.selectionStart
      const end = el.selectionEnd
      const next = value.slice(0, start) + '  ' + value.slice(end)
      onChange(next)
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2
      })
    }
  }

  return (
    <div className="relative h-[420px] overflow-hidden rounded-lg border border-border bg-code-bg">
      <pre
        ref={preRef}
        aria-hidden="true"
        className="scrollbar-thin pointer-events-none absolute inset-0 overflow-auto whitespace-pre-wrap break-words p-4 text-[13px] leading-relaxed"
      >
        <code className="font-mono text-zinc-200">
          {lines.map((line, i) => (
            <div key={i}>{line ? tokenizeLine(line, `${i}-`) : '\u200b'}</div>
          ))}
        </code>
      </pre>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        className="scrollbar-thin absolute inset-0 h-full w-full resize-none overflow-auto whitespace-pre-wrap break-words bg-transparent p-4 font-mono text-[13px] leading-relaxed text-transparent caret-white outline-none"
        style={{ WebkitTextFillColor: 'transparent' }}
      />
    </div>
  )
}
