import { execSync } from 'child_process'
import { existsSync, mkdirSync, renameSync, readdirSync, statSync } from 'fs'
import { resolve, join, basename } from 'path'

const distDir = resolve('dist')

// Find all *.html files directly in dist/
const files = readdirSync(distDir).filter(f => f.endsWith('.html') && statSync(join(distDir, f)).isFile())

for (const file of files) {
  const name = basename(file, '.html')
  if (name === 'index') continue // skip index.html

  const dir = join(distDir, name)
  mkdirSync(dir, { recursive: true })
  renameSync(join(distDir, file), join(dir, 'index.html'))
  console.log(`  ${file} → ${name}/index.html`)
}

console.log(`Done: ${files.length - 1} pages moved`)
