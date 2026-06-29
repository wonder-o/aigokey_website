import { ref, computed } from 'vue'

type Language = 'zh' | 'en'

const currentLang = ref<Language>('zh')

const copy = {
  zh: {
    lang: 'zh-CN',
    title: 'AigoKey - Codex Agent + GPT + Image 稳定 AI 套餐',
    description: 'AigoKey 是稳定可靠的 AI Token 套餐，5 元/天起，覆盖 Codex Agent、GPT 系列模型和 Image 系列模型，日卡、周卡和三档月卡可选，每天 30-200 美元额度，不做 API 按次调用，不做按量付费。',
    navButtons: { toggle: 'EN', register: '注册', login: '登录', help: '帮助文档', trial: '免费体验' },
    eyebrow: 'Codex Agent · GPT + Image 系列模型',
    heroTitleBefore: '稳定可靠的 ',
    heroTitleHighlight: 'AI Token',
    heroTitleAfter: ' 套餐',
    heroCopy: '¥5/天起，覆盖 Codex Agent、GPT 系列模型和 Image 系列模型。日卡适合当天急用，周卡适合一周冲刺，月卡适合长期稳定工作流；每天 $30-$200 额度，不做 API 按次调用，不做按量付费。',
    heroButtons: { login: '登录使用', help: '查看帮助文档', trial: '免费开通体验' },
    heroNote: '适合开发、产品、运营、设计、电商、自媒体、外贸和学习办公等高频 AI 使用场景。',
    proof: [
      { strong: '¥5/天起', text: '日卡、周卡、月卡都能选，临时任务和长期使用都好安排。' },
      { strong: '$30-$200/天', text: '每日额度清晰，按任务周期和使用强度选择合适档位。' },
      { strong: '$1500-$6000/月', text: '月卡总额度充足，适合把 Codex、GPT 和 Image 模型当生产力工具。' },
    ],
    consoleTitle: 'AigoKey 稳定套餐工作台',
    liveText: '服务正常',
    quotaHeadLeft: '今日可用 AI 额度',
    quotaHeadRight: '日 / 周 / 月可选',
    quotaMain: '$30-$200',
    quotaUnit: '/ 天',
    metricLeft: { strong: '$6000', text: '最高月卡总额度，满足长期高频使用' },
    metricRight: { strong: '稳定优先', text: '持续可用更适合长期高频工作流' },
    usage: [
      { strong: 'Codex 执行、GPT 生成、Image 创作可连续使用', text: '围绕你的真实工作流设计，覆盖代码、内容、图片和分析任务。', tag: '高频友好' },
      { strong: '短期冲刺和长期订阅都能规划', text: '周期清楚、价格清楚、额度清楚、服务边界清楚。', tag: '稳定可靠' },
    ],
    pain: {
      head: '高频用 AI，不再分心计费',
      desc: '你可以按天试用、按周冲刺，也可以按月稳定订阅 Codex Agent、GPT 系列模型和 Image 系列模型。不用配置接口，不用计算 token，也不用担心余额忽高忽低。',
      cards: [
        { icon: '1', title: '不用研究 API', text: '不需要配置密钥、接口地址和调用参数，打开就能把 Codex、GPT 和 Image 模型用到日常工作里。' },
        { icon: '2', title: '不用计算 token', text: '写方案、改代码、生成图片、做翻译时，不用担心每一步都在产生看不懂的扣费。' },
        { icon: '3', title: '不用频繁充值', text: '日卡、周卡、月卡价格清晰，临时需求、项目冲刺和长期使用都能提前规划。' },
        { icon: '4', title: '稳定优先', text: '把可用性、客服响应和额度透明放在前面，不靠最低价吸引你。' },
      ],
    },
    value: {
      head: '从一天试用到长期使用，都能稳定调用 AI',
      desc: '你不用先看复杂技术参数，只要看清周期、价格、额度，以及能把哪些工作交给 AI 加速。',
      cards: [
        { icon: '$', title: '每天 $30-$200 额度', text: '从轻量办公到高频生产都能覆盖，适合 Codex Agent 执行任务、GPT 写作分析和 Image 图片生成。' },
        { icon: 'K', title: '日卡 / 周卡 / 月卡', text: '当天急用选日卡，一周项目冲刺选周卡，长期把 AI 当生产力工具再选择月卡。' },
        { icon: '✓', title: '¥5/¥48 起步更灵活', text: '短周期低门槛试用，月卡固定预算长期稳定；不做 API 按次调用，不做按量付费。' },
      ],
    },
    price: {
      head: '开通前，权益一眼看清',
      desc: '按使用周期和每天使用强度选择套餐，价格、每日额度和周期总额度都提前说清楚。',
    },
    plans: [
      { badge: '灵活', label: '日卡', price: '¥5', unit: '/ 天', sub: '适合当天赶需求、体验 Codex Agent，或集中处理一次代码、文案、图片和资料任务。', quotas: [{ label: '每日额度', value: '$30/天' }, { label: '周期额度', value: '$30/天' }], checks: ['当天需要当天开，不用长期承诺', '适合试用、急单和临时集中处理', '用低门槛体验轻量额度'] },
      { badge: '冲刺', label: '周卡', price: '¥48', unit: '/ 周', sub: '适合一周项目冲刺、连续改代码、批量出内容和集中做图，每天都有固定额度可用。', quotas: [{ label: '每日额度', value: '$50/天' }, { label: '周总额度', value: '$350/周' }], checks: ['比日卡更适合连续几天高频使用', '覆盖一周内多轮项目和内容任务', '短期预算清晰，用完再续更灵活'] },
      { badge: '', label: '轻量版', price: '¥168', unit: '/ 月', sub: '适合日常办公、内容处理、轻量代码辅助和低频图片生成，按月使用更省心。', quotas: [{ label: '每日额度', value: '$50/天' }, { label: '月总额度', value: '$1500/月' }], checks: ['适合个人轻量高频使用', '覆盖 Codex、GPT 和 Image 常用任务', '固定月费，额度边界清晰'] },
      { badge: '推荐', label: '标准版', price: '¥300', unit: '/ 月', sub: '适合长期、高频、固定预算使用，覆盖开发、内容、分析和图片创作。', quotas: [{ label: '每日额度', value: '$100/天' }, { label: '月总额度', value: '$3000/月' }], checks: ['适合个人和小团队日常生产力', '减少余额波动和 token 焦虑', '代码、文本、图片和资料分析都能覆盖'], featured: true },
      { badge: '', label: '专业版', price: '¥588', unit: '/ 月', sub: '适合更高频的连续任务、集中创作和更大额度需求。', quotas: [{ label: '每日额度', value: '$200/天' }, { label: '月总额度', value: '$6000/月' }], checks: ['适合更密集的连续 AI 工作流', '月总额度更充足，减少中断', '适合重度创作、开发和运营场景'] },
    ],
    compare: [
      { title: 'AigoKey 五档套餐', text: '日卡、周卡、月卡都能选，额度清晰、打开就能用，按周期和强度选择 Codex、GPT 和 Image 模型额度。', tag: '省心', good: true },
      { title: '自己配置 API', text: '适合开发接入产品，但日常办公要自己处理接口、余额、消耗和工具配置。', tag: '偏技术', good: false },
      { title: '单一 AI 工具', text: '只适合单点问答或生成。跨代码、文本、图片和工作流时，需要来回切换。', tag: '割裂', good: false },
    ],
    audience: {
      head: '把 AI 用进每天的工作里',
      desc: '不管你写内容、做运营、谈客户、整理方案、生成图片还是改代码，都可以交给 Codex Agent、GPT 系列模型和 Image 系列模型加速。',
      cards: [
        { pill: '自媒体', title: '选题脚本和封面更快', text: '用 GPT 做选题、标题、脚本和改稿，用 Image 模型生成封面、配图和账号视觉方向。' },
        { pill: '电商运营', title: '商品内容成套产出', text: '生成商品标题、详情页、客服话术、活动方案，并用 Image 模型辅助主图和投放素材构思。' },
        { pill: '外贸', title: '客户沟通和资料更顺', text: '写开发信、回客户邮件、整理报价、翻译产品资料，也能生成产品说明图和展示素材。' },
        { pill: '产品设计', title: '方案和原型推进更快', text: '用 GPT 梳理 PRD、竞品分析和评审材料，用 Codex Agent 辅助原型页面和演示 Demo。' },
        { pill: '开发者', title: '从想法到代码更快', text: '用 Codex Agent 读项目、改代码、跑验证，用 GPT 解释方案和错误，用 Image 模型补齐界面素材。' },
        { pill: '市场营销', title: '活动创意和投放更成体系', text: '用 GPT 拆解受众、卖点和投放脚本，用 Image 模型生成海报方向、素材草图和广告视觉参考。' },
        { pill: '销售顾问', title: '客户跟进和方案更精准', text: '整理客户背景、生成跟进话术、提炼需求和异议点，快速形成行业化提案和成交辅助材料。' },
        { pill: '人力行政', title: '招聘培训和制度更省时', text: '生成岗位 JD、面试题、培训材料和通知模板，辅助整理员工手册、流程说明和内部沟通内容。' },
        { pill: '教育培训', title: '课程内容和练习更快产出', text: '设计课程大纲、讲义、题目、点评反馈和学习计划，也能生成课堂配图和教学展示素材。' },
        { pill: '数据分析', title: '报表解读和洞察更清楚', text: '用 GPT 梳理指标口径、解释异常数据、生成分析结论和汇报文案，用 Codex 辅助处理脚本和数据清洗。' },
      ],
    },
    promise: {
      head: '重要规则先说清楚，使用更安心',
      desc: 'Codex Agent、GPT 系列模型和 Image 系列模型的额度、价格、使用边界和支持方式都提前说明，减少开通后的误解和反复确认。',
      cards: [
        { num: '01', title: '额度透明', text: '每天 $30-$200、日卡 $30/天、周卡 $50/天且周总 $350、月卡 $1500-$6000 的规则清楚展示，开通前就能知道额度边界。' },
        { num: '02', title: '预算固定', text: '¥5 日卡、¥48 周卡和三档月卡都不按次扣费，不让预算随着每次提问波动。' },
        { num: '03', title: '支持开票', text: '支持按实际订阅金额开具发票，开通或续费时可联系客服确认抬头和开票信息。' },
        { num: '04', title: '稳定优先', text: '长期高频使用时，可用性、持续服务和明确的支持方式更重要。' },
      ],
    },
    faq: {
      head: '常见问题',
      desc: '开通前关心的价格、额度、使用方式和服务边界，都可以在这里先看清楚。',
      items: [
        { q: 'AigoKey 是 API 服务吗？', a: 'AigoKey 不是 API 按次调用服务，也不是按量付费工具。你可以按天、按周或按月订阅后，更稳定地使用 Codex Agent、GPT 系列模型和 Image 系列模型完成日常工作。' },
        { q: '日卡、周卡和月卡分别包含什么？', a: '日卡 ¥5/天，包含每天 $30 额度；周卡 ¥48/周，包含每天 $50 额度、周总 $350 额度；月卡分为轻量版 ¥168/月、标准版 ¥300/月、专业版 ¥588/月，分别包含每天 $50/$100/$200 额度和月总 $1500/$3000/$6000 额度。具体可用范围以实际开通说明为准。' },
        { q: '每日额度和周期总额度怎么理解？', a: '每日额度是单日可使用上限，周期总额度是整个套餐周期内可使用的总上限。日卡适合当天集中使用，周卡适合连续几天冲刺，月卡适合长期稳定工作流。' },
        { q: '可以开发票吗？', a: '可以。AigoKey 支持按实际订阅金额开具发票，开通或续费时请联系客服提供发票抬头、税号和接收方式，具体开票信息以客服确认为准。' },
        { q: 'Codex Agent 主要能帮我做什么？', a: 'Codex Agent 更适合处理需要执行的任务，例如阅读项目、修改代码、生成 Demo、整理技术方案、排查错误和配合 GPT 输出说明文档。' },
        { q: 'Image 系列模型适合哪些场景？', a: 'Image 系列模型适合生成封面、商品图创意、运营海报、文章配图、产品说明图和界面素材方向，配合 GPT 可以一起完成从文案到视觉的内容生产。' },
        { q: '适合多人共用吗？', a: '日卡和周卡更适合个人短期使用，月卡更适合个人或小团队高频稳定使用。如果需要多人协作、统一账单或优先支持，可以联系客服确认可用方案。' },
      ],
    },
    contact: {
      head: '固定预算，稳定使用 AI',
      text: '需要开通、迁移使用习惯、确认额度规则或办理发票，可以直接联系客服。你也可以先查看帮助文档，再登录开始使用。',
      buttons: { login: '登录', help: '帮助文档', trial: '免费体验' },
    },
    footer: {
      text: '稳定可靠的 AI Token 套餐 · Codex Agent + GPT + Image · ¥5/天起 · 日卡 / 周卡 / 月卡 · 每天 $30-$200 额度',
      copyright: '© 2026 AIgoKey. 保留所有权利。',
    },
    modal: {
      title: '添加客服免费开通体验',
      text: '扫码添加客服，免费开通体验并确认可用额度。',
    },
  },
  en: {
    lang: 'en',
    title: 'AigoKey - Stable AI Plans for Codex Agent + GPT + Image',
    description: 'AigoKey offers stable AI Token plans from ¥5/day, covering Codex Agent, GPT models, and Image models with day, week, and monthly options.',
    navButtons: { toggle: '中文', register: 'Register', login: 'Log in', help: 'Help', trial: 'Free Trial' },
    eyebrow: 'Codex Agent · GPT + Image models',
    heroTitleBefore: 'Stable ',
    heroTitleHighlight: 'AI Token',
    heroTitleAfter: ' Plans',
    heroCopy: 'From ¥5/day, AigoKey covers Codex Agent, GPT models, and Image models. Use a day pass for urgent work, a week pass for project sprints, or monthly tiers for stable long-term workflows.',
    heroButtons: { login: 'Log in', help: 'View Help', trial: 'Start Free Trial' },
    heroNote: 'Built for high-frequency AI workflows across development, product, operations, design, ecommerce, media, trade, study, and office work.',
    proof: [
      { strong: 'From ¥5/day', text: 'Day, week, and monthly options for both temporary tasks and long-term use.' },
      { strong: '$30–$200/day', text: 'Clear daily quotas so you can choose by task period and workload.' },
      { strong: '$1.5K–$6K/mo', text: 'Generous monthly quotas for using Codex, GPT, and Image models as everyday productivity tools.' },
    ],
    consoleTitle: 'AigoKey Plan Workspace',
    liveText: 'Service normal',
    quotaHeadLeft: 'Available AI quota today',
    quotaHeadRight: 'Day / Week / Month',
    quotaMain: '$30-$200',
    quotaUnit: '/ day',
    metricLeft: { strong: '$6000', text: 'Highest monthly quota for sustained high-frequency use' },
    metricRight: { strong: 'Stability first', text: 'Continuous availability for long-running high-frequency workflows' },
    usage: [
      { strong: 'Continuous Codex execution, GPT generation, and Image creation', text: 'Designed around real workflows, covering code, content, images, and analysis.', tag: 'High-frequency ready' },
      { strong: 'Short sprints and long-term subscriptions are both planned', text: 'Clear periods, pricing, quotas, and service boundaries.', tag: 'Stable' },
    ],
    pain: {
      head: 'Use AI Frequently Without Billing Distractions',
      desc: 'Subscribe by day, week, or month and use Codex Agent, GPT models, and Image models reliably. No interface setup, no token math, and no unpredictable balance swings.',
      cards: [
        { icon: '1', title: 'No API setup', text: 'No keys, endpoints, or request parameters to configure. Open it and bring Codex, GPT, and Image models into daily work.' },
        { icon: '2', title: 'No token math', text: 'When writing plans, editing code, generating images, or translating, you do not have to watch every step become an obscure charge.' },
        { icon: '3', title: 'No repeated top-ups', text: 'Day, week, and monthly plans make temporary needs, project sprints, and long-term use easier to plan.' },
        { icon: '4', title: 'Stability first', text: 'Availability, support response, and quota transparency come first, instead of chasing the lowest headline price.' },
      ],
    },
    value: {
      head: 'From One-Day Trials to Long-Term AI Workflows',
      desc: 'Skip complex technical parameters. See the period, price, quota, and what work AI can speed up.',
      cards: [
        { icon: '$', title: '$30-$200 daily quota', text: 'Covers everything from light office work to high-frequency production, including Codex tasks, GPT writing and analysis, and Image generation.' },
        { icon: 'K', title: 'Day / Week / Month', text: 'Choose a day pass for urgent work, a week pass for sprints, and monthly tiers for stable long-term productivity.' },
        { icon: '✓', title: 'Flexible from ¥5/¥48', text: 'Low-entry short plans plus stable monthly budgets. No API call billing and no pay-as-you-go charges.' },
      ],
    },
    price: {
      head: 'Know the Benefits Before You Start',
      desc: 'Choose by period and daily workload. Price, daily quota, and period quota are all clear upfront.',
    },
    plans: [
      { badge: 'Flexible', label: 'Day Pass', price: '¥5', unit: '/ day', sub: 'Best for urgent same-day tasks, trying Codex Agent, or finishing one focused batch of code, copy, images, and research.', quotas: [{ label: 'Daily quota', value: '$30/day' }, { label: 'Period quota', value: '$30/day' }], checks: ['Open it only for the day you need it', 'Good for trials, urgent orders, and focused bursts', 'Low-entry access to the light quota'] },
      { badge: 'Sprint', label: 'Week Pass', price: '¥48', unit: '/ week', sub: 'Best for one-week project sprints, continuous code edits, batch content, and focused image work with daily quota available.', quotas: [{ label: 'Daily quota', value: '$50/day' }, { label: 'Weekly quota', value: '$350/week' }], checks: ['Better than a day pass for several active days', 'Covers multiple rounds of project and content tasks', 'Clear short-term budget with flexible renewal'] },
      { badge: '', label: 'Lite', price: '¥168', unit: '/ month', sub: 'Best for daily office work, content tasks, light code assistance, and occasional image generation.', quotas: [{ label: 'Daily quota', value: '$50/day' }, { label: 'Monthly quota', value: '$1500/month' }], checks: ['Good for light high-frequency personal use', 'Covers common Codex, GPT, and Image tasks', 'Fixed monthly fee with clear quota boundaries'] },
      { badge: 'Recommended', label: 'Standard', price: '¥300', unit: '/ month', sub: 'Best for long-term, high-frequency, fixed-budget work across development, content, analysis, and image creation.', quotas: [{ label: 'Daily quota', value: '$100/day' }, { label: 'Monthly quota', value: '$3000/month' }], checks: ['Good for individuals and small teams', 'Reduces balance swings and token anxiety', 'Covers code, text, images, and document analysis'], featured: true },
      { badge: '', label: 'Pro', price: '¥588', unit: '/ month', sub: 'Best for heavier continuous tasks, focused creation sessions, and larger quota needs.', quotas: [{ label: 'Daily quota', value: '$200/day' }, { label: 'Monthly quota', value: '$6000/month' }], checks: ['Built for denser continuous AI workflows', 'More monthly quota to reduce interruptions', 'Good for heavy creation, development, and operations'] },
    ],
    compare: [
      { title: 'AigoKey five-plan lineup', text: 'Day, week, and monthly plans with clear quotas and ready-to-use access to Codex, GPT, and Image model capacity.', tag: 'Easy', good: true },
      { title: 'Self-managed API', text: 'Useful for product integrations, but daily work requires managing endpoints, balance, usage, and tool setup.', tag: 'Technical', good: false },
      { title: 'Single AI tool', text: 'Fine for single-point Q&A or generation. Cross-code, text, image, and workflow tasks require switching tools.', tag: 'Fragmented', good: false },
    ],
    audience: {
      head: 'Bring AI Into Everyday Work',
      desc: 'Whether you write content, run operations, talk to customers, organize plans, generate images, or edit code, Codex Agent, GPT models, and Image models can speed things up.',
      cards: [
        { pill: 'Media', title: 'Topics, scripts, and covers faster', text: 'Use GPT for topics, titles, scripts, and edits, and Image models for covers, visuals, and account direction.' },
        { pill: 'Ecommerce', title: 'Product content in complete sets', text: 'Generate product titles, detail pages, support scripts, campaign plans, and Image-assisted product visuals.' },
        { pill: 'Trade', title: 'Smoother customer communication', text: 'Write outreach emails, replies, quotes, translations, and product materials, plus supporting visuals.' },
        { pill: 'Product Design', title: 'Faster plans and prototypes', text: 'Use GPT for PRDs, competitive analysis, and review materials, with Codex Agent helping build prototypes and demos.' },
        { pill: 'Developers', title: 'From idea to code faster', text: 'Use Codex Agent to read projects, edit code, and run checks, GPT to explain plans and errors, and Image models for interface assets.' },
        { pill: 'Marketing', title: 'Campaign ideas and ads in one flow', text: 'Use GPT to break down audiences, selling points, and ad scripts, with Image models creating poster directions and visual references.' },
        { pill: 'Sales', title: 'Sharper follow-ups and proposals', text: 'Summarize customer context, draft follow-up messages, clarify needs and objections, and turn them into industry-specific proposals.' },
        { pill: 'HR & Admin', title: 'Hiring, training, and policies faster', text: 'Create job descriptions, interview questions, training materials, notices, employee handbooks, process docs, and internal messages.' },
        { pill: 'Education', title: 'Courses and exercises produced faster', text: 'Design course outlines, handouts, exercises, feedback, and study plans, plus classroom visuals and presentation materials.' },
        { pill: 'Data Analysis', title: 'Clearer reports and business insights', text: 'Clarify metric definitions, explain anomalies, generate analysis conclusions and report copy, with Codex helping scripts and data cleanup.' },
      ],
    },
    promise: {
      head: 'Clear Rules Make Usage Easier',
      desc: 'Quotas, pricing, usage boundaries, and support for Codex Agent, GPT models, and Image models are explained upfront to reduce surprises after activation.',
      cards: [
        { num: '01', title: 'Transparent quotas', text: 'Daily quotas from $30-$200, day pass $30/day, week pass $50/day with $350/week, and monthly quotas from $1500-$6000 are shown clearly.' },
        { num: '02', title: 'Fixed budget', text: '¥5 day pass, ¥48 week pass, and three monthly tiers have no per-call charges.' },
        { num: '03', title: 'Invoices available', text: 'Invoices can be issued based on the actual subscription amount. Contact support with invoice details when activating or renewing.' },
        { num: '04', title: 'Stability first', text: 'For long-term high-frequency use, availability, continuity, and clear support matter most.' },
      ],
    },
    faq: {
      head: 'FAQ',
      desc: 'Common questions about pricing, quotas, usage, and service boundaries are answered here before you start.',
      items: [
        { q: 'Is AigoKey an API service?', a: 'AigoKey is not a per-call API service or pay-as-you-go tool. After subscribing by day, week, or month, you can use Codex Agent, GPT models, and Image models more reliably for daily work.' },
        { q: 'What is included in the day, week, and monthly plans?', a: 'Day Pass is ¥5/day with a $30 daily quota. Week Pass is ¥48/week with a $50 daily quota and $350 weekly quota. Monthly tiers include Lite ¥168/month, Standard ¥300/month, and Pro ¥588/month with $50/$100/$200 daily quotas and $1500/$3000/$6000 monthly quotas.' },
        { q: 'How should I understand daily and period quotas?', a: 'The daily quota is the single-day usage limit, and the period quota is the total limit for the whole plan period. Day Pass fits focused same-day work, Week Pass fits sprint weeks, and monthly tiers fit stable long-term workflows.' },
        { q: 'Can I get an invoice?', a: 'Yes. AigoKey supports invoices based on the actual subscription amount. During activation or renewal, contact support with the invoice title, tax ID, and receiving method. Final invoice details are confirmed by support.' },
        { q: 'What can Codex Agent help me do?', a: 'Codex Agent is useful for execution-heavy tasks such as reading projects, editing code, generating demos, organizing technical plans, troubleshooting errors, and preparing documents with GPT.' },
        { q: 'What are Image models good for?', a: 'Image models are suitable for covers, product image concepts, operation posters, article illustrations, product explainers, and UI asset direction. Together with GPT, they support content from copy to visuals.' },
        { q: 'Is it suitable for multiple users?', a: 'Day and week plans are better for short-term personal use, while monthly tiers are better for individuals or small teams with stable high-frequency use. For multi-user collaboration, unified billing, or priority support, contact support for available options.' },
      ],
    },
    contact: {
      head: 'Fixed Budget, Stable AI Access',
      text: 'For activation, migration help, quota confirmation, or invoices, contact support directly. You can also read the help docs first, then log in to start.',
      buttons: { login: 'Log in', help: 'Help', trial: 'Free Trial' },
    },
    footer: {
      text: 'Stable AI Token plans · Codex Agent + GPT + Image · From ¥5/day · Day / Week / Month · $30-$200 daily quota',
      copyright: '© 2026 AIgoKey. All rights reserved.',
    },
    modal: {
      title: 'Add support to start a free trial',
      text: 'Scan to add support, start a free trial, and confirm available quota.',
    },
  },
}

export function useI18n() {
  const lang = computed(() => currentLang.value)
  const t = computed(() => copy[currentLang.value])

  function toggleLang() {
    currentLang.value = currentLang.value === 'zh' ? 'en' : 'zh'
    try {
      localStorage.setItem('aigokeyLanguage', currentLang.value)
    } catch { /* ignore */ }
    document.documentElement.lang = copy[currentLang.value].lang
  }

  // Initialize from saved preference
  try {
    const saved = localStorage.getItem('aigokeyLanguage')
    if (saved === 'en' || saved === 'zh') {
      currentLang.value = saved
      document.documentElement.lang = copy[saved].lang
    }
  } catch { /* ignore */ }

  return { lang, t, toggleLang }
}
