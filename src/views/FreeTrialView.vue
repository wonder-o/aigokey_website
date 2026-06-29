<template>
  <main class="page">
    <section class="trial" aria-labelledby="trial-title">
      <div>
        <p class="eyebrow">新用户专享</p>
        <h1 id="trial-title">联系客服免费试用体验</h1>
        <p class="summary">欢迎新用户申请免费试用。请使用微信扫描右侧二维码添加客服，客服会协助开通试用体验并解答使用问题。</p>
        <p class="notice">添加客服时请备注"免费试用"，方便更快为你处理。</p>
      </div>
      <aside class="qr-panel" aria-label="客服微信二维码">
        <h2>扫码添加客服</h2>
        <div class="qr-frame">
          <img src="/assets/customer-service-qr.png" alt="客服微信二维码" />
        </div>
        <p class="qr-tip">微信扫一扫，添加客服领取免费试用体验。</p>
      </aside>
    </section>
  </main>
</template>

<style scoped>
:root {
  color-scheme: light;
}

.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 40px 18px;
  background:
    radial-gradient(circle at 18% 14%, rgba(232, 111, 53, 0.14), transparent 32%),
    linear-gradient(135deg, #eef7f5 0%, #f9fbfd 48%, #fff7f0 100%);
  font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans SC", Arial, sans-serif;
  color: #18222d;
}

.trial {
  width: min(980px, 100%);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 380px);
  gap: 34px;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(17, 103, 95, 0.16);
  border-radius: 8px;
  box-shadow: 0 22px 60px rgba(24, 34, 45, 0.12);
  padding: clamp(24px, 5vw, 54px);
}

.eyebrow {
  margin: 0 0 12px;
  color: #e86f35;
  font-size: 15px;
  font-weight: 800;
}

h1 {
  margin: 0;
  font-size: clamp(34px, 6vw, 58px);
  line-height: 1.12;
}

.summary {
  max-width: 600px;
  margin: 20px 0 0;
  color: #3f4c58;
  font-size: clamp(17px, 2vw, 20px);
  line-height: 1.75;
}

.notice {
  margin: 28px 0 0;
  padding: 14px 16px;
  border: 1px solid #ffd7c3;
  border-radius: 8px;
  background: #fff3ec;
  color: #753716;
  font-size: 15px;
  line-height: 1.65;
}

.qr-panel {
  padding: 18px;
  border: 1px solid #dce5ec;
  border-radius: 8px;
  background: #ffffff;
  text-align: center;
}

.qr-panel h2 {
  margin: 0 0 14px;
  font-size: 22px;
  line-height: 1.3;
  color: #0b4742;
}

.qr-frame {
  padding: 14px;
  border-radius: 8px;
  background: #f7fafc;
  border: 1px solid #dce5ec;
}

.qr-frame img {
  width: min(100%, 300px);
  margin: 0 auto;
  border-radius: 6px;
  background: #fff;
}

.qr-tip {
  margin: 14px 0 0;
  color: #66717d;
  font-size: 15px;
  line-height: 1.6;
}

@media (max-width: 780px) {
  .page { align-items: start; }
  .trial { grid-template-columns: 1fr; }
  .qr-panel { order: -1; }
}
</style>
