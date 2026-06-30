import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import './style.css'

export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    // ctx.app, ctx.router, ctx.head 都可以直接用
  },
)
