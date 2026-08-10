import SiteHeader from '../components/layout/SiteHeader';
import Capabilities from '../sections/company/Capabilities';
import CompanyOverview from '../sections/company/CompanyOverview';
import EngagementProcess from '../sections/company/EngagementProcess';
import Hero from '../sections/company/Hero';
import OmegaProofPreview from '../sections/company/OmegaProofPreview';
import ProofRail from '../sections/company/ProofRail';
import ProjectInquiryForm from '../sections/company/ProjectInquiryForm';
import SelectedSystems from '../sections/company/SelectedSystems';

export default function Home() {
  return (
    <div className="site-frame">
      <SiteHeader currentPage="home" />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProofRail />
        <Capabilities />
        <OmegaProofPreview />
        <SelectedSystems />
        <EngagementProcess />
        <CompanyOverview />
        <ProjectInquiryForm />
      </main>
    </div>
  );
}
