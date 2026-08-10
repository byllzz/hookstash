#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const registryDir = path.join(__dirname, '..', 'registry')

const RESET = '\x1b[0m'
const DIM = '\x1b[2m'
const BOLD = '\x1b[1m'
const GREEN = '\x1b[32m'
const CYAN = '\x1b[36m'
const RED = '\x1b[31m'

function listAvailable() {
  return fs
    .readdirSync(registryDir)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => f.replace(/\.ts$/, ''))
    .sort()
}

function toSlug(name) {
  // accept "useDebounce", "use-debounce", or "debounce"
  const stripped = name.replace(/^use-?/i, '')
  return (
    'use' + stripped.charAt(0).toUpperCase() + stripped.slice(1)
  )
}

function printHelp() {
  console.log(`
${BOLD}hookstash${RESET} — copy React hooks straight into your project

${BOLD}Usage${RESET}
  npx hookstash list                 Show every hook available to install
  npx hookstash add <hook> [...more] Copy one or more hooks into ./src/hooks
  npx hookstash add <hook> --dir=<path>   Install into a custom directory

${BOLD}Examples${RESET}
  npx hookstash add use-debounce
  npx hookstash add useToggle useLocalStorage useFetch
  npx hookstash add use-hover --dir=lib/hooks
`)
}

function cmdList() {
  const hooks = listAvailable()
  console.log(`\n${BOLD}${hooks.length} hooks available:${RESET}\n`)
  for (const h of hooks) {
    console.log(`  ${CYAN}${h}${RESET}`)
  }
  console.log(`\nInstall one with: ${DIM}npx hookstash add <hook>${RESET}\n`)
}

function cmdAdd(args) {
  const dirFlag = args.find((a) => a.startsWith('--dir='))
  const targetDir = dirFlag
    ? dirFlag.replace('--dir=', '')
    : path.join('src', 'hooks')
  const names = args.filter((a) => !a.startsWith('--'))

  if (names.length === 0) {
    console.log(`${RED}Specify at least one hook to add.${RESET}`)
    console.log(`Run ${CYAN}npx hookstash list${RESET} to see options.`)
    process.exit(1)
  }

  const available = listAvailable()
  fs.mkdirSync(targetDir, { recursive: true })

  for (const raw of names) {
    const slug = toSlug(raw)
    if (!available.includes(slug)) {
      console.log(`${RED}✗ Unknown hook: ${raw}${RESET}`)
      console.log(`  Did you mean one of: ${available.filter(a => a.toLowerCase().includes(raw.toLowerCase().replace(/^use-?/,''))).join(', ') || '(run "hookstash list")'}`)
      continue
    }
    const src = path.join(registryDir, `${slug}.ts`)
    const dest = path.join(targetDir, `${slug}.ts`)
    if (fs.existsSync(dest)) {
      console.log(`${DIM}– ${slug}.ts already exists at ${dest}, skipped${RESET}`)
      continue
    }
    fs.copyFileSync(src, dest)
    console.log(`${GREEN}✓ Added ${slug}.ts${RESET} → ${dest}`)
  }
}

const [, , command, ...rest] = process.argv

switch (command) {
  case 'list':
    cmdList()
    break
  case 'add':
    cmdAdd(rest)
    break
  case undefined:
  case '-h':
  case '--help':
  case 'help':
    printHelp()
    break
  default:
    console.log(`${RED}Unknown command: ${command}${RESET}`)
    printHelp()
    process.exit(1)
}
