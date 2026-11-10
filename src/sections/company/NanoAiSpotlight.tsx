import { NANOAI_LAUNCH, NANOAI_LINKS, NANOAI_MEET, nanoAiImageSource, nanoAiImageSrcSet } from '../../content/nanoaiContent';

/** The home page's NanoAI launch spotlight, right after the proof rail and announced in the hero. */
export default function NanoAiSpotlight() {
  const content = NANOAI_LAUNCH;
  const screen = NANOAI_MEET;

  return (
    <section className="nano-apps" id="nanoai-launch" aria-labelledby="nanoai-launch-title">
      <div className="content-shell nano-apps__inner">
        <div className="nano-apps__copy">
          <p className="eyebrow nano-apps__eyebrow">{content.eyebrow}</p>
          <h2 id="nanoai-launch-title">{content.title}</h2>
          <p className="nano-apps__lede">{content.description}</p>
          <ol className="nano-apps__steps" aria-label="How to start with NanoAI">
            {content.steps.map((step, index) => (
              <li key={step.title}>
                <span className="nano-apps__step-index" aria-hidden="true">0{index + 1}</span>
                <span>
                  <strong>{step.title}</strong>
                  {step.detail}
                </span>
              </li>
            ))}
          </ol>
          <div className="nano-apps__offer">
            <p className="nano-apps__price">{content.price}<span>{content.priceNote}</span></p>
            <a className="button button--primary" href={NANOAI_LINKS.download}>{content.action}</a>
            <a className="text-link" href="/nanoai/">See what Nano does</a>
          </div>
        </div>
        <figure className="nano-apps__media">
          <a href="/nanoai/#proof" aria-label="See NanoAI's screens">
            <img src={nanoAiImageSource(screen)} srcSet={nanoAiImageSrcSet(screen)} sizes="(max-width: 900px) calc(100vw - 48px), 640px" width={screen.width} height={screen.height} loading="lazy" decoding="async" alt={screen.alt} />
          </a>
          <figcaption>NanoAI 0.3.1. {screen.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
