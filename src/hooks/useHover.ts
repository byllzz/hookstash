import { useEffect, useRef, useState } from 'react'

/**
 * Tracks whether the pointer is currently over the returned ref's element.
 */
export function useHover<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)
    node.addEventListener('mouseenter', onEnter)
    node.addEventListener('mouseleave', onLeave)
    return () => {
      node.removeEventListener('mouseenter', onEnter)
      node.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return [ref, hovered] as const
}
