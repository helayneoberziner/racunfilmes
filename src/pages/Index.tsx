import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Lifestyle from "@/components/sections/Lifestyle";
import UmDia from "@/components/sections/UmDia";
import Infrastructure from "@/components/sections/Infrastructure";
import Location from "@/components/sections/Location";
import Masterplan from "@/components/sections/Masterplan";
import Lotes from "@/components/sections/Lotes";
import Gallery from "@/components/sections/Gallery";
import Differentials from "@/components/sections/Differentials";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => (
  <div className="min-h-screen bg-paper text-ink">
    <Navbar />
    <main>
      <Hero />
      <Lifestyle />
      <UmDia />
      <Infrastructure />
      <Location />
      <Masterplan />
      <Lotes />
      <Gallery />
      <Differentials />
      <Testimonials />
      <FAQ />
      <Contact />
      <FinalCTA />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Index;
