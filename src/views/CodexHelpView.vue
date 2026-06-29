<template>
  <div class="codex-page">
    <!-- Header -->
    <header class="site-header">
      <div class="topbar">
        <a class="brand" href="javascript:void(0)" @click="scrollTo('top')">
          <span class="brand-mark">C</span>
          <span>Codex 帮助文档</span>
        </a>
        <nav class="nav">
          <a href="javascript:void(0)" @click="scrollTo('contact-first')">前置联系</a>
          <a href="javascript:void(0)" @click="scrollTo('developer')">程序员用户</a>
          <a href="javascript:void(0)" @click="scrollTo('non-developer')">非程序员用户</a>
          <a href="javascript:void(0)" @click="scrollTo('support')">联系客服</a>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <div id="top" class="hero">
      <div>
        <p class="eyebrow">安装 · 配置 · 密钥导入</p>
        <h1>Codex 安装使用教程手册</h1>
        <p>面向程序员用户，以及产品经理、电商运营、品牌营销等非程序员用户的 Codex App、Codex CLI、CC-Switch 安装与密钥导入指南。</p>
        <div class="hero-actions">
          <a class="button" href="javascript:void(0)" @click="scrollTo('developer')">查看程序员用户流程</a>
          <a class="button secondary" href="javascript:void(0)" @click="scrollTo('non-developer')">查看非程序员用户流程</a>
        </div>
      </div>
      <aside class="hero-panel">
        <h2>按使用场景开始</h2>
        <ul class="path-list">
          <li><a href="javascript:void(0)" @click="scrollTo('developer')"><strong>用于程序员用户</strong><span>安装 CLI、CC-Switch、VS Code 插件与 Codex App</span></a></li>
          <li><a href="javascript:void(0)" @click="scrollTo('non-developer')"><strong>用于产品经理、电商运营、品牌营销等非程序员用户</strong><span>安装 Codex App、导入密钥后重启使用</span></a></li>
          <li><a href="javascript:void(0)" @click="scrollTo('support')"><strong>联系客服与订阅站点</strong><span>查看站点、价格和客服二维码</span></a></li>
        </ul>
      </aside>
    </div>

    <!-- Layout -->
    <div class="layout">
      <aside class="toc">
        <h2>目录</h2>
        <ol>
          <li><a href="javascript:void(0)" @click="scrollTo('contact-first')">1. 前置：联系客服</a></li>
          <li><a href="javascript:void(0)" @click="scrollTo('developer')">2. 程序员用户</a></li>
          <li><a href="javascript:void(0)" @click="scrollTo('windows-cli')">Windows 安装命令</a></li>
          <li><a href="javascript:void(0)" @click="scrollTo('mac-cli')">Mac 安装命令</a></li>
          <li><a href="javascript:void(0)" @click="scrollTo('cc-switch-dev')">安装 CC-Switch</a></li>
          <li><a href="javascript:void(0)" @click="scrollTo('vscode-plugin')">VS Code Codex 插件</a></li>
          <li><a href="javascript:void(0)" @click="scrollTo('codex-app-dev')">Codex App</a></li>
          <li><a href="javascript:void(0)" @click="scrollTo('non-developer')">3. 非程序员用户</a></li>
          <li><a href="javascript:void(0)" @click="scrollTo('support')">联系客服</a></li>
        </ol>
      </aside>

      <main>
        <!-- Section 1: Contact -->
        <section id="contact-first">
          <h2>【1】前置：联系客服</h2>
          <p class="lead">有使用问题，或者充值，请联系微信客服。</p>
          <ul class="url-list">
            <li>Codex 订阅站点：<router-link to="/" class="font-bold text-[#0d4f47]">首页</router-link></li>
          </ul>
          <figure>
            <img src="/assets/01_联系客服_微信二维码.png" alt="联系客服微信二维码" />
            <figcaption>联系客服微信二维码</figcaption>
          </figure>
        </section>

        <!-- Section 2: Developer -->
        <section id="developer">
          <h2>【2】用于程序员用户</h2>
          <p class="lead">产品经理、电商运营、品牌营销等非程序员用户可以跳过本章，直接查看第 3 章。</p>

          <h3 id="windows-cli">Windows 安装命令</h3>
          <div class="command">
            <code>npm install -g @openai/codex</code>
            <button class="copy-btn" type="button" @click="copyText('npm install -g @openai/codex', $event)">复制</button>
          </div>

          <h3 id="mac-cli">Mac 安装命令</h3>
          <div class="command">
            <code>brew install --cask codex</code>
            <button class="copy-btn" type="button" @click="copyText('brew install --cask codex', $event)">复制</button>
          </div>

          <h3 id="cc-switch-dev">安装 CC-Switch</h3>
          <ul class="url-list">
            <li>下载地址：<a href="https://github.com/farion1231/cc-switch" target="_blank" rel="noopener">https://github.com/farion1231/cc-switch</a></li>
            <li>Windows / Mac 下载地址：<a href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noopener">https://github.com/farion1231/cc-switch/releases</a></li>
          </ul>
          <h4>Mac 命令行安装</h4>
          <div class="command">
            <code>brew tap farion1231/ccswitch &amp;&amp; brew install --cask cc-switch</code>
            <button class="copy-btn" type="button" @click="copyText('brew tap farion1231/ccswitch && brew install --cask cc-switch', $event)">复制</button>
          </div>
          <div class="gallery">
            <figure><img src="/assets/04_CCSwitch_密钥导入到CCS.png" alt="CC-Switch 安装截图 1" /><figcaption>CC-Switch 安装截图 1</figcaption></figure>
            <figure><img src="/assets/02_CCSwitch_主界面.png" alt="CC-Switch 安装截图 2" /><figcaption>CC-Switch 安装截图 2</figcaption></figure>
            <figure><img src="/assets/03_CCSwitch_配置供应商.png" alt="CC-Switch 安装截图 3" /><figcaption>CC-Switch 安装截图 3</figcaption></figure>
          </div>

          <h3 id="vscode-plugin">安装 VS Code Codex 插件</h3>
          <div class="gallery">
            <figure><img src="/assets/05_VSCode_Codex插件安装.png" alt="VS Code Codex 插件安装截图 1" /><figcaption>VS Code Codex 插件安装截图 1</figcaption></figure>
            <figure><img src="/assets/06_VSCode_Codex侧边栏.png" alt="VS Code Codex 插件安装截图 2" /><figcaption>VS Code Codex 插件安装截图 2</figcaption></figure>
          </div>

          <h3 id="codex-app-dev">安装 Codex App</h3>
          <h4>Windows 安装 Codex App</h4>
          <ul class="url-list">
            <li>Windows 下载地址：<a href="https://apps.microsoft.com/detail/9plm9xgg6vks?hl=zh-cn&gl=GP" target="_blank" rel="noopener">https://apps.microsoft.com/detail/9plm9xgg6vks?hl=zh-cn&amp;gl=GP</a></li>
          </ul>
          <figure><img src="/assets/07_Codex_App主界面.png" alt="Windows Codex App 安装截图" /><figcaption>Windows Codex App 安装截图</figcaption></figure>
          <h4>Mac 安装 Codex App</h4>
          <ul class="url-list">
            <li>Mac 下载地址：<a href="https://openai.com/zh-Hans-CN/codex/" target="_blank" rel="noopener">https://openai.com/zh-Hans-CN/codex/</a></li>
          </ul>
        </section>

        <!-- Section 3: Non-Developer -->
        <section id="non-developer">
          <h2>【3】用于产品经理、电商运营、品牌营销等非程序员用户</h2>
          <p class="lead">按照系统选择 Windows 或 Mac 安装路径。</p>

          <h3>Windows 安装方法</h3>
          <div class="step-grid">
            <article class="step">
              <div class="step-number">1</div>
              <div>
                <h4>下载安装 Codex App</h4>
                <p>安装好之后不要登录，直接退出程序。</p>
                <ul class="url-list"><li>下载地址：<a href="https://apps.microsoft.com/detail/9plm9xgg6vks?hl=zh-cn&gl=GP" target="_blank" rel="noopener">https://apps.microsoft.com/detail/9plm9xgg6vks?hl=zh-cn&amp;gl=GP</a></li></ul>
              </div>
            </article>
            <article class="step">
              <div class="step-number">2</div>
              <div>
                <h4>下载安装 CC-Switch</h4>
                <p>Windows 的下载包有可能被折叠，点一下页面里的折叠区域展开。</p>
                <ul class="url-list"><li>Windows 下载地址：<a href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noopener">https://github.com/farion1231/cc-switch/releases</a></li></ul>
                <div class="gallery">
                  <figure><img src="/assets/windows_install_1.png" alt="Windows CC-Switch 下载截图 1" /><figcaption>Windows CC-Switch 下载截图 1</figcaption></figure>
                  <figure><img src="/assets/windows_install_2.png" alt="Windows CC-Switch 下载截图 2" /><figcaption>Windows CC-Switch 下载截图 2</figcaption></figure>
                </div>
              </div>
            </article>
            <article class="step">
              <div class="step-number">3</div>
              <div>
                <h4>从网站创建密钥，导入密钥</h4>
                <div class="gallery">
                  <figure><img src="/assets/08_网站_API密钥管理.png" alt="创建密钥截图 1" /><figcaption>创建密钥截图 1</figcaption></figure>
                  <figure><img src="/assets/09_创建密钥_选择分组.png" alt="导入密钥截图 2" /><figcaption>导入密钥截图 2</figcaption></figure>
                  <figure><img src="/assets/10_Windows_密钥导入到CCS.png" alt="导入密钥截图 3" /><figcaption>导入密钥截图 3</figcaption></figure>
                </div>
              </div>
            </article>
            <article class="step">
              <div class="step-number">4</div>
              <div><h4>重启 Codex App</h4><p>重启后即可使用。</p></div>
            </article>
          </div>

          <h3>Mac 安装方法</h3>
          <div class="step-grid">
            <article class="step">
              <div class="step-number">1</div>
              <div>
                <h4>下载安装 Codex App</h4>
                <p>安装好之后不要登录，直接退出程序。</p>
                <ul class="url-list"><li>下载地址：<a href="https://openai.com/zh-Hans-CN/codex/" target="_blank" rel="noopener">https://openai.com/zh-Hans-CN/codex/</a></li></ul>
              </div>
            </article>
            <article class="step">
              <div class="step-number">2</div>
              <div>
                <h4>下载安装 CC-Switch</h4>
                <ul class="url-list"><li>下载地址：<a href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noopener">https://github.com/farion1231/cc-switch/releases</a></li></ul>
              </div>
            </article>
            <article class="step">
              <div class="step-number">3</div>
              <div>
                <h4>从网站导入密钥</h4>
                <figure><img src="/assets/11_Mac_密钥导入到CCS.png" alt="Mac 导入密钥截图" /><figcaption>Mac 导入密钥截图</figcaption></figure>
              </div>
            </article>
            <article class="step">
              <div class="step-number">4</div>
              <div><h4>重启 Codex App</h4><p>重启后即可使用。</p></div>
            </article>
          </div>
        </section>

        <!-- Support -->
        <section id="support">
          <h2>联系客服</h2>
          <div class="price-box">定价：300 元一个月（量大管饱），日 100 美刀，总额 3000 美刀</div>
          <p>Codex 订阅站点：</p>
          <ul class="url-list">
            <li><router-link to="/" class="font-bold text-[#0d4f47]">首页</router-link></li>
          </ul>
          <p>有使用问题，或者充值，请联系微信客服：</p>
          <figure><img src="/assets/12_联系客服_微信二维码.png" alt="联系客服微信二维码" /><figcaption>联系客服微信二维码</figcaption></figure>
          <p class="notice">提示：本页面由原 Markdown 手册整理生成，图片仍使用原文档中的在线图片链接。</p>
        </section>
      </main>
    </div>

    <footer class="footer">Codex 安装使用教程手册 · 静态帮助文档</footer>
  </div>
