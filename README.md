# Hookstash

A curated library of React hooks — each with a live interactive demo and a
copy-paste-ready source panel.

## What's here

- **Web app** (`/src`) — browse, search, and preview every hook, with
  light/dark/system theming and favorites.

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
