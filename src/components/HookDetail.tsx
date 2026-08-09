import type { HookEntry } from '../lib/registry'
import { CodeBlock } from './CodeBlock'
import { CopyButton } from './CopyButton'

export function HookDetail({ hook }: { hook: HookEntry }) {
  const Demo = hook.demo
  const installLine = `import { ${hook.name} } from './hooks/${hook.name}'`

  return (
    <div className="scrollbar-thin h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-8 py-10">
        <header className="mb-8">
          <div className="mb-2 flex flex-wrap gap-1.5">
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
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            {hook.summary}
          </p>
        </header>

        <section className="mb-8">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xs font-medium uppercase tracking-wide text-ink-faint">
              Demo
            </h2>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <Demo />
          </div>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xs font-medium uppercase tracking-wide text-ink-faint">
              Source
            </h2>
            <CopyButton text={hook.source} />
          </div>
          <CodeBlock code={hook.source} />

          <div className="mt-3 flex items-center justify-between rounded border border-border bg-canvas px-3 py-2">
            <code className="font-mono text-xs text-ink-soft">{installLine}</code>
            <CopyButton text={installLine} />
          </div>
        </section>
      </div>
    </div>
  )
}
