import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { HookEntry } from '../lib/registry'
import { registry } from '../lib/registry'
import { CATEGORY_ACCENT, HOOK_META } from '../lib/meta'
import { CodeBlock } from './CodeBlock'
import { CopyButton } from './CopyButton'

export function HookDetail({
  hook,
  onSelect,
}: {
  hook: HookEntry
  onSelect: (slug: string) => void
}) {
  const Demo = hook.demo
  const installLine = `import { ${hook.name} } from './hooks/${hook.name}'`
  const meta = HOOK_META[hook.name]
  const accent = meta ? CATEGORY_ACCENT[meta.category] : null

  const index = registry.findIndex((h) => h.slug === hook.slug)
  const prev = registry[(index - 1 + registry.length) % registry.length]
  const next = registry[(index + 1) % registry.length]

  return (
    <div className="scrollbar-thin h-full overflow-y-auto">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8 max-w-2xl">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            {meta && (
              <span
                className={`flex items-center gap-1 rounded border border-border px-2 py-0.5 text-[11px] font-medium ${accent?.text}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${accent?.dot}`} />
                {meta.category}
              </span>
            )}
            {hook.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-border px-2 py-0.5 text-[11px] uppercase tracking-wide text-ink-faint"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-mono text-2xl font-semibold tracking-tight">
            {hook.name}
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            {hook.summary}
          </p>
        </header>

        {/* Side-by-side: source on the left, live demo on the right — nothing stacked */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                Source
              </h2>
              <CopyButton text={hook.source} />
            </div>
            <CodeBlock code={hook.source} />

            <div className="mt-3 flex items-center justify-between rounded border border-border bg-canvas px-3 py-2">
              <code className="truncate font-mono text-xs text-ink-soft">
                {installLine}
              </code>
              <CopyButton text={installLine} />
            </div>
          </section>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-faint">
              Live demo
            </h2>
            <div className="rounded-lg border border-border bg-surface p-5">
              <Demo />
            </div>
          </aside>
        </div>

        <footer className="mt-12 flex items-stretch gap-3 border-t border-border pt-6">
          <button
            onClick={() => onSelect(prev.slug)}
            className="group flex flex-1 items-center gap-3 rounded-lg border border-border px-4 py-3 text-left transition-colors hover:border-border-strong hover:bg-surface"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 text-ink-faint group-hover:text-ink-soft" strokeWidth={1.75} />
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wide text-ink-faint">Previous</div>
              <div className="truncate font-mono text-[13px] text-ink-soft">{prev.name}</div>
            </div>
          </button>
          <button
            onClick={() => onSelect(next.slug)}
            className="group flex flex-1 items-center justify-end gap-3 rounded-lg border border-border px-4 py-3 text-right transition-colors hover:border-border-strong hover:bg-surface"
          >
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wide text-ink-faint">Next</div>
              <div className="truncate font-mono text-[13px] text-ink-soft">{next.name}</div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint group-hover:text-ink-soft" strokeWidth={1.75} />
          </button>
        </footer>
      </div>
    </div>
  )
}
