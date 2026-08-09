import { useEffect, useRef } from 'react'

/**
 * Calls `onOutside` when a pointer event lands outside the returned ref's
 * element. Useful for dropdowns, popovers, and modals.
 */
export function useClickOutside<T extends HTMLElement>(
  onOutside: () => void,
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onOutside()
      }
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [onOutside])

  return ref
}
