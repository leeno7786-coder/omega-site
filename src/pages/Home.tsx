import SiteHeader from '../components/layout/SiteHeader';
import Hero from '../sections/company/Hero';
import ProofRail from '../sections/company/ProofRail';

export default function Home() {
  return (
    <div className="site-frame">
      <SiteHeader currentPage="home" />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProofRail />
      </main>
    </div>
  );
}
