import { OMEGA_PROOF_CONTENT } from '../../content/siteContent';

const proofFacts = [
  { value: 'Cognition', detail: 'Metacognitive evaluation and deterministic control loops' },
  { value: 'Runtime', detail: '13 specialized model slots inside a validated 8 GB footprint' },
  { value: 'Memory', detail: OMEGA_PROOF_CONTENT.headlineBenchmark },
  { value: 'Local', detail: OMEGA_PROOF_CONTENT.localBenchmark },
  { value: 'Systems', detail: 'Linux deployment and support alongside hardware-aware optimization' },
] as const;

const evidenceLinks = [
  { label: 'Architecture', href: '/omega-3/#architecture' },
  { label: 'Benchmarks', href: '/omega-3/#benchmarks' },
  { label: 'Repositories', href: 'https://github.com/leeno7786-coder/Omega3.0', external: true },
  { label: 'Screenshots', href: '/omega-3/#screenshots' },
] as const;

export default function OmegaProofPreview() {
  return (
    <section className="proof-preview" id="proof" aria-labelledby="proof-preview-title">
      <div className="content-shell proof-preview__grid">
        <div className="proof-preview__copy">
          <p className="eyebrow">
            <span aria-hidden="true">03</span>
            Flagship proof / Omega 3.0
          </p>
          <h2 id="proof-preview-title">{OMEGA_PROOF_CONTENT.heading}</h2>
          <p className="proof-preview__statement">{OMEGA_PROOF_CONTENT.statement}</p>
          <a className="text-link" href="/omega-3/">Explore the technical proof</a>
          <nav className="evidence-links" aria-label="Omega 3.0 evidence">
            {evidenceLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={'external' in link && link.external ? '_blank' : undefined}
                rel={'external' in link && link.external ? 'noreferrer' : undefined}
              >
                {link.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="proof-stack" aria-label="Omega 3.0 engineering evidence">
          <div className="proof-stack__topline">
            <span>Validated architecture</span>
            <span className="proof-stack__state">Working system</span>
          </div>
          <ol>
            {proofFacts.map((fact, index) => (
              <li key={fact.value}>
                <span className="proof-stack__index">0{index + 1}</span>
                <strong>{fact.value}</strong>
                <p>{fact.detail}</p>
              </li>
            ))}
          </ol>
          <p className="proof-stack__footnote">
            Claims are qualified by model, hardware, trial, and benchmark context on the proof page.
          </p>
        </div>
      </div>
    </section>
  );
}
