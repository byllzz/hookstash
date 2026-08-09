import type { ComponentType } from 'react'

import useDebounceSrc from '../hooks/useDebounce.ts?raw'
import useLocalStorageSrc from '../hooks/useLocalStorage.ts?raw'
import useToggleSrc from '../hooks/useToggle.ts?raw'
import useClickOutsideSrc from '../hooks/useClickOutside.ts?raw'
import useMediaQuerySrc from '../hooks/useMediaQuery.ts?raw'
import useCopyToClipboardSrc from '../hooks/useCopyToClipboard.ts?raw'
import useIntervalSrc from '../hooks/useInterval.ts?raw'
import useOnScreenSrc from '../hooks/useOnScreen.ts?raw'

import {
  DebounceDemo,
  LocalStorageDemo,
  ToggleDemo,
  ClickOutsideDemo,
  MediaQueryDemo,
  CopyToClipboardDemo,
  IntervalDemo,
  OnScreenDemo,
} from '../components/demos'

export type HookEntry = {
  slug: string
  name: string
  summary: string
  tags: string[]
  source: string
  demo: ComponentType
}

export const registry: HookEntry[] = [
  {
    slug: 'use-debounce',
    name: 'useDebounce',
    summary: 'Delays updating a value until the input stops changing for a set time.',
    tags: ['timing', 'input'],
    source: useDebounceSrc,
    demo: DebounceDemo,
  },
  {
    slug: 'use-local-storage',
    name: 'useLocalStorage',
    summary: 'Persists state to localStorage and keeps it in sync across tabs.',
    tags: ['storage', 'state'],
    source: useLocalStorageSrc,
    demo: LocalStorageDemo,
  },
  {
    slug: 'use-toggle',
    name: 'useToggle',
    summary: 'Boolean state with a stable toggle function, optionally forced to a value.',
    tags: ['state'],
    source: useToggleSrc,
    demo: ToggleDemo,
  },
  {
    slug: 'use-click-outside',
    name: 'useClickOutside',
    summary: 'Fires a callback when a pointer event lands outside the target element.',
    tags: ['dom', 'events'],
    source: useClickOutsideSrc,
    demo: ClickOutsideDemo,
  },
  {
    slug: 'use-media-query',
    name: 'useMediaQuery',
    summary: 'Tracks whether a CSS media query currently matches, live.',
    tags: ['dom', 'responsive'],
    source: useMediaQuerySrc,
    demo: MediaQueryDemo,
  },
  {
    slug: 'use-copy-to-clipboard',
    name: 'useCopyToClipboard',
    summary: 'Copies text to the clipboard and reports a short-lived copied state.',
    tags: ['dom', 'clipboard'],
    source: useCopyToClipboardSrc,
    demo: CopyToClipboardDemo,
  },
  {
    slug: 'use-interval',
    name: 'useInterval',
    summary: 'A declarative setInterval that always calls the latest callback.',
    tags: ['timing'],
    source: useIntervalSrc,
    demo: IntervalDemo,
  },
  {
    slug: 'use-on-screen',
    name: 'useOnScreen',
    summary: 'Reports whether an element is intersecting the viewport.',
    tags: ['dom', 'scroll'],
    source: useOnScreenSrc,
    demo: OnScreenDemo,
  },
]
