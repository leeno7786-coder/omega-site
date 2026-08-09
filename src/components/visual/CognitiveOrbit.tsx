const nodes = [
  { label: 'Cognition', x: 110, y: 45, tone: 'teal' },
  { label: 'Runtime', x: 208, y: 113, tone: 'blue' },
  { label: 'Application', x: 169, y: 226, tone: 'teal' },
  { label: 'Machine', x: 48, y: 203, tone: 'blue' },
] as const;

export default function CognitiveOrbit() {
  return (
    <div className="cognitive-orbit" data-cognitive-orbit aria-hidden="true">
      <div className="cognitive-orbit__status">
        <span>System topology</span>
        <span className="cognitive-orbit__live">Coherent</span>
      </div>
      <svg viewBox="0 0 260 270" role="presentation">
        <circle className="orbit orbit--outer" cx="130" cy="137" r="104" />
        <circle className="orbit orbit--inner" cx="130" cy="137" r="64" />
        <path className="orbit__axis" d="M26 137h208M130 33v208" />
        <path className="orbit__signal" d="M110 45C179 38 229 88 208 113S216 203 169 226 74 252 48 203 36 79 110 45Z" />
        <circle className="orbit__core-pulse" cx="130" cy="137" r="21" />
        <circle className="orbit__core" cx="130" cy="137" r="8" />
        {nodes.map((node) => (
          <g key={node.label} className={`orbit__node orbit__node--${node.tone}`}>
            <circle cx={node.x} cy={node.y} r="6" />
            <text x={node.x} y={node.y - 13} textAnchor="middle">{node.label}</text>
          </g>
        ))}
      </svg>
      <div className="cognitive-orbit__readout">
        <span>04 integrated layers</span>
        <span>Local-first architecture</span>
      </div>
    </div>
  );
}
