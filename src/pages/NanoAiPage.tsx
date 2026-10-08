import SiteHeader from '../components/layout/SiteHeader';
import NanoAiGallery from '../components/nanoai/NanoAiGallery';
import useInitialHashNavigation from '../lib/useInitialHashNavigation';
import { NANOAI_ARCHITECTURE, NANOAI_ART, NANOAI_FAQ, NANOAI_FEATURES, NANOAI_METRICS, nanoAiImageSource, nanoAiImageSrcSet } from '../content/nanoaiContent';

export default function NanoAiPage() {
  useInitialHashNavigation();

  return (
    <div className="site-frame nanoai-page">
      <SiteHeader currentPage="nanoai" />
      <main id="main-content" tabIndex={-1}>
        <section className="nanoai-hero content-shell" aria-labelledby="nanoai-title">
          <div>
            <a className="proof-page-hero__back" href="/">← Back to company site</a>
            <p className="eyebrow">A working local-first AI workspace</p>
            <h1 id="nanoai-title"><span>NanoAI</span>{' '}Your AI workspace.<br />Your models.<br />Your machine.</h1>
            <p className="nanoai-hero__lede">A self-hosted, model-agnostic AI platform built for real work: persistent memory, autonomous tasks, browser and plugin tools, multimodal creation, and private remote access.</p>
            <div className="nanoai-actions"><a className="button button--primary" href="#features">Explore NanoAI</a><a className="nanoai-secondary" href="/#project-inquiry">Discuss a custom AI system <span aria-hidden="true">↗</span></a></div>
          </div>
          <figure className="nanoai-hero__art">
            <img src={nanoAiImageSource(NANOAI_ART)} srcSet={nanoAiImageSrcSet(NANOAI_ART)} sizes="(max-width: 900px) calc(100vw - 48px), (max-width: 1280px) 44vw, 520px" width={NANOAI_ART.width} height={NANOAI_ART.height} fetchPriority="high" alt={NANOAI_ART.alt} />
            <figcaption>{NANOAI_ART.caption}</figcaption>
          </figure>
        </section>

        <div className="content-shell nanoai-evidence">
          <dl>{NANOAI_METRICS.map((metric) => <div key={metric.value}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>
          <p>These are demonstrated configurations and a specific Work session, not universal performance benchmarks.</p>
        </div>

        <nav className="nanoai-index content-shell" aria-label="NanoAI showcase sections">
          {[['Capabilities', '#features'], ['Architecture', '#architecture'], ['Actual screenshots', '#proof'], ['Questions', '#questions']].map(([label, href], index) => <a key={href} href={href}><span>0{index + 1}</span>{label}<span aria-hidden="true">↓</span></a>)}
        </nav>

        <section className="nanoai-section content-shell" id="features" aria-labelledby="nanoai-features-title">
          <p className="eyebrow">01 / Capabilities</p>
          <div className="nanoai-section__intro"><h2 id="nanoai-features-title">A workspace built<br />around real work.</h2><p>NanoAI connects to interchangeable language models in LM Studio and layers temporal memory, natural-language tool selection, research, browser automation, document generation, custom specialist agents and scheduled Work execution around them. Specialized local voice and image runtimes expand its capabilities.</p></div>
          <div className="nanoai-features">{NANOAI_FEATURES.map((feature, index) => <article key={feature.title}><span className="nanoai-number">0{index + 1}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div>
        </section>

        <section className="nanoai-architecture" id="architecture" aria-labelledby="nanoai-architecture-title">
          <div className="content-shell nanoai-section">
            <p className="eyebrow">02 / Execution architecture</p>
            <div className="nanoai-section__intro"><h2 id="nanoai-architecture-title">One interface.<br />Specialized runtimes.</h2><p>Chat, research, image generation, voice and memory are distinct subsystems. NanoAI coordinates them around the user’s request, the host’s hardware and configured execution permissions.</p></div>
            <ol className="nanoai-flow">{NANOAI_ARCHITECTURE.map((step, index) => <li key={step.title}><span className="nanoai-number">0{index + 1}</span><h3>{step.title}</h3><small>{step.subtitle}</small><p>{step.description}</p></li>)}</ol>
            <div className="nanoai-deployment">
              <article><h3>Hardware & model selection</h3><p>Compatible LM Studio chat models depend on available RAM/VRAM and their tool and vision capabilities. Qwen3.6-35B-A3B was the demonstrated primary model; it is an example, not a required dependency.</p><p>CPU, GPU and NPU services support selected workflows where configured. The NPU research planner is a specialized helper. Support varies by backend and hardware; every model does not run on every configuration.</p></article>
              <article><h3>Host execution & remote access</h3><p>Windows and Ubuntu/Linux host deployments have been demonstrated. The PC and inference services must remain running for host-side execution. The Android APK presents the shared web UI through Tailscale; it does not run the 35B model on the phone.</p><p>Remote mobile access requires Tailscale and internet connectivity. Optional web research and connected plugins involve external traffic. Execution permissions depend on the operating system, build and configured policy.</p></article>
            </div>
          </div>
        </section>

        <section className="nanoai-section content-shell" id="proof" aria-labelledby="nanoai-proof-title">
          <p className="eyebrow">03 / Actual product screenshots</p>
          <div className="nanoai-section__intro"><h2 id="nanoai-proof-title">From one request<br />to a saved report.</h2><div><p>In a documented NanoAI Work session, the system researched local inference runtimes, used <strong>24 tool steps</strong>, and produced a Word comparison covering vLLM, llama.cpp and Ollama. The saved artifact appeared in Workspace alongside the completed task record.</p><p>This demonstrates orchestrated retrieval, synthesis and file creation inside one interface. Select a screenshot to inspect the real application at full resolution.</p></div></div>
          <NanoAiGallery />
        </section>

        <section className="nanoai-section nanoai-questions content-shell" id="questions" aria-labelledby="nanoai-questions-title">
          <p className="eyebrow">04 / Questions</p>
          <h2 id="nanoai-questions-title">Running NanoAI.</h2>
          <div>{NANOAI_FAQ.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
        </section>

        <section className="nanoai-cta" aria-labelledby="nanoai-cta-title"><div className="content-shell"><p className="eyebrow">Built by Omega AI LLC</p><h2 id="nanoai-cta-title">Need a private AI system<br />designed for your environment?</h2><p>Omega AI engineers model-integrated applications, workflow automation and local-first intelligent systems. Discuss architecture, deployment and integration requirements with us.</p><a className="button button--primary" href="/#project-inquiry">Discuss a custom AI system</a></div></section>
      </main>
    </div>
  );
}
