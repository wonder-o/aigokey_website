import type { RouterScrollBehavior } from 'vue-router'
import { incentivePlans } from '@/data/incentive-plans'

export const routes = [
  {
    path: '/studio/',
    name: 'studio',
    component: () => import('@/views/StudioView.vue'),
    meta: { noindex: true },
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/subscription/',
    name: 'subscription',
    component: () => import('@/views/SubscriptionView.vue'),
  },
  {
    path: '/models/gpt/',
    name: 'model-gpt',
    component: () => import('@/views/ModelServiceView.vue'),
    props: { slug: 'gpt' },
  },
  {
    path: '/models/image/',
    name: 'model-image',
    component: () => import('@/views/ModelServiceView.vue'),
    props: { slug: 'image' },
  },
  {
    path: '/models/deepseek/',
    name: 'model-deepseek',
    component: () => import('@/views/ModelServiceView.vue'),
    props: { slug: 'deepseek' },
  },
  {
    path: '/models/glm/',
    name: 'model-glm',
    component: () => import('@/views/ModelServiceView.vue'),
    props: { slug: 'glm' },
  },
  {
    path: '/models/kimi/',
    name: 'model-kimi',
    component: () => import('@/views/ModelServiceView.vue'),
    props: { slug: 'kimi' },
  },
  {
    path: '/models/claude/',
    name: 'model-claude',
    component: () => import('@/views/ModelServiceView.vue'),
    props: { slug: 'claude' },
  },
  {
    path: '/models/seedance/',
    name: 'model-seedance',
    component: () => import('@/views/ModelServiceView.vue'),
    props: { slug: 'seedance' },
  },
  {
    path: '/codex-help/',
    name: 'codex-help',
    component: () => import('@/views/CodexHelpView.vue'),
  },
  {
    path: '/config-guides/',
    name: 'config-guides',
    component: () => import('@/views/ConfigGuidesView.vue'),
  },
  {
    path: '/deepseek-harness/',
    name: 'deepseek-harness',
    component: () => import('@/views/DeepSeekHarnessView.vue'),
  },
  {
    path: '/pi-config/',
    name: 'pi-config',
    component: () => import('@/views/PiConfigView.vue'),
  },
  {
    path: '/workbuddy-config/',
    name: 'workbuddy-config',
    component: () => import('@/views/WorkBuddyConfigView.vue'),
  },
  {
    path: '/trae-config/',
    name: 'trae-config',
    component: () => import('@/views/TraeConfigView.vue'),
  },
  {
    path: '/claude-code-config/',
    name: 'claude-code-config',
    component: () => import('@/views/ClaudeCodeConfigView.vue'),
  },
  {
    path: '/codex-help/embed/',
    name: 'codex-help-embed',
    component: () => import('@/views/CodexHelpView.vue'),
    props: { embedded: true },
    meta: { noindex: true },
  },
  {
    path: '/config-guides/embed/',
    name: 'config-guides-embed',
    component: () => import('@/views/ConfigGuidesView.vue'),
    props: { embedded: true },
    meta: { noindex: true },
  },
  {
    path: '/skills/',
    name: 'skills',
    component: () => import('@/views/SkillsView.vue'),
  },
  {
    path: '/codex-cases/',
    name: 'codex-cases',
    component: () => import('@/views/CasesView.vue'),
  },
  {
    path: '/incentive-plans/',
    name: 'incentive-plans',
    component: () => import('@/views/IncentivePlansView.vue'),
  },
  {
    path: '/incentive-plans/embed/',
    name: 'incentive-plans-embed',
    component: () => import('@/views/IncentivePlansView.vue'),
    props: { embedded: true },
    meta: { noindex: true },
  },
  ...incentivePlans.map((plan) => ({
    path: `/incentive-plans/${plan.slug}/`,
    name: `incentive-plan-${plan.slug}`,
    component: () => import('@/views/IncentivePlanDetailView.vue'),
    props: { slug: plan.slug },
  })),
  {
    path: '/workflows/',
    name: 'workflows',
    component: () => import('@/views/WorkflowsView.vue'),
  },
  {
    path: '/workflows/embed/',
    name: 'workflows-embed',
    component: () => import('@/views/WorkflowsView.vue'),
    props: { embedded: true },
    meta: { noindex: true },
  },
  {
    path: '/skills-list/',
    name: 'skills-list',
    component: () => import('@/views/SkillsListView.vue'),
    meta: { noindex: true },
  },
  {
    path: '/image-creation/',
    name: 'image-creation',
    component: () => import('@/views/ImageCreationView.vue'),
  },
  {
    path: '/agk-video/',
    name: 'agk-video',
    component: () => import('@/views/AgkVideoView.vue'),
  },
  {
    path: '/api-docs/',
    name: 'api-docs',
    component: () => import('@/views/ApiDocsView.vue'),
  },
  {
    path: '/agk-video/embed/',
    name: 'agk-video-embed',
    component: () => import('@/views/AgkVideoView.vue'),
    props: { embedded: true },
    meta: { noindex: true },
  },
  {
    path: '/image-creation/embed/',
    name: 'image-creation-embed',
    component: () => import('@/views/ImageCreationView.vue'),
    props: { embedded: true },
    meta: { noindex: true },
  },
  {
    path: '/image-prompts/',
    name: 'image-prompts',
    component: () => import('@/views/ImagePromptLibraryView.vue'),
  },
  {
    path: '/image-prompts/embed/',
    name: 'image-prompts-embed',
    component: () => import('@/views/ImagePromptLibraryView.vue'),
    props: { embedded: true },
    meta: { noindex: true },
  },
  {
    path: '/image-generation-config/',
    name: 'image-generation-config',
    component: () => import('@/views/ImageCreationCcSwitchView.vue'),
  },
  {
    path: '/image-generation-config/embed/',
    name: 'image-generation-config-embed',
    component: () => import('@/views/ImageCreationCcSwitchView.vue'),
    props: { embedded: true },
    meta: { noindex: true },
  },
  {
    path: '/image-setting/',
    name: 'image-setting',
    component: () => import('@/views/ImageSettingView.vue'),
  },
  {
    path: '/enterprise-service/',
    name: 'enterprise-service',
    component: () => import('@/views/EnterpriseServiceView.vue'),
  },
  {
    path: '/volcengine-partner/',
    name: 'volcengine-partner',
    component: () => import('@/views/VolcenginePartnerView.vue'),
  },
  {
    path: '/about/',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/free-trial/',
    name: 'free-trial',
    component: () => import('@/views/FreeTrialView.vue'),
  },
  {
    path: '/contact/',
    name: 'contact',
    component: () => import('@/views/ContactSupportView.vue'),
  },
  {
    path: '/blog/',
    name: 'blog',
    component: () => import('@/views/BlogView.vue'),
  },
  {
    path: '/blog/embed/',
    name: 'blog-embed',
    component: () => import('@/views/BlogView.vue'),
    props: { embedded: true },
    meta: { noindex: true },
  },
  {
    path: '/blog/:slug/',
    name: 'blog-article',
    component: () => import('@/views/BlogArticleView.vue'),
  },
]

export const scrollBehavior: RouterScrollBehavior = (to, _from, savedPosition) => {
  if (savedPosition) return savedPosition
  if (to.hash) return { el: to.hash }
  return { top: 0 }
}
