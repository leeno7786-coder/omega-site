import { SELECTED_SYSTEMS } from '../../content/siteContent';
import type { SelectedSystem } from '../../types/site';

interface SelectedSystemsProps {
  systems?: readonly SelectedSystem[];
}

function SystemAction({ system }: { system: SelectedSystem }) {
  const isExternal = system.action === 'external';

  return (
    <a
      aria-label={`${system.linkLabel}: ${system.title}`}
      className="system-dossier__action"
      href={system.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      {system.linkLabel}<span aria-hidden="true">{isExternal ? '↗' : '→'}</span>
    </a>
  );
}

export default function SelectedSystems({ systems = SELECTED_SYSTEMS }: SelectedSystemsProps) {
  const featured = systems.filter((system) => system.tier === 'featured');
  const supporting = systems.filter((system) => system.tier === 'supporting');

  return (
    <section className="selected-systems" id="selected-systems" aria-labelledby="selected-systems-title">
      <div className="content-shell selected-systems__inner">
        <div className="selected-systems__intro">
          <p className="eyebrow"><span aria-hidden="true">04</span>Selected systems</p>
          <div>
            <h2 id="selected-systems-title">Different problems. Working systems.</h2>
            <p>Created by Noah Lee, these systems span autonomous agents, local inference, persistent memory, and production software.</p>
          </div>
        </div>

        <div className="selected-systems__featured">
          {featured.map((system) => (
            <article
              className={`system-dossier system-dossier--${system.id}`}
              data-featured-system={system.id}
              key={system.id}
            >
              <div className="system-dossier__topline">
                <span>{system.status}</span>
                <span>{system.id === 'omega-browser-agent' ? 'Local → cloud' : 'Live product'}</span>
              </div>
              <h3>{system.title}</h3>
              <p>{system.summary}</p>
              <ul aria-label={`${system.title} evidence`}>
                {system.evidence.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <SystemAction system={system} />
            </article>
          ))}
        </div>

        <div className="supporting-systems" aria-label="Supporting systems">
          {supporting.map((system, index) => (
            <article className="supporting-system" key={system.id}>
              <div className="supporting-system__index">0{index + 1}</div>
              <p className="supporting-system__status">{system.status}</p>
              <h3>{system.title}</h3>
              <p>{system.summary}</p>
              <ul aria-label={`${system.title} technologies`}>
                {system.evidence.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <SystemAction system={system} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
