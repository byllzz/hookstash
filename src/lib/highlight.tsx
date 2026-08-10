import type { ReactNode } from 'react'

const KEYWORDS = new Set([
  'import', 'export', 'from', 'const', 'let', 'var', 'return', 'function',
  'if', 'else', 'typeof', 'try', 'catch', 'new', 'default', 'as', 'type',
  'interface', 'extends', 'void', 'window', 'document', 'async', 'await',
])
const TYPES = new Set([
  'T', 'string', 'number', 'boolean', 'HTMLElement', 'IntersectionObserverInit',
  'MediaQueryListEvent', 'PointerEvent', 'StorageEvent', 'undefined', 'null',
  'true', 'false',
])

export function tokenizeLine(line: string, keyPrefix = ''): ReactNode[] {
  const parts = line.split(/(\s+|[(){}[\],;.<>=+\-*/&|!?:]|'[^']*'|"[^"]*"|`[^`]*`)/)
  return parts.map((part, i) => {
    const key = `${keyPrefix}${i}`
    if (!part) return null
    if (/^\/\/.*/.test(part)) {
      return (
        <span key={key} className="text-ink-faint">
          {part}
        </span>
      )
    }
    if (/^['"`]/.test(part)) {
      return (
        <span key={key} className="text-emerald-400">
          {part}
        </span>
      )
    }
    if (/^<\/?[A-Za-z][\w.]*/.test(part)) {
      return (
        <span key={key} className="text-rose-400">
          {part}
        </span>
      )
    }
    if (KEYWORDS.has(part)) {
      return (
        <span key={key} className="text-sky-400">
          {part}
        </span>
      )
    }
    if (TYPES.has(part)) {
      return (
        <span key={key} className="text-amber-300">
          {part}
        </span>
      )
    }
    if (/^use[A-Z]\w*$/.test(part)) {
      return (
        <span key={key} className="text-violet-300">
          {part}
        </span>
      )
    }
    if (/^[(){}[\],;.<>=+\-*/&|!?:]$/.test(part)) {
      return (
        <span key={key} className="text-zinc-500">
          {part}
        </span>
      )
    }
    return <span key={key}>{part}</span>
  })
}
