import { HOME_PROOF_METRICS } from '../../content/siteContent';
import type { ProofMetric } from '../../types/site';

interface ProofRailProps {
  metrics?: readonly ProofMetric[];
}

export default function ProofRail({ metrics = HOME_PROOF_METRICS }: ProofRailProps) {
  return (
    <section className="proof-rail" aria-labelledby="proof-rail-title">
      <div className="content-shell proof-rail__inner">
        <p className="proof-rail__label" id="proof-rail-title">
          <span className="status-dot" aria-hidden="true" />
          Proven in our flagship architecture
        </p>
        <dl className="proof-rail__metrics">
          {metrics.map((metric) => (
            <div className="proof-metric" data-testid="proof-metric" key={`${metric.value}-${metric.label}`}>
              <dt>{metric.label}</dt>
              <dd className="proof-metric__value">{metric.value}</dd>
              <dd className="proof-metric__qualifier">{metric.qualifier}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
