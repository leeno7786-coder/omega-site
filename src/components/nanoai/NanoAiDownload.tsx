import { NANOAI_LINKS } from '../../content/nanoaiContent';

/** Where the NanoAI page sends visitors to get the app: the installer and Nano Cloud live at omega-dev.uk. */
export default function NanoAiDownload() {
  return (
    <section className="nanoai-section content-shell inquiry-section__grid" id="download" aria-labelledby="nanoai-download-title">
      <div className="inquiry-section__intro">
        <p className="eyebrow">07 / Download</p>
        <h2 id="nanoai-download-title">Get NanoAI<br />for Windows.</h2>
        <p>One signed installer from Omega AI. NanoAI, its memory, voice and plugins run on your PC, and it keeps itself up to date.</p>
        <dl className="inquiry-section__expectations">
          <div>
            <dt>You’ll need</dt>
            <dd>A Windows 10 or 11 PC (64-bit) with room for a download of a few gigabytes</dd>
          </div>
          <div>
            <dt>Then</dt>
            <dd>Accept the license agreement and choose where to install. A short setup guide helps you choose where Nano thinks.</dd>
          </div>
        </dl>
      </div>
      <div className="nanoai-download">
        <article className="nanoai-download__option" aria-labelledby="nanoai-download-own">
          <h3 id="nanoai-download-own">Your own model</h3>
          <p className="nanoai-download__price">Free</p>
          <ul>
            <li>Everything NanoAI can do, with no account</li>
            <li>The model runs on your PC, so its processing stays there</li>
            <li>Needs a PC that can run a capable local model</li>
          </ul>
        </article>
        <article className="nanoai-download__option" aria-labelledby="nanoai-download-cloud">
          <h3 id="nanoai-download-cloud">Nano Cloud</h3>
          <p className="nanoai-download__price">From $20 a month</p>
          <ul>
            <li>Nano’s hosted model, with nothing to set up</li>
            <li>Plus, Pro or Max, monthly or yearly with 2 months free</li>
            <li>One plan for every PC you sign in on, with a weekly allowance</li>
          </ul>
        </article>
        <div className="nanoai-actions">
          <a className="button button--primary" href={NANOAI_LINKS.download}>Download for Windows</a>
          <a className="nanoai-secondary" href={NANOAI_LINKS.plans} target="_blank" rel="noreferrer">Compare Nano Cloud plans <span aria-hidden="true">↗</span></a>
          <a className="nanoai-secondary" href={NANOAI_LINKS.account} target="_blank" rel="noreferrer">Your Nano Cloud account <span aria-hidden="true">↗</span></a>
        </div>
        <p className="nanoai-download__fine">Prices in US dollars, plus sales tax where it applies. Plans renew until you cancel, and Nano Cloud is sold in the United States. See the <a href="https://cloud.omega-dev.uk/terms" target="_blank" rel="noreferrer">terms</a> and the <a href="/nanoai/privacy/">NanoAI privacy policy</a>.</p>
      </div>
    </section>
  );
}
