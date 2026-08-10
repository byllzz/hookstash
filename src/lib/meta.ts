import {
  Timer,
  Clock,
  ToggleLeft,
  Database,
  MousePointerClick,
  Monitor,
  Eye,
  Clipboard,
  Maximize,
  MousePointer2,
  Keyboard,
  History,
  Radio,
  Gauge,
  Cloud,
  type LucideIcon,
} from 'lucide-react'

export type Category = 'Timing' | 'State' | 'DOM & Browser' | 'Data'

export const CATEGORY_ORDER: Category[] = [
  'Timing',
  'State',
  'DOM & Browser',
  'Data',
]

export const CATEGORY_ACCENT: Record<Category, { dot: string; text: string }> = {
  Timing: { dot: 'bg-amber-600', text: 'text-amber-700' },
  State: { dot: 'bg-teal-700', text: 'text-teal-800' },
  'DOM & Browser': { dot: 'bg-indigo-600', text: 'text-indigo-700' },
  Data: { dot: 'bg-rose-600', text: 'text-rose-700' },
}

export const HOOK_META: Record<
  string,
  { category: Category; icon: LucideIcon }
> = {
  useDebounce: { category: 'Timing', icon: Timer },
  useInterval: { category: 'Timing', icon: Clock },
  useThrottle: { category: 'Timing', icon: Gauge },
  useToggle: { category: 'State', icon: ToggleLeft },
  useLocalStorage: { category: 'State', icon: Database },
  usePrevious: { category: 'State', icon: History },
  useClickOutside: { category: 'DOM & Browser', icon: MousePointerClick },
  useMediaQuery: { category: 'DOM & Browser', icon: Monitor },
  useOnScreen: { category: 'DOM & Browser', icon: Eye },
  useCopyToClipboard: { category: 'DOM & Browser', icon: Clipboard },
  useWindowSize: { category: 'DOM & Browser', icon: Maximize },
  useHover: { category: 'DOM & Browser', icon: MousePointer2 },
  useKeyPress: { category: 'DOM & Browser', icon: Keyboard },
  useEventListener: { category: 'DOM & Browser', icon: Radio },
  useFetch: { category: 'Data', icon: Cloud },
}
