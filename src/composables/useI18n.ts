import { ref, computed } from 'vue'

export type Language = 'zh-CN' | 'zh-TW' | 'en'

const currentLang = ref<Language>('zh-CN')

export const languageOptions: Array<{ code: Language; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
]

const copy = {
  zh: {
    lang: 'zh-CN',
    title: 'AigoKey - Codex Agent + GPT + Image 稳定 AI 套餐',
    description: 'AigoKey 是稳定可靠的 AI Token 套餐，5 元/天起，覆盖 Codex Agent、GPT 系列模型和 Image 系列模型，日卡、周卡和三档月卡可选，每天 30-200 美元额度，不做 API 按次调用，不做按量付费。',
    navButtons: { toggle: 'EN', register: '注册', login: '登录', imageCreation: '图像创作', skills: 'Skills', blog: '博客', help: '帮助', enterprise: '企业服务', trial: '免费体验' },
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
      text: '稳定可靠的 AI Token 套餐',
      copyright: '© 2026 AIgoKey. 保留所有权利。',
    },
    modal: {
      title: '添加客服免费开通体验',
      text: '扫码添加客服，免费开通体验并确认可用额度。',
    },
    enterprise: {
      meta: {
        title: '企业服务 - AigoKey',
        description: 'AigoKey 企业服务，为企业提供专属 AI token 套餐、更高额度上限、更高并发上限、私有化部署和客服咨询。',
        keywords: 'AigoKey 企业服务, AI token 企业套餐, 企业AI, 私有化部署, 并发上限, AI额度',
        ogDescription: '为企业量身定制 AI token Plan 方案，支持更高额度、更高并发和私有化部署咨询。',
      },
      hero: {
        eyebrow: 'Enterprise AI Token Service',
        title: '为企业量身定制 AI token Plan 方案',
        summary: '面向团队、部门和企业级 AI 使用场景，提供专属套餐、更高额度上限、更高并发上限、私有化部署和持续支持，让 Codex Agent、GPT 与 Image 模型更稳定地进入企业工作流。',
        primary: '联系客服咨询',
        secondary: '查看企业能力',
      },
      panel: {
        label: '企业专属',
        quota: '更高额度',
        text: '按业务规模、使用人数、峰值并发和部署方式定制，不受个人套餐固定档位限制。',
        tags: ['团队账号', '统一预算', '并发上限', '私有部署'],
      },
      plans: {
        head: '企业专属套餐',
        desc: '根据企业真实使用量和业务流程设计权益，而不是简单套用个人版档位。',
        cards: [
          { icon: '01', title: '量身定制专属套餐', text: '按企业人数、部门、任务类型和预算周期设计套餐，不局限于个人版固定额度。' },
          { icon: '02', title: '统一采购与开票', text: '支持企业统一采购、统一预算管理和开票需求，减少个人分散开通带来的管理成本。' },
          { icon: '03', title: '多场景模型覆盖', text: '覆盖 Codex Agent、GPT 系列模型和 Image 系列模型，适配代码、内容、图片、资料分析等任务。' },
        ],
      },
      capacity: {
        head: '更高额度上限与更高并发上限',
        desc: '适合研发、运营、内容、电商、客服、销售、教育培训等多部门同时使用 AI 的场景。',
        items: [
          { title: '更高额度上限', text: '为高频团队、批量内容生产、研发协作和业务高峰准备更充足的使用空间。' },
          { title: '更高并发上限', text: '支持多人同时使用、多个业务流程并行处理，降低企业集中使用时的排队和中断。' },
          { title: '专属服务支持', text: '可围绕开通、迁移、使用规则、额度规划和异常处理提供更明确的支持方式。' },
        ],
        metrics: [
          { label: '套餐', value: '专属定制' },
          { label: '额度', value: '更高上限' },
          { label: '并发', value: '更高峰值' },
          { label: '部署', value: '可沟通私有化' },
        ],
      },
      private: {
        head: '支持私有化部署与企业管控',
        desc: '当企业需要更强的数据边界、账号管理、内部流程衔接或专属运维支持时，可联系客服沟通可行方案。',
        items: [
          { num: '01', title: '私有化部署咨询', text: '适合对数据边界、账号权限、内部网络或合规流程有更高要求的企业。' },
          { num: '02', title: '企业账号与权限', text: '可根据团队结构沟通账号开通、使用边界、成员协作和管理方式。' },
          { num: '03', title: '业务流程衔接', text: '围绕研发、运营、客服、销售、教育培训等场景，沟通 AI token 服务如何嵌入现有流程。' },
        ],
      },
      contact: {
        eyebrow: 'Contact Support',
        head: '详情添加客服咨询',
        text: '请说明企业人数、预计使用场景、额度需求、并发需求、是否需要私有化部署和开票要求。客服会根据你的业务情况沟通专属企业方案。',
        list: ['可咨询企业专属套餐和报价', '可确认更高额度、更高并发和账号协作方式', '可沟通私有化部署、接口衔接和服务支持边界'],
        qrText: '微信扫码添加客服，备注"企业服务"。',
      },
    },
    codexHelp: {
      meta: {
        title: 'Codex 安装使用教程 - AigoKey',
        description: 'AigoKey Codex 安装使用教程，包含非程序员和程序员用户的 ChatGPT Codex App、Codex CLI、CC-Switch、VS Code 插件安装和密钥导入流程。',
        keywords: 'Codex, 安装教程, CC-Switch, VS Code Codex 插件, 密钥导入, AigoKey',
        ogDescription: '按非程序员、Windows、Mac、程序员流程整理 Codex 安装与密钥导入教程。',
      },
      hero: {
        eyebrow: 'ChatGPT Codex App · CC-Switch · VS Code · AigoKey',
        title: 'Codex 安装使用教程手册',
        copy: '根据飞书教程重新整理页面顺序：先给非编程用户放 Windows / Mac 图文安装流程，再把程序员需要的 CLI、VS Code 插件和 CC-Switch 配置放到后面。',
        buttons: { video: '配置视频', nonDeveloper: '非程序员安装', developer: '程序员安装' },
      },
      quickJump: '快速跳转',
      toc: [
        { id: 'prep', label: '1. 前置客服' },
        { id: 'config-video', label: '2. 配置视频' },
        { id: 'non-developer', label: '3. 非程序员安装' },
        { id: 'windows-user', label: 'Windows 流程' },
        { id: 'mac-user', label: 'Mac 流程' },
        { id: 'developer', label: '4. 程序员安装' },
        { id: 'cli-install', label: 'Codex CLI' },
        { id: 'cc-switch', label: 'CC-Switch' },
        { id: 'vscode-plugin', label: 'VS Code 插件' },
        { id: 'codex-app', label: 'ChatGPT Codex App' },
        { id: 'support', label: '5. 联系客服' },
      ],
      prep: {
        head: '前置：联系客服和打开订阅站点',
        lead: '有使用问题、充值问题、密钥不可用或导入后没有生效，请先联系微信客服确认。',
        siteLabel: 'Codex 订阅站点：',
        homeBefore: '网站首页：',
        homeLink: '返回 AigoKey 首页',
        qrAlt: '联系客服微信二维码',
        qrCaption: '飞书截图 01：联系客服微信二维码',
      },
      video: {
        head: '配置教程视频',
        lead: '飞书文档里的配置视频已放入页面，可直接播放查看完整配置过程。',
        caption: '飞书视频：Codex 配置教程',
      },
      nonDeveloper: {
        head: '非程序员用户安装流程',
        lead: '产品经理、电商运营、品牌营销、自媒体等用户，优先按这一段操作。安装 ChatGPT Codex App 后不要登录，直接退出程序，再通过 CC-Switch 导入密钥。',
        windowsHead: 'Windows 安装方法',
        macHead: 'Mac 安装方法',
        windowsSteps: [
          '下载安装 ChatGPT Codex App。安装好之后不要登录，直接退出程序。',
          '下载安装 CC-Switch。GitHub Release 页面里的 Windows 下载包可能被折叠，需要先展开资源列表。',
          '登录 AigoKey 网站，进入 API 密钥管理页面，创建密钥并选择分组。',
          '把创建好的密钥导入 CC-Switch，然后启用刚导入的密钥。',
          '重启 ChatGPT Codex App 即可开始使用。',
        ],
        macSteps: [
          '下载安装 ChatGPT Codex App。安装好之后不要登录，直接退出程序。',
          '下载安装 CC-Switch。不会使用命令行时，直接从 Release 页面下载 Mac 安装包。',
          '登录 AigoKey 网站创建密钥。创建密钥的页面和 Windows 流程相同。',
          '把创建好的密钥导入 CC-Switch，然后启用刚导入的密钥。',
          '重启 ChatGPT Codex App 即可开始使用。',
        ],
      },
      developer: {
        head: '程序员用户安装流程',
        lead: '用于编程开发的用户再继续完成 CLI、CC-Switch、VS Code 插件和 ChatGPT Codex App 配置。',
        cliHead: '安装 Codex CLI',
        ccHead: '安装 CC-Switch 并导入密钥',
        ccText: '导入密钥后，记得在 CC-Switch 里启用刚导入的密钥，再回到 ChatGPT Codex App 或 VS Code 使用。',
        vscodeHead: '安装 VS Code Codex 插件',
        vscodeText: '如果你主要在 VS Code 里开发，可以安装 Codex 插件，并从侧边栏打开 Codex。',
        appHead: '安装 ChatGPT Codex App',
      },
      links: {
        app: 'ChatGPT Codex App：',
        ccSwitch: 'CC-Switch：',
        project: '项目地址：',
        download: 'Windows / Mac 下载地址：',
        windowsDownload: 'Windows 下载地址：',
        macDownload: 'Mac 下载地址：',
        macCommand: 'Mac 可选命令',
        macCliCommand: 'Mac 命令行安装',
      },
      screenshots: {
        windows: [
          { src: '/assets/windows_install_1.png', alt: 'Windows 下载 CC-Switch 步骤 1', caption: 'Windows 下载 CC-Switch：展开 Release 资源区域' },
          { src: '/assets/windows_install_2.png', alt: 'Windows 下载 CC-Switch 步骤 2', caption: 'Windows 下载 CC-Switch：选择 Windows 安装包' },
          { src: '/assets/08_网站_API密钥管理.png', alt: '网站 API 密钥管理页面', caption: '飞书截图 08：在网站进入 API 密钥管理页面' },
          { src: '/assets/09_创建密钥_选择分组.png', alt: '创建密钥并选择分组', caption: '飞书截图 09：创建密钥时选择对应分组' },
          { src: '/assets/10_Windows_密钥导入到CCS.png', alt: 'Windows 将密钥导入 CC-Switch', caption: '飞书截图 10：Windows 将密钥导入 CC-Switch' },
          { src: '/assets/13_CCSwitch_启用导入密钥.png', alt: '启用导入到 CC-Switch 的密钥', caption: '飞书截图 13：在 CC-Switch 里启用导入的 AigoKey 密钥' },
        ],
        mac: [
          { src: '/assets/11_Mac_密钥导入到CCS.png', alt: 'Mac 将密钥导入 CC-Switch', caption: '飞书截图 11：Mac 将密钥导入 CC-Switch' },
        ],
        developerCc: [
          { src: '/assets/02_CCSwitch_主界面.png', alt: 'CC-Switch 主界面', caption: '飞书截图 02：CC-Switch 主界面' },
          { src: '/assets/03_CCSwitch_配置供应商.png', alt: 'CC-Switch 配置供应商', caption: '飞书截图 03：配置供应商信息' },
          { src: '/assets/04_CCSwitch_密钥导入到CCS.png', alt: 'CC-Switch 导入密钥', caption: '飞书截图 04：将网站生成的密钥导入 CC-Switch' },
        ],
        vscode: [
          { src: '/assets/05_VSCode_Codex插件安装.png', alt: 'VS Code 安装 Codex 插件', caption: '飞书截图 05：在 VS Code 扩展市场安装 Codex 插件' },
          { src: '/assets/06_VSCode_Codex侧边栏.png', alt: 'VS Code Codex 侧边栏', caption: '飞书截图 06：从 VS Code 侧边栏打开 Codex' },
        ],
        codexApp: [
          { src: '/assets/07_Codex_App主界面.png', alt: 'ChatGPT Codex App 主界面', caption: '飞书截图 07：ChatGPT Codex App 主界面' },
        ],
      },
      support: {
        head: '联系客服',
        siteBefore: 'Codex 订阅站点：',
        homeBefore: '，也可以 ',
        homeLink: '返回 AigoKey 首页',
        homeAfter: '。',
        text: '有使用问题、充值问题、密钥不可用或导入后没有生效，请联系微信客服。',
        qrAlt: '联系客服微信二维码',
        qrCaption: '飞书截图 12：联系客服微信二维码',
      },
      copy: { action: '复制', success: '已复制', fail: '请手动复制' },
    },
  },
  en: {
    lang: 'en',
    title: 'AigoKey - Stable AI Plans for Codex Agent + GPT + Image',
    description: 'AigoKey offers stable AI Token plans from ¥5/day, covering Codex Agent, GPT models, and Image models with day, week, and monthly options.',
    navButtons: { toggle: '中文', register: 'Register', login: 'Log in', imageCreation: 'Image Studio', skills: 'Skills', blog: 'Blog', help: 'Help', enterprise: 'Enterprise', trial: 'Free Trial' },
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
      text: 'Stable AI Token Plan',
      copyright: '© 2026 AIgoKey. All rights reserved.',
    },
    modal: {
      title: 'Add support to start a free trial',
      text: 'Scan to add support, start a free trial, and confirm available quota.',
    },
    enterprise: {
      meta: {
        title: 'Enterprise Service - AigoKey',
        description: 'AigoKey enterprise services provide dedicated AI token plans, higher quota limits, higher concurrency limits, private deployment consultation, and support.',
        keywords: 'AigoKey enterprise service, AI token enterprise plan, enterprise AI, private deployment, concurrency limit, AI quota',
        ogDescription: 'Tailored AI token Plan solutions for enterprises, with higher quotas, higher concurrency, and private deployment consultation.',
      },
      hero: {
        eyebrow: 'Enterprise AI Token Service',
        title: 'Tailored AI token Plan solutions for enterprises',
        summary: 'For teams, departments, and enterprise AI workflows, AigoKey provides dedicated plans, higher quota limits, higher concurrency limits, private deployment options, and ongoing support so Codex Agent, GPT, and Image models can enter enterprise workflows more reliably.',
        primary: 'Contact support',
        secondary: 'View capabilities',
      },
      panel: {
        label: 'Enterprise only',
        quota: 'Higher quota',
        text: 'Plans can be tailored by business scale, users, peak concurrency, and deployment needs instead of being limited to fixed personal tiers.',
        tags: ['Team accounts', 'Unified budget', 'Concurrency limit', 'Private deployment'],
      },
      plans: {
        head: 'Dedicated Enterprise Plans',
        desc: 'Benefits are designed around real enterprise usage and workflows, not simply copied from personal tiers.',
        cards: [
          { icon: '01', title: 'Tailored dedicated plans', text: 'Plans can be designed by user count, departments, task types, and budget cycles, without being limited to fixed personal quotas.' },
          { icon: '02', title: 'Centralized purchase and invoices', text: 'Support unified enterprise procurement, budget management, and invoicing to reduce the cost of scattered individual subscriptions.' },
          { icon: '03', title: 'Multi-scenario model coverage', text: 'Covers Codex Agent, GPT models, and Image models for code, content, images, document analysis, and more.' },
        ],
      },
      capacity: {
        head: 'Higher Quota and Concurrency Limits',
        desc: 'Useful when R&D, operations, content, ecommerce, support, sales, education, and other teams use AI at the same time.',
        items: [
          { title: 'Higher quota limits', text: 'More usage room for high-frequency teams, batch content production, engineering collaboration, and business peaks.' },
          { title: 'Higher concurrency limits', text: 'Support multiple users and workflows running in parallel, reducing queues and interruptions during concentrated enterprise usage.' },
          { title: 'Dedicated support', text: 'Get clearer support around activation, migration, usage rules, quota planning, and issue handling.' },
        ],
        metrics: [
          { label: 'Plan', value: 'Tailored' },
          { label: 'Quota', value: 'Higher limit' },
          { label: 'Concurrency', value: 'Higher peak' },
          { label: 'Deployment', value: 'Private options' },
        ],
      },
      private: {
        head: 'Private Deployment and Enterprise Controls',
        desc: 'When enterprises need stronger data boundaries, account management, internal workflow integration, or dedicated operations support, contact support to discuss available options.',
        items: [
          { num: '01', title: 'Private deployment consultation', text: 'For enterprises with higher requirements around data boundaries, permissions, internal networks, or compliance workflows.' },
          { num: '02', title: 'Enterprise accounts and permissions', text: 'Discuss account activation, usage boundaries, team collaboration, and management by team structure.' },
          { num: '03', title: 'Workflow integration', text: 'Explore how AI token services can fit existing workflows across R&D, operations, support, sales, education, and training.' },
        ],
      },
      contact: {
        eyebrow: 'Contact Support',
        head: 'Add support for details',
        text: 'Please describe your company size, expected use cases, quota needs, concurrency needs, whether private deployment is required, and invoicing requirements. Support will discuss a dedicated enterprise solution based on your business situation.',
        list: ['Ask about dedicated enterprise plans and pricing', 'Confirm higher quotas, higher concurrency, and account collaboration', 'Discuss private deployment, integration, and support boundaries'],
        qrText: 'Scan with WeChat to add support. Mention "enterprise service".',
      },
    },
    codexHelp: {
      meta: {
        title: 'Codex Installation and Usage Guide - AigoKey',
        description: 'AigoKey Codex installation guide for non-developer and developer users, covering ChatGPT Codex App, Codex CLI, CC-Switch, VS Code plugin installation, and key import.',
        keywords: 'Codex, installation guide, CC-Switch, VS Code Codex plugin, key import, AigoKey',
        ogDescription: 'A Codex installation and key import guide organized for non-developers, Windows, Mac, and developer workflows.',
      },
      hero: {
        eyebrow: 'ChatGPT Codex App · CC-Switch · VS Code · AigoKey',
        title: 'Codex Installation and Usage Guide',
        copy: 'Reorganized from the Feishu tutorial: Windows and Mac visual installation steps for non-developers come first, followed by CLI, VS Code plugin, and CC-Switch setup for developers.',
        buttons: { video: 'Setup video', nonDeveloper: 'Non-developer install', developer: 'Developer install' },
      },
      quickJump: 'Quick jump',
      toc: [
        { id: 'prep', label: '1. Support first' },
        { id: 'config-video', label: '2. Setup video' },
        { id: 'non-developer', label: '3. Non-developer install' },
        { id: 'windows-user', label: 'Windows flow' },
        { id: 'mac-user', label: 'Mac flow' },
        { id: 'developer', label: '4. Developer install' },
        { id: 'cli-install', label: 'Codex CLI' },
        { id: 'cc-switch', label: 'CC-Switch' },
        { id: 'vscode-plugin', label: 'VS Code plugin' },
        { id: 'codex-app', label: 'ChatGPT Codex App' },
        { id: 'support', label: '5. Contact support' },
      ],
      prep: {
        head: 'First: contact support and open the subscription site',
        lead: 'If you have usage issues, recharge issues, unavailable keys, or imported keys that do not take effect, contact WeChat support first.',
        siteLabel: 'Codex subscription site: ',
        homeBefore: 'Homepage: ',
        homeLink: 'Back to AigoKey homepage',
        qrAlt: 'WeChat support QR code',
        qrCaption: 'Feishu screenshot 01: WeChat support QR code',
      },
      video: {
        head: 'Setup Tutorial Video',
        lead: 'The setup video from the Feishu document is embedded here so you can watch the full configuration process.',
        caption: 'Feishu video: Codex setup tutorial',
      },
      nonDeveloper: {
        head: 'Installation Flow for Non-developer Users',
        lead: 'Product managers, ecommerce operators, brand marketers, media creators, and similar users should start here. After installing ChatGPT Codex App, do not log in. Quit the app, then import the key through CC-Switch.',
        windowsHead: 'Windows installation',
        macHead: 'Mac installation',
        windowsSteps: [
          'Download and install ChatGPT Codex App. After installation, do not log in. Quit the app directly.',
          'Download and install CC-Switch. The Windows download package on the GitHub Release page may be collapsed, so expand the asset list first.',
          'Log in to AigoKey, open API Key Management, create a key, and choose a group.',
          'Import the created key into CC-Switch, then enable the imported key.',
          'Restart ChatGPT Codex App to start using it.',
        ],
        macSteps: [
          'Download and install ChatGPT Codex App. After installation, do not log in. Quit the app directly.',
          'Download and install CC-Switch. If you do not use the command line, download the Mac installer from the Release page.',
          'Log in to AigoKey and create a key. The key creation page is the same as the Windows flow.',
          'Import the created key into CC-Switch, then enable the imported key.',
          'Restart ChatGPT Codex App to start using it.',
        ],
      },
      developer: {
        head: 'Installation Flow for Developer Users',
        lead: 'Developer users can continue with CLI, CC-Switch, VS Code plugin, and ChatGPT Codex App configuration.',
        cliHead: 'Install Codex CLI',
        ccHead: 'Install CC-Switch and import the key',
        ccText: 'After importing the key, enable the imported key in CC-Switch, then return to ChatGPT Codex App or VS Code.',
        vscodeHead: 'Install the VS Code Codex plugin',
        vscodeText: 'If you mainly develop in VS Code, install the Codex plugin and open Codex from the sidebar.',
        appHead: 'Install ChatGPT Codex App',
      },
      links: {
        app: 'ChatGPT Codex App: ',
        ccSwitch: 'CC-Switch: ',
        project: 'Project: ',
        download: 'Windows / Mac download: ',
        windowsDownload: 'Windows download: ',
        macDownload: 'Mac download: ',
        macCommand: 'Optional Mac command',
        macCliCommand: 'Mac CLI install',
      },
      screenshots: {
        windows: [
          { src: '/assets/windows_install_1.png', alt: 'Windows CC-Switch download step 1', caption: 'Windows CC-Switch download: expand the Release asset area' },
          { src: '/assets/windows_install_2.png', alt: 'Windows CC-Switch download step 2', caption: 'Windows CC-Switch download: select the Windows installer' },
          { src: '/assets/08_网站_API密钥管理.png', alt: 'Website API key management page', caption: 'Feishu screenshot 08: open API Key Management on the website' },
          { src: '/assets/09_创建密钥_选择分组.png', alt: 'Create a key and choose a group', caption: 'Feishu screenshot 09: choose the matching group when creating a key' },
          { src: '/assets/10_Windows_密钥导入到CCS.png', alt: 'Import the key into CC-Switch on Windows', caption: 'Feishu screenshot 10: import the key into CC-Switch on Windows' },
          { src: '/assets/13_CCSwitch_启用导入密钥.png', alt: 'Enable the imported CC-Switch key', caption: 'Feishu screenshot 13: enable the imported AigoKey key in CC-Switch' },
        ],
        mac: [
          { src: '/assets/11_Mac_密钥导入到CCS.png', alt: 'Import the key into CC-Switch on Mac', caption: 'Feishu screenshot 11: import the key into CC-Switch on Mac' },
        ],
        developerCc: [
          { src: '/assets/02_CCSwitch_主界面.png', alt: 'CC-Switch main screen', caption: 'Feishu screenshot 02: CC-Switch main screen' },
          { src: '/assets/03_CCSwitch_配置供应商.png', alt: 'Configure provider in CC-Switch', caption: 'Feishu screenshot 03: configure provider information' },
          { src: '/assets/04_CCSwitch_密钥导入到CCS.png', alt: 'Import key into CC-Switch', caption: 'Feishu screenshot 04: import the website-generated key into CC-Switch' },
        ],
        vscode: [
          { src: '/assets/05_VSCode_Codex插件安装.png', alt: 'Install Codex plugin in VS Code', caption: 'Feishu screenshot 05: install the Codex plugin from VS Code Extensions' },
          { src: '/assets/06_VSCode_Codex侧边栏.png', alt: 'VS Code Codex sidebar', caption: 'Feishu screenshot 06: open Codex from the VS Code sidebar' },
        ],
        codexApp: [
          { src: '/assets/07_Codex_App主界面.png', alt: 'ChatGPT Codex App main screen', caption: 'Feishu screenshot 07: ChatGPT Codex App main screen' },
        ],
      },
      support: {
        head: 'Contact Support',
        siteBefore: 'Codex subscription site: ',
        homeBefore: ', or ',
        homeLink: 'return to the AigoKey homepage',
        homeAfter: '.',
        text: 'If you have usage issues, recharge issues, unavailable keys, or imported keys that do not take effect, contact WeChat support.',
        qrAlt: 'WeChat support QR code',
        qrCaption: 'Feishu screenshot 12: WeChat support QR code',
      },
      copy: { action: 'Copy', success: 'Copied', fail: 'Copy manually' },
    },
  },
}

