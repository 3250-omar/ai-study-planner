import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "./_components/hero-section";
import { MethodologySection } from "./_components/methodology-section";
import { FeaturesSection } from "./_components/features-section";
import { TestimonialSection } from "./_components/testimonial-section";
import { CTASection } from "./_components/cta-section";

export default function HomePage() {
  return (
    <main className="flex-1">
      <Navbar />
      <HeroSection />
      <MethodologySection />
      <FeaturesSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </main>
  );
}
