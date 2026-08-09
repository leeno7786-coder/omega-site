import { COMPANY_CONTENT, FOUNDERS } from '../../content/siteContent';
import type { Founder } from '../../types/site';

interface CompanyOverviewProps {
  founders?: readonly Founder[];
}

const principles = [
  {
    title: 'Original by design',
    description: 'We engineer around the real problem instead of forcing it into a prepackaged product.',
  },
  {
    title: 'Complete-system thinking',
    description: 'Intelligence, runtime, interface, operating system, and machine are treated as connected decisions.',
  },
  {
    title: 'Evidence before adjectives',
    description: 'Working systems, measured constraints, qualified benchmarks, and inspectable artifacts carry the claim.',
  },
] as const;

export default function CompanyOverview({ founders = FOUNDERS }: CompanyOverviewProps) {
  return (
    <section className="company-section" id="company" aria-labelledby="company-title">
      <div className="content-shell company-section__inner">
        <div className="company-section__statement">
          <p className="eyebrow">
            <span aria-hidden="true">05</span>
            Company
          </p>
          <p className="company-section__positioning">{COMPANY_CONTENT.eyebrow}</p>
          <h2 id="company-title">{COMPANY_CONTENT.heading}</h2>
          <p>{COMPANY_CONTENT.description}</p>
        </div>

        <ul className="company-principles" aria-label="Company principles">
          {principles.map((principle) => (
            <li key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </li>
          ))}
        </ul>

        <div className="founder-list" aria-label="Omega AI LLC founders">
          <p>Founded and led by</p>
          <ul>
            {founders.map((founder) => (
              <li key={founder.name}>
                <span className="founder-list__initials" aria-hidden="true">{founder.initials}</span>
                <span>
                  <strong>{founder.name}</strong>
                  <small>{founder.role}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
