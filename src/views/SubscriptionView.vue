<template>
  <div class="subscription-page">
    <main>
      <!-- Hero -->
      <section class="hero-section">
        <div class="hero-inner">
          <div>
            <div class="eyebrow-pill">AigoKey 订阅说明</div>
            <h1>五档套餐，按你的 <span class="text-[#2468f2]">AI 使用周期</span> 选择</h1>
            <p class="hero-copy">
              AigoKey 提供日卡、周卡、轻量版、标准版、专业版五档套餐，覆盖 Codex Agent、GPT 系列模型和 Image 系列模型。日卡适合当天急用，周卡适合一周冲刺，月卡适合长期稳定工作流。
            </p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="#plans">查看五档套餐</a>
              <a class="btn btn-ghost" href="#renew">联系客服续费</a>
            </div>
          </div>
          <aside class="summary-panel">
            <h2>订阅前先看清楚</h2>
            <ul class="summary-list">
              <li>日卡 ¥5/天，周卡 ¥48/周，月卡适合长期稳定使用。</li>
              <li>每日额度和周期总额度同时展示，便于控制使用节奏。</li>
              <li>支持按实际订阅金额开具发票，联系客服确认开票信息。</li>
              <li>需要开通、续费、升级、降级或确认额度时，直接联系微信客服。</li>
            </ul>
          </aside>
        </div>
      </section>

      <!-- Plans -->
      <section class="plans-band" id="plans">
        <div class="section-inner">
          <div class="section-head">
            <h2>订阅档次与额度</h2>
            <p class="section-desc">五档套餐都可以稳定使用 Codex Agent、GPT 系列模型和 Image 系列模型，区别在于使用周期、每日额度和周期总额度。</p>
          </div>
          <div class="plan-grid">
            <article v-for="(plan, i) in plans" :key="i" class="plan-card" :class="{ 'is-featured': plan.featured }">
              <div v-if="plan.badge" class="badge">{{ plan.badge }}</div>
              <div class="plan-name">{{ plan.name }}</div>
              <div class="price">{{ plan.price }} <span>{{ plan.unit }}</span></div>
              <p class="plan-sub">{{ plan.sub }}</p>
              <div class="quota-grid">
                <div v-for="(q, j) in plan.quotas" :key="j" class="quota">
                  <span>{{ q.label }}</span>
                  <strong>{{ q.value }}</strong>
                </div>
              </div>
              <ul class="check-list">
                <li v-for="(c, k) in plan.checks" :key="k">{{ c }}</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <!-- Value -->
      <section class="value-band">
        <div class="section-inner">
          <div class="section-head">
            <h2>每档套餐的使用价值</h2>
            <p class="section-desc">你可以按照真实工作周期和强度选择档位，不需要先研究复杂参数，也不用按次计算消耗。</p>
          </div>
          <div class="value-grid">
            <article v-for="(card, i) in valueCards" :key="i" class="card">
              <div class="card-num">0{{ i + 1 }}</div>
              <h3>{{ card.title }}</h3>
              <p>{{ card.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Renew -->
      <section class="renew-band" id="renew">
        <div class="section-inner">
          <div class="section-head">
            <h2>续费、升级和联系客服</h2>
            <p class="section-desc">开通日卡、周卡、到期续费、升级专业版、降级轻量版、确认额度或办理发票，都可以通过客服处理。</p>
          </div>
          <div class="renew-grid">
            <article v-for="(card, i) in renewCards" :key="i" class="renew-card">
              <h3>{{ card.title }}</h3>
              <p>{{ card.text }}</p>
            </article>
          </div>
          <div class="contact-box">
            <div>
              <h3>需要续费或确认方案？</h3>
              <p>添加微信客服，说明你要开通日卡、周卡、续费、升级、降级、开票或确认额度。客服会根据你的当前订阅和使用需求，协助处理后续开通。</p>
            </div>
            <aside class="qr-panel">
              <img src="/assets/customer-service-qr.png" alt="客服微信二维码" />
              <p>微信扫码添加客服，备注"日卡""周卡""续费"或"订阅档位"。</p>
            </aside>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="faq-band">
        <div class="section-inner">
          <div class="section-head">
            <h2>常见订阅问题</h2>
            <p class="section-desc">开通前和续费前，可以先看清楚额度、发票、变更和服务边界。</p>
          </div>
          <div class="faq-list">
            <details v-for="(item, i) in faqItems" :key="i" :open="i === 0">
              <summary>{{ item.q }}</summary>
              <p>{{ item.a }}</p>
            </details>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const plans = [
  { badge: '灵活', name: '日卡', price: '¥5', unit: '/ 天', sub: '适合当天赶需求、体验 Codex Agent，或集中处理一次代码、文案、图片和资料任务。', quotas: [{ label: '每日额度', value: '$30/天' }, { label: '周期额度', value: '$30/天' }], checks: ['当天需要当天开，不用长期承诺', '适合试用、急单和临时集中处理', '用低门槛体验轻量额度'] },
  { badge: '冲刺', name: '周卡', price: '¥48', unit: '/ 周', sub: '适合一周项目冲刺、连续改代码、批量出内容和集中做图，每天都有固定额度可用。', quotas: [{ label: '每日额度', value: '$50/天' }, { label: '周总额度', value: '$350/周' }], checks: ['比日卡更适合连续几天高频使用', '覆盖一周内多轮项目和内容任务', '短期预算清晰，用完再续更灵活'] },
  { badge: '', name: '轻量版', price: '¥168', unit: '/ 月', sub: '适合日常办公、轻量内容处理、低频图片生成和个人轻量高频使用，按月使用更省心。', quotas: [{ label: '每日额度', value: '$50/天' }, { label: '月总额度', value: '$1500/月' }], checks: ['适合个人日常问答、写作和资料整理', '覆盖 Codex、GPT 和 Image 常用任务', '预算门槛低，适合从免费体验过渡到稳定使用'] },
  { badge: '推荐', name: '标准版', price: '¥300', unit: '/ 月', sub: '适合长期、高频、固定预算使用，覆盖开发、内容、分析和图片创作。', quotas: [{ label: '每日额度', value: '$100/天' }, { label: '月总额度', value: '$3000/月' }], checks: ['适合个人和小团队日常生产力', '减少余额波动和 token 焦虑', '代码、文本、图片和资料分析都能覆盖'], featured: true },
  { badge: '', name: '专业版', price: '¥588', unit: '/ 月', sub: '适合更高频的连续任务、集中创作、开发协作和更大额度需求。', quotas: [{ label: '每日额度', value: '$200/天' }, { label: '月总额度', value: '$6000/月' }], checks: ['适合重度创作、开发和运营场景', '月总额度更充足，减少连续任务中断', '适合把 AI 深度嵌入每天工作流'] },
]

const valueCards = [
  { title: '日卡：适合当天急用和低门槛体验', text: '适合当天赶需求、试用 Codex Agent，或集中完成一批代码、文案、图片和资料整理任务。' },
  { title: '周卡：适合一周项目冲刺', text: '适合连续几天高频使用，每天 $50 额度、周总 $350，覆盖一周内多轮项目、内容和图片任务。' },
  { title: '月卡：适合长期稳定工作流', text: '轻量版、标准版、专业版分别面向日常使用、高频生产和重度连续任务，适合把 AI 深度嵌入每天工作。' },
  { title: '标准版：适合多数高频生产力场景', text: '适合每天用 GPT 写作分析、用 Codex 读项目改代码、用 Image 模型生成运营素材，是最均衡的月卡档位。' },
  { title: '专业版：适合连续任务和更大额度', text: '适合密集开发、批量内容生产、图片创作、团队协作前期验证和需要更大月总额度的重度用户。' },
]

const renewCards = [
  { title: '1. 登录查看当前订阅', text: '先进入订阅站点查看当前使用状态、到期时间和使用习惯，再决定开通日卡、周卡、续费原档位还是调整档位。' },
  { title: '2. 联系客服确认档位', text: '告诉客服需要日卡、周卡、续费、升级或降级，并确认对应周期、价格、每日额度和周期总额度。' },
  { title: '3. 开通后确认额度', text: '完成开通、续费或变更后，建议确认每日额度和周期总额度是否与所选档位一致，避免后续使用误解。' },
]

const faqItems = [
  { q: '五档套餐分别是多少钱？', a: '日卡 ¥5/天，周卡 ¥48/周；月卡包含轻量版 ¥168/月、标准版 ¥300/月、专业版 ¥588/月。所有套餐都不是 API 按次调用，也不是按量付费。' },
  { q: '每日额度和周期总额度分别是多少？', a: '日卡每天 $30；周卡每天 $50、周总 $350；轻量版每天 $50、月总 $1500；标准版每天 $100、月总 $3000；专业版每天 $200、月总 $6000。' },
  { q: '可以中途升级或降级吗？', a: '如需从日卡、周卡切换到月卡，或升级、降级、调整订阅档位，请联系客服确认当前订阅状态、剩余周期和可用处理方式。' },
  { q: '续费时需要提供什么？', a: '联系客服时请说明账号、当前订阅档位、希望开通或变更的档位，以及是否需要开具发票。' },
  { q: '可以开发票吗？', a: '可以。AigoKey 支持按实际订阅金额开具发票，开通或续费时请联系客服提供发票抬头、税号和接收方式。' },
]
</script>

<style scoped>
.subscription-page {
  color: #111b24;
  background: #f8fbfd;
  font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans SC", Arial, sans-serif;
}

.hero-section {
  padding: 56px 24px 64px;
  background: linear-gradient(115deg, rgba(36, 104, 242, 0.1), transparent 40%), linear-gradient(180deg, #ffffff 0%, #eef6ff 100%);
}

.hero-inner {
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 390px);
  gap: 36px;
  align-items: center;
}

.eyebrow-pill {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 18px;
  padding: 8px 13px;
  border: 1px solid rgba(36, 104, 242, 0.16);
  border-radius: 999px;
  color: #183d77;
  background: rgba(255, 255, 255, 0.86);
  font-size: 14px;
  font-weight: 850;
}

h1 {
  max-width: 760px;
  font-size: clamp(40px, 6vw, 70px);
  line-height: 1.08;
  font-weight: 950;
  margin: 0;
}

h2, h3, p { margin: 0; }

.hero-copy {
  max-width: 760px;
  margin-top: 20px;
  color: #5b6874;
  font-size: 18px;
  line-height: 1.78;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 28px;
}

.summary-panel {
  padding: 26px;
  border: 1px solid rgba(220, 229, 236, 0.95);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 24px 70px rgba(17, 27, 36, 0.13);
}

.summary-panel h2 { font-size: 24px; }

.summary-list {
  display: grid;
  gap: 12px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.summary-list li {
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 10px;
  color: #5b6874;
  line-height: 1.55;
}

.summary-list li::before {
  content: "✓";
  display: grid;
  width: 22px;
  height: 22px;
  place-items: center;
  border-radius: 50%;
  color: #ffffff;
  background: #2c9d18;
  font-size: 12px;
  font-weight: 950;
}

section { padding: 76px 24px; }
.section-inner { max-width: 1180px; margin: 0 auto; }

.section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 28px;
  margin-bottom: 30px;
}

.section-head h2 {
  max-width: 760px;
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1.16;
  font-weight: 950;
}

.section-desc {
  max-width: 460px;
  color: #5b6874;
  line-height: 1.72;
}

/* Plans Band */
.plans-band {
  color: #ffffff;
  background: linear-gradient(135deg, rgba(19, 34, 49, 0.98), rgba(36, 104, 242, 0.9)), #132231;
}

.plans-band .section-desc { color: rgba(255, 255, 255, 0.72); }

.plan-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(208px, 1fr));
  gap: 14px;
}

