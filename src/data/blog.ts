import * as yaml from 'js-yaml'
import MarkdownIt from 'markdown-it'

export type BlogLang = 'zh-CN' | 'en'

export type BlogSource = {
  publisher: string
  title: string
  url: string
  publishedAt?: string
}

export type BlogVisual = {
  type: 'steps' | 'comparison' | 'prompt'
  title: string
  items: string[]
}

export type BlogFrontmatter = {
  slug: string
  lang: BlogLang
  date: string
  category: string
  title: string
  summary: string
  readTime: number
  featured?: boolean
  tags: string[]
  sources: BlogSource[]
  visual: BlogVisual
}

export type BlogTocItem = { id: string; label: string; level: 2 | 3 }

export type BlogArticle = BlogFrontmatter & {
  body: string
  html: string
  toc: BlogTocItem[]
}

const markdownModules = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/[\s-]+/g, '-')
}

function getToc(body: string): BlogTocItem[] {
  const counts = new Map<string, number>()
  const toc: BlogTocItem[] = []
  for (const match of body.matchAll(/^(#{2,3})\s+(.+)$/gm)) {
    const level = match[1].length as 2 | 3
    const label = match[2].trim()
    const base = slugify(label) || `section-${toc.length + 1}`
    const count = counts.get(base) || 0
    counts.set(base, count + 1)
    toc.push({ id: count ? `${base}-${count + 1}` : base, label, level })
  }
  return toc
}

function renderWithAnchors(body: string, toc: BlogTocItem[]) {
  let index = 0
  const markdown = new MarkdownIt({ html: false, linkify: true, typographer: true })
  markdown.renderer.rules.heading_open = (tokens, tokenIndex) => {
    const token = tokens[tokenIndex]
    const item = toc[index++]
    return `<${token.tag} id="${item?.id || ''}">`
  }
  return markdown.render(body)
}

function parseModule(raw: string): BlogArticle {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) throw new Error('Blog Markdown is missing frontmatter.')
  const data = yaml.load(match[1]) as BlogFrontmatter
  const body = match[2].trim()
  const toc = getToc(body)
  return {
    ...data,
    tags: data.tags || [],
    sources: data.sources || [],
    visual: data.visual,
    body,
    html: renderWithAnchors(body, toc),
    toc,
  }
}

const parsedArticles = Object.values(markdownModules).map(parseModule)

const articleMap = new Map<string, Partial<Record<BlogLang, BlogArticle>>>()
for (const article of parsedArticles) {
  const locales = articleMap.get(article.slug) || {}
  locales[article.lang] = article
  articleMap.set(article.slug, locales)
}

export const blogSlugs = [...articleMap.keys()].sort()

export const blogIndex = blogSlugs
  .map((slug) => articleMap.get(slug)?.['zh-CN'] || articleMap.get(slug)?.en)
  .filter((article): article is BlogArticle => Boolean(article))
  .sort((a, b) => b.date.localeCompare(a.date))

export function getBlogArticle(slug: string, lang: BlogLang): BlogArticle | null {
  const locales = articleMap.get(slug)
  if (!locales) return null
  return locales[lang] || locales['zh-CN'] || locales.en || null
}

export function getRelatedArticles(slug: string, lang: BlogLang, limit = 3) {
  const current = getBlogArticle(slug, lang)
  if (!current) return []
  return blogIndex
    .filter((article) => article.slug !== slug)
    .sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category))
    .slice(0, limit)
    .map((article) => getBlogArticle(article.slug, lang) || article)
}

export function getAdjacentArticles(slug: string, lang: BlogLang) {
  const index = blogIndex.findIndex((article) => article.slug === slug)
  if (index < 0) return { previous: null, next: null }
  return {
    previous: index < blogIndex.length - 1 ? getBlogArticle(blogIndex[index + 1].slug, lang) : null,
    next: index > 0 ? getBlogArticle(blogIndex[index - 1].slug, lang) : null,
  }
}
