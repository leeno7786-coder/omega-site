import { NANOAI_SETUP, nanoAiImageSource, nanoAiImageSrcSet } from '../../content/nanoaiContent';

export default function NanoAiPreview() {
  const screen = NANOAI_SETUP;

  return (
    <article className="nanoai-preview" aria-labelledby="nanoai-preview-title" data-featured-system="nanoai">
      <div className="nanoai-preview__copy">
        <p className="eyebrow">Featured platform / Out now for Windows</p>
        <h3 id="nanoai-preview-title">NanoAI</h3>
        <p className="nanoai-preview__tagline">Bring your PC to life.</p>
        <p>Switch on Live mode and Nano runs your Windows PC for you, hands-free. In the app, it works on an Ubuntu computer of its own, with your connected accounts, memory that learns and tasks that run on a schedule.</p>
        <ul aria-label="NanoAI highlights"><li>Live mode, hands-free</li><li>Nano’s own computer</li><li>Free with your own model</li></ul>
        <a className="text-link" href="/nanoai/" aria-label="Explore NanoAI">Explore NanoAI</a>
      </div>
      <figure>
        <a href="/nanoai/#proof" aria-label="See NanoAI's screens">
          <img src={nanoAiImageSource(screen)} srcSet={nanoAiImageSrcSet(screen)} sizes="(max-width: 900px) calc(100vw - 64px), 620px" width={screen.width} height={screen.height} loading="lazy" decoding="async" alt={screen.alt} />
        </a>
        <figcaption>NanoAI 0.3.1 · The setup guide: Nano Cloud, or a free model on your PC</figcaption>
      </figure>
    </article>
  );
}
