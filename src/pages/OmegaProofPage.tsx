import SiteHeader from '../components/layout/SiteHeader';
import ProofDisclosure from '../components/proof/ProofDisclosure';
import image1024 from '../assets/ab_1024.webp';
import image1152 from '../assets/ab_1152.webp';
import image1280 from '../assets/ab_1280.webp';
import memoryGraph from '../assets/memory-graph.webp';

const architectureLayers = [
  { name: 'PRESSURE', role: 'Ignition', detail: 'Gathers contributing signals and decides whether a cognitive episode should begin.' },
  { name: 'GLOBAL A', role: 'Intent router', detail: 'Routes operator direction, autonomous curiosity, or reflex into the right pathway.' },
  { name: 'META A', role: 'Action pack', detail: 'Selects schema-bound tools and skills through deterministic dispatch.' },
  { name: 'AUTO', role: 'Model execution', detail: 'Runs model inference, code, browsing, voice, and other motor programs.' },
  { name: 'META B', role: 'Reflection', detail: 'Checks output, validates schemas, and prepares the outcome for higher loops.' },
  { name: 'GLOBAL B', role: 'Outcome', detail: 'Folds loop outputs into one episode package and closes the cognitive cycle.' },
  { name: 'OMEGA', role: 'Metacognition', detail: 'Performs 5W1H analysis of what happened, why, and how the system should adapt.' },
  { name: 'DEEPSLEEP', role: 'Consolidation', detail: 'Promotes important memories, decays weak traces, and closes the episode.' },
] as const;

const autonomousBehaviors = [
  {
    title: 'Proactive questioning',
    evidence: 'Identified a knowledge gap and initiated a clarifying question without waiting for another prompt.',
  },
  {
    title: 'Cross-session memory',
    evidence: 'Recovered the learning goal after a reboot through DeepSleep consolidation and episodic recall.',
  },
  {
    title: 'Metacognitive self-evaluation',
    evidence: 'Recognized that retrieved material was too advanced and requested more foundational sources.',
  },
  {
    title: 'Memory-directed learning',
    evidence: 'Synthesized operator guidance, committed it with provenance, and opened a tracked learning episode.',
  },
] as const;

const benchmarkCategories = [
  { name: 'Temporal reasoning', previous: '70.7%', current: '78.9%', delta: '+8.3' },
  { name: 'Multi-session', previous: '54.1%', current: '66.9%', delta: '+12.8' },
  { name: 'Single-session assistant', previous: '80.4%', current: '96.4%', delta: '+16.0' },
  { name: 'Knowledge update', previous: '71.8%', current: '80.8%', delta: '+9.0' },
  { name: 'Single-session user', previous: '92.9%', current: '94.3%', delta: '+1.4' },
  { name: 'Single-session preference', previous: '46.7%', current: '43.3%', delta: '−3.4' },
] as const;

const models = [
  { name: 'gemma_e4b', role: 'Primary cognition', type: 'LLM' },
  { name: 'embedding_gemma', role: 'Memory retrieval vectors', type: 'Encoder' },
  { name: 'whisper_large_v3_turbo_q4', role: 'Speech-to-text', type: 'Audio' },
  { name: 'kokoro', role: 'Text-to-speech', type: 'Audio' },
  { name: 'flux2-klein', role: 'Image generation', type: 'Diffusion' },
  { name: 'cosmos_reason2_8b', role: 'Vision reasoning', type: 'Vision' },
  { name: 'qwopus-4b-v3', role: 'Code and multimodal work', type: 'LLM' },
  { name: 'face_det_10g', role: 'Face detection', type: 'Vision' },
  { name: 'face_w600k_r50', role: 'Face embedding', type: 'Vision' },
  { name: 'face_2d106det', role: '2D landmarks', type: 'Vision' },
  { name: 'face_1k3d68', role: '3D landmarks', type: 'Vision' },
  { name: 'face_genderage', role: 'Demographic estimation', type: 'Vision' },
  { name: 'dme_overlap_matmul', role: 'Semantic overlap', type: 'Encoder' },
] as const;

interface RepositoryBase {
  name: string;
  description: string;
}

type Repository = RepositoryBase & (
  | { access: 'public'; href: `https://${string}` }
  | { access: 'private'; href: '/#project-inquiry' }
);

