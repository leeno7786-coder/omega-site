import { NANOAI_DESKTOP, nanoAiImageSource, nanoAiImageSrcSet } from '../../content/nanoaiContent';

export default function NanoAiPreview() {
  const work = NANOAI_DESKTOP;

  return (
    <article className="nanoai-preview" aria-labelledby="nanoai-preview-title" data-featured-system="nanoai">
      <div className="nanoai-preview__copy">
        <p className="eyebrow">Featured platform / Working system</p>
        <h3 id="nanoai-preview-title">NanoAI</h3>
        <p className="nanoai-preview__tagline">Bring your PC to life.</p>
        <p>Talk to a compact Windows voice companion that remembers context and works in your actual applications. Explore the full workspace for a separate Ubuntu computer, saved autonomous Work, specialist roles and connected tools.</p>
        <ul aria-label="NanoAI platforms"><li>Windows voice companion</li><li>Actual computer use</li><li>Local or Azure models</li></ul>
        <a className="text-link" href="/nanoai/" aria-label="Explore NanoAI">Explore NanoAI</a>
      </div>
      <figure>
        <a href="/nanoai/#proof" aria-label="See NanoAI computer-use evidence">
          <img src={nanoAiImageSource(work)} srcSet={nanoAiImageSrcSet(work)} sizes="(max-width: 900px) calc(100vw - 64px), 620px" width={work.width} height={work.height} loading="lazy" decoding="async" alt={work.alt} />
        </a>
        <figcaption>Actual full-workspace interface · Windows activity and task continuation</figcaption>
      </figure>
    </article>
  );
}
