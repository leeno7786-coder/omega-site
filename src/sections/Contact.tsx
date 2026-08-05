import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICE_OPTIONS = [
  'Autonomous Cognitive Systems',
  'Close-to-Metal & Custom Builds',
  'Edge & Local AI Deployment',
  'AI-Native Application Development',
  'Consulting & Architecture Review',
  "Not sure — let's talk",
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', service: '', description: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.contact-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Service Inquiry: ${formData.service || 'General'}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nService: ${formData.service}\n\nProject Description:\n${formData.description}`);
    window.location.href = `mailto:noahlee@omega2ai.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="content-max section-pad-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="contact-label section-label">GET IN TOUCH</span>
            <h2 className="contact-heading section-heading mt-3">Let's Build the Future</h2>
            <p className="mt-4 text-[#8A8A8E] text-base leading-relaxed">
              Whether you need a custom autonomous AI runtime, edge inference deployment, or close-to-metal optimization, we'd love to hear about your project.
            </p>

            <div className="mt-8 space-y-4">
              <div className="p-4 rounded-xl glass-panel">
                <span className="font-mono text-[10px] text-[#4A9EFF] uppercase tracking-wider block mb-1">Direct Contact</span>
                <a href="mailto:noahlee@omega2ai.com" className="text-base text-white hover:text-[#4A9EFF] transition-colors block font-medium">noahlee@omega2ai.com</a>
                <a href="mailto:mitchellray@omega2ai.com" className="text-sm text-[#8A8A8E] hover:text-[#4A9EFF] transition-colors block mt-1">mitchellray@omega2ai.com</a>
              </div>

              <div className="p-4 rounded-xl glass-panel flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-[#5A6A8A] uppercase tracking-wider block">Headquarters</span>
                  <span className="text-sm text-white font-medium">United States</span>
                </div>
                <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-[rgba(0,229,199,0.1)] text-[#00E5C7]">Local-First AI</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-[rgba(74,158,255,0.04)] border border-[#2A5A8A]">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
                <circle cx="10" cy="10" r="9" stroke="#4A9EFF" strokeWidth="1.5" />
                <path d="M10 6V10M10 13V14" stroke="#4A9EFF" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p className="text-xs text-[#8A8A8E] leading-relaxed">
                All engagements begin with a free consultation to evaluate hardware requirements, scope, and feasibility.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="glass-panel gradient-border p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-[rgba(0,229,199,0.1)] flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M6 16L13 23L26 10" stroke="#00E5C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 className="text-xl text-white font-normal">Consultation Requested</h3>
                <p className="text-sm text-[#8A8A8E] mt-2 leading-relaxed">Your email client has opened with your inquiry details. We will respond within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 font-mono text-xs text-[#4A9EFF] hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-panel gradient-border p-8 rounded-2xl space-y-4">
                <h3 className="text-lg text-white font-medium tracking-tight mb-2">Request a Consultation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] text-[#5A6A8A] uppercase tracking-wider mb-1.5">Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-[#111827] border border-[#2A5A8A] text-white text-sm placeholder-[#5A6A8A] focus:border-[#4A9EFF] focus:outline-none transition-all duration-200" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-[#5A6A8A] uppercase tracking-wider mb-1.5">Company</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-[#111827] border border-[#2A5A8A] text-white text-sm placeholder-[#5A6A8A] focus:border-[#4A9EFF] focus:outline-none transition-all duration-200" placeholder="Organization" />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-[#5A6A8A] uppercase tracking-wider mb-1.5">Email *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-[#111827] border border-[#2A5A8A] text-white text-sm placeholder-[#5A6A8A] focus:border-[#4A9EFF] focus:outline-none transition-all duration-200" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-[#5A6A8A] uppercase tracking-wider mb-1.5">Service Interest *</label>
                  <select name="service" required value={formData.service} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-[#111827] border border-[#2A5A8A] text-white text-sm focus:border-[#4A9EFF] focus:outline-none transition-all duration-200 appearance-none cursor-pointer" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5L6 8L9 5' stroke='%235A6A8A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}>
                    <option value="" disabled>Select a service</option>
                    {SERVICE_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-[#5A6A8A] uppercase tracking-wider mb-1.5">Project Description *</label>
                  <textarea name="description" required rows={4} value={formData.description} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-[#111827] border border-[#2A5A8A] text-white text-sm placeholder-[#5A6A8A] focus:border-[#4A9EFF] focus:outline-none transition-all duration-200 resize-none" placeholder="Describe your goals, hardware, and operational constraints..." />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-[1.01]" style={{ background: 'linear-gradient(135deg, #4A9EFF 0%, #6B8CFF 100%)', color: '#0A0A0B', boxShadow: '0 4px 20px rgba(74,158,255,0.3)' }}>Submit Inquiry</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
