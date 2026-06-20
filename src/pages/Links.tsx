import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Briefcase, Globe, Github, Linkedin, Instagram, Mail, Twitter } from "lucide-react";

const mainLinks = [
  { icon: FileText, label: "Resume / CV", description: "My professional background at a glance", href: "#", accent: true },
  { icon: Briefcase, label: "Freelance Services", description: "Let's build something together", href: "/contact" },
  { icon: Globe, label: "Current Portfolio", description: "You're already here — but just in case", href: "/" },
];

const projectLinks = [
  { label: "FABRO — E-Commerce Platform", href: "https://fabro-handcrafted-indian-embroidery.vercel.app/" },
  { label: "JMRC Metro Services Portal", href: "https://jmrc-service-portal-nl7e.vercel.app/" },
  { label: "Palate — Recipe Platform", href: "https://palate-nu.vercel.app/" },
  { label: "APS — Astronomy Society", href: "https://aps-iiitdmj.vercel.app/" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/A-verse" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/anjalikamal-ak3105/" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/anjalikamal3105" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:anjalikamal3105@gmail.com" },
];

export default function Links() {
  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <div className="pt-28 md:pt-36 section-padding">
        <div className="max-w-xl mx-auto text-center">
          <ScrollReveal>
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center mx-auto mb-5">
              <span className="text-2xl font-bold gradient-text-warm">AK</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Anjali Kamal</h1>
            <p className="text-sm text-muted-foreground mb-2">Designer · Developer · Storyteller</p>
            <p className="text-xs text-secondary-foreground font-serif italic mb-10">
              "Designing visuals that feel like poetry"
            </p>
          </ScrollReveal>

          {/* Main Links */}
          <div className="space-y-3 mb-10">
            {mainLinks.map((link, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <motion.a
                  href={link.href}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`glass-card p-4 flex items-center gap-4 text-left group ${
                    link.accent ? "border-accent/20" : ""
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    link.accent ? "bg-accent/10" : "bg-muted"
                  }`}>
                    <link.icon size={18} className={link.accent ? "text-accent" : "text-muted-foreground"} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{link.label}</p>
                    <p className="text-xs text-muted-foreground">{link.description}</p>
                  </div>
                  <ArrowUpRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              </ScrollReveal>
            ))}
          </div>

          {/* Project Links */}
          <ScrollReveal delay={0.2}>
            <p className="text-[10px] text-accent uppercase tracking-widest mb-4">Live Projects</p>
            <div className="space-y-2 mb-10">
              {projectLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between py-2.5 px-4 rounded-xl hover:bg-muted/50 text-sm text-secondary-foreground hover:text-foreground transition-all group"
                >
                  {link.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          {/* Socials */}
          <ScrollReveal delay={0.3}>
            <p className="text-[10px] text-accent uppercase tracking-widest mb-4">Connect</p>
            <div className="flex justify-center gap-3">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-[10px] text-muted-foreground mt-12">
              Crafted with intention · A-verse © {new Date().getFullYear()}
            </p>
          </ScrollReveal>
        </div>
      </div>
      <Footer />
    </div>
  );
}
