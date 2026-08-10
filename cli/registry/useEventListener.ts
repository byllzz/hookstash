import { useEffect, useRef } from 'react'

/**
 * Attaches an event listener to window, document, or a ref'd element,
 * always calling the latest handler without re-binding on every render.
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (e: WindowEventMap[K]) => void,
  target: EventTarget | React.RefObject<EventTarget | null> = window,
) {
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const node = target && 'current' in target ? target.current : target
    if (!node?.addEventListener) return
    const listener = (e: Event) => savedHandler.current(e as WindowEventMap[K])
    node.addEventListener(eventName, listener)
    return () => node.removeEventListener(eventName, listener)
  }, [eventName, target])
}
