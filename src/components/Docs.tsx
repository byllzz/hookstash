import { useEffect, useState } from 'react'
import { DOC_SECTIONS } from '../lib/docsContent'
import { CopyButton } from './CopyButton'

export function Docs() {
  const [activeId, setActiveId] = useState(DOC_SECTIONS[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    for (const section of DOC_SECTIONS) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr]">
        <nav className="hidden md:block">
          <div className="sticky top-24 space-y-0.5">
            <p className="mb-3 px-3 text-[11px] font-medium uppercase tracking-wider text-ink-faint">
              On this page
            </p>
            {DOC_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                  activeId === s.id
                    ? 'bg-accent-soft text-accent font-medium'
                    : 'text-ink-soft hover:bg-surface hover:text-ink'
                }`}
              >
                {s.title}
              </a>
            ))}
          </div>
        </nav>

        <div className="min-w-0 max-w-2xl">
          <header className="mb-10">
            <h1 className="text-2xl font-semibold tracking-tight">
              Documentation
            </h1>
            <p className="mt-2 text-[15px] text-ink-soft">
              Everything you need to use, run, and extend Hookstash.
            </p>
          </header>

          <div className="space-y-14">
            {DOC_SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="mb-3 text-lg font-semibold tracking-tight">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.body.map((p, i) => (
                    <p
                      key={i}
                      className="whitespace-pre-line text-[15px] leading-relaxed text-ink-soft"
                    >
                      {p}
                    </p>
                  ))}
                </div>
                {section.code?.map((block, i) => (
                  <div key={i} className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs font-medium text-ink-faint">
                        {block.label}
                      </span>
                      <CopyButton text={block.content} />
                    </div>
                    <pre className="scrollbar-thin overflow-x-auto rounded-lg bg-code-bg p-4 text-[13px] leading-relaxed text-zinc-200">
                      <code className="font-mono">{block.content}</code>
                    </pre>
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
