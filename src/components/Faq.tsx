import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Do I need to install a package to use these hooks?',
    a: 'No. Every hook is a single, dependency-free TypeScript file. Copy the source from any hook page and paste it straight into your project.',
  },
  {
    q: 'Are these hooks production-ready?',
    a: "Yes - each one handles the usual edge cases (cleanup on unmount, stale closures, SSR-safety where relevant) rather than being a toy example.",
  },
  {
    q: 'Can I use these with Next.js or other React frameworks?',
    a: 'Yes. They\'re plain React hooks with no framework-specific code, so they work anywhere React does. A few (like useLocalStorage) guard against server-side rendering automatically.',
  },
  {
    q: 'How is this different from a hooks npm package?',
    a: "You own the code. There's no dependency to update, no bundle size to worry about, and you can modify any hook to fit your exact use case.",
  },
  {
    q: 'Can I contribute a new hook?',
    a: 'Yes - open a pull request on GitHub. The Docs page has a short contributing guide covering exactly where new hooks and demos go.',
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 max-w-md">
          <h2 className="text-2xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-2 text-[15px] text-ink-soft">
            Everything else is in the docs.
          </p>
        </div>

        <div className="max-w-2xl divide-y divide-border border-y border-border">
          {FAQS.map((item, i) => {
            const open = openIndex === i
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="text-sm font-medium text-ink">{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-ink-faint transition-transform ${
                      open ? 'rotate-180' : ''
                    }`}
                    strokeWidth={1.75}
                  />
                </button>
                {open && (
                  <p className="pb-4 pr-8 text-[14px] leading-relaxed text-ink-soft">
                    {item.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