const languageHtmlLang: Record<Language, string> = {
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-Hant',
  en: 'en',
}

const phraseMap: Record<string, string> = {
  简体中文: '簡體中文',
  繁体中文: '繁體中文',
  帮助文档: '幫助文件',
  企业服务: '企業服務',
  免费体验: '免費體驗',
  登录: '登入',
  注册: '註冊',
  客服: '客服',
}

const charMap: Record<string, string> = {
  万: '萬', 与: '與', 专: '專', 业: '業', 丛: '叢', 东: '東', 丝: '絲', 丢: '丟', 两: '兩', 严: '嚴',
  丧: '喪', 个: '個', 临: '臨', 为: '為', 举: '舉', 么: '麼', 义: '義', 乌: '烏', 乐: '樂', 习: '習',
  书: '書', 买: '買', 乱: '亂', 争: '爭', 于: '於', 亏: '虧', 云: '雲', 亚: '亞', 产: '產', 亩: '畝',
  亲: '親', 亵: '褻', 亿: '億', 仅: '僅', 从: '從', 仑: '侖', 仓: '倉', 仪: '儀', 们: '們', 优: '優',
  会: '會', 伞: '傘', 伟: '偉', 传: '傳', 伤: '傷', 伦: '倫', 伪: '偽', 伫: '佇', 体: '體', 余: '餘',
  佣: '傭', 佥: '僉', 侠: '俠', 侣: '侶', 侥: '僥', 侦: '偵', 侧: '側', 侨: '僑', 侩: '儈', 侪: '儕',
  侬: '儂', 俣: '俁', 俦: '儔', 俨: '儼', 俩: '倆', 俪: '儷', 俭: '儉', 债: '債', 倾: '傾', 偿: '償',
  储: '儲', 儿: '兒', 兑: '兌', 党: '黨', 兰: '蘭', 关: '關', 兴: '興', 养: '養', 兽: '獸', 内: '內',
  冈: '岡', 册: '冊', 写: '寫', 军: '軍', 农: '農', 冲: '衝', 决: '決', 况: '況', 冻: '凍', 净: '淨',
  准: '準', 凉: '涼', 减: '減', 凑: '湊', 几: '幾', 凤: '鳳', 凭: '憑', 凯: '凱', 击: '擊', 凿: '鑿',
  划: '劃', 刘: '劉', 则: '則', 刚: '剛', 创: '創', 删: '刪', 别: '別', 刬: '剗', 刭: '剄', 刹: '剎',
  刽: '劊', 刿: '劌', 剀: '剴', 剂: '劑', 剐: '剮', 剑: '劍', 剥: '剝', 剧: '劇', 劝: '勸', 办: '辦',
  务: '務', 动: '動', 励: '勵', 劲: '勁', 劳: '勞', 势: '勢', 勋: '勳', 勐: '猛', 勚: '勩', 匀: '勻',
  匦: '匭', 匮: '匱', 区: '區', 医: '醫', 华: '華', 协: '協', 单: '單', 卖: '賣', 卢: '盧', 卤: '鹵',
  卫: '衛', 却: '卻', 厂: '廠', 厅: '廳', 历: '歷', 厉: '厲', 压: '壓', 厌: '厭', 厕: '廁', 厢: '廂',
  厦: '廈', 厨: '廚', 厩: '廄', 县: '縣', 叁: '參', 参: '參', 双: '雙', 发: '發', 变: '變', 叙: '敘',
  叶: '葉', 号: '號', 叹: '嘆', 叽: '嘰', 后: '後', 吓: '嚇', 吕: '呂', 吗: '嗎', 启: '啟', 吴: '吳',
  员: '員', 呙: '咼', 呛: '嗆', 呜: '嗚', 咏: '詠', 咙: '嚨', 咛: '嚀', 咝: '噝', 咤: '吒', 咨: '諮',
  咸: '鹹', 响: '響', 哑: '啞', 哒: '噠', 哓: '嘵', 哔: '嗶', 哕: '噦', 哗: '嘩', 哙: '噲', 哜: '嚌',
  哝: '噥', 哟: '喲', 唤: '喚', 啧: '嘖', 啬: '嗇', 啭: '囀', 啮: '嚙', 啰: '囉', 啴: '嘽', 喷: '噴',
  喽: '嘍', 嗫: '囁', 嗳: '噯', 嘘: '噓', 嘤: '嚶', 嘱: '囑', 噜: '嚕', 团: '團', 园: '園', 围: '圍',
  国: '國', 图: '圖', 圆: '圓', 圣: '聖', 圹: '壙', 场: '場', 坏: '壞', 块: '塊', 坚: '堅', 坛: '壇',
  坜: '壢', 坝: '壩', 坞: '塢', 坟: '墳', 坠: '墜', 垄: '壟', 垆: '壚', 垒: '壘', 垦: '墾', 垩: '堊',
  垫: '墊', 垭: '埡', 垱: '壋', 垲: '塏', 垴: '堖', 埘: '塒', 埙: '塤', 埚: '堝', 堑: '塹', 堕: '墮',
  墙: '牆', 壮: '壯', 声: '聲', 壳: '殼', 壶: '壺', 处: '處', 备: '備', 复: '復', 够: '夠', 头: '頭',
  夹: '夾', 夺: '奪', 奁: '奩', 奂: '奐', 奋: '奮', 奖: '獎', 奥: '奧', 妆: '妝', 妇: '婦', 妈: '媽',
  妩: '嫵', 妪: '嫗', 妫: '媯', 姗: '姍', 姹: '奼', 娄: '婁', 娅: '婭', 娆: '嬈', 娇: '嬌', 娈: '孌',
  娱: '娛', 婴: '嬰', 婵: '嬋', 婶: '嬸', 孙: '孫', 学: '學', 孪: '孿', 宝: '寶', 实: '實', 宠: '寵',
  审: '審', 宪: '憲', 宫: '宮', 宽: '寬', 宾: '賓', 寝: '寢', 对: '對', 寻: '尋', 导: '導', 寿: '壽',
  将: '將', 尔: '爾', 尘: '塵', 尝: '嘗', 尧: '堯', 尴: '尷', 尽: '盡', 层: '層', 屉: '屜', 属: '屬',
  屡: '屢', 屦: '屨', 屿: '嶼', 岁: '歲', 岂: '豈', 岖: '嶇', 岗: '崗', 岘: '峴', 岚: '嵐', 岛: '島',
  岭: '嶺', 岳: '嶽', 峡: '峽', 峣: '嶢', 峤: '嶠', 峥: '崢', 峦: '巒', 崂: '嶗', 崃: '崍', 崭: '嶄',
  嵘: '嶸', 嵚: '嶔', 嵛: '崳', 嵝: '嶁', 巅: '巔', 巩: '鞏', 币: '幣', 帅: '帥', 师: '師', 帐: '帳',
  帘: '簾', 帜: '幟', 带: '帶', 帧: '幀', 帮: '幫', 帱: '幬', 帻: '幘', 帼: '幗', 幂: '冪', 并: '並',
  干: '乾', 广: '廣', 庄: '莊', 庆: '慶', 庐: '廬', 庑: '廡', 库: '庫', 应: '應', 庙: '廟', 庞: '龐',
  废: '廢', 廪: '廩', 开: '開', 异: '異', 弃: '棄', 张: '張', 弥: '彌', 弯: '彎', 弹: '彈', 强: '強',
  归: '歸', 当: '當', 录: '錄', 彦: '彥', 彻: '徹', 径: '徑', 徕: '徠', 忆: '憶', 忏: '懺', 忧: '憂',
  忾: '愾', 怀: '懷', 态: '態', 怂: '慫', 怃: '憮', 怄: '慪', 怅: '悵', 怆: '愴', 怜: '憐', 总: '總',
  怼: '懟', 怿: '懌', 恋: '戀', 恳: '懇', 恶: '惡', 恸: '慟', 恹: '懨', 恺: '愷', 恻: '惻', 恼: '惱',
  恽: '惲', 悦: '悅', 悫: '愨', 悬: '懸', 悭: '慳', 悯: '憫', 惊: '驚', 惧: '懼', 惨: '慘', 惩: '懲',
  惫: '憊', 惬: '愜', 惭: '慚', 惮: '憚', 惯: '慣', 愤: '憤', 愦: '憒', 愿: '願', 慑: '懾', 慭: '憖',
  懒: '懶', 戏: '戲', 戗: '戧', 战: '戰', 戬: '戩', 户: '戶', 扑: '撲', 执: '執', 扩: '擴', 扪: '捫',
  扫: '掃', 扬: '揚', 扰: '擾', 抚: '撫', 抛: '拋', 抟: '摶', 抠: '摳', 抡: '掄', 抢: '搶', 护: '護',
  报: '報', 担: '擔', 拟: '擬', 拢: '攏', 拣: '揀', 拥: '擁', 拦: '攔', 拧: '擰', 拨: '撥', 择: '擇',
  挂: '掛', 挚: '摯', 挛: '攣', 挜: '掗', 挝: '撾', 挞: '撻', 挟: '挾', 挠: '撓', 挡: '擋', 挢: '撟',
  挣: '掙', 挤: '擠', 挥: '揮', 挦: '撏', 挽: '輓', 捝: '挩', 捞: '撈', 损: '損', 捡: '撿', 换: '換',
  捣: '搗', 据: '據', 掳: '擄', 掴: '摑', 掷: '擲', 掸: '撣', 掺: '摻', 掼: '摜', 揽: '攬', 揿: '撳',
  搀: '攙', 搁: '擱', 搂: '摟', 搅: '攪', 携: '攜', 摄: '攝', 摅: '攄', 摆: '擺', 摇: '搖', 摈: '擯',
  摊: '攤', 撄: '攖', 撑: '撐', 撵: '攆', 撷: '擷',撸: '擼', 撺: '攛', 擞: '擻', 攒: '攢',
  效: '效', 敌: '敵', 敛: '斂', 数: '數', 斋: '齋', 斓: '斕', 斗: '鬥', 斩: '斬', 断: '斷', 无: '無',
  旧: '舊', 时: '時', 旷: '曠', 昙: '曇', 昼: '晝', 显: '顯', 晋: '晉', 晒: '曬', 晓: '曉', 晔: '曄',
  晕: '暈', 暂: '暫', 暧: '曖', 术: '術', 机: '機', 杀: '殺', 杂: '雜', 权: '權', 条: '條', 来: '來',
  杨: '楊', 杩: '榪', 杰: '傑', 极: '極', 构: '構', 枪: '槍', 枫: '楓', 枭: '梟', 柜: '櫃', 标: '標',
  栈: '棧', 栉: '櫛', 栊: '櫳', 栋: '棟', 栌: '櫨', 栎: '櫟', 栏: '欄', 树: '樹', 栖: '棲', 样: '樣',
  栾: '欒', 桠: '椏', 桡: '橈', 桢: '楨', 档: '檔', 桤: '榿', 桥: '橋', 桦: '樺', 桧: '檜', 桨: '槳',
  桩: '樁', 梦: '夢', 梼: '檮', 梾: '棶', 检: '檢', 棂: '欞', 椁: '槨', 椟: '櫝', 椠: '槧', 椭: '橢',
  楼: '樓', 榄: '欖', 榇: '櫬', 榈: '櫚', 榉: '櫸', 槚: '檟', 槛: '檻', 槟: '檳', 槠: '櫧', 横: '橫',
  樯: '檣', 樱: '櫻', 橥: '櫫', 橱: '櫥', 橹: '櫓', 橼: '櫞', 檩: '檁', 欢: '歡', 欤: '歟', 欧: '歐',
  歼: '殲', 殁: '歿', 殇: '殤', 残: '殘', 殒: '殞', 殓: '殮', 殚: '殫', 殡: '殯', 殴: '毆', 毁: '毀',
  毕: '畢', 毙: '斃', 毡: '氈', 气: '氣', 氢: '氫', 氩: '氬', 氲: '氳', 汇: '匯', 汉: '漢', 汤: '湯',
  汹: '洶', 沟: '溝', 没: '沒', 沣: '灃', 沤: '漚', 沥: '瀝', 沦: '淪', 沧: '滄', 沨: '渢', 沩: '溈',
  沪: '滬', 泞: '濘', 泪: '淚', 泶: '澩', 泷: '瀧', 泸: '瀘', 泺: '濼', 泻: '瀉', 泼: '潑', 泽: '澤',
  泾: '涇', 洁: '潔', 洒: '灑', 洼: '窪', 浃: '浹', 浅: '淺', 浆: '漿', 浇: '澆', 浈: '湞', 浊: '濁',
  测: '測', 浍: '澮', 济: '濟', 浏: '瀏', 浐: '滻', 浑: '渾', 浒: '滸', 浓: '濃', 浔: '潯', 涛: '濤',
  涝: '澇', 涞: '淶', 涟: '漣', 涠: '潿', 涡: '渦', 涢: '溳', 涣: '渙', 涤: '滌', 润: '潤', 涧: '澗',
  涨: '漲', 涩: '澀', 淀: '澱', 渊: '淵', 渌: '淥', 渍: '漬', 渎: '瀆', 渐: '漸', 渑: '澠', 渔: '漁',
  渖: '瀋', 渗: '滲', 温: '溫', 湾: '灣', 湿: '濕', 溃: '潰', 溅: '濺', 溆: '漵', 滗: '潷', 滚: '滾',
  滞: '滯', 滟: '灩', 滠: '灄', 满: '滿', 滢: '瀅', 滤: '濾', 滥: '濫', 滦: '灤', 滨: '濱', 滩: '灘',
  滪: '澦', 漤: '灠', 潆: '瀠', 潇: '瀟', 潋: '瀲', 潍: '濰', 潜: '潛', 潴: '瀦', 澜: '瀾', 濑: '瀨',
  濒: '瀕', 灏: '灝', 灭: '滅', 灯: '燈', 灵: '靈', 灾: '災', 灿: '燦', 炀: '煬', 炉: '爐', 炖: '燉',
  炜: '煒', 炝: '熗', 点: '點', 炼: '煉', 炽: '熾', 烁: '爍', 烂: '爛', 烃: '烴', 烛: '燭', 烟: '煙',
  烦: '煩', 烧: '燒', 烨: '燁', 烩: '燴', 烫: '燙', 烬: '燼', 热: '熱', 焕: '煥', 焖: '燜', 焘: '燾',
  煴: '熅', 爱: '愛', 爷: '爺', 牍: '牘', 牵: '牽', 牺: '犧', 犊: '犢', 状: '狀', 犷: '獷', 犸: '獁',
  犹: '猶', 狈: '狽', 狝: '獮', 狞: '獰', 独: '獨', 狭: '狹', 狮: '獅', 狯: '獪', 狰: '猙', 狱: '獄',
  狲: '猻', 猃: '獫', 猎: '獵', 猕: '獼', 猡: '玀', 猪: '豬', 猫: '貓', 献: '獻', 獭: '獺', 玑: '璣',
  玚: '瑒', 玛: '瑪', 玮: '瑋', 环: '環', 现: '現', 玱: '瑲', 玺: '璽', 珐: '琺', 珑: '瓏', 珰: '璫',
  珲: '琿', 琏: '璉', 琐: '瑣', 琼: '瓊', 瑶: '瑤', 瑷: '璦', 璎: '瓔', 瓒: '瓚', 瓯: '甌', 电: '電',
  画: '畫', 畅: '暢', 畴: '疇', 疖: '癤', 疗: '療', 疟: '瘧', 疠: '癘', 疡: '瘍', 疬: '癧', 疮: '瘡',
  疯: '瘋', 疱: '皰', 痈: '癰', 痉: '痙', 痒: '癢', 痖: '瘂', 痨: '癆', 痪: '瘓', 痫: '癇', 痴: '癡',
  瘅: '癉', 瘗: '瘞', 瘘: '瘻', 瘪: '癟', 瘫: '癱', 瘾: '癮', 瘿: '癭', 癞: '癩', 癣: '癬', 皑: '皚',
  皱: '皺', 盏: '盞', 盐: '鹽', 监: '監', 盖: '蓋', 盗: '盜', 盘: '盤', 眍: '瞘', 眦: '眥', 眬: '矓',
  着: '著', 睁: '睜', 睐: '睞', 瞒: '瞞', 瞩: '矚', 矫: '矯', 矶: '磯', 矾: '礬', 矿: '礦', 砀: '碭',
  码: '碼', 砖: '磚', 砗: '硨', 砚: '硯', 砜: '碸', 砺: '礪', 砻: '礱', 砾: '礫', 础: '礎', 硁: '硜',
  硕: '碩', 硖: '硤', 硗: '磽', 硙: '磑', 硚: '礄', 确: '確', 碍: '礙', 碛: '磧', 碜: '磣', 礼: '禮',
  祃: '禡', 祎: '禕', 祢: '禰', 祯: '禎', 祷: '禱', 祸: '禍', 禀: '稟', 禄: '祿', 禅: '禪', 离: '離',
  秃: '禿', 秆: '稈', 种: '種', 积: '積', 称: '稱', 秽: '穢', 税: '稅', 稣: '穌', 稳: '穩', 穑: '穡',
  穷: '窮', 窃: '竊', 窍: '竅', 窑: '窯', 窜: '竄', 窝: '窩', 窥: '窺', 窦: '竇', 竖: '豎', 竞: '競',
  笃: '篤', 笋: '筍', 笔: '筆', 笕: '筧', 笺: '箋', 笼: '籠', 笾: '籩', 筚: '篳', 筛: '篩', 筝: '箏',
  筹: '籌', 签: '簽', 简: '簡', 箓: '籙', 箦: '簀', 箧: '篋', 箨: '籜', 箩: '籮', 箪: '簞', 箫: '簫',
  篑: '簣', 篓: '簍', 篮: '籃', 篱: '籬', 簖: '籪', 籁: '籟', 籴: '糴', 类: '類', 籼: '秈', 粜: '糶',
  粝: '糲', 粤: '粵', 粪: '糞', 粮: '糧', 糁: '糝', 糇: '餱', 紧: '緊', 累: '纍', 絷: '縶', 纟: '糹',
  纠: '糾', 纡: '紆', 红: '紅', 纣: '紂', 纤: '纖', 纥: '紇', 约: '約', 级: '級', 纨: '紈', 纩: '纊',
  纪: '紀', 纫: '紉', 纬: '緯', 纭: '紜', 纯: '純', 纰: '紕', 纱: '紗', 纲: '綱', 纳: '納', 纵: '縱',
  纶: '綸', 纷: '紛', 纸: '紙', 纹: '紋', 纺: '紡', 纽: '紐', 线: '線', 练: '練', 组: '組', 绅: '紳',
  细: '細', 织: '織', 终: '終', 绊: '絆', 绋: '紼', 绌: '絀',绍: '紹', 绎: '繹', 经: '經', 绐: '紿',
  绑: '綁', 绒: '絨', 结: '結', 绔: '絝', 绕: '繞', 绘: '繪', 给: '給', 绚: '絢', 绛: '絳', 络: '絡',
  绝: '絕', 绞: '絞', 统: '統', 绠: '綆', 绡: '綃', 绢: '絹', 绣: '繡', 绥: '綏', 绦: '絛', 继: '繼',
  绨: '綈', 绩: '績', 绪: '緒', 绫: '綾', 续: '續', 绮: '綺', 绯: '緋', 绰: '綽', 绱: '緔', 绲: '緄',
  绳: '繩', 维: '維', 绵: '綿', 绶: '綬', 绷: '繃', 绸: '綢', 绹: '綯', 绺: '綹', 绻: '綣', 综: '綜',
  绽: '綻', 绾: '綰', 绿: '綠', 缀: '綴', 缁: '緇', 缂: '緙', 缃: '緗', 缄: '緘', 缅: '緬', 缆: '纜',
  缇: '緹', 缈: '緲', 缉: '緝', 缊: '縕', 缋: '繢', 缌: '緦', 缍: '綞', 缎: '緞', 缏: '緶', 缑: '緱',
  缒: '縋', 缓: '緩', 缔: '締', 缕: '縷', 编: '編', 缗: '緡', 缘: '緣', 缙: '縉', 缚: '縛', 缛: '縟',
  缜: '縝', 缝: '縫', 缟: '縞', 缠: '纏', 缡: '縭', 缢: '縊', 缣: '縑', 缤: '繽', 缥: '縹', 缦: '縵',
  缧: '縲', 缨: '纓', 缩: '縮', 缪: '繆', 缫: '繅', 缬: '纈', 缭: '繚', 缮: '繕', 缯: '繒', 缰: '韁',
  缱: '繾', 缲: '繰', 缳: '繯', 缴: '繳', 缵: '纘', 罂: '罌', 网: '網', 罗: '羅', 罚: '罰', 罢: '罷',
  罴: '羆', 羁: '羈', 羟: '羥', 羡: '羨', 群: '群', 翘: '翹', 耢: '耮', 耧: '耬', 耸: '聳', 耻: '恥',
  聂: '聶', 聋: '聾', 职: '職', 聍: '聹', 联: '聯', 聩: '聵', 聪: '聰', 肃: '肅', 肠: '腸', 肤: '膚',
  肮: '骯', 肴: '餚', 肾: '腎', 肿: '腫', 胀: '脹', 胁: '脅', 胆: '膽', 胜: '勝', 胧: '朧', 胨: '腖',
  胪: '臚', 胫: '脛', 胶: '膠', 脉: '脈', 脍: '膾', 脏: '臟', 脐: '臍', 脑: '腦', 脓: '膿', 脔: '臠',
  脚: '腳', 脱: '脫', 脶: '腡', 脸: '臉', 腊: '臘', 腘: '膕', 腭: '齶', 腻: '膩', 腼: '靦', 腾: '騰',
  膑: '臏', 臜: '臢', 舆: '輿', 舍: '捨', 舰: '艦', 舱: '艙', 舻: '艫', 艰: '艱', 艳: '艷', 艺: '藝',
  节: '節', 芈: '羋', 芗: '薌', 芜: '蕪', 芦: '蘆', 苁: '蓯', 苇: '葦', 苈: '藶', 苋: '莧', 苌: '萇',
  苍: '蒼', 苎: '苧', 苏: '蘇', 苹: '蘋', 范: '範', 茎: '莖', 茏: '蘢', 茑: '蔦', 茔: '塋', 茕: '煢',
  茧: '繭', 荆: '荊', 荐: '薦', 荙: '薘', 荚: '莢', 荛: '蕘', 荜: '蓽', 荞: '蕎', 荟: '薈', 荠: '薺',
  荡: '蕩', 荣: '榮', 荤: '葷', 荥: '滎', 荦: '犖', 荧: '熒', 荨: '蕁', 荩: '藎', 荪: '蓀', 荫: '蔭',
  荬: '蕒', 荭: '葒', 荮: '葤', 药: '藥', 莅: '蒞', 莱: '萊', 莲: '蓮', 莳: '蒔', 莴: '萵', 获: '獲',
  莹: '瑩', 莺: '鶯', 莼: '蓴', 萚: '蘀', 萝: '蘿', 萤: '螢', 营: '營', 萦: '縈', 萧: '蕭', 萨: '薩',
  葱: '蔥', 蒇: '蕆', 蒉: '蕢', 蒋: '蔣', 蒌: '蔞', 蓝: '藍', 蓟: '薊', 蓠: '蘺', 蓣: '蕷', 蓥: '鎣',
  蓦: '驀', 蔷: '薔', 蔹: '蘞', 蔺: '藺', 蔼: '藹', 蕰: '薀', 蕲: '蘄', 蕴: '蘊', 薮: '藪', 藓: '蘚',
  虏: '虜', 虑: '慮', 虚: '虛', 虫: '蟲', 虬: '虯', 虮: '蟣', 虽: '雖', 虾: '蝦', 虿: '蠆', 蚀: '蝕',
  蚁: '蟻', 蚂: '螞', 蚕: '蠶', 蚬: '蜆', 蛊: '蠱', 蛎: '蠣', 蛏: '蟶', 蛮: '蠻', 蛰: '蟄', 蛱: '蛺',
  蛲: '蟯', 蛳: '螄', 蛴: '蠐', 蜕: '蛻', 蜗: '蝸', 蜡: '蠟', 蝇: '蠅', 蝈: '蟈', 蝉: '蟬', 蝎: '蠍',
  蝼: '螻', 蝾: '蠑', 螀: '螿', 螨: '蟎', 蟏: '蠨', 衅: '釁', 衔: '銜', 补: '補', 表: '表', 衬: '襯',
  袄: '襖', 袅: '裊', 袜: '襪', 袭: '襲', 袯: '襏', 装: '裝', 裆: '襠', 裢: '褳', 裣: '襝', 裤: '褲',
  裥: '襇', 褛: '褸', 褴: '襤', 见: '見', 观: '觀', 规: '規', 觅: '覓', 视: '視', 觇: '覘', 览: '覽',
  觉: '覺', 觊: '覬', 觋: '覡', 觌: '覿', 觎: '覦', 觏: '覯', 觐: '覲', 觑: '覷', 觞: '觴', 触: '觸',
  订: '訂', 讣: '訃', 计: '計', 讯: '訊', 讨: '討', 让: '讓', 讪: '訕', 训: '訓', 议: '議',
  记: '記', 讲: '講', 讳: '諱', 讴: '謳', 讶: '訝', 讷: '訥', 许: '許', 讹: '訛', 论: '論', 讼: '訟',
  讽: '諷', 设: '設', 访: '訪', 诀: '訣', 证: '證', 评: '評', 诅: '詛', 识: '識', 诈: '詐', 诉: '訴',
  诊: '診', 诋: '詆', 词: '詞', 诎: '詘', 诏: '詔', 译: '譯', 诒: '詒', 诓: '誆', 诔: '誄', 试: '試',
  诗: '詩', 诘: '詰', 诚: '誠', 诛: '誅', 话: '話', 诞: '誕', 诟: '詬', 诠: '詮', 诡: '詭', 询: '詢',
  诣: '詣', 该: '該', 详: '詳', 诧: '詫', 诨: '諢', 诩: '詡', 诫: '誡', 诬: '誣', 语: '語', 诮: '誚',
  误: '誤', 诰: '誥', 诱: '誘', 诲: '誨', 诳: '誑', 说: '說', 诵: '誦', 诶: '誒', 请: '請', 诸: '諸',
  诹: '諏', 诺: '諾', 读: '讀', 诼: '諑', 诽: '誹', 课: '課', 诿: '諉', 谀: '諛', 谁: '誰', 谂: '諗',
  调: '調', 谄: '諂', 谅: '諒', 谆: '諄', 谇: '誶', 谈: '談', 谊: '誼', 谋: '謀', 谌: '諶', 谍: '諜',
  谎: '謊', 谏: '諫', 谐: '諧', 谑: '謔', 谒: '謁', 谓: '謂', 谔: '諤', 谕: '諭', 谖: '諼', 谗: '讒',
  谘: '諮', 谙: '諳', 谚: '諺', 谛: '諦', 谜: '謎', 谝: '諞', 谟: '謨', 谠: '讜', 谡: '謖', 谢: '謝',
  谣: '謠', 谤: '謗', 谥: '謚', 谦: '謙', 谧: '謐', 谨: '謹', 谩: '謾', 谪: '謫', 谫: '譾', 谬: '謬',
  谭: '譚', 谮: '譖', 谯: '譙', 谰: '讕', 谱: '譜', 谲: '譎', 谳: '讞', 谴: '譴', 谵: '譫', 谶: '讖',
  谷: '穀', 豆: '豆', 豮: '豶', 贝: '貝', 贞: '貞', 负: '負', 贡: '貢', 财: '財', 责: '責', 贤: '賢',
  败: '敗', 账: '賬', 货: '貨', 质: '質', 贩: '販', 贪: '貪', 贫: '貧', 贬: '貶', 购: '購', 贮: '貯',
  贯: '貫', 贰: '貳', 贱: '賤', 贲: '賁', 贳: '貰', 贴: '貼', 贵: '貴', 贶: '貺', 贷: '貸', 贸: '貿',
  费: '費', 贺: '賀', 贻: '貽', 贼: '賊', 贽: '贄', 贾: '賈', 贿: '賄', 赀: '貲', 赁: '賃', 赂: '賂',
  赃: '贓', 资: '資', 赅: '賅', 赆: '贐', 赇: '賕', 赈: '賑', 赉: '賚', 赊: '賒', 赋: '賦', 赌: '賭',
  赍: '齎', 赎: '贖', 赏: '賞', 赐: '賜', 赑: '贔', 赒: '賙', 赓: '賡', 赔: '賠', 赕: '賧', 赖: '賴',
  赗: '賵', 赘: '贅', 赙: '賻', 赚: '賺', 赛: '賽', 赜: '賾', 赝: '贗', 赞: '讚', 赠: '贈', 赡: '贍',
  赢: '贏', 赣: '贛', 赵: '趙', 赶: '趕', 趋: '趨', 趱: '趲', 跃: '躍', 跄: '蹌', 跖: '蹠', 跞: '躒',
  践: '踐', 跶: '躂', 跷: '蹺', 跸: '蹕', 跹: '躚', 跻: '躋', 踊: '踴', 踌: '躊', 踪: '蹤', 踬: '躓',
  踯: '躑', 蹑: '躡', 蹒: '蹣', 蹰: '躕', 蹿: '躥', 躏: '躪', 躜: '躦', 躯: '軀', 车: '車', 轧: '軋',
  轨: '軌', 轩: '軒', 轫: '軔', 转: '轉', 轭: '軛', 轮: '輪', 软: '軟', 轰: '轟', 轱: '軲', 轲: '軻',
  轳: '轤', 轴: '軸', 轵: '軹', 轶: '軼', 轷: '軤', 轸: '軫', 轹: '轢', 轺: '軺', 轻: '輕', 轼: '軾',
  载: '載', 轾: '輊', 轿: '轎', 辁: '輇', 辂: '輅', 较: '較', 辄: '輒', 辅: '輔', 辆: '輛', 辇: '輦',
  辈: '輩', 辉: '輝', 辊: '輥', 辋: '輞', 辌: '輬', 辍: '輟', 辎: '輜', 辏: '輳', 辐: '輻', 辑: '輯',
  输: '輸', 辔: '轡', 辕: '轅', 辖: '轄', 辗: '輾', 辘: '轆', 辞: '辭', 辟: '闢', 辩: '辯',
  辫: '辮', 边: '邊', 辽: '遼', 达: '達', 迁: '遷', 过: '過', 迈: '邁', 运: '運', 还: '還', 这: '這',
  进: '進', 远: '遠', 违: '違', 连: '連', 迟: '遲', 迩: '邇', 迳: '逕', 迹: '跡', 适: '適', 选: '選',
  逊: '遜', 递: '遞', 逦: '邐', 逻: '邏', 遗: '遺', 遥: '遙', 邓: '鄧', 邝: '鄺', 邬: '鄔', 邮: '郵',
  邹: '鄒', 邺: '鄴', 邻: '鄰', 郁: '鬱', 郏: '郟', 郐: '鄶', 郑: '鄭', 郓: '鄆', 郦: '酈', 郧: '鄖',
  郸: '鄲', 酝: '醞', 酦: '醱', 酱: '醬', 酽: '釅', 酾: '釃', 酿: '釀', 释: '釋', 里: '裡', 鉴: '鑑',
  针: '針', 钉: '釘', 钊: '釗', 钋: '釙', 钌: '釕', 钍: '釷', 钎: '釺', 钏: '釧', 钐: '釤', 钑: '鈒',
  钒: '釩', 钓: '釣', 钔: '鍆', 钕: '釹', 钖: '鍚', 钗: '釵', 钘: '鈃', 钙: '鈣', 钚: '鈈', 钛: '鈦',
  钜: '鉅', 钝: '鈍', 钞: '鈔', 钟: '鐘', 钠: '鈉', 钡: '鋇', 钢: '鋼', 钣: '鈑', 钤: '鈐', 钥: '鑰',
  钦: '欽', 钧: '鈞', 钨: '鎢', 钩: '鉤', 钪: '鈧', 钫: '鈁', 钬: '鈥', 钭: '鈄', 钮: '鈕', 钯: '鈀',
  钰: '鈺', 钱: '錢', 钲: '鉦', 钳: '鉗', 钴: '鈷', 钵: '缽', 钶: '鈳', 钷: '鉕', 钸: '鈽', 钹: '鈸',
  钺: '鉞', 钻: '鑽', 钼: '鉬', 钽: '鉭', 钾: '鉀', 钿: '鈿', 铀: '鈾', 铁: '鐵', 铂: '鉑', 铃: '鈴',
  铄: '鑠', 铅: '鉛', 铆: '鉚', 铈: '鈰', 铉: '鉉', 铊: '鉈', 铋: '鉍', 铌: '鈮', 铍: '鈹', 铎: '鐸',
  铐: '銬', 铑: '銠', 铒: '鉺', 铕: '銪', 铖: '鋮', 铗: '鋏', 铘: '鋣', 铙: '鐃', 铚: '銍', 铛: '鐺',
  铜: '銅', 铝: '鋁', 铞: '銱', 铟: '銦', 铠: '鎧', 铡: '鍘', 铢: '銖', 铣: '銑', 铤: '鋌', 铥: '銩',
  铧: '鏵', 铨: '銓', 铩: '鎩', 铪: '鉿', 铫: '銚', 铬: '鉻', 铭: '銘', 铮: '錚', 铯: '銫', 铰: '鉸',
  铱: '銥', 铲: '鏟', 铳: '銃', 铴: '鐋', 铵: '銨', 银: '銀', 铷: '銣', 铸: '鑄', 铹: '鐒', 铺: '鋪',
  铻: '鋙', 铼: '錸', 铽: '鋱', 链: '鏈', 铿: '鏗', 销: '銷', 锁: '鎖', 锂: '鋰', 锃: '鋥', 锄: '鋤',
  锅: '鍋', 锆: '鋯', 锇: '鋨', 锈: '鏽', 锉: '銼', 锊: '鋝', 锋: '鋒', 锌: '鋅', 锍: '鋶', 锎: '鐦',
  锏: '鐧', 锐: '銳', 锑: '銻', 锒: '鋃', 锓: '鋟', 锔: '鋦', 锕: '錒', 锖: '錆', 锗: '鍺', 锘: '鍩',
  错: '錯', 锚: '錨', 锛: '錛', 锜: '錡', 锝: '鍀', 锞: '錁', 锟: '錕', 锠: '錩', 锡: '錫', 锢: '錮',
  锣: '鑼', 锤: '錘', 锥: '錐', 锦: '錦', 锨: '鍁', 锩: '錈', 锪: '鍃', 锫: '錇', 锬: '錟', 锭: '錠',
  键: '鍵', 锯: '鋸', 锰: '錳', 锱: '錙', 锲: '鍥', 锴: '鍇', 锵: '鏘', 锶: '鍶', 锷: '鍔', 锸: '鍤',
  锹: '鍬', 锺: '鍾', 锻: '鍛', 锼: '鎪', 锽: '鍠', 锾: '鍰', 锿: '鎄', 镀: '鍍', 镁: '鎂', 镂: '鏤',
  镃: '鎡', 镄: '鐨', 镅: '鎇', 镆: '鏌', 镇: '鎮', 镈: '鎛', 镉: '鎘', 镊: '鑷', 镋: '钂', 镌: '鐫',
  镍: '鎳', 镎: '鎿', 镏: '鎦', 镐: '鎬', 镑: '鎊', 镒: '鎰', 镓: '鎵', 镔: '鑌', 镕: '鎔', 镖: '鏢',
  镗: '鏜', 镘: '鏝', 镙: '鏍', 镚: '鏰', 镛: '鏞', 镜: '鏡', 镝: '鏑', 镞: '鏃', 镟: '鏇', 镠: '鏐',
  镡: '鐔', 镢: '鐝', 镣: '鐐', 镤: '鏷', 镥: '鑥', 镦: '鐓', 镧: '鑭', 镨: '鐠', 镩: '鑹', 镪: '鏹',
  镫: '鐙', 镬: '鑊', 镭: '鐳', 镮: '鐶', 镯: '鐲', 镰: '鐮', 镱: '鐿', 镲: '鑔', 镳: '鑣', 镴: '鑞',
  镶: '鑲', 长: '長', 门: '門', 闩: '閂', 闪: '閃', 闫: '閆', 闬: '閈', 闭: '閉', 问: '問', 闯: '闖',
  闰: '閏', 闱: '闈', 闲: '閒', 闳: '閎', 间: '間', 闵: '閔', 闶: '閌', 闷: '悶', 闸: '閘', 闹: '鬧',
  闺: '閨', 闻: '聞', 闼: '闥', 闽: '閩', 闾: '閭', 闿: '闓', 阀: '閥', 阁: '閣', 阂: '閡', 阃: '閫',
  阄: '鬮', 阅: '閱', 阆: '閬', 阇: '闍', 阈: '閾', 阉: '閹', 阊: '閶', 阋: '鬩', 阌: '閿', 阍: '閽',
  阎: '閻', 阏: '閼', 阐: '闡', 阑: '闌', 阒: '闃', 阔: '闊', 阕: '闋', 阖: '闔', 阗: '闐', 阙: '闕',
  阚: '闞', 队: '隊', 阳: '陽', 阴: '陰', 阵: '陣', 阶: '階', 际: '際', 陆: '陸', 陇: '隴', 陈: '陳',
  陉: '陘', 陕: '陝', 陧: '隉', 陨: '隕', 险: '險', 随: '隨', 隐: '隱', 隶: '隸', 难: '難', 雏: '雛',
  雠: '讎', 雳: '靂', 雾: '霧', 霁: '霽', 霉: '黴', 靓: '靚', 静: '靜', 靥: '靨', 鞑: '韃', 鞒: '鞽',
  鞯: '韉', 韦: '韋', 韧: '韌', 韩: '韓', 韪: '韙', 韫: '韞', 韬: '韜', 韵: '韻', 页: '頁', 顶: '頂',
  顷: '頃', 项: '項', 顺: '順', 须: '須', 顽: '頑', 顾: '顧', 顿: '頓', 颀: '頎', 颁: '頒', 颂: '頌',
  预: '預', 颅: '顱', 领: '領', 颇: '頗', 颈: '頸', 颉: '頡', 颊: '頰', 颌: '頜', 颍: '潁', 颏: '頦',
  颐: '頤', 频: '頻', 颓: '頹', 颔: '頷', 颖: '穎', 颗: '顆', 题: '題', 颚: '顎', 颛: '顓', 颜: '顏',
  额: '額', 颞: '顳', 颟: '顢', 颠: '顛', 颡: '顙', 颢: '顥', 颤: '顫', 颥: '顬', 颦: '顰', 颧: '顴',
  风: '風', 飏: '颺', 飐: '颭', 飑: '颮', 飒: '颯', 飓: '颶', 飕: '颼', 飘: '飄', 飙: '飆', 飚: '飆',
  飞: '飛', 饥: '飢', 饧: '餳', 饨: '飩', 饩: '餼', 饪: '飪', 饫: '飫', 饬: '飭', 饭: '飯', 饮: '飲',
  饯: '餞', 饰: '飾', 饱: '飽', 饲: '飼', 饳: '飿', 饴: '飴', 饵: '餌', 饶: '饒', 饷: '餉', 饺: '餃',
  饼: '餅', 饽: '餑', 饿: '餓', 馀: '餘', 馁: '餒', 馄: '餛', 馅: '餡', 馆: '館', 馈: '饋', 馊: '餿',
  馋: '饞', 馍: '饃', 馏: '餾', 馐: '饈', 馑: '饉', 馒: '饅', 马: '馬', 驭: '馭', 驮: '馱', 驯: '馴',
  驰: '馳', 驱: '驅', 驳: '駁', 驴: '驢', 驵: '駔', 驶: '駛', 驷: '駟', 驸: '駙', 驹: '駒', 驺: '騶',
  驻: '駐', 驼: '駝', 驽: '駑', 驾: '駕', 驿: '驛', 骀: '駘', 骁: '驍', 骂: '罵', 骄: '驕', 骅: '驊',
  骆: '駱', 骇: '駭', 骈: '駢', 骊: '驪', 骋: '騁', 验: '驗', 骏: '駿', 骐: '騏', 骑: '騎', 骒: '騍',
  骓: '騅', 骖: '驂', 骗: '騙', 骘: '騭', 骚: '騷', 骛: '騖', 骜: '驁', 骝: '騮', 骞: '騫', 骟: '騸',
  骠: '驃', 骡: '騾', 骢: '驄', 骣: '驏', 骤: '驟', 骥: '驥', 骧: '驤', 骨: '骨', 髅: '髏', 髋: '髖',
  髌: '髕', 鬓: '鬢', 魇: '魘', 魉: '魎', 鱼: '魚', 鱽: '魛', 鱾: '魢', 鱿: '魷', 鲁: '魯', 鲂: '魴',
  鲅: '鮁', 鲆: '鮃', 鲇: '鯰', 鲈: '鱸', 鲋: '鮒', 鲍: '鮑', 鲎: '鱟', 鲐: '鮐', 鲑: '鮭', 鲒: '鮚',
  鲔: '鮪', 鲕: '鮞', 鲚: '鱭', 鲛: '鮫', 鲜: '鮮', 鲞: '鯗', 鲟: '鱘', 鲠: '鯁', 鲡: '鱺', 鲢: '鰱',
  鲣: '鰹', 鲤: '鯉', 鲥: '鰣', 鲦: '鰷', 鲧: '鯀', 鲨: '鯊', 鲩: '鯇', 鲫: '鯽', 鲭: '鯖', 鲮: '鯪',
  鲰: '鯫', 鲱: '鯡', 鲲: '鯤', 鲳: '鯧', 鲴: '鯝', 鲵: '鯢', 鲶: '鯰', 鲷: '鯛', 鲸: '鯨', 鲺: '鯴',
  鲻: '鯔', 鲼: '鱝', 鲽: '鰈', 鳃: '鰓', 鳄: '鱷', 鳅: '鰍', 鳆: '鰒', 鳇: '鰉', 鳊: '鯿', 鳋: '鰠',
  鳌: '鰲', 鳍: '鰭', 鳎: '鰨', 鳏: '鰥', 鳐: '鰩', 鳓: '鰳', 鳔: '鰾', 鳕: '鱈', 鳖: '鱉', 鳗: '鰻',
  鳘: '鰵', 鳙: '鱅', 鳜: '鱖', 鳝: '鱔', 鳞: '鱗', 鸟: '鳥', 鸠: '鳩', 鸡: '雞', 鸢: '鳶', 鸣: '鳴',
  鸥: '鷗', 鸦: '鴉', 鸨: '鴇', 鸩: '鴆', 鸪: '鴣', 鸫: '鶇', 鸬: '鸕', 鸭: '鴨', 鸯: '鴦', 鸱: '鴟',
  鸲: '鴝', 鸳: '鴛', 鸵: '鴕', 鸶: '鷥', 鸷: '鷙', 鸸: '鴯', 鸹: '鴰', 鸺: '鵂', 鸽: '鴿', 鸾: '鸞',
  鸿: '鴻', 鹁: '鵓', 鹂: '鸝', 鹃: '鵑', 鹄: '鵠', 鹅: '鵝', 鹆: '鵒', 鹇: '鷳', 鹈: '鵜', 鹉: '鵡',
  鹊: '鵲', 鹋: '鶓', 鹌: '鵪', 鹍: '鵾', 鹎: '鵯', 鹏: '鵬', 鹑: '鶉', 鹒: '鶊', 鹕: '鶘', 鹗: '鶚',
  鹘: '鶻', 鹚: '鶿', 鹛: '鶥', 鹜: '鶩', 鹞: '鷂', 鹣: '鶼', 鹤: '鶴', 鹦: '鸚', 鹧: '鷓', 鹨: '鷚',
  鹩: '鷯', 鹪: '鷦', 鹫: '鷲', 鹬: '鷸', 鹭: '鷺', 鹰: '鷹', 鹱: '鸌', 鹳: '鸛', 鹾: '鹺', 麦: '麥',
  黄: '黃', 黉: '黌', 黡: '黶', 黩: '黷', 黪: '黲', 黾: '黽', 鼋: '黿', 鼍: '鼉', 鼹: '鼴', 齐: '齊',
  齑: '齏', 齿: '齒', 龀: '齔', 龃: '齟', 龄: '齡', 龅: '齙', 龆: '齠', 龇: '齜', 龈: '齦', 龉: '齬',
  龊: '齪', 龋: '齲', 龌: '齷', 龙: '龍', 龚: '龔', 龛: '龕',
}

