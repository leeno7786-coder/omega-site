import SiteHeader from '../components/layout/SiteHeader';
import { NANOAI_DESKTOP, nanoAiImageSource, nanoAiImageSrcSet } from '../content/nanoaiContent';
import { NANO_APPS } from '../content/nanoAppsContent';
import { OMEGA_BROWSER_AGENT, PROJECTS_PAGE, browserAgentImage, browserAgentImageSrcSet } from '../content/projectsContent';
import { OMEGA_PROOF_CONTENT, SELECTED_SYSTEMS } from '../content/siteContent';
import useInitialHashNavigation from '../lib/useInitialHashNavigation';
import { SystemAction } from '../sections/company/SelectedSystems';

const PROJECT_INDEX = [
  ['Omega Browser Agent', '#omega-browser-agent'],
  ['NanoAI', '#nanoai'],
  ['Nano', '#nano'],
  ['Research and systems', '#systems'],
] as const;

export default function ProjectsPage() {
  useInitialHashNavigation();
  const agent = OMEGA_BROWSER_AGENT;
  const systems = SELECTED_SYSTEMS.filter((system) => system.tier === 'supporting');

  return (
    <div className="site-frame proof-page projects-page">
      <SiteHeader currentPage="projects" />
      <main id="main-content" tabIndex={-1}>
        <section className="proof-page-hero content-shell" aria-labelledby="projects-title">
          <div className="proof-page-hero__copy">
            <a className="proof-page-hero__back" href="/">← Back to company site</a>
            <p className="eyebrow">Projects</p>
            <h1 id="projects-title">{PROJECTS_PAGE.title}</h1>
            <p className="proof-page-hero__lede">{PROJECTS_PAGE.lede}</p>
          </div>
          <nav className="projects-index" aria-label="Projects on this page">
            {PROJECT_INDEX.map(([label, href], index) => (
              <a key={href} href={href}><span>0{index + 1}</span>{label}<span aria-hidden="true">↓</span></a>
            ))}
          </nav>
        </section>

        <section className="content-shell projects-group" aria-labelledby="projects-live-title">
          <p className="eyebrow"><span aria-hidden="true">01</span>Live products</p>
          <h2 id="projects-live-title">Use them today.</h2>

          <article className="project-showcase" id="omega-browser-agent" aria-labelledby="omega-browser-agent-title">
            <div className="project-showcase__grid">
              <div className="project-showcase__copy">
                <p className="eyebrow project-showcase__eyebrow">{agent.eyebrow}</p>
                <div className="project-showcase__title">
                  <img src="/projects/omega-browser-agent/logo-96.png" width={48} height={48} alt="" />
                  <h3 id="omega-browser-agent-title">{agent.title}</h3>
                </div>
                <p className="project-showcase__tagline">{agent.tagline}</p>
                <p>{agent.description}</p>
                <ol className="nano-apps__steps" aria-label="How Omega Browser Agent works">
                  {agent.steps.map((step, index) => (
                    <li key={step.title}>
                      <span className="nano-apps__step-index" aria-hidden="true">0{index + 1}</span>
                      <span><strong>{step.title}</strong>{step.detail}</span>
                    </li>
                  ))}
                </ol>
                <p className="nano-apps__price project-showcase__price">{agent.price}<span>{agent.priceNote}</span></p>
                <div className="project-showcase__actions">
                  <a className="button button--primary" href={agent.storeHref} target="_blank" rel="noreferrer">
                    Get it on Microsoft Edge Add-ons<span aria-hidden="true"> ↗</span>
                  </a>
                  <a className="button button--secondary" href={agent.siteHref} target="_blank" rel="noreferrer">Sign up and plans</a>
                </div>
                <p className="project-showcase__note">{agent.signUpNote}</p>
                <ul className="project-showcase__facts" aria-label="Omega Browser Agent facts">
                  {agent.facts.map((fact) => <li key={fact}>{fact}</li>)}
                </ul>
              </div>
              <figure className="project-showcase__media">
                <video
                  src={agent.video.src}
                  poster={agent.video.poster}
                  width={agent.video.width}
                  height={agent.video.height}
                  aria-label={agent.video.label}
                  controls
                  playsInline
                  preload="none"
                />
                <figcaption>{agent.caption}</figcaption>
              </figure>
            </div>
            <ul className="project-gallery" aria-label="Omega Browser Agent screenshots">
              {agent.screenshots.map((shot) => (
                <li key={shot.slug}>
                  <figure>
                    <img
                      src={browserAgentImage(shot.slug)}
                      srcSet={browserAgentImageSrcSet(shot.slug)}
                      sizes="(max-width: 520px) calc(100vw - 28px), (max-width: 900px) calc(50vw - 30px), 300px"
                      width={1280}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      alt={shot.alt}
                    />
                    <figcaption>{shot.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </article>

          <article className="project-showcase" id="nanoai" aria-labelledby="projects-nanoai-title">
            <div className="project-showcase__grid">
              <div className="project-showcase__copy">
                <p className="eyebrow project-showcase__eyebrow">Beta · Windows</p>
                <div className="project-showcase__title">
                  <img src="/brand/nanoai-logo-120.png" width={48} height={48} alt="" />
                  <h3 id="projects-nanoai-title">NanoAI</h3>
                </div>
                <p className="project-showcase__tagline">Bring your PC to life.</p>
                <p>Talk to a compact Windows voice companion that remembers context and works in your actual applications. The beta is one Windows download: NanoAI, its memory, voice and plugins run on your PC, and Omega AI provides the model, so you don’t need an AI account of your own.</p>
                <ul className="project-showcase__facts" aria-label="NanoAI highlights">
                  <li>Windows voice companion</li>
                  <li>Actual computer use</li>
                  <li>Memory you can inspect</li>
                </ul>
                <div className="project-showcase__actions">
                  <a className="button button--primary" href="/nanoai/#beta">Sign up for the beta</a>
                  <a className="text-link" href="/nanoai/">Explore NanoAI</a>
                </div>
              </div>
              <figure className="project-showcase__media">
                <a href="/nanoai/#proof" aria-label="See NanoAI screenshots">
                  <img
                    src={nanoAiImageSource(NANOAI_DESKTOP)}
                    srcSet={nanoAiImageSrcSet(NANOAI_DESKTOP)}
                    sizes="(max-width: 900px) calc(100vw - 64px), 620px"
                    width={NANOAI_DESKTOP.width}
                    height={NANOAI_DESKTOP.height}
                    loading="lazy"
                    decoding="async"
                    alt={NANOAI_DESKTOP.alt}
                  />
                </a>
                <figcaption>{NANOAI_DESKTOP.caption}</figcaption>
              </figure>
            </div>
          </article>

          <article className="project-showcase" id="nano" aria-labelledby="projects-nano-title">
            <div className="project-showcase__grid">
              <div className="project-showcase__copy">
                <p className="eyebrow project-showcase__eyebrow">Live · Android app builder</p>
                <h3 id="projects-nano-title">Nano</h3>
                <p className="project-showcase__tagline">{NANO_APPS.title}</p>
                <p>{NANO_APPS.description}</p>
                <p className="nano-apps__price project-showcase__price">{NANO_APPS.price}<span>{NANO_APPS.priceNote}</span></p>
                <div className="project-showcase__actions">
                  <a className="button button--primary" href={NANO_APPS.href} target="_blank" rel="noreferrer">
                    {NANO_APPS.action}<span aria-hidden="true"> ↗</span>
                  </a>
                </div>
              </div>
              <figure className="project-showcase__media">
                <video
                  src={NANO_APPS.video.src}
                  poster={NANO_APPS.video.poster}
                  width={NANO_APPS.video.width}
                  height={NANO_APPS.video.height}
                  aria-label={NANO_APPS.video.label}
                  controls
                  muted
                  playsInline
                  preload="none"
                />
                <figcaption>{NANO_APPS.caption}</figcaption>
              </figure>
            </div>
          </article>
        </section>

        <section className="content-shell projects-group" id="systems" aria-labelledby="projects-systems-title">
          <p className="eyebrow"><span aria-hidden="true">02</span>Research and systems</p>
          <h2 id="projects-systems-title">The engineering underneath.</h2>
          <div className="supporting-systems projects-systems">
            <article className="supporting-system projects-systems__lead" id="omega-3">
              <div className="supporting-system__index">00</div>
              <p className="supporting-system__status">Flagship research · Working system</p>
              <h3>Omega 3.0</h3>
              <p>Metacognitive evaluation and deterministic control loops, with 13 specialized model slots inside a validated 8 GB footprint. Memory: {OMEGA_PROOF_CONTENT.headlineBenchmark}; {OMEGA_PROOF_CONTENT.localBenchmark.replace(/^Up/, 'up')}.</p>
              <a className="system-dossier__action" href="/omega-3/">See the technical proof<span aria-hidden="true">→</span></a>
            </article>
            {systems.map((system, index) => (
              <article className="supporting-system" id={system.id} key={system.id}>
                <div className="supporting-system__index">0{index + 1}</div>
                <p className="supporting-system__status">{system.status}</p>
                <h3>{system.title}</h3>
                <p>{system.summary}</p>
                <ul aria-label={`${system.title} technologies`}>
                  {system.evidence.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <SystemAction system={system} inquiryHref="/#project-inquiry" />
              </article>
            ))}
          </div>
        </section>

        <section className="proof-page-cta content-shell" aria-labelledby="projects-cta-title">
          <p className="eyebrow">Next step</p>
          <h2 id="projects-cta-title">Have something to build?</h2>
          <p>Each of these started as a hard problem. Tell us yours, and we’ll start with a focused conversation about fit, constraints and technical direction.</p>
          <a className="button button--primary" href="/#project-inquiry">Start a project</a>
        </section>
      </main>
    </div>
  );
}
