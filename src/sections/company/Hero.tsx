import CognitiveOrbit from '../../components/visual/CognitiveOrbit';
import { HERO_CONTENT } from '../../content/siteContent';

export default function Hero() {
  return (
    <section className="hero content-shell" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="eyebrow">
          <span aria-hidden="true">01</span>
          {HERO_CONTENT.eyebrow}
        </p>
        <h1 id="hero-title">{HERO_CONTENT.headline}</h1>
        <p className="hero__lede">{HERO_CONTENT.description}</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#project-inquiry">{HERO_CONTENT.primaryAction}</a>
          <a className="button button--secondary" href="/omega-3/">{HERO_CONTENT.secondaryAction}</a>
        </div>
        <p className="hero__scope">
          <span>AI research</span>
          <span>Software</span>
          <span>Linux</span>
          <span>Hardware</span>
        </p>
      </div>
      <div className="hero__visual">
        <CognitiveOrbit />
      </div>
    </section>
  );
}
