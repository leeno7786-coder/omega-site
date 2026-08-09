import { PROCESS_STEPS } from '../../content/siteContent';
import type { ProcessStep } from '../../types/site';

interface EngagementProcessProps {
  steps?: readonly ProcessStep[];
}

export default function EngagementProcess({ steps = PROCESS_STEPS }: EngagementProcessProps) {
  return (
    <section className="section-space content-shell process-section" id="process" aria-labelledby="process-title">
      <div className="section-heading-grid">
        <p className="eyebrow">
          <span aria-hidden="true">04</span>
          How we work
        </p>
        <div>
          <h2 id="process-title">Bring us the difficult problem.</h2>
          <p>
            You do not need to arrive with the technical solution. Start with the goal, constraint,
            operational bottleneck, or idea—and we will determine what the system actually needs.
          </p>
          <a className="text-link" href="#project-inquiry">Tell us what is difficult</a>
        </div>
      </div>

      <ol className="process-grid">
        {steps.map((step, index) => (
          <li key={step.id}>
            <span className="process-grid__number">0{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
