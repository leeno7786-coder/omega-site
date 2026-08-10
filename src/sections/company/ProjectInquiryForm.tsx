import { useState, type ChangeEvent, type FormEvent } from 'react';
import { CONTACT_EMAILS, PROJECT_CATEGORIES } from '../../content/siteContent';
import { submitProjectInquiry } from '../../lib/netlifyForms';
import type { ProjectInquiryPayload } from '../../types/site';

interface ProjectInquiryFormProps {
  submit?: typeof submitProjectInquiry;
}

const EMPTY_INQUIRY: ProjectInquiryPayload = {
  name: '',
  email: '',
  company: '',
  category: '',
  description: '',
  'bot-field': '',
};

type DeliveryState = 'idle' | 'sending' | 'success' | 'error';

export default function ProjectInquiryForm({ submit = submitProjectInquiry }: ProjectInquiryFormProps) {
  const [inquiry, setInquiry] = useState<ProjectInquiryPayload>({ ...EMPTY_INQUIRY });
  const [deliveryState, setDeliveryState] = useState<DeliveryState>('idle');

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof ProjectInquiryPayload;
    const value = event.target.value;
    setInquiry((current) => ({ ...current, [field]: value }));
    if (deliveryState === 'error' || deliveryState === 'success') setDeliveryState('idle');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (deliveryState === 'sending') return;
    setDeliveryState('sending');

    try {
      await submit(inquiry);
      setInquiry({ ...EMPTY_INQUIRY });
      setDeliveryState('success');
    } catch {
      setDeliveryState('error');
    }
  };

  return (
    <section className="inquiry-section" id="project-inquiry" aria-labelledby="inquiry-title">
      <div className="content-shell inquiry-section__grid">
        <div className="inquiry-section__intro">
          <p className="eyebrow">
            <span aria-hidden="true">07</span>
            Start a project
          </p>
          <h2 id="inquiry-title">What are you trying to build?</h2>
          <p>
            Describe the idea, the constraint, or the result you need. It is fine if the right technology is
            still unclear—that is part of the work.
          </p>

          <div className="inquiry-section__direct">
            <span>Prefer email?</span>
            {CONTACT_EMAILS.map((email) => <a href={`mailto:${email}`} key={email}>{email}</a>)}
          </div>

          <dl className="inquiry-section__expectations">
            <div>
              <dt>Useful first detail</dt>
              <dd>The problem, goal, users, constraints, or environment</dd>
            </div>
            <div>
              <dt>Next step</dt>
              <dd>A focused conversation about fit, scope, and technical direction</dd>
            </div>
          </dl>
        </div>

        <form
          className="inquiry-form"
          name="project-inquiry"
          method="POST"
          action="/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="project-inquiry" />
          <p className="honeypot" aria-hidden="true">
            <label htmlFor="bot-field">Do not fill this out</label>
            <input
              id="bot-field"
              name="bot-field"
              value={inquiry['bot-field']}
              onChange={updateField}
              tabIndex={-1}
              autoComplete="off"
            />
          </p>

          <div className="form-field">
            <label htmlFor="inquiry-name">Name</label>
            <input
              id="inquiry-name"
              name="name"
              value={inquiry.name}
              onChange={updateField}
              autoComplete="name"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="inquiry-email">Work email</label>
            <input
              id="inquiry-email"
              name="email"
              type="email"
              value={inquiry.email}
              onChange={updateField}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-field form-field--wide">
            <label htmlFor="inquiry-company">Company (optional)</label>
            <input
              id="inquiry-company"
              name="company"
              value={inquiry.company}
              onChange={updateField}
              autoComplete="organization"
            />
          </div>

          <div className="form-field form-field--wide">
            <label htmlFor="inquiry-category">Project category</label>
            <select
              id="inquiry-category"
              name="category"
              value={inquiry.category}
              onChange={updateField}
              required
            >
              <option value="" disabled>Choose the closest fit</option>
              {PROJECT_CATEGORIES.map((category) => <option value={category} key={category}>{category}</option>)}
            </select>
          </div>

          <div className="form-field form-field--wide">
            <label htmlFor="inquiry-description">Project description</label>
            <textarea
              id="inquiry-description"
              name="description"
              value={inquiry.description}
              onChange={updateField}
              rows={7}
              required
            />
            <small>Share what success looks like and any important technical, timing, data, or hardware constraints.</small>
          </div>

          <div className="inquiry-form__actions form-field--wide">
            <button className="button button--primary" type="submit" disabled={deliveryState === 'sending'}>
              {deliveryState === 'sending' ? 'Sending…' : 'Send project inquiry'}
            </button>
            <p>By sending this form, you agree that Omega AI may use these details to respond to your inquiry.</p>
          </div>

          {deliveryState === 'success' ? (
            <p className="form-status form-status--success form-field--wide" role="status">
              <strong>Project inquiry received</strong>
              We have your message and will follow up by email.
            </p>
          ) : null}

          {deliveryState === 'error' ? (
            <p className="form-status form-status--error form-field--wide" role="alert">
              We could not deliver your inquiry. Your information is still here—retry or email us directly.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