const repositories = [
  {
    name: 'Omega 3.0',
    description: 'Flagship autonomous cognitive architecture and shared proof source.',
    access: 'private',
    href: '/#project-inquiry',
  },
  {
    name: 'NanoAgent',
    description: 'Tiny-model-first autonomous CLI and TUI coding agent.',
    access: 'public',
    href: 'https://github.com/leeno7786-coder/nanoagent',
  },
  {
    name: 'Omega Memory MCP',
    description: 'Local-first MCP memory server with Dewey organization and verified recall.',
    access: 'private',
    href: '/#project-inquiry',
  },
  {
    name: 'Omega NPU Runtime',
    description: 'AMD Ryzen AI and Linux enablement work targeting XDNA NPUs.',
    access: 'public',
    href: 'https://github.com/leeno7786-coder/Omega-NPU-Runtime',
  },
] as const satisfies readonly Repository[];

export default function OmegaProofPage() {
  return (
    <div className="site-frame proof-page">
      <SiteHeader currentPage="omega-3" />
      <main id="main-content" tabIndex={-1}>
        <section className="proof-page-hero content-shell" aria-labelledby="proof-page-title">
          <div className="proof-page-hero__copy">
            <a aria-label="Back to company site" className="proof-page-hero__back" href="/">← Back to company site</a>
            <p className="eyebrow">
              <span aria-hidden="true">P-01</span>
              Working system / technical evidence
            </p>
            <h1 id="proof-page-title">Omega 3.0 technical proof</h1>
            <p className="proof-page-hero__lede">
              A metacognitive, local-first architecture that demonstrates how Omega AI solves cognition,
              memory, runtime, interface, operating-system, and hardware constraints as one system.
            </p>
          </div>

          <dl className="proof-page-hero__metrics">
            <div>
              <dt>Model orchestration</dt>
              <dd>13 specialized slots</dd>
            </div>
            <div>
              <dt>Validated footprint</dt>
              <dd>8 GB RAM</dd>
            </div>
            <div>
              <dt>Local architecture</dt>
              <dd>0 required cloud calls</dd>
            </div>
            <div>
              <dt>Current platforms</dt>
              <dd>Windows + Linux support</dd>
            </div>
          </dl>

          <nav className="proof-page-index" aria-label="Technical proof sections">
            {[
              ['Architecture', '#architecture'],
              ['Behavior', '#autonomous-behavior'],
              ['Benchmarks', '#benchmarks'],
              ['Runtime', '#runtime'],
              ['Memory', '#memory'],
              ['Agents', '#agent-layer'],
              ['Images', '#screenshots'],
              ['Portability', '#portability'],
              ['Repositories', '#repositories'],
            ].map(([label, href], index) => (
              <a href={href} key={href}><span>{String(index + 1).padStart(2, '0')}</span>{label}</a>
            ))}
          </nav>
        </section>

        <section className="proof-page__evidence content-shell" aria-label="Omega 3.0 evidence">
          <ProofDisclosure
            id="architecture"
            title="Architecture"
            summary="Eight deterministic cognitive layers from ignition through memory consolidation"
            defaultOpen
          >
            <p className="proof-body-intro">
              Omega 3.0 routes each episode through a named cascade. Model output is contained inside a
              larger deterministic loop that selects actions, evaluates results, closes outcomes, and learns.
            </p>
            <ol className="architecture-cascade">
              {architectureLayers.map((layer, index) => (
                <li key={layer.name}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{layer.name}</strong>
                  <small>{layer.role}</small>
                  <p>{layer.detail}</p>
                </li>
              ))}
            </ol>
            <div className="proof-interface-row">
              <span>HUD web interface</span>
              <span>TypeScript CLI bridge</span>
              <span>Browser automation</span>
              <span>Voice I/O</span>
              <span>Multi-agent bus</span>
            </div>
          </ProofDisclosure>

          <ProofDisclosure
            id="autonomous-behavior"
            title="Autonomous behavior"
            summary="Observed multi-turn behaviors: proactive questions, recall, self-evaluation, and learning"
            defaultOpen
          >
            <p className="proof-body-intro">
              The evidence is not a one-shot prompt response. It is a sequence in which the system initiates,
              remembers, evaluates, asks for correction, and commits what it learns.
            </p>
            <div className="behavior-grid">
              {autonomousBehaviors.map((behavior, index) => (
                <article key={behavior.title}>
                  <span>Behavior {String(index + 1).padStart(2, '0')}</span>
                  <h3>{behavior.title}</h3>
                  <p>{behavior.evidence}</p>
                </article>
              ))}
            </div>
            <div className="learning-loop" aria-label="Autonomous learning loop">
              <span>Ask</span><i>→</i><span>Learn</span><i>→</i><span>Theorize</span><i>→</i><span>Apply through code and dialogue</span>
            </div>
          </ProofDisclosure>

          <ProofDisclosure
            id="benchmarks"
            title="Benchmarks"
            summary="Qualified LongMemEval-S results with model, trial, retrieval, and judge context"
            defaultOpen
          >
            <div className="benchmark-lead">
              <p>86.4% headline LongMemEval-S (mistral-large)</p>
              <span>432 / 500 official headline</span>
            </div>
            <div className="benchmark-qualifiers">
              <p>Up to 78.0% with a local 4B model</p>
              <p>76.7% three-trial mean with gemma-4B</p>
              <p>+8.8 points from the retrieval rebuild: 69.2% → 78.0%</p>
              <p>Evaluated with gpt-4o-2024-08-06 using the official LongMemEval evaluator</p>
            </div>
            <div className="benchmark-table" role="table" aria-label="LongMemEval-S category results" tabIndex={0}>
              <div className="benchmark-table__header" role="row">
                <span role="columnheader">Category</span>
                <span role="columnheader">Round 2</span>
                <span role="columnheader">Current</span>
                <span role="columnheader">Change</span>
              </div>
              {benchmarkCategories.map((category) => (
                <div role="row" key={category.name}>
                  <span role="cell">{category.name}</span>
                  <span role="cell">{category.previous}</span>
                  <span role="cell">{category.current}</span>
                  <span role="cell">{category.delta}</span>
                </div>
              ))}
            </div>
          </ProofDisclosure>

          <ProofDisclosure
            id="runtime"
            title="Runtime"
            summary="Thirteen hot-swappable, GPU-leased, failure-soft model slots in a validated 8 GB footprint"
          >
            <p className="proof-body-intro">
              The local runtime assigns specialists to cognition, memory, speech, vision, diffusion, face analysis,
              code, and semantic overlap without requiring every model to remain resident at once.
            </p>
            <div className="model-table" role="table" aria-label="Omega 3.0 model roster" tabIndex={0}>
              {models.map((model, index) => (
                <div role="row" key={model.name}>
                  <span role="cell">{String(index + 1).padStart(2, '0')}</span>
                  <code role="cell">{model.name}</code>
                  <span role="cell">{model.role}</span>
                  <span role="cell">{model.type}</span>
                </div>
              ))}
            </div>
            <div className="proof-feature-row">
              <article><h3>GPU lease management</h3><p>Models request a lease, run, and release so specialists do not fight for memory.</p></article>
              <article><h3>Hot-swap slots</h3><p>Frequently used models can stay warm while specialist slots load only when called.</p></article>
              <article><h3>Failure-soft design</h3><p>An individual model failure degrades a capability without halting the cognitive loop.</p></article>
            </div>
          </ProofDisclosure>

          <ProofDisclosure
            id="memory"
            title="Memory"
            summary="Dewey-organized episodic memory, source lineage, recall verification, and live graph projection"
          >
            <div className="media-proof-grid">
              <figure>
                <img src={memoryGraph} alt="Omega 3.0 live memory node graph and settings panel" loading="lazy" />
                <figcaption>Live projection of the Dewey memory cortex</figcaption>
              </figure>
              <div>
                <p className="proof-body-intro">
                  Every promoted memory carries source, timestamp, and content context. The graph exposes semantic
                  relationships while the filesystem remains the canonical record.
                </p>
                <ul className="proof-list">
                  <li>Force-directed layout by semantic proximity</li>
                  <li>Click-through records with source and timestamp</li>
                  <li>Live growth as new memories are consolidated</li>
                  <li>Verifier-gated, source-ledgered recall</li>
                </ul>
              </div>
            </div>
          </ProofDisclosure>

          <ProofDisclosure
            id="agent-layer"
            title="Agent layer"
            summary="Local engineering agents, human specification authority, provider choice, and fallback paths"
          >
            <div className="agent-proof-grid">
              <div>
                <h3>Coordinated roles</h3>
                <ul className="proof-list">
                  <li>Claude Code Opus — architecture</li>
                  <li>Cursor — engineering</li>
                  <li>Devin / SWE-1.6 — mapping and audit</li>
                  <li>Operator — human specification authority</li>
                </ul>
              </div>
              <div>
                <h3>Provider-flexible execution</h3>
                <p>
                  Local inference remains the validated default architecture. Optional provider integrations and
                  fallback paths can be configured when a workload or customer constraint calls for them.
                </p>
                <div className="proof-tags">
                  {['OpenRouter', 'Anthropic', 'OpenAI', 'Google', 'Mistral', 'Groq', 'Azure', 'AWS Bedrock'].map((provider) => <span key={provider}>{provider}</span>)}
                </div>
              </div>
            </div>
          </ProofDisclosure>

          <ProofDisclosure
            id="screenshots"
            title="Image evidence"
            summary="Three local diffusion tiers generated up to 1280 × 1280 within the 8 GB system budget"
          >
            <p className="proof-body-intro">
              These retained outputs document local image generation at three resolution tiers with no required cloud call.
            </p>
            <div className="image-evidence-grid">
              {[
                { source: image1024, resolution: '1024 × 1024', label: 'Standard' },
                { source: image1152, resolution: '1152 × 1152', label: 'High' },
                { source: image1280, resolution: '1280 × 1280', label: 'Ultra' },
              ].map((image) => (
                <figure key={image.resolution}>
                  <img src={image.source} alt={`Omega 3.0 locally generated ${image.resolution} output`} loading="lazy" />
                  <figcaption><span>{image.label}</span>{image.resolution}</figcaption>
                </figure>
              ))}
            </div>
          </ProofDisclosure>

          <ProofDisclosure
            id="portability"
            title="Portability"
            summary="Portable local deployment with Windows validation and Linux support available"
          >
            <p className="proof-body-intro">
              The validated portable configuration runs from a 1–2 TB SSD with an 8 GB minimum memory target and
              has been demonstrated on Windows hardware including an AMD 860M integrated GPU. Linux support is available
              for custom deployments and system integration.
            </p>
            <dl className="portability-grid">
              <div><dt>Storage</dt><dd>1–2 TB SSD</dd><span>System, models, and memory</span></div>
              <div><dt>Memory</dt><dd>8 GB minimum</dd><span>Validated runtime footprint</span></div>
              <div><dt>Validated GPU</dt><dd>AMD 860M</dd><span>Integrated graphics demonstration</span></div>
              <div><dt>Operating systems</dt><dd>Windows + Linux</dd><span>Windows evidence; Linux support available</span></div>
            </dl>
          </ProofDisclosure>

          <ProofDisclosure
            id="repositories"
            title="Repositories"
            summary="Review available source and discuss the private flagship and memory systems."
            defaultOpen
          >
            <div className="repository-grid">
              {repositories.map((repository) => (
                <a
                  href={repository.href}
                  target={repository.access === 'public' ? '_blank' : undefined}
                  rel={repository.access === 'public' ? 'noreferrer' : undefined}
                  key={repository.name}
                >
                  <span>
                    {repository.access === 'public' ? 'Public repository' : 'Private engineering repository'}
                    {repository.access === 'public' && <span aria-hidden="true"> ↗</span>}
                  </span>
                  <h3>{repository.name}</h3>
                  <p>{repository.description}</p>
                </a>
              ))}
            </div>
          </ProofDisclosure>
        </section>

        <section className="proof-page-cta content-shell" aria-labelledby="proof-cta-title">
          <p className="eyebrow">What the proof means</p>
          <h2 id="proof-cta-title">This is evidence of how we engineer—not a limit on what we build.</h2>
          <p>
            Bring Omega AI an autonomous system, custom runtime, application, Linux deployment, integration,
            or machine that does not fit an off-the-shelf answer.
          </p>
          <a className="button button--primary" href="/#project-inquiry">Start a project</a>
        </section>
      </main>
    </div>
  );
}
