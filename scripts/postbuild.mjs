import sharp from 'sharp'
import { readdirSync, mkdirSync, renameSync, statSync, readFileSync, writeFileSync, unlinkSync } from 'fs'
import { join, basename, resolve } from 'path'

const distDir = resolve('dist')
const distAssets = join(distDir, 'assets')

// Files to keep as PNG (icons, favicons, unhashed logo for favicon ref)
const keepPng = new Set(['favicon-64x64.png', 'apple-touch-icon.png', 'aigokey-logo.png'])

async function convertToWebp() {
  if (!statSync(distAssets, { throwIfNoEntry: false })) return

  const pngFiles = readdirSync(distAssets).filter(f => f.endsWith('.png') && !keepPng.has(f) && !f.startsWith('favicon'))
  const converted = []

  for (const file of pngFiles) {
    const pngPath = join(distAssets, file)
    const webpPath = pngPath.replace(/\.png$/, '.webp')
    const originalSize = readFileSync(pngPath).length

    try {
      const buf = await sharp(pngPath).webp({ quality: 80 }).toBuffer()
      writeFileSync(webpPath, buf)
      converted.push(pngPath)
      const savings = ((1 - buf.length / originalSize) * 100).toFixed(0)
      console.log(`  ${basename(file).padEnd(40)} ${(originalSize / 1024).toFixed(0).padEnd(5)}KB → ${(buf.length / 1024).toFixed(0).padStart(5)}KB  (-${savings}%)`)
    } catch (e) {
      console.log(`  ${basename(file)} error: ${e.message}`)
    }
  }

  // Step 1: Replace all .png → .webp in HTML/JS/CSS
  function replaceInDir(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) replaceInDir(full)
      else if (entry.name.endsWith('.html') || entry.name.endsWith('.js') || entry.name.endsWith('.css')) {
        let content = readFileSync(full, 'utf-8')
        // Replace all .png → .webp
        content = content.replace(/\.png/g, '.webp')
        // Step 2: Restore exact favicon/icon/logo references back to .png
        content = content.replace(
          /href="\/assets\/aigokey-logo\.webp"/g,
          'href="/assets/aigokey-logo.png"'
        )
        content = content.replace(
          /href="\/assets\/apple-touch-icon\.webp"/g,
          'href="/assets/apple-touch-icon.png"'
        )
        content = content.replace(
          /href="\/assets\/favicon[^"]*\.webp"/g,
          (match) => match.replace('.webp', '.png')
        )
        writeFileSync(full, content)
      }
    }
  }
  replaceInDir(distDir)

  // Delete converted PNGs
  for (const pngPath of converted) {
    unlinkSync(pngPath)
  }
  console.log(`\nRemoved ${converted.length} original PNG files`)
}

function moveHtmlToDirs() {
  const files = readdirSync(distDir).filter(f => f.endsWith('.html') && statSync(join(distDir, f)).isFile())
  for (const file of files) {
    const name = basename(file, '.html')
    if (name === 'index') continue
    const dir = join(distDir, name)
    mkdirSync(dir, { recursive: true })
    renameSync(join(distDir, file), join(dir, 'index.html'))
    console.log(`  ${file} → ${name}/index.html`)
  }

  const codexHelpDir = join(distDir, 'codex-help')
  const embedHtml = join(codexHelpDir, 'embed.html')
  if (statSync(embedHtml, { throwIfNoEntry: false })) {
    const embedDir = join(codexHelpDir, 'embed')
    mkdirSync(embedDir, { recursive: true })
    renameSync(embedHtml, join(embedDir, 'index.html'))
    console.log('  codex-help/embed.html → codex-help/embed/index.html')
  }

  const blogDir = join(distDir, 'blog')
  if (statSync(blogDir, { throwIfNoEntry: false })) {
    const articleFiles = readdirSync(blogDir).filter(f => f.endsWith('.html') && f !== 'index.html')
    for (const file of articleFiles) {
      const name = basename(file, '.html')
      const dir = join(blogDir, name)
      mkdirSync(dir, { recursive: true })
      renameSync(join(blogDir, file), join(dir, 'index.html'))
      console.log(`  blog/${file} → blog/${name}/index.html`)
    }
  }
}

async function main() {
  console.log('[1/3] Converting images to WebP...')
  await convertToWebp()

  console.log('\n[2/3] Moving HTML to subdirectories...')
  moveHtmlToDirs()

  // Summary
  const allFiles = readdirSync(distAssets)
  const webpFiles = allFiles.filter(f => f.endsWith('.webp'))
  const pngFiles = allFiles.filter(f => f.endsWith('.png'))
  let webpSize = 0, pngSize = 0
  for (const f of webpFiles) webpSize += statSync(join(distAssets, f)).size
  for (const f of pngFiles) pngSize += statSync(join(distAssets, f)).size
  console.log(`\n[3/3] Final: ${pngFiles.length} PNG (${(pngSize/1024).toFixed(0)}KB) + ${webpFiles.length} WebP (${(webpSize/1024).toFixed(0)}KB) = ${((pngSize+webpSize)/1024).toFixed(0)}KB`)
}

main().catch(console.error)
