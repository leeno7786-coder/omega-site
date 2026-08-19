import { CAPABILITIES, CAPABILITY_FLOW } from '../../content/siteContent';
import type { Capability } from '../../types/site';

interface CapabilitiesProps {
  items?: readonly Capability[];
}

export default function Capabilities({ items = CAPABILITIES }: CapabilitiesProps) {
  return (
    <section className="section-space content-shell" id="capabilities" aria-labelledby="capabilities-title">
      <div className="section-heading-grid">
        <p className="eyebrow">
          <span aria-hidden="true">02</span>
          Capabilities
        </p>
        <div>
          <h2 id="capabilities-title">Original intelligence. Complete systems.</h2>
          <p>
            Bring us one difficult layer or the whole problem. We connect research, runtime engineering,
            product software, Linux, and hardware without losing the system-level view.
          </p>
        </div>
      </div>

      <div className="capability-grid">
        {items.map((item, index) => (
          <article
            className={item.href ? 'capability-card capability-card--wide' : 'capability-card'}
            key={item.id}
          >
            <div className="capability-card__meta">
              <span>C-{String(index + 1).padStart(2, '0')}</span>
              <span>{item.tags.length} disciplines</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ul>
              {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            {item.href ? (
              <a className="capability-card__action" href={item.href}>
                View capability
              </a>
            ) : null}
          </article>
        ))}
      </div>

      <div className="capability-flow" aria-label="Complete system flow">
        <span>Complete-system ownership</span>
        <strong>{CAPABILITY_FLOW.join(' → ')}</strong>
        <span>Or engage at any layer</span>
      </div>
    </section>
  );
}
