import { useCallback, useState } from 'react'

/**
 * Copies text to the clipboard and reports a short-lived "copied" state,
 * so you can drive a checkmark or similar confirmation in the UI.
 */
export function useCopyToClipboard(resetAfter = 1500) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), resetAfter)
        return true
      } catch {
        setCopied(false)
        return false
      }
    },
    [resetAfter],
  )

  return [copied, copy] as const
}