function toTraditionalText(text: string) {
  let output = text
  for (const [from, to] of Object.entries(phraseMap)) {
    output = output.split(from).join(to)
  }
  return Array.from(output).map((char) => charMap[char] || char).join('')
}

function toTraditional<T>(value: T): T {
  if (typeof value === 'string') {
    return toTraditionalText(value) as T
  }
  if (Array.isArray(value)) {
    return value.map((item) => toTraditional(item)) as T
  }
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {}
    for (const [key, nested] of Object.entries(value)) {
      result[key] = toTraditional(nested)
    }
    if ('lang' in result) {
      result.lang = 'zh-Hant'
    }
    return result as T
  }
  return value
}

function normalizeLanguage(value: string | null): Language {
  if (value === 'zh-TW' || value === 'zh-Hant') return 'zh-TW'
  if (value === 'en') return 'en'
  return 'zh-CN'
}

function setHtmlLang(language: Language) {
  document.documentElement.lang = languageHtmlLang[language]
}

export function useI18n() {
  const lang = computed(() => currentLang.value)
  const t = computed(() => {
    if (currentLang.value === 'en') return copy.en
    if (currentLang.value === 'zh-TW') return toTraditional(copy.zh)
    return copy.zh
  })

  const currentLanguageLabel = computed(() => {
    return languageOptions.find((item) => item.code === currentLang.value)?.label || '简体中文'
  })

  function toggleLang() {
    currentLang.value = currentLang.value === 'zh-CN' ? 'en' : 'zh-CN'
    try {
      localStorage.setItem('aigokeyLanguage', currentLang.value)
    } catch { /* ignore */ }
    setHtmlLang(currentLang.value)
  }

  function setLanguage(language: Language) {
    currentLang.value = language
    try {
      localStorage.setItem('aigokeyLanguage', language)
    } catch { /* ignore */ }
    setHtmlLang(language)
  }

  // Initialize from saved preference
  try {
    currentLang.value = normalizeLanguage(localStorage.getItem('aigokeyLanguage'))
    setHtmlLang(currentLang.value)
  } catch { /* ignore */ }

  return { lang, t, toggleLang, setLanguage, currentLanguageLabel, languageOptions }
}
