import SiteHeader from '../components/layout/SiteHeader';
import NanoAiGallery from '../components/nanoai/NanoAiGallery';
import useInitialHashNavigation from '../lib/useInitialHashNavigation';
import { NANOAI_ARCHITECTURE, NANOAI_COMPANION, NANOAI_FAQ, NANOAI_FEATURES, NANOAI_METRICS, nanoAiImageSource, nanoAiImageSrcSet } from '../content/nanoaiContent';

export default function NanoAiPage() {
  useInitialHashNavigation();

  return (
    <div className="site-frame nanoai-page">
      <SiteHeader currentPage="nanoai" />
      <main id="main-content" tabIndex={-1}>
        <section className="nanoai-hero content-shell" aria-labelledby="nanoai-title">
          <div>
            <a className="proof-page-hero__back" href="/">← Back to company site</a>
            <p className="eyebrow">Conversation, memory and computer use</p>
            <h1 id="nanoai-title"><span>NanoAI</span>{' '}Bring your PC<br />to life.</h1>
            <p className="nanoai-hero__lede">Talk naturally, keep the conversation, and let Nano work in your Windows applications. A compact voice companion brings together spoken replies, persistent memory, connected tools and control of your actual computer.</p>
            <div className="nanoai-actions"><a className="button button--primary" href="#computer-use">See computer use</a><a className="nanoai-secondary" href="/#project-inquiry">Discuss a custom AI system <span aria-hidden="true">↗</span></a></div>
          </div>
          <figure className="nanoai-hero__art nanoai-hero__art--companion">
            <img src={nanoAiImageSource(NANOAI_COMPANION)} srcSet={nanoAiImageSrcSet(NANOAI_COMPANION)} sizes="(max-width: 480px) calc(100vw - 96px), 380px" width={NANOAI_COMPANION.width} height={NANOAI_COMPANION.height} fetchPriority="high" alt={NANOAI_COMPANION.alt} />
            <figcaption>{NANOAI_COMPANION.caption}</figcaption>
          </figure>
        </section>

        <div className="content-shell nanoai-evidence">
          <dl>{NANOAI_METRICS.map((metric) => <div key={metric.value}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>
          <p>The companion focuses on your Windows PC. The full workspace also provides a separate Ubuntu computer and Android remote access. Both are working development builds.</p>
        </div>

        <nav className="nanoai-index content-shell" aria-label="NanoAI showcase sections">
          {[['Capabilities', '#features'], ['Computer use', '#computer-use'], ['Architecture', '#architecture'], ['Actual screenshots', '#proof'], ['Questions', '#questions']].map(([label, href], index) => <a key={href} href={href}><span>0{index + 1}</span>{label}<span aria-hidden="true">↓</span></a>)}
        </nav>

        <section className="nanoai-section content-shell" id="features" aria-labelledby="nanoai-features-title">
          <p className="eyebrow">01 / Capabilities</p>
          <div className="nanoai-section__intro"><h2 id="nanoai-features-title">One conversation.<br />Work that continues.</h2><p>Ask a question, give an instruction, or describe a result. Nano brings conversation and action together: use “Nano” to begin or redirect a spoken request, follow up by voice or typing, and carry useful context into the next conversation.</p></div>
          <div className="nanoai-features">{NANOAI_FEATURES.map((feature, index) => <article key={feature.title}><span className="nanoai-number">0{index + 1}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div>
        </section>

        <section className="nanoai-section content-shell" id="computer-use" aria-labelledby="nanoai-computer-title">
          <p className="eyebrow">02 / Computer use</p>
          <div className="nanoai-section__intro"><h2 id="nanoai-computer-title">Use the apps.<br />Check the result.</h2><p>Nano can discover application windows and controls, inspect screenshots, navigate browser pages, enter text, use menus and shortcuts, and work in a terminal. It follows an inspect, act and verify cycle, with recorded activity you can review.</p></div>
          <div className="nanoai-deployment nanoai-computers">
            <article><h3>Your Windows PC</h3><p>The voice companion uses your signed-in desktop, installed applications, existing accounts and real files. Ask Nano to work in a browser, edit a document, organize a task folder or use your development tools.</p><p>Windows control can reuse known app windows, inspect native controls and show command work in a visible terminal. You share the pointer, keyboard and screen; Stop and physical Escape can interrupt desktop work.</p></article>
            <article><h3>A separate Ubuntu computer</h3><p>The full workspace also offers a persistent Ubuntu environment for development and independent desktop work. Its installed software and working files survive shutdown, and its desktop is visible inside NanoAI.</p><p>Use its browser, editor, terminal and installed tools while your Windows desktop remains available to you. This environment belongs to the broader workspace and has its own setup requirements.</p></article>
          </div>
          <p className="nanoai-scope-note">Application support varies with the model, operating system and current interface. The Windows companion and full workspace are distinct builds; the companion does not provision a separate computer.</p>
        </section>

        <section className="nanoai-architecture" id="architecture" aria-labelledby="nanoai-architecture-title">
          <div className="content-shell nanoai-section">
            <p className="eyebrow">03 / Execution architecture</p>
            <div className="nanoai-section__intro"><h2 id="nanoai-architecture-title">Conversation to action.<br />Context that stays.</h2><p>Conversation, computer control, memory, speech and connected services work together around the task. Nano retains the objective and recorded results, accepts new direction and verifies outcomes before reporting completion.</p></div>
            <ol className="nanoai-flow">{NANOAI_ARCHITECTURE.map((step, index) => <li key={step.title}><span className="nanoai-number">0{index + 1}</span><h3>{step.title}</h3><small>{step.subtitle}</small><p>{step.description}</p></li>)}</ol>
            <div className="nanoai-deployment">
              <article><h3>Local models or configured Azure</h3><p>Choose a compatible reasoning model through LM Studio, or configure an Azure Foundry deployment. Available memory, tool calling and vision support determine what each model can do. Local speech and memory embeddings run through separate services.</p><p>Local inference keeps that model’s processing on your machine. A cloud backend receives the task context and screenshots required for its requests; online research and connected services also use the network.</p></article>
              <article><h3>Memory, tools and remote access</h3><p>Review and correct saved knowledge, retain project context, and use prepared plugin connections. The full workspace adds saved Work runs, application-focused specialist profiles and host-powered Android access through Tailscale.</p><p>The current companion targets Windows x64 with prepared model and speech services. Linux hosting and Android access remain part of the broader workspace. Demonstration builds and custom deployments have different setup requirements.</p></article>
            </div>
          </div>
        </section>

        <section className="nanoai-section content-shell" id="proof" aria-labelledby="nanoai-proof-title">
          <p className="eyebrow">04 / Actual product screenshots</p>
          <div className="nanoai-section__intro"><h2 id="nanoai-proof-title">See the working<br />interfaces.</h2><div><p>The current voice companion and Windows workspace show conversation, controls and recorded activity. The gallery also includes earlier full-workspace demonstrations of memory, plugins, remote access and autonomous Work.</p><p>One documented research session used <strong>24 tool steps</strong> and produced a saved Word report. It is a specific demonstration, not a general performance benchmark. Select a screenshot to inspect its interface and context.</p></div></div>
          <NanoAiGallery />
        </section>

        <section className="nanoai-section nanoai-questions content-shell" id="questions" aria-labelledby="nanoai-questions-title">
          <p className="eyebrow">05 / Questions</p>
          <h2 id="nanoai-questions-title">Running NanoAI.</h2>
          <div>{NANOAI_FAQ.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
        </section>

        <section className="nanoai-cta" aria-labelledby="nanoai-cta-title"><div className="content-shell"><p className="eyebrow">Built by Omega AI LLC</p><h2 id="nanoai-cta-title">Need a private AI system<br />designed for your environment?</h2><p>Omega AI engineers model-integrated applications, workflow automation and local-first intelligent systems. Discuss architecture, deployment and integration requirements with us.</p><a className="button button--primary" href="/#project-inquiry">Discuss a custom AI system</a></div></section>
      </main>
    </div>
  );
}
