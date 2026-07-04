import LandingNav from "../../components/layout/LandingNav.jsx";
import LandingFooter from "../../components/layout/LandingFooter.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Features from "./sections/Features.jsx";
import HowItWorks from "./sections/HowItWorks.jsx";
import Benefits from "./sections/Benefits.jsx";
import Stats from "./sections/Stats.jsx";
import Team from "./sections/Team.jsx";
import Testimonials from "./sections/Testimonials.jsx";
import Pricing from "./sections/Pricing.jsx";
import FAQ from "./sections/FAQ.jsx";
import Contact from "./sections/Contact.jsx";
import CTA from "./sections/CTA.jsx";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <Benefits />
      <Stats />
      <Team />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <CTA />
      <LandingFooter />
    </div>
  );
}