import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const creativeCards = [
  {
    title: "Photography",
    subtitle: "Moments frozen in time",
    description:
      "Golden hours, quiet streets, and the kind of light that makes you pause.",
    href: "/creative/photography",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
    meta: "24 frames",
  },
  {
    title: "Writing",
    subtitle: "Words that linger",
    description:
      "Poetic fragments, reflections, and the stories between the lines.",
    href: "/creative/writing",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80",
    meta: "12 pieces",
  },
  {
    title: "UI Experiments",
    subtitle: "Design playgrounds",
    description:
      "Concept explorations, micro-interactions, and visual experiments.",
    href: "/creative/experiments",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80",
    meta: "Lab",
  },
];

export default function CreativeSide() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12 md:mb-16 flex-wrap gap-4">
            <div>
              <p className="section-label">Creative Corner</p>
              <h2 className="section-heading">
                Beyond the{" "}
                <span className="font-serif italic gradient-text">code</span>
              </h2>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground max-w-xs leading-relaxed">
              Not everything I create lives in a terminal. This is where I
              explore, experiment, and express.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {creativeCards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.1}>
              <Link to={card.href} className="group block h-full">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
                  className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 h-full"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <motion.img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                    {/* Meta tag */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/70 backdrop-blur-md border border-border/60 text-[10px] uppercase tracking-[0.25em] text-foreground">
                      {card.meta}
                    </span>

                    {/* Arrow */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/70 backdrop-blur-md border border-border/60 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                      <ArrowUpRight
                        size={16}
                        className="text-foreground group-hover:text-accent-foreground group-hover:rotate-45 transition-transform duration-500"
                      />
                    </div>

                    {/* Bottom title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-accent mb-2">
                        {card.subtitle}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-2">
                        {card.title}
                      </h3>
                      <p className="text-xs text-secondary-foreground leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
