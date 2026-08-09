import { useCallback, useState } from 'react'

/**
 * Boolean state with a stable toggle function. Pass a value to force
 * a specific state instead of flipping it.
 */
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial)

  const toggle = useCallback((next?: boolean) => {
    setValue((prev) => (typeof next === 'boolean' ? next : !prev))
  }, [])

  return [value, toggle] as const
}
