import { useEffect, useRef } from 'react'

/**
 * A declarative `setInterval`. Pass `delay: null` to pause. Always calls
 * the latest `callback`, so no stale-closure bugs.
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}
