import sharp from 'sharp'
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const assetsDir = join('public', 'assets')

/**
 * Optimization rules:
 * - Logo: 1254px → 248px (displayed at 42-124px, 2x enough)
 * - Screenshots: resize to 1600px wide, keep PNG
 * - Small/already-optimized images: skip
 */
const rules = {
  'aigokey-logo.png': { width: 248, height: 248, fit: 'cover' },
  'favicon-64x64.png': { skip: true },
  'favicon.ico': { skip: true },
  'apple-touch-icon.png': { skip: true },
  'customer-service-qr.png': { skip: true },
  '01_联系客服_微信二维码.png': { skip: true },
  '12_联系客服_微信二维码.png': { skip: true },
}

const defaultRule = { maxWidth: 1600 }

async function main() {
  const files = readdirSync(assetsDir).filter(f => f.endsWith('.png') || f.endsWith('.ico'))
  let totalOriginal = 0
  let totalOptimized = 0

  console.log('Optimizing images in public/assets/...')

  for (const file of files) {
    const rule = rules[file]
    if (rule?.skip) continue

    const inputPath = join(assetsDir, file)
    const originalBuf = readFileSync(inputPath)
    const originalSize = originalBuf.length

    let pipeline = sharp(inputPath)

    if (rule?.width) {
      pipeline = pipeline.resize(rule.width, rule.height, { fit: rule.fit })
    } else if (defaultRule?.maxWidth) {
      pipeline = pipeline.resize(defaultRule.maxWidth, null, { fit: 'inside', withoutEnlargement: true })
    }

    const buf = await pipeline.png({ compressionLevel: 9 }).toBuffer()

    // Only overwrite if smaller
    if (buf.length < originalSize) {
      writeFileSync(inputPath, buf)
      totalOriginal += originalSize
      totalOptimized += buf.length
      const savings = ((1 - buf.length / originalSize) * 100).toFixed(0)
      console.log(`  ${file.padEnd(35)} ${(originalSize / 1024).toFixed(0).padEnd(5)}KB → ${(buf.length / 1024).toFixed(0).padStart(5)}KB  (-${savings}%)`)
    } else {
      console.log(`  ${file.padEnd(35)} skip (would be larger)`)
    }
  }

  console.log(`\nTotal: ${(totalOriginal / 1024).toFixed(0)}KB → ${(totalOptimized / 1024).toFixed(0)}KB (-${totalOptimized ? ((1 - totalOptimized / totalOriginal) * 100).toFixed(0) : 0}%)`)
}

main().catch(console.error)
