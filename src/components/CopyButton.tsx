import { Check, Copy } from 'lucide-react'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'

export function CopyButton({ text }: { text: string }) {
  const [copied, copy] = useCopyToClipboard()

  return (
    <button
      onClick={() => copy(text)}
      className="inline-flex items-center gap-1.5 rounded border border-border-strong px-2.5 py-1.5 text-xs text-ink-soft hover:border-ink-faint hover:text-ink transition-colors"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" strokeWidth={2} />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" strokeWidth={2} />
          Copy
        </>
      )}
    </button>
  )
}
