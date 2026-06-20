import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, PenLine, Layers, ArrowRight } from "lucide-react";

const sections = [
  {
    icon: Camera,
    title: "Photography",
    subtitle: "Moments that speak without words",
    description: "Golden hours, quiet streets, warm tones — I capture the kind of beauty that makes you pause and feel something. Every frame is a story waiting to be noticed.",
    href: "/creative/photography",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80",
    ],
  },
  {
    icon: PenLine,
    title: "Writing & Poetry",
    subtitle: "Where thoughts find their shape",
    description: "Short reflections, poetic fragments, and the kind of writing that sits quietly in your mind long after you've read it. Words are my other medium.",
    href: "/creative/writing",
    images: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80",
      "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?w=400&q=80",
      "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=400&q=80",
    ],
  },
  {
    icon: Layers,
    title: "UI/UX Experiments",
    subtitle: "Design playgrounds and explorations",
    description: "Concept cards, micro-interactions, and visual experiments that push the boundaries of conventional interface design. Not every experiment ships — but every one teaches.",
    href: "/creative/experiments",
    images: [
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&q=80",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80",
    ],
  },
];

export default function CreativeCorner() {
  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <div className="pt-28 md:pt-36 section-padding">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="section-label">Creative Corner</p>
            <h1 className="section-heading mb-4">
              Where I explore, experiment &{" "}
              <span className="font-serif italic gradient-text">express</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl mb-20">
              Not everything I create lives inside a code editor. This is the space for the things that feed my soul — photography, words, and design experiments that don't need a deadline.
            </p>
          </ScrollReveal>

          <div className="space-y-24">
            {sections.map((section, i) => (
              <ScrollReveal key={i} delay={0.1}>
                <div className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
                  <div className={i % 2 === 1 ? "md:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <section.icon size={16} className="text-accent" />
                      </div>
                      <span className="text-xs text-accent uppercase tracking-widest">{section.subtitle}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">{section.title}</h2>
                    <p className="text-sm text-secondary-foreground leading-relaxed mb-6">{section.description}</p>
                    <Link
                      to={section.href}
                      className="btn-outline text-xs inline-flex"
                    >
                      Explore {section.title} <ArrowRight size={12} />
                    </Link>
                  </div>

                  <div className={`grid grid-cols-3 gap-2 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    {section.images.map((img, j) => (
                      <motion.div
                        key={j}
                        whileHover={{ scale: 1.05, y: -4 }}
                        className={`rounded-xl overflow-hidden bg-muted ${j === 1 ? "mt-4" : ""}`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full aspect-[3/4] object-cover"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