.plan-card {
  position: relative;
  display: grid;
  align-content: start;
  min-height: 472px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.09);
}

.plan-card.is-featured {
  border-color: rgba(159, 235, 139, 0.7);
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0 22px 48px rgba(0, 0, 0, 0.18);
}

.badge {
  position: absolute;
  top: 16px;
  right: 16px;
  min-height: 28px;
  padding: 5px 10px;
  border-radius: 999px;
  color: #123412;
  background: #9feb8b;
  font-size: 12px;
  font-weight: 950;
}

.plan-name { color: #9feb8b; font-weight: 950; }

.price {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  white-space: nowrap;
  margin-top: 16px;
  font-size: clamp(34px, 3.2vw, 48px);
  line-height: 1;
  font-weight: 950;
}

.price span { flex: 0 0 auto; font-size: 16px; color: rgba(255, 255, 255, 0.68); }

.plan-sub { margin-top: 18px; color: rgba(255, 255, 255, 0.76); line-height: 1.7; }

.quota-grid { display: grid; gap: 10px; margin-top: 24px; }

.quota {
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
}

.quota span { display: block; color: rgba(255, 255, 255, 0.62); font-size: 13px; font-weight: 850; }
.quota strong { display: block; margin-top: 4px; font-size: 24px; }

.check-list { display: grid; gap: 12px; margin: 24px 0 0; padding: 0; list-style: none; }

.check-list li {
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 10px;
  align-items: start;
  color: rgba(255, 255, 255, 0.84);
  line-height: 1.5;
}

.check-list li::before {
  content: "✓";
  display: grid;
  width: 22px;
  height: 22px;
  place-items: center;
  border-radius: 50%;
  color: #0f2e13;
  background: #9feb8b;
  font-size: 12px;
  font-weight: 950;
}

/* Value Band */
.value-band { background: #ffffff; }

.value-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.card, .renew-card {
  min-height: 210px;
  padding: 24px;
  border: 1px solid #dce5ec;
  border-radius: 8px;
  background: #fbfdff;
}

.card-num { color: #2468f2; font-size: 28px; font-weight: 950; }
.card h3, .renew-card h3 { margin-top: 16px; font-size: 20px; line-height: 1.35; }
.card p, .renew-card p { margin-top: 10px; color: #5b6874; line-height: 1.7; }

/* Renew Band */
.renew-band { background: #f2f7fb; }

.renew-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }

.contact-box {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 320px);
  gap: 24px;
  align-items: center;
  margin-top: 24px;
  padding: 28px;
  border: 1px solid #dce5ec;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 18px 48px rgba(17, 27, 36, 0.08);
}

.contact-box h3 { font-size: 26px; }
.contact-box p { margin-top: 12px; color: #5b6874; line-height: 1.72; }

.qr-panel {
  padding: 16px;
  border: 1px solid #dce5ec;
  border-radius: 8px;
  background: #f7fafc;
  text-align: center;
}

.qr-panel img { width: min(100%, 260px); margin: 0 auto; border-radius: 6px; background: #ffffff; }
.qr-panel p { margin-top: 12px; color: #5b6874; font-size: 14px; line-height: 1.6; }

/* FAQ Band */
.faq-band { background: #ffffff; }

.faq-list { display: grid; gap: 12px; max-width: 920px; }

details { border: 1px solid #dce5ec; border-radius: 8px; background: #ffffff; }
summary { cursor: pointer; padding: 20px 22px; font-weight: 950; }
details p { padding: 0 22px 22px; color: #5b6874; line-height: 1.75; }

@media (max-width: 980px) {
  .hero-inner, .contact-box { grid-template-columns: 1fr; }
  .plan-grid, .value-grid, .renew-grid { grid-template-columns: 1fr; }
  .section-head { align-items: start; flex-direction: column; }
  .plan-card { min-height: auto; }
}

@media (max-width: 640px) {
  .hero-section, section { padding-left: 16px; padding-right: 16px; }
  .hero-section { padding-top: 42px; }
  h1 { font-size: 40px; }
  .price { font-size: 40px; }
  .plan-card { min-height: auto; }
}
</style>
