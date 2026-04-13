import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import UseCases from '@/components/UseCases';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <main className="landing-page">
      <Navbar />
      <Hero />
      <HowItWorks />
      <UseCases />
      <CtaSection />
      <Footer />
    </main>
  );
}
