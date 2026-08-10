export type DocSection = {
  id: string
  title: string
  body: string[]
  code?: { label: string; content: string }[]
}

export const DOC_SECTIONS: DocSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    body: [
      'Hookstash is a small, curated library of React hooks. Every hook is plain TypeScript with zero runtime dependencies - copy the file into your project and it just works.',
      'Each hook ships with a live demo so you can see exactly what it does before you copy a single line.',
    ],
  },
  {
    id: 'installation',
    title: 'Installation',
    body: [
      'There is nothing to install. Open any hook from the gallery, hit Copy, and paste the file into your project\'s hooks folder.',
      'If you want to run Hookstash itself locally - to browse offline, extend it, or contribute - clone the repo:',
    ],
    code: [
      {
        label: 'Clone & run',
        content: `git clone https://github.com/byllzz/hookstash.git
cd hookstash
npm install
npm run dev`,
      },
    ],
  },
  {
    id: 'usage',
    title: 'Usage',
    body: [
      'Every hook page shows the full source on the left and a live, interactive demo on the right so you can see real behavior, not just read a docstring.',
      'Import a hook the same way you would any local module:',
    ],
    code: [
      {
        label: 'Example',
        content: `import { useDebounce } from './hooks/useDebounce'

function Search() {
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query, 400)

  useEffect(() => {
    if (debounced) runSearch(debounced)
  }, [debounced])

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />
}`,
      },
    ],
  },
  {
    id: 'playground',
    title: 'Playground',
    body: [
      'Want to try an idea before committing it to a file? The Playground is a live in-browser editor - write a component, use any hook from the library, and see it render instantly.',
      'It transpiles JSX/TSX in your browser with Babel, so nothing is sent to a server.',
    ],
  },
  {
    id: 'categories',
    title: 'Categories',
    body: [
      'Hooks are grouped into four categories to make browsing faster:',
      '• Timing - debouncing, throttling, intervals\n• State - local state helpers, persistence, history\n• DOM & Browser - events, viewport, clipboard, focus\n• Data - network requests',
    ],
  },
  {
    id: 'contributing',
    title: 'Contributing',
    body: [
      'Adding a new hook takes three steps: drop the implementation in src/hooks, add a small live demo in src/components/demos.tsx, then register both in src/lib/registry.tsx and src/lib/meta.ts.',
      'Open a pull request on GitHub - see the repo link in the footer.',
    ],
  },
  {
    id: 'license',
    title: 'License',
    body: ['Hookstash is MIT licensed. Use it, fork it, ship it.'],
  },
]
