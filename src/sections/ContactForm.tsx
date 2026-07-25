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

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', service: '', description: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cf-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.cf-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      setSubmitted(true);
    } else {
      const subject = encodeURIComponent(`Service Inquiry: ${formData.service || 'General'}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nService: ${formData.service}\n\nProject Description:\n${formData.description}`);
      window.location.href = `mailto:noahlee@omega2ai.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section id="contact-form" ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#0A0A0B' }}>
        <div className="content-max section-pad-x max-w-[640px] mx-auto text-center">
          <div className="glass-panel gradient-border p-12">
            <div className="w-16 h-16 rounded-full bg-[rgba(0,229,199,0.1)] flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 16L13 23L26 10" stroke="#00E5C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="text-2xl text-white font-normal tracking-tight">Message Sent</h3>
            <p className="text-sm text-[#8A8A8E] mt-3 leading-relaxed">Thank you for reaching out. We will review your inquiry and get back to you within 24 hours.</p>
            <p className="text-xs text-[#5A6A8A] mt-4 font-mono">Direct email: <a href="mailto:noahlee@omega2ai.com" className="text-[#4A9EFF] hover:text-[#A8D8FF]">noahlee@omega2ai.com</a></p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="content-max section-pad-x">
        <div className="max-w-[640px] mx-auto">
          <span className="cf-label section-label">REQUEST A CONSULTATION</span>
          <h2 className="cf-heading section-heading mt-3">Let's Build Something</h2>
          <p className="mt-4 text-[#8A8A8E] text-base leading-relaxed">Tell us about your project. We will review your requirements and reach out within 24 hours to discuss how Omega AI LLC can help.</p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-mono text-[10px] text-[#5A6A8A] uppercase tracking-wider mb-2">Name *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-[#2A5A8A] text-white text-sm placeholder-[#5A6A8A] focus:border-[#4A9EFF] focus:outline-none transition-all duration-200" placeholder="Your name" />
              </div>
              <div>
                <label className="block font-mono text-[10px] text-[#5A6A8A] uppercase tracking-wider mb-2">Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-[#2A5A8A] text-white text-sm placeholder-[#5A6A8A] focus:border-[#4A9EFF] focus:outline-none transition-all duration-200" placeholder="Organization" />
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] text-[#5A6A8A] uppercase tracking-wider mb-2">Email *</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-[#2A5A8A] text-white text-sm placeholder-[#5A6A8A] focus:border-[#4A9EFF] focus:outline-none transition-all duration-200" placeholder="you@company.com" />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-[#5A6A8A] uppercase tracking-wider mb-2">Service Interest *</label>
              <select name="service" required value={formData.service} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-[#2A5A8A] text-white text-sm focus:border-[#4A9EFF] focus:outline-none transition-all duration-200 appearance-none cursor-pointer" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5L6 8L9 5' stroke='%235A6A8A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}>
                <option value="" disabled>Select a service</option>
                {SERVICE_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-mono text-[10px] text-[#5A6A8A] uppercase tracking-wider mb-2">Project Description *</label>
              <textarea name="description" required rows={5} value={formData.description} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-[#2A5A8A] text-white text-sm placeholder-[#5A6A8A] focus:border-[#4A9EFF] focus:outline-none transition-all duration-200 resize-none" placeholder="Describe your project, goals, and any specific requirements..." />
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-[rgba(245,166,35,0.05)] border border-[rgba(245,166,35,0.15)]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0"><path d="M8 1L1 15H15L8 1Z" stroke="#F5A623" strokeWidth="1" strokeLinejoin="round"/><path d="M8 6V9M8 11V12" stroke="#F5A623" strokeWidth="1.2" strokeLinecap="round"/></svg>
              <p className="text-xs text-[#8A8A8E] leading-relaxed"><span className="text-[#E5E5E7] font-medium">Pricing varies</span> depending on project scope, complexity, timeline, and hardware requirements. We will provide a detailed proposal after understanding your needs. No obligation.</p>
            </div>
            <button type="submit" className="w-full py-4 rounded-lg text-[15px] font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(74,158,255,0.3)]" style={{ background: 'linear-gradient(135deg, #4A9EFF 0%, #6B8CFF 100%)', color: '#0A0A0B' }}>Send Inquiry</button>
            <p className="text-center text-[11px] text-[#5A6A8A] font-mono">Or email directly: <a href="mailto:noahlee@omega2ai.com" className="text-[#4A9EFF] hover:text-[#A8D8FF]">noahlee@omega2ai.com</a></p>
          </form>
        </div>
      </div>
    </section>
  );
}
