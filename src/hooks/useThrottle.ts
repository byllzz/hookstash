import { useEffect, useRef, useState } from 'react'

/**
 * Returns a throttled copy of `value` that updates at most once per
 * `limit` ms, no matter how often the input changes.
 */
export function useThrottle<T>(value: T, limit = 500): T {
  const [throttled, setThrottled] = useState(value)
  const lastRan = useRef(Date.now())

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (Date.now() - lastRan.current >= limit) {
          setThrottled(value)
          lastRan.current = Date.now()
        }
      },
      limit - (Date.now() - lastRan.current),
    )
    return () => clearTimeout(timeout)
  }, [value, limit])

  return throttled
}
