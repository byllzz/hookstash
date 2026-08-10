export function Footer({
  onNavigate,
}: {
  onNavigate: (view: 'gallery' | 'docs' | 'playground') => void
}) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-solid text-[11px] font-semibold text-on-solid">
                H
              </div>
              <span className="font-semibold tracking-tight">Hookstash</span>
            </div>
            <p className="text-sm text-ink-faint">
              A small, working shelf of React hooks.
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-faint">
              Product
            </p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <button onClick={() => onNavigate('gallery')} className="text-ink-soft hover:text-ink">
                  Browse hooks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('playground')} className="text-ink-soft hover:text-ink">
                  Playground
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('docs')} className="text-ink-soft hover:text-ink">
                  Documentation
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-faint">
              Resources
            </p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <a
                  href="https://github.com/byllzz/hookstash"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-soft hover:text-ink"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/byllzz/hookstash/blob/main/LICENSE"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-soft hover:text-ink"
                >
                  License
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-faint">
              Author
            </p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <a
                  href="https://bilalmlkdev.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-soft hover:text-ink"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/byllzz"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-soft hover:text-ink"
                >
                  @byllzz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-ink-faint sm:flex-row">
          <span>© {new Date().getFullYear()} Hookstash. MIT Licensed.</span>
          <span>Built with React, TypeScript & Tailwind CSS.</span>
        </div>
      </div>
    </footer>
  )
}
