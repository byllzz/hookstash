import { useEffect, useMemo, useState } from 'react'
import * as React from 'react'
import * as Babel from '@babel/standalone'
import { RotateCcw, AlertTriangle } from 'lucide-react'
import { CopyButton } from './CopyButton'
import { CodeEditor } from './CodeEditor'

const DEFAULT_CODE = `function Playground() {
  const [count, toggle] = useToggle(false)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button onClick={() => toggle()}>
        {count ? 'ON' : 'OFF'}
      </button>
      <span>Try editing this - every hook in the library is in scope.</span>
    </div>
  )
}`

function useCompiledComponent(code: string) {
  return useMemo(() => {
    try {
      const transpiled = Babel.transform(code, {
        presets: ['react', 'typescript'],
        filename: 'playground.tsx',
      }).code

      if (!transpiled) throw new Error('Nothing to render.')

      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      const factory = new Function(
        'React',
        'useState',
        'useEffect',
        'useRef',
        'useCallback',
        'useMemo',
        ...Object.keys(hookNames),
        `${transpiled}; return Playground;`,
      )

      const Component = factory(
        React,
        React.useState,
        React.useEffect,
        React.useRef,
        React.useCallback,
        React.useMemo,
        ...Object.values(hookNames),
      )

      return { Component, error: null }
    } catch (err) {
      return {
        Component: null,
        error: err instanceof Error ? err.message : String(err),
      }
    }
  }, [code])
}

// Real hook implementations, keyed by name, passed into the sandboxed scope.
import { useDebounce } from '../hooks/useDebounce'
import { useThrottle } from '../hooks/useThrottle'
import { useInterval } from '../hooks/useInterval'
import { useToggle } from '../hooks/useToggle'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { usePrevious } from '../hooks/usePrevious'
import { useClickOutside } from '../hooks/useClickOutside'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useOnScreen } from '../hooks/useOnScreen'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { useWindowSize } from '../hooks/useWindowSize'
import { useHover } from '../hooks/useHover'
import { useKeyPress } from '../hooks/useKeyPress'
import { useEventListener } from '../hooks/useEventListener'
import { useFetch } from '../hooks/useFetch'

const hookNames: Record<string, unknown> = {
  useDebounce,
  useThrottle,
  useInterval,
  useToggle,
  useLocalStorage,
  usePrevious,
  useClickOutside,
  useMediaQuery,
  useOnScreen,
  useCopyToClipboard,
  useWindowSize,
  useHover,
  useKeyPress,
  useEventListener,
  useFetch,
}

function PreviewBoundary({ Component }: { Component: React.ComponentType }) {
  const [crashed, setCrashed] = useState<string | null>(null)

  if (crashed) {
    return (
      <div className="flex items-start gap-2 text-sm text-red-500">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
        <span>{crashed}</span>
      </div>
    )
  }

  try {
    return <Component />
  } catch (err) {
    if (!crashed) {
      queueMicrotask(() =>
        setCrashed(err instanceof Error ? err.message : String(err)),
      )
    }
    return null
  }
}

export function Playground() {
  const [code, setCode] = useState(DEFAULT_CODE)
  const [debouncedCode, setDebouncedCode] = useState(code)

  useEffect(() => {
    const t = setTimeout(() => setDebouncedCode(code), 350)
    return () => clearTimeout(t)
  }, [code])

  const { Component, error } = useCompiledComponent(debouncedCode)

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Playground</h1>
          <p className="mt-1.5 max-w-lg text-[15px] text-ink-soft">
            Write a component using any hook from the library. It compiles
            and renders live, right here in your browser.
          </p>
        </div>
        <button
          onClick={() => setCode(DEFAULT_CODE)}
          className="flex shrink-0 items-center gap-1.5 rounded border border-border px-2.5 py-1.5 text-xs text-ink-soft transition-colors hover:border-border-strong hover:text-ink"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} />
          Reset
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-ink-faint">
              Editor
            </span>
            <CopyButton text={code} />
          </div>
          <CodeEditor value={code} onChange={setCode} />
        </div>

        <div>
          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-faint">
            Live preview
          </span>
          <div className="h-[420px] overflow-auto rounded-lg border border-border bg-surface p-5">
            {error ? (
              <div className="flex items-start gap-2 text-sm text-red-500">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                <pre className="whitespace-pre-wrap font-mono text-xs">{error}</pre>
              </div>
            ) : Component ? (
              <PreviewBoundary key={debouncedCode} Component={Component} />
            ) : null}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-ink-faint">
        Available in scope: {Object.keys(hookNames).join(', ')}
      </p>
    </div>
  )
}
