import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const contentDir = path.resolve('src/content/blog')
const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.md'))
const entries = files.map((file) => {
  const raw = fs.readFileSync(path.join(contentDir, file), 'utf8')
  const parsed = matter(raw)
  return { file, data: parsed.data, body: parsed.content.trim() }
})
const errors = []
const seen = new Map()

for (const entry of entries) {
  const { file, data, body } = entry
  const identity = `${data.slug}:${data.lang}`
  if (seen.has(identity)) errors.push(`${file}: duplicate ${identity}`)
  seen.set(identity, file)
  for (const key of ['slug', 'lang', 'date', 'category', 'title', 'summary', 'readTime', 'tags', 'sources', 'visual']) {
    if (data[key] === undefined || data[key] === null || data[key] === '') errors.push(`${file}: missing ${key}`)
  }
  if (!['zh-CN', 'en'].includes(data.lang)) errors.push(`${file}: lang must be zh-CN or en`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.date))) errors.push(`${file}: date must use YYYY-MM-DD`)
  if (!Array.isArray(data.tags) || data.tags.length === 0) errors.push(`${file}: tags must not be empty`)
  if (!Array.isArray(data.sources) || data.sources.length === 0) errors.push(`${file}: sources must not be empty`)
  for (const source of data.sources || []) {
    try { new URL(source.url) } catch { errors.push(`${file}: invalid source URL ${source.url}`) }
  }
  if (!data.visual?.type || !Array.isArray(data.visual.items) || data.visual.items.length < 2) errors.push(`${file}: visual block needs a type and at least two items`)
  if (body.length < 1200) errors.push(`${file}: body is too short (${body.length} characters)`)
  if (!/今天可以试|Try this today/.test(body)) errors.push(`${file}: missing action section`)
}

const identities = new Set(entries.map((entry) => entry.data.slug))
for (const slug of identities) {
  const locales = entries.filter((entry) => entry.data.slug === slug).map((entry) => entry.data.lang)
  if (!locales.includes('zh-CN') || !locales.includes('en')) errors.push(`${slug}: missing zh-CN or en file`)
}

if (errors.length) {
  console.error(`Blog validation failed with ${errors.length} error(s):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}
console.log(`Blog validation passed: ${entries.length} locale files, ${identities.size} slugs.`)
