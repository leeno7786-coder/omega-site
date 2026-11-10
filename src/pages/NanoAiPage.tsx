import SiteHeader from '../components/layout/SiteHeader';
import NanoAiDownload from '../components/nanoai/NanoAiDownload';
import NanoAiGallery from '../components/nanoai/NanoAiGallery';
import useInitialHashNavigation from '../lib/useInitialHashNavigation';
import { NANOAI_ARCHITECTURE, NANOAI_FAQ, NANOAI_FEATURES, NANOAI_LINKS, NANOAI_MEET, NANOAI_METRICS, nanoAiImageSource, nanoAiImageSrcSet } from '../content/nanoaiContent';

export default function NanoAiPage() {
  useInitialHashNavigation();

  return (
    <div className="site-frame nanoai-page">
      <SiteHeader currentPage="nanoai" />
      <main id="main-content" tabIndex={-1}>
        <section className="nanoai-hero content-shell" aria-labelledby="nanoai-title">
          <div>
            <a className="proof-page-hero__back" href="/">← Back to company site</a>
            <p className="eyebrow">Out now for Windows · Hands-free voice · Its own computer</p>
            <h1 id="nanoai-title"><span>NanoAI</span>{' '}Bring your PC<br />to life.</h1>
            <p className="nanoai-hero__lede">In the app, Nano works on a computer of its own, with your connected accounts and tasks that run on a schedule. Switch on Live mode and Nano runs your Windows PC for you, hands-free: just talk, and come back to the whole session as a chat later.</p>
            <div className="nanoai-actions"><a className="button button--primary" href={NANOAI_LINKS.download}>Download for Windows</a><a className="nanoai-secondary" href={NANOAI_LINKS.plans} target="_blank" rel="noreferrer">See Nano Cloud plans <span aria-hidden="true">↗</span></a><a className="nanoai-secondary" href="#computer-use">See how it works <span aria-hidden="true">↓</span></a></div>
            <p className="nanoai-hero__note">Free with a model on your own PC. Nano Cloud plans run Nano for you.</p>
          </div>
          <figure className="nanoai-hero__art">
            <img src={nanoAiImageSource(NANOAI_MEET)} srcSet={nanoAiImageSrcSet(NANOAI_MEET)} sizes="(max-width: 900px) calc(100vw - 48px), 560px" width={NANOAI_MEET.width} height={NANOAI_MEET.height} fetchPriority="high" alt={NANOAI_MEET.alt} />
            <figcaption>NanoAI 0.3.1. {NANOAI_MEET.caption}</figcaption>
          </figure>
        </section>

        <div className="content-shell nanoai-evidence">
          <dl>{NANOAI_METRICS.map((metric) => <div key={metric.value}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>
          <p>NanoAI is one signed Windows app from Omega AI, for Windows 10 and 11 (64-bit). It keeps itself up to date.</p>
        </div>

        <nav className="nanoai-index content-shell" aria-label="NanoAI showcase sections">
          {[['Capabilities', '#features'], ['Two ways it works', '#computer-use'], ['Architecture', '#architecture'], ['Screens', '#proof'], ['Your data', '#your-data'], ['Questions', '#questions'], ['Download', '#download']].map(([label, href], index) => <a key={href} href={href}><span>0{index + 1}</span>{label}<span aria-hidden="true">↓</span></a>)}
        </nav>

        <section className="nanoai-section content-shell" id="features" aria-labelledby="nanoai-features-title">
          <p className="eyebrow">01 / Capabilities</p>
          <div className="nanoai-section__intro"><h2 id="nanoai-features-title">Everything Nano needs<br />to get work done.</h2><p>Ask a question, give an instruction, or describe a result. Every mode shares the same plugins, memory and tasks, so Nano picks up where it left off however you work with it.</p></div>
          <div className="nanoai-features">{NANOAI_FEATURES.map((feature, index) => <article key={feature.title}><span className="nanoai-number">0{index + 1}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div>
        </section>

        <section className="nanoai-section content-shell" id="computer-use" aria-labelledby="nanoai-computer-title">
          <p className="eyebrow">02 / Two ways it works</p>
          <div className="nanoai-section__intro"><h2 id="nanoai-computer-title">Its computer,<br />or yours.</h2><p>Let Nano get on with things on its own computer while you keep using yours, or switch on Live mode and let it take the wheel of your PC while you talk. Either way it inspects, acts and checks the result, and keeps a record you can review.</p></div>
          <div className="nanoai-deployment nanoai-computers">
            <article><h3>Nano’s own computer</h3><p>Nano works on a persistent Ubuntu computer of its own, with its own mouse, keyboard, Firefox, VSCodium and terminal. Hand it research, documents or code, keep using Windows while it works, and watch its desktop inside NanoAI.</p><p>It keeps its apps and files from one session to the next, and shared folders hold the files you want it to use. NanoAI sets it up once with Canonical Multipass.</p></article>
            <article><h3>Your PC, hands-free</h3><p>Switch on Live mode and just talk. Nano becomes a live voice assistant with full control of your Windows desktop: it sees the screen, opens apps, clicks, types and gets the job done while you speak. All that shows is a small Live overlay, out of your way.</p><p>Say “Nano” to change course mid-task. The overlay keeps the microphone and Stop in reach, and Escape works too. Each session is saved as a new chat in NanoAI, with a live transcript to come back to.</p></article>
          </div>
          <p className="nanoai-scope-note">Live mode shares your desktop, pointer and keyboard with Nano. How well it handles an application depends on the model, the application and what is on screen.</p>
        </section>

        <section className="nanoai-architecture" id="architecture" aria-labelledby="nanoai-architecture-title">
          <div className="content-shell nanoai-section">
            <p className="eyebrow">03 / How it runs</p>
            <div className="nanoai-section__intro"><h2 id="nanoai-architecture-title">Conversation to action.<br />Context that stays.</h2><p>Conversation, computer control, memory, speech and connected services work together around the task. Nano keeps the objective and its results, takes new direction as you give it, and checks the outcome before it reports back.</p></div>
            <ol className="nanoai-flow">{NANOAI_ARCHITECTURE.map((step, index) => <li key={step.title}><span className="nanoai-number">0{index + 1}</span><h3>{step.title}</h3><small>{step.subtitle}</small><p>{step.description}</p></li>)}</ol>
            <div className="nanoai-deployment">
              <article><h3>Free on your hardware</h3><p>Run a model on your own PC through LM Studio, Ollama, llama.cpp or Lemonade, with no account. NanoAI finds a running server by itself, and the setup guide says what size of model your PC’s memory and graphics run well.</p><p>A local model keeps its processing on your PC. Online research and the services you connect still use the network.</p></article>
              <article><h3>Or hosted for you</h3><p>With a Nano Cloud plan there is nothing to set up: sign in from NanoAI’s Settings on each PC you use. Every plan does everything, and plans differ only in how much use they include each week.</p><p>What a request needs passes through Nano Cloud to the model and back, and none of it is stored. Card numbers, passwords and other private details are swapped out on your PC before anything leaves it.</p></article>
            </div>
          </div>
        </section>

        <section className="nanoai-section content-shell" id="proof" aria-labelledby="nanoai-proof-title">
          <p className="eyebrow">04 / Screens</p>
          <div className="nanoai-section__intro"><h2 id="nanoai-proof-title">A look inside<br />the app.</h2><div><p>Screens from NanoAI 0.3.1 itself: the setup guide that helps you choose where Nano thinks, setting Nano up for your role, the plugins it can use, and the settings that keep you in charge.</p><p>Select a screen to see it at full size.</p></div></div>
          <NanoAiGallery />
        </section>

        <section className="nanoai-section content-shell" id="your-data" aria-labelledby="nanoai-data-title">
          <p className="eyebrow">05 / Your data</p>
          <div className="nanoai-section__intro"><h2 id="nanoai-data-title">Your accounts.<br />Your data.</h2><p>Connect Gmail, Google Calendar, Drive, Docs, Sheets, Slides and Chat from NanoAI’s Plugins. You sign in on Google’s own consent screen, and each plugin asks only for the access its tools need.</p></div>
          <div className="nanoai-deployment">
            <article><h3>What stays on your PC</h3><p>Conversations, memory, tasks and files live in NanoAI’s folder on your PC, along with the sign-ins for accounts you connect. Nano’s own computer runs on your PC too.</p><p>NanoAI reads your data when a request or a task you set up needs it. It asks before it sends, changes or deletes anything.</p></article>
            <article><h3>What Nano Cloud sees</h3><p>With Nano Cloud, what a request needs passes through to the model and back, and none of it is stored or used to train AI models. Private details are swapped out on your PC before anything leaves it.</p><p>Google data is used only for the features you use. It’s never sold or used for advertising. <a href="/nanoai/privacy/">Read the NanoAI privacy policy</a>.</p></article>
          </div>
        </section>

        <section className="nanoai-section nanoai-questions content-shell" id="questions" aria-labelledby="nanoai-questions-title">
          <p className="eyebrow">06 / Questions</p>
          <h2 id="nanoai-questions-title">Good to know.</h2>
          <div>{NANOAI_FAQ.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
        </section>

        <NanoAiDownload />

        <section className="nanoai-cta" aria-labelledby="nanoai-cta-title"><div className="content-shell"><p className="eyebrow">Built by Omega AI LLC</p><h2 id="nanoai-cta-title">Need a private AI system<br />designed for your environment?</h2><p>Omega AI engineers model-integrated applications, workflow automation and local-first intelligent systems. Discuss architecture, deployment and integration requirements with us.</p><a className="button button--primary" href="/#project-inquiry">Discuss a custom AI system</a></div></section>
      </main>
    </div>
  );
}