</template>

<script setup lang="ts">
function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

async function copyText(text: string, event: Event) {
  const btn = event.target as HTMLButtonElement
  const original = btn.textContent
  try {
    await navigator.clipboard.writeText(text)
    btn.textContent = '已复制'
  } catch {
    btn.textContent = '已选中'
  }
  setTimeout(() => { btn.textContent = original }, 1400)
}
</script>

<style scoped>
.codex-page {
  color: #1b1d1f;
  font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans SC", Arial, sans-serif;
  line-height: 1.68;
  background: linear-gradient(180deg, #edf6f3 0, #f7f9fb 340px), #f7f9fb;
}

a { color: #0d4f47; text-decoration-thickness: 1px; text-underline-offset: 4px; word-break: break-all; }
img { display: block; max-width: 100%; height: auto; }

.site-header { border-bottom: 1px solid rgba(18, 106, 95, 0.16); background: rgba(255, 255, 255, 0.86); backdrop-filter: blur(14px); position: sticky; top: 0; z-index: 20; }

.topbar { width: min(1180px, calc(100% - 32px)); margin: 0 auto; min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 18px; }

.brand { display: flex; align-items: center; gap: 10px; font-weight: 700; color: #0d4f47; white-space: nowrap; }
.brand-mark { width: 34px; height: 34px; border-radius: 8px; display: grid; place-items: center; color: #fff; background: linear-gradient(135deg, #126a5f, #203b46); font-size: 18px; }

.nav { display: flex; align-items: center; gap: 4px; overflow-x: auto; scrollbar-width: none; }
.nav::-webkit-scrollbar { display: none; }
.nav a { display: inline-flex; align-items: center; min-height: 36px; padding: 0 12px; border-radius: 8px; color: #39434d; text-decoration: none; font-size: 14px; white-space: nowrap; }
.nav a:hover { background: #eaf7f4; color: #0d4f47; }

.hero { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 56px 0 28px; display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr); gap: 36px; align-items: end; }

.eyebrow { margin: 0 0 12px; color: #d85c27; font-weight: 700; font-size: 14px; }
h1 { margin: 0; font-size: clamp(34px, 5vw, 62px); line-height: 1.12; }
.hero p { max-width: 780px; margin: 18px 0 0; color: #43505a; font-size: 18px; }

.hero-actions { margin-top: 28px; display: flex; flex-wrap: wrap; gap: 12px; }

.button { border: 0; border-radius: 8px; min-height: 44px; padding: 0 16px; display: inline-flex; align-items: center; gap: 8px; font: inherit; font-weight: 700; color: #fff; background: #126a5f; text-decoration: none; cursor: pointer; box-shadow: 0 10px 20px rgba(18, 106, 95, 0.18); }
.button.secondary { color: #0d4f47; background: #fff; box-shadow: none; border: 1px solid #d9e1e8; }

.hero-panel { background: rgba(255, 255, 255, 0.78); border: 1px solid rgba(18, 106, 95, 0.16); border-radius: 8px; padding: 18px; box-shadow: 0 18px 45px rgba(27, 29, 31, 0.09); }
.hero-panel h2 { margin: 0 0 12px; font-size: 20px; }

.path-list { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.path-list a { display: grid; gap: 2px; padding: 14px; border-radius: 8px; background: #f7f9fb; text-decoration: none; border: 1px solid transparent; }
.path-list a:hover { border-color: rgba(18, 106, 95, 0.28); background: #eaf7f4; }
.path-list strong { color: #1b1d1f; }
.path-list span { color: #66707a; font-size: 14px; }

.layout { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 20px 0 72px; display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 28px; align-items: start; }

.toc { position: sticky; top: 84px; background: #ffffff; border: 1px solid #d9e1e8; border-radius: 8px; padding: 18px; box-shadow: 0 10px 24px rgba(27, 29, 31, 0.05); }
.toc h2 { margin: 0 0 12px; font-size: 16px; }
.toc ol { margin: 0; padding: 0; list-style: none; display: grid; gap: 6px; }
.toc a { display: block; padding: 8px 10px; border-radius: 8px; text-decoration: none; color: #34404a; font-size: 14px; }
.toc a:hover { background: #eef5ff; color: #163b66; }

main { min-width: 0; display: grid; gap: 22px; }

section { scroll-margin-top: 86px; background: #ffffff; border: 1px solid #d9e1e8; border-radius: 8px; padding: clamp(20px, 3vw, 34px); box-shadow: 0 10px 24px rgba(27, 29, 31, 0.04); }
section h2 { margin: 0 0 14px; font-size: clamp(24px, 3vw, 34px); line-height: 1.2; }
section h3 { margin: 28px 0 10px; font-size: 22px; line-height: 1.25; scroll-margin-top: 86px; }
section h4 { margin: 22px 0 8px; font-size: 18px; line-height: 1.3; }
p { margin: 10px 0; }
.lead { color: #66707a; margin-top: -4px; }

.notice { margin: 18px 0 0; padding: 14px 16px; border-radius: 8px; background: #fff2ea; border: 1px solid #ffd2bd; color: #6c351e; }

.url-list { display: grid; gap: 8px; margin: 12px 0 0; padding: 0; list-style: none; }
.url-list a { display: inline; color: #0d4f47; font-weight: 700; overflow-wrap: anywhere; }

.step-grid { display: grid; gap: 14px; margin-top: 14px; }
.step { display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 14px; padding: 16px; border: 1px solid #d9e1e8; border-radius: 8px; background: #fbfcfd; }
.step-number { width: 40px; height: 40px; border-radius: 8px; display: grid; place-items: center; background: #eaf7f4; color: #0d4f47; font-weight: 800; flex: none; }
.step h4 { margin-top: 0; }

.command { margin: 10px 0 0; display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: stretch; border: 1px solid #243743; background: #16232b; border-radius: 8px; overflow: hidden; }
.command code { padding: 14px; color: #e8f5f3; overflow-x: auto; white-space: nowrap; font-family: Consolas, "SFMono-Regular", Menlo, monospace; font-size: 14px; }
.copy-btn { border: 0; border-left: 1px solid #334854; background: #20333d; color: #fff; padding: 0 14px; cursor: pointer; font: inherit; font-weight: 700; min-width: 74px; }
.copy-btn:hover { background: #126a5f; }

figure { margin: 16px 0 0; border: 1px solid #d9e1e8; border-radius: 8px; overflow: hidden; background: #f2f5f7; }
figure img { width: 100%; object-fit: contain; background: #fff; }
figcaption { padding: 10px 12px; color: #66707a; font-size: 13px; border-top: 1px solid #d9e1e8; background: #fbfcfd; }

.gallery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 12px; }

.price-box { margin: 16px 0; padding: 18px; border-radius: 8px; background: #eaf7f4; border: 1px solid rgba(18, 106, 95, 0.22); font-size: 18px; font-weight: 800; color: #0d4f47; }

.footer { border-top: 1px solid #d9e1e8; background: #fff; color: #66707a; padding: 24px 16px; text-align: center; font-size: 14px; }

@media (max-width: 900px) {
  .topbar { align-items: flex-start; flex-direction: column; padding: 12px 0; }
  .hero, .layout { grid-template-columns: 1fr; }
  .hero { padding-top: 36px; }
  .toc { position: static; }
}

@media (max-width: 640px) {
  .topbar, .hero, .layout { width: min(100% - 24px, 1180px); }
  .hero p { font-size: 16px; }
  .hero-actions { display: grid; }
  .button, .button.secondary { justify-content: center; width: 100%; }
  .gallery { grid-template-columns: 1fr; }
  .step { grid-template-columns: 1fr; }
  .command { grid-template-columns: 1fr; }
  .copy-btn { min-height: 40px; border-left: 0; border-top: 1px solid #334854; }
}
</style>
