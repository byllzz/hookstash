import { tokenizeLine } from '../lib/highlight'

export function CodeBlock({ code }: { code: string }) {
  const lines = code.replace(/\n$/, '').split('\n')

  return (
    <pre className="scrollbar-thin overflow-x-auto rounded-lg bg-code-bg p-4 text-[13px] leading-relaxed">
      <code className="font-mono">
        {lines.map((line, i) => {
          const isComment = /^\s*(\/\/|\*|\/\*)/.test(line)
          return (
            <div key={i} className="flex">
              <span className="mr-4 w-5 shrink-0 select-none text-right text-zinc-600">
                {i + 1}
              </span>
              <span className={isComment ? 'text-zinc-500' : 'text-zinc-200'}>
                {isComment ? line : tokenizeLine(line, `${i}-`)}
              </span>
            </div>
          )
        })}
      </code>
    </pre>
  )
}
