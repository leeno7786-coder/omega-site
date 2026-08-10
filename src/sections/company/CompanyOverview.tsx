import { COMPANY_CONTENT } from '../../content/siteContent';
import FounderProfileSection from './FounderProfile';

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

export default function CompanyOverview() {
  return (
    <section className="company-section" id="company" aria-labelledby="company-title">
      <div className="content-shell company-section__inner">
        <div className="company-section__statement">
          <p className="eyebrow">
            <span aria-hidden="true">06</span>
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

        <FounderProfileSection />
      </div>
    </section>
  );
}
