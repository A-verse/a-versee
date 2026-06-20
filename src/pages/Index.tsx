import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import WhatIDo from "@/components/sections/WhatIDo";
import AboutPreview from "@/components/sections/AboutPreview";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import SkillsSection from "@/components/sections/SkillsSection";
import CreativeSide from "@/components/sections/CreativeSide";
import LyricsAndLogic from "@/components/sections/LyricsAndLogic";
import ContactCTA from "@/components/sections/ContactCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background noise-overlay overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <HeroSection />

      <div className="divider-line" />

      {/* What I Do */}
      <WhatIDo />

      <div className="divider-line" />

      {/* About */}
      <AboutPreview />

      <div className="divider-line" />

      {/* Project Showcase */}
      <ProjectShowcase />

      <div className="divider-line" />

      {/* Skills */}
      <SkillsSection />

      <div className="divider-line" />

      {/* Creative Side */}
      <CreativeSide />

      <div className="divider-line" />

      {/* Lyrics & Logic */}
      <LyricsAndLogic />

      <div className="divider-line" />

      {/* Contact */}
      <ContactCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
