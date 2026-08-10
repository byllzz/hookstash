import { useEffect, useRef } from 'react'

/**
 * Returns the value a state or prop held on the previous render.
 * `undefined` on the first render.
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
