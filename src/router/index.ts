export const routes = [
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
]
