import { useEffect, useRef, useState } from 'react'

/**
 * Reports whether the returned ref's element is currently intersecting
 * the viewport. Built on IntersectionObserver — handy for lazy loading
 * and scroll-triggered reveals.
 */
export function useOnScreen<T extends HTMLElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)
    observer.observe(ref.current)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, isVisible] as const
}
