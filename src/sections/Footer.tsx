import { useState } from 'react';

function PrivacyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative glass-panel gradient-border max-w-[600px] max-h-[80vh] overflow-y-auto p-8 rounded-xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-[#5A6A8A] hover:text-[#E5E5E7] transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
        <h3 className="text-xl text-white font-medium tracking-tight">Privacy Policy</h3>
        <div className="mt-6 space-y-4 text-sm text-[#8A8A8E] leading-relaxed">
          <p><span className="text-[#E5E5E7] font-medium">Data Collection:</span> Omega AI LLC collects only the information you voluntarily provide through our contact form — name, email, company, and project description. We do not use cookies, tracking pixels, analytics, or any third-party data collection tools.</p>
          <p><span className="text-[#E5E5E7] font-medium">Data Use:</span> Your information is used solely to respond to your inquiry and evaluate potential engagement fit. We do not sell, rent, or share your data with any third parties.</p>
          <p><span className="text-[#E5E5E7] font-medium">Data Retention:</span> We retain contact submissions for up to 24 months for business development purposes. You may request deletion at any time by emailing noahlee@omega2ai.com.</p>
          <p><span className="text-[#E5E5E7] font-medium">Security:</span> Form submissions are transmitted securely. We store data in access-controlled systems with no cloud dependency — consistent with our values.</p>
          <p><span className="text-[#E5E5E7] font-medium">Contact:</span> For privacy questions, contact noahlee@omega2ai.com.</p>
          <p className="text-xs text-[#5A6A8A] pt-2">Last updated: July 2026</p>
        </div>
      </div>
    </div>
  );
}

function TermsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative glass-panel gradient-border max-w-[600px] max-h-[80vh] overflow-y-auto p-8 rounded-xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-[#5A6A8A] hover:text-[#E5E5E7] transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
        <h3 className="text-xl text-white font-medium tracking-tight">Terms of Service</h3>
        <div className="mt-6 space-y-4 text-sm text-[#8A8A8E] leading-relaxed">
          <p><span className="text-[#E5E5E7] font-medium">Consultation:</span> Initial consultations are provided free of charge with no obligation. All proposals are valid for 30 days from date of issue.</p>
          <p><span className="text-[#E5E5E7] font-medium">Engagement:</span> Project timelines and deliverables are defined in individual Statements of Work (SOW). Changes to scope require written agreement from both parties.</p>
          <p><span className="text-[#E5E5E7] font-medium">Intellectual Property:</span> All custom code, architectures, and deliverables created specifically for your engagement become your property upon final payment. Pre-existing Omega IP (including the Omega 3.0 runtime, patent-pending technology, and reusable frameworks) remains the property of Omega AI LLC, licensed to you for use within the scope of the engagement.</p>
          <p><span className="text-[#E5E5E7] font-medium">Warranty:</span> All deployments include a 90-day warranty covering defects in materials and workmanship. Extended support is available under separate agreement.</p>
          <p><span className="text-[#E5E5E7] font-medium">Limitation of Liability:</span> Omega AI LLC's total liability shall not exceed the total fees paid for the specific engagement giving rise to the claim.</p>
          <p><span className="text-[#E5E5E7] font-medium">Governing Law:</span> These terms are governed by the laws of the United States. Disputes shall be resolved through good-faith negotiation, then binding arbitration.</p>
          <p className="text-xs text-[#5A6A8A] pt-2">Last updated: July 2026</p>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <>
      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />

      <footer className="relative z-10 py-12" style={{ backgroundColor: '#141415', borderTop: '1px solid #2A5A8A' }}>
        <div className="content-max section-pad-x">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-[#8A8A8E] uppercase tracking-[0.08em]">OMEGA AI LLC</span>
              <span className="text-[13px] text-[#8A8A8E]">&copy; 2026 Omega AI LLC. All rights reserved.</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <button onClick={() => setPrivacyOpen(true)} className="text-xs text-[#5A6A8A] hover:text-[#4A9EFF] transition-colors font-mono uppercase tracking-wider">Privacy Policy</button>
              <button onClick={() => setTermsOpen(true)} className="text-xs text-[#5A6A8A] hover:text-[#4A9EFF] transition-colors font-mono uppercase tracking-wider">Terms of Service</button>
              <a href="mailto:noahlee@omega2ai.com" className="text-xs text-[#5A6A8A] hover:text-[#4A9EFF] transition-colors font-mono">noahlee@omega2ai.com</a>
              <a href="mailto:mitchellray@omega2ai.com" className="text-xs text-[#5A6A8A] hover:text-[#4A9EFF] transition-colors font-mono">mitchellray@omega2ai.com</a>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] px-2 py-1 rounded border border-[#F5A623] text-[#F5A623] uppercase tracking-wider">Patent Pending</span>
              <span className="font-mono text-xs text-[#4A9EFF]">Omega 3.0</span>
            </div>
          </div>

          <div className="mt-8 pt-6" style={{ borderTop: '1px solid #1A1A2E' }}>
            <p className="text-[11px] text-[#5A6A8A] leading-relaxed max-w-[640px]">
              Pricing varies depending on project scope, complexity, timeline, and hardware requirements. All engagements begin with a free consultation. The Omega 3.0 runtime and related cognitive architectures are patent pending. Results and benchmarks reflect validated performance on specified hardware configurations — your results may vary based on your specific environment.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
