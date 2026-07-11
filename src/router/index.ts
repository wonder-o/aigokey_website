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
    path: '/image-creation',
    name: 'image-creation',
    component: () => import('@/views/ImageCreationView.vue'),
  },
  {
    path: '/enterprise-service',
    name: 'enterprise-service',
    component: () => import('@/views/EnterpriseServiceView.vue'),
  },
  {
    path: '/free-trial',
    name: 'free-trial',
    component: () => import('@/views/FreeTrialView.vue'),
  },
]
