import { NANOAI_SCREENSHOTS, nanoAiImageSource, nanoAiImageSrcSet } from '../../content/nanoaiContent';

export default function NanoAiPreview() {
  const work = NANOAI_SCREENSHOTS[0];

  return (
    <article className="nanoai-preview" aria-labelledby="nanoai-preview-title" data-featured-system="nanoai">
      <div className="nanoai-preview__copy">
        <p className="eyebrow">Featured platform / Working system</p>
        <h3 id="nanoai-preview-title">NanoAI</h3>
        <p className="nanoai-preview__tagline">Your AI workspace. Your models. Your machine.</p>
        <p>A self-hosted AI platform for persistent memory, autonomous Work, specialist agents, browser and plugin tools, and local multimodal creation.</p>
        <ul aria-label="NanoAI platforms"><li>Windows + Linux hosts</li><li>LM Studio models</li><li>Android remote access</li></ul>
        <a className="text-link" href="/nanoai/" aria-label="Explore NanoAI">Explore NanoAI</a>
      </div>
      <figure>
        <a href="/nanoai/#proof" aria-label="See NanoAI Work evidence">
          <img src={nanoAiImageSource(work)} srcSet={nanoAiImageSrcSet(work)} sizes="(max-width: 900px) calc(100vw - 64px), 620px" width={work.width} height={work.height} loading="lazy" decoding="async" alt={work.alt} />
        </a>
        <figcaption>Actual NanoAI interface · One documented 24-step Work run</figcaption>
      </figure>
    </article>
  );
}
