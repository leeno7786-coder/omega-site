import { useState, type ChangeEvent, type FormEvent } from 'react';
import { NANOAI_BETA_DISK, NANOAI_BETA_MEMORY, NANOAI_BETA_WINDOWS } from '../../content/nanoaiContent';
import { submitNanoAiBetaRequest } from '../../lib/netlifyForms';
import type { NanoAiBetaRequest } from '../../types/site';

interface NanoAiBetaFormProps {
  submit?: typeof submitNanoAiBetaRequest;
}

const EMPTY_REQUEST: NanoAiBetaRequest = {
  name: '',
  email: '',
  company: '',
  use: '',
  windows: '',
  processor: '',
  graphics: '',
  memory: '',
  disk: '',
  consent: '',
  'bot-field': '',
};

type DeliveryState = 'idle' | 'sending' | 'success' | 'error';

export default function NanoAiBetaForm({ submit = submitNanoAiBetaRequest }: NanoAiBetaFormProps) {
  const [request, setRequest] = useState<NanoAiBetaRequest>({ ...EMPTY_REQUEST });
  const [deliveryState, setDeliveryState] = useState<DeliveryState>('idle');

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof NanoAiBetaRequest;
    const value = event.target instanceof HTMLInputElement && event.target.type === 'checkbox'
      ? (event.target.checked ? 'yes' : '')
      : event.target.value;
    setRequest((current) => ({ ...current, [field]: value }));
    if (deliveryState === 'error' || deliveryState === 'success') setDeliveryState('idle');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (deliveryState === 'sending') return;
    setDeliveryState('sending');
    try {
      await submit(request);
      setRequest({ ...EMPTY_REQUEST });
      setDeliveryState('success');
    } catch {
      setDeliveryState('error');
    }
  };

  const select = (id: string, name: keyof NanoAiBetaRequest, label: string, options: readonly string[]) => (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} value={request[name]} onChange={updateField} required>
        <option value="" disabled>Choose one</option>
        {options.map((option) => <option value={option} key={option}>{option}</option>)}
      </select>
    </div>
  );

  return (
    <section className="nanoai-section content-shell inquiry-section__grid" id="beta" aria-labelledby="nanoai-beta-title">
      <div className="inquiry-section__intro">
        <p className="eyebrow">07 / Beta</p>
        <h2 id="nanoai-beta-title">Try NanoAI<br />on your PC.</h2>
        <p>
          The beta is one Windows download. NanoAI, its memory, voice and plugins run on your PC. Omega AI provides the
          model through Nano Cloud, so you don’t need an AI account of your own.
        </p>
        <p>Tell us about your PC. We use these details to send the setup that fits your hardware, and we invite testers in small groups.</p>
        <dl className="inquiry-section__expectations">
          <div>
            <dt>You’ll need</dt>
            <dd>A Windows 10 or 11 PC (64-bit) with room for a download of a few gigabytes</dd>
          </div>
          <div>
            <dt>Next step</dt>
            <dd>We email you when a place opens, with the download and setup steps</dd>
          </div>
        </dl>
      </div>

      <form
        className="inquiry-form"
        name="nanoai-beta"
        method="POST"
        action="/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="nanoai-beta" />
        <p className="honeypot" aria-hidden="true">
          <label htmlFor="beta-bot-field">Do not fill this out</label>
          <input id="beta-bot-field" name="bot-field" value={request['bot-field']} onChange={updateField} tabIndex={-1} autoComplete="off" />
        </p>

        <div className="form-field">
          <label htmlFor="beta-name">Name</label>
          <input id="beta-name" name="name" value={request.name} onChange={updateField} autoComplete="name" required />
        </div>

        <div className="form-field">
          <label htmlFor="beta-email">Email</label>
          <input id="beta-email" name="email" type="email" value={request.email} onChange={updateField} autoComplete="email" required />
        </div>

        <div className="form-field form-field--wide">
          <label htmlFor="beta-company">Company (optional)</label>
          <input id="beta-company" name="company" value={request.company} onChange={updateField} autoComplete="organization" />
        </div>

        <div className="form-field form-field--wide">
          <label htmlFor="beta-use">What would you use NanoAI for?</label>
          <textarea id="beta-use" name="use" value={request.use} onChange={updateField} rows={4} required />
        </div>

        {select('beta-windows', 'windows', 'Windows version', NANOAI_BETA_WINDOWS)}
        {select('beta-memory', 'memory', 'Memory (RAM)', NANOAI_BETA_MEMORY)}

        <div className="form-field form-field--wide">
          <label htmlFor="beta-processor">Processor</label>
          <input id="beta-processor" name="processor" value={request.processor} onChange={updateField} required />
          <small>Find it in Settings → System → About, for example AMD Ryzen 7 7840HS or Intel Core i7-13700K.</small>
        </div>

        <div className="form-field form-field--wide">
          <label htmlFor="beta-graphics">Graphics</label>
          <input id="beta-graphics" name="graphics" value={request.graphics} onChange={updateField} required />
          <small>Find it in Task Manager → Performance → GPU. List each GPU shown, or write none.</small>
        </div>

        {select('beta-disk', 'disk', 'Free disk space', NANOAI_BETA_DISK)}

        <div className="form-field form-field--wide form-consent">
          <input id="beta-consent" name="consent" type="checkbox" value="yes" checked={request.consent === 'yes'} onChange={updateField} required />
          <div>
            <label htmlFor="beta-consent">Omega AI may email me about the NanoAI beta and use these details to choose my setup.</label>
            <small>See the <a href="/nanoai/privacy/">NanoAI privacy policy</a>.</small>
          </div>
        </div>

        <div className="inquiry-form__actions form-field--wide">
          <button className="button button--primary" type="submit" disabled={deliveryState === 'sending'}>
            {deliveryState === 'sending' ? 'Sending…' : 'Request a beta place'}
          </button>
        </div>

        {deliveryState === 'success' ? (
          <p className="form-status form-status--success form-field--wide" role="status">
            <strong>Beta request received</strong>
            We’ll email you when a place opens.
          </p>
        ) : null}

        {deliveryState === 'error' ? (
          <p className="form-status form-status--error form-field--wide" role="alert">
            We could not send your request. Your details are still here. Retry, or email{' '}
            <a href="mailto:nanoai@omega2ai.com">nanoai@omega2ai.com</a>.
          </p>
        ) : null}
      </form>
    </section>
  );
}
