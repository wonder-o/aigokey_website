import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import { blogSlugs } from './data/blog'
import './style.css'

export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    // ctx.app, ctx.router, ctx.head 都可以直接用
  },
)

export function includedRoutes(_paths: string[], routeRecords: typeof routes) {
  return routeRecords.flatMap((route) => {
    if (route.name === 'blog-article') return blogSlugs.map((slug) => `/blog/${slug}`)
    return route.path
  })
}
