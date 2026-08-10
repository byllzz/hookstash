import { useEffect, useState } from 'react'

type FetchState<T> = {
  data: T | null
  error: string | null
  loading: boolean
}

/**
 * Fetches JSON from a URL and tracks loading/error/data state.
 * Re-fetches whenever the URL changes, and ignores stale responses
 * if the URL changes again before the request resolves.
 */
export function useFetch<T = unknown>(url: string | null): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: !!url,
  })

  useEffect(() => {
    if (!url) return
    let cancelled = false
    setState({ data: null, error: null, loading: true })

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setState({ data, error: null, loading: false })
      })
      .catch((err) => {
        if (!cancelled) {
          setState({ data: null, error: err.message, loading: false })
        }
      })

    return () => {
      cancelled = true
    }
  }, [url])

  return state
}
