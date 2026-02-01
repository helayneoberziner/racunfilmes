import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import StrategyStatement from "@/components/sections/StrategyStatement";
import Portfolio from "@/components/sections/Portfolio";
import Services from "@/components/sections/Services";
import Segments from "@/components/sections/Segments";
import Objectives from "@/components/sections/Objectives";
import Process from "@/components/sections/Process";
import Team from "@/components/sections/Team";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <StrategyStatement />
        <Portfolio />
        <Services />
        <Segments />
        <Objectives />
        <Process />
        <Team />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
