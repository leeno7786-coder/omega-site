export default function Footer() {
  return (
    <footer className="relative z-10 py-12" style={{ backgroundColor: '#141415', borderTop: '1px solid #2A5A8A' }}>
      <div className="content-max section-pad-x">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-[#8A8A8E] uppercase tracking-[0.08em]">OMEGA AI LLC</span>
            <span className="text-[13px] text-[#8A8A8E]">&copy; 2026 Omega AI LLC. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="/privacy" className="text-xs text-[#5A6A8A] hover:text-[#4A9EFF] transition-colors font-mono uppercase tracking-wider">Privacy Policy</a>
            <a href="/terms" className="text-xs text-[#5A6A8A] hover:text-[#4A9EFF] transition-colors font-mono uppercase tracking-wider">Terms of Service</a>
            <a href="mailto:noahlee@omega2ai.com" className="text-xs text-[#5A6A8A] hover:text-[#4A9EFF] transition-colors font-mono">noahlee@omega2ai.com</a>
            <a href="mailto:mitchellray@omega2ai.com" className="text-xs text-[#5A6A8A] hover:text-[#4A9EFF] transition-colors font-mono">mitchellray@omega2ai.com</a>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] px-2 py-1 rounded border border-[#F5A623] text-[#F5A623] uppercase tracking-wider">Patent Pending</span>
            <span className="font-mono text-xs text-[#4A9EFF]">Omega 3.0</span>
          </div>
        </div>

        <div className="mt-8 pt-6 flex flex-col items-center gap-4" style={{ borderTop: '1px solid #1A1A2E' }}>
          <p className="text-[11px] text-[#5A6A8A] leading-relaxed max-w-[640px] text-center">
            Pricing varies depending on project scope, complexity, timeline, and hardware requirements. All engagements begin with a free consultation. The Omega 3.0 runtime and related cognitive architectures are patent pending. Results and benchmarks reflect validated performance on specified hardware configurations — your results may vary based on your specific environment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <iframe src="https://github.com/sponsors/leeno7786-coder/button" title="Sponsor leeno7786-coder" height="32" width="114" style={{ border: 0, borderRadius: 6 }} />
            <iframe src="https://github.com/sponsors/leeno7786-coder/card" title="Sponsor leeno7786-coder" height="225" width="600" style={{ border: 0 }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
