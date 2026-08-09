# Hookstash

A curated, searchable library of React hooks — each with a live interactive
demo and copy-paste-ready source, right next to it.

## Why

Most hook libraries are either a wall of unstyled code blocks or a heavy
Storybook setup. Hookstash is a small, fast, single-page tool: search a
hook, watch it work, copy it into your project.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- lucide-react for icons

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  hooks/           real, working hook implementations
  components/
    demos.tsx      live demo for each hook
    Sidebar.tsx     search + hook list
    CodeBlock.tsx   lightweight syntax highlighting
    CopyButton.tsx
    HookDetail.tsx  main detail pane
  lib/
    registry.tsx    wires each hook to its source (via ?raw) and demo
```

## Included hooks

- `useDebounce`
- `useLocalStorage`
- `useToggle`
- `useClickOutside`
- `useMediaQuery`
- `useCopyToClipboard`
- `useInterval`
- `useOnScreen`

## Adding a new hook

1. Add the implementation to `src/hooks/useYourHook.ts`.
2. Add a small demo component to `src/components/demos.tsx`.
3. Register both in `src/lib/registry.tsx`.

That's it — it shows up in the sidebar and search automatically.

## License

MIT
