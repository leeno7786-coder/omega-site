import SiteHeader from '../components/layout/SiteHeader';
import { AUTONOMOUS_SYSTEMS_PAGE } from '../content/siteContent';

export default function AutonomousSystemsPage() {
  return (
    <div className="site-frame proof-page">
      <SiteHeader currentPage="autonomous-systems" />
      <main id="main-content" tabIndex={-1}>
        <section className="proof-page-hero content-shell" aria-labelledby="autonomous-systems-title">
          <div className="proof-page-hero__copy">
            <a aria-label="Back to company site" className="proof-page-hero__back" href="/">← Back to company site</a>
            <p className="eyebrow">
              <span aria-hidden="true">C-05</span>
              Capability
            </p>
            <h1 id="autonomous-systems-title">{AUTONOMOUS_SYSTEMS_PAGE.title}</h1>
            <p className="proof-page-hero__lede">{AUTONOMOUS_SYSTEMS_PAGE.copy}</p>
          </div>
        </section>

        <section className="content-shell section-space" aria-labelledby="disciplines-title">
          <p className="eyebrow">
            <span aria-hidden="true">01</span>
            Disciplines
          </p>
          <h2 id="disciplines-title">What this work covers</h2>
          <div className="discipline-grid">
            {AUTONOMOUS_SYSTEMS_PAGE.disciplines.map((item, index) => (
              <article key={item.title}>
                <span>D-{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-shell sbir-panel" aria-labelledby="sbir-title">
          <p className="eyebrow">
            <span aria-hidden="true">02</span>
            SBIR pursuit
          </p>
          <p className="sbir-panel__status">
            {AUTONOMOUS_SYSTEMS_PAGE.sbirStatus} · {AUTONOMOUS_SYSTEMS_PAGE.sbirYear}
          </p>
          <h2 id="sbir-title">Public statement</h2>
          <p className="sbir-panel__statement">{AUTONOMOUS_SYSTEMS_PAGE.sbirStatement}</p>
          <p className="sbir-panel__note">{AUTONOMOUS_SYSTEMS_PAGE.sbirNote}</p>
        </section>

        <section className="proof-page-cta content-shell" aria-labelledby="autonomous-cta-title">
          <p className="eyebrow">Next step</p>
          <h2 id="autonomous-cta-title">Discuss this capability.</h2>
          <p>Engagements begin with a focused conversation about fit, constraints, and technical direction.</p>
          <a className="button button--primary" href="/#project-inquiry">Start a project</a>
        </section>
      </main>
    </div>
  );
}
