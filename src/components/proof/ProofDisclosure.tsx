import type { ReactNode } from 'react';

interface ProofDisclosureProps {
  id: string;
  title: string;
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function ProofDisclosure({
  id,
  title,
  summary,
  children,
  defaultOpen = false,
}: ProofDisclosureProps) {
  return (
    <details className="proof-disclosure" id={id} open={defaultOpen}>
      <summary>
        <span className="proof-disclosure__marker" aria-hidden="true" />
        <span>
          <h2>{title}</h2>
          <p>{summary}</p>
        </span>
        <span className="proof-disclosure__toggle" aria-hidden="true" />
      </summary>
      <div className="proof-disclosure__body">{children}</div>
    </details>
  );
}
