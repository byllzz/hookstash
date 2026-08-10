# Hookstash

A curated library of React hooks — each with a live interactive demo, a
copy-paste-ready source panel, and (optionally) a one-line CLI install.

## What's here

- **Web app** (`/src`) — browse, search, and preview every hook, with
  light/dark/system theming and favorites.
- **CLI** (`/cli`) — `npx hookstash add <hook>` drops the real hook file
  straight into your project, no dependency added.

## Web app

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

### Features

- **Command palette** — press `⌘K` / `Ctrl+K` or `/` anywhere to search
  and jump to any hook.
- **Gallery + filters** — browse by category (Timing, State, DOM &
  Browser, Data) or jump straight to your favorites.
- **Favorites** — star any hook; it's saved via `useLocalStorage`
  (the same hook that's in the library).
- **Theme toggle** — Light / Dark / System, persisted, no flash on reload.
- **Side-by-side detail view** — source on the left, live demo pinned on
  the right, so nothing is stacked awkwardly.

### Structure

```
src/
  hooks/            real, working hook implementations
  components/
    demos.tsx        live demo for each hook
    Gallery.tsx       card grid + hero + filters
    TopNav.tsx        header: logo, search, theme, GitHub
    CommandPalette.tsx ⌘K search overlay
    ThemeToggle.tsx
    HookDetail.tsx    source + demo detail page
    CodeBlock.tsx     lightweight syntax highlighting
    CopyButton.tsx
  lib/
    registry.tsx      wires each hook's source (via `?raw`) + demo together
    meta.ts           category + icon per hook
    useTheme.ts
```

### Adding a new hook to the web app

1. Add the implementation to `src/hooks/useYourHook.ts`.
2. Add a small demo component to `src/components/demos.tsx`.
3. Register both in `src/lib/registry.tsx`, and add category/icon in
   `src/lib/meta.ts`.

It appears in the gallery, filters, and search automatically.

## CLI

```bash
npx hookstash list
npx hookstash add use-debounce
npx hookstash add useToggle useLocalStorage useFetch
npx hookstash add use-hover --dir=lib/hooks
```

Hook names are flexible — `useDebounce`, `use-debounce`, and `debounce`
all resolve to the same file. Existing files are never overwritten.

To publish the CLI to npm yourself:

```bash
cd cli
npm publish
```

(`cli/registry` holds the source files it copies — keep it in sync with
`src/hooks` when you add new hooks.)

## Included hooks (15)

`useDebounce` · `useThrottle` · `useInterval` · `useToggle` ·
`useLocalStorage` · `usePrevious` · `useClickOutside` · `useMediaQuery` ·
`useOnScreen` · `useCopyToClipboard` · `useWindowSize` · `useHover` ·
`useKeyPress` · `useEventListener` · `useFetch`

## Stack

React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · lucide-react

## License

MIT
