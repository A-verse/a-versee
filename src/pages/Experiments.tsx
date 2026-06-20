import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const experiments = [
  {
    title: "Glassmorphism Cards",
    description: "Exploring layered transparency, blur, and depth for modern card components.",
    tags: ["CSS", "Glass", "UI"],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Micro-Interaction Library",
    description: "A collection of hover states, button animations, and feedback patterns.",
    tags: ["Framer Motion", "React", "UX"],
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Dark Theme System",
    description: "Building a complete design token system for seamless dark/light transitions.",
    tags: ["Design System", "CSS Variables"],
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "3D Card Flip",
    description: "CSS perspective transforms creating realistic card-flip interactions.",
    tags: ["3D CSS", "Animation"],
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Scroll-Driven Narratives",
    description: "Using scroll position to drive visual storytelling and reveal content.",
    tags: ["Scroll API", "Storytelling"],
    color: "from-rose-500/20 to-red-500/20",
  },
  {
    title: "Generative Patterns",
    description: "Algorithm-generated SVG patterns that create unique visual textures.",
    tags: ["SVG", "Generative", "Math"],
    color: "from-indigo-500/20 to-violet-500/20",
  },
];

export default function Experiments() {
  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <div className="pt-28 md:pt-36 section-padding">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="section-label">UI/UX Experiments</p>
            <h1 className="section-heading mb-4">
              Design{" "}
              <span className="font-serif italic gradient-text">playgrounds</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg mb-16">
              Not every experiment ships — but every one teaches. These are the ideas I explore when curiosity leads the way.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {experiments.map((exp, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card overflow-hidden group cursor-pointer h-full"
                >
                  <div className={`h-32 bg-gradient-to-br ${exp.color} flex items-center justify-center`}>
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 6, delay: i * 0.5 }}
                      className="w-16 h-16 rounded-2xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
                      {exp.title}
                      <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                    </h3>
                    <p className="text-xs text-secondary-foreground leading-relaxed mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="tag-pill text-[10px]">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
