import { useEffect, useRef } from 'react';
import { NANO_APPS } from '../../content/nanoAppsContent';

export default function NanoAppsSpotlight() {
  const content = NANO_APPS;
  const videoRef = useRef<HTMLVideoElement>(null);

  // The demo plays muted by itself, except for visitors who ask for reduced motion; the controls are always there.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof window.matchMedia !== 'function') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.removeAttribute('autoplay');
      video.pause();
    }
  }, []);

  return (
    <section className="nano-apps" id="nano-apps" aria-labelledby="nano-apps-title">
      <div className="content-shell nano-apps__inner">
        <div className="nano-apps__copy">
          <p className="eyebrow nano-apps__eyebrow">{content.eyebrow}</p>
          <h2 id="nano-apps-title">{content.title}</h2>
          <p className="nano-apps__lede">{content.description}</p>
          <ol className="nano-apps__steps" aria-label="How Nano works">
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
            <a className="button button--primary" href={content.href} target="_blank" rel="noreferrer">
              {content.action}<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
        <figure className="nano-apps__media">
          <video
            ref={videoRef}
            src={content.video.src}
            poster={content.video.poster}
            width={content.video.width}
            height={content.video.height}
            aria-label={content.video.label}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
          />
          <figcaption>{content.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
