import { motion } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    num: "01",
    title: "Development",
    tagline: "Code that scales",
    description:
      "Scalable web apps with modern frameworks, clean architecture, and performance-first thinking.",
    tools: ["React", "Next.js", "Node", "Postgres"],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
  },
  {
    num: "02",
    title: "Design",
    tagline: "Pixels meet poetry",
    description:
      "Interfaces that balance beauty with usability — every pixel intentional, every interaction meaningful.",
    tools: ["Figma", "Framer", "Tailwind", "Motion"],
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1200&q=80",
  },
  {
    num: "03",
    title: "Photography",
    tagline: "Frames that hold feeling",
    description:
      "Visual storytelling that captures mood, emotion, and the quiet beauty of everyday moments.",
    tools: ["Lightroom", "Color", "Direction"],
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80",
  },
];

function ServiceRow({
  service,
  index,
  hovered,
  setHovered,
}: {
  service: (typeof services)[number];
  index: number;
  hovered: number | null;
  setHovered: (n: number | null) => void;
}) {
  const isActive = hovered === index;
  const dimmed = hovered !== null && !isActive;

  return (
    <ScrollReveal delay={index * 0.06}>
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className="group relative border-b border-border/50"
      >
        <div
          className={`grid md:grid-cols-[70px_1fr] gap-5 md:gap-10 py-10 md:py-14 transition-all duration-500 ${
            dimmed ? "opacity-35" : "opacity-100"
          }`}
        >
          {/* Number */}
          <div>
            <span className="font-serif italic text-xs tracking-[0.25em] text-muted-foreground">
              {service.num}
            </span>
          </div>

          {/* Content */}
          <div>
            <motion.h3
              animate={{
                x: isActive ? 10 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: [0.7, 0, 0.3, 1],
              }}
              className="
                text-3xl
                md:text-4xl
                lg:text-5xl
                font-serif
                italic
                leading-none
                tracking-tight
                text-foreground
              "
            >
              {service.title}
            </motion.h3>

            {/* Tagline */}
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {service.tagline}
            </p>

            {/* Description */}
            <p className="mt-6 max-w-3xl text-[15px] md:text-base leading-8 text-secondary-foreground">
              {service.description}
            </p>

            {/* Bottom */}
            <div className="mt-8 flex items-start justify-between gap-10 flex-wrap">
              {/* Tools */}
              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    className="
                      px-4 py-1.5
                      rounded-full
                      border border-border
                      bg-card/40
                      text-xs
                      tracking-wide
                      text-muted-foreground
                      transition-all duration-300
                      group-hover:border-accent/30
                    "
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                className="
                  hidden md:block
                  w-44
                  h-28
                  rounded-2xl
                  overflow-hidden
                  border border-border
                  shrink-0
                "
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-accent origin-left"
          animate={{
            scaleX: isActive ? 1 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.7, 0, 0.3, 1],
          }}
        />
      </div>
    </ScrollReveal>
  );
}

export default function WhatIDo() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <ScrollReveal>
          <div className="mb-14 md:mb-20">
            <p className="section-label">WHAT I DO</p>

            <h2
              className="
                text-5xl
                md:text-7xl
                lg:text-8xl
                leading-[0.95]
                tracking-tight
                font-serif
                italic
                text-foreground
                mb-6
              "
            >
              Crafting Digital{" "}
              <span className="gradient-text">Experiences</span>
            </h2>

            <p className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Blending code, creativity, and curiosity to build experiences that
              feel intuitive, interactive, and memorable.
            </p>
          </div>
        </ScrollReveal>

        <div className="border-t border-border/50">
          {services.map((service, index) => (
            <ServiceRow
              key={service.num}
              service={service}
              index={index}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
