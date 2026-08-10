import { useEffect, useState } from 'react'

/**
 * Tracks the current window width and height, updating on resize.
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window === 'undefined' ? 0 : window.innerWidth,
    height: typeof window === 'undefined' ? 0 : window.innerHeight,
  })

  useEffect(() => {
    const handler = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return size
}
