import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/subscription',
      name: 'subscription',
      component: () => import('@/views/SubscriptionView.vue'),
    },
    {
      path: '/codex-help',
      name: 'codex-help',
      component: () => import('@/views/CodexHelpView.vue'),
    },
    {
      path: '/free-trial',
      name: 'free-trial',
      component: () => import('@/views/FreeTrialView.vue'),
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router
