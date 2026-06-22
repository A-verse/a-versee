import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    num: "01",
    title: "Development",
    tagline: "Code that scales",
    description:
      "Scalable web apps with modern frameworks, clean architecture, and performance-first thinking.",
    tools: ["React", "Next.js", "Node", "Postgres"],
  },
  {
    num: "02",
    title: "Design",
    tagline: "Pixels meet poetry",
    description:
      "Interfaces that balance beauty with usability — every pixel intentional, every interaction meaningful.",
    tools: ["Figma", "Framer", "Tailwind", "Motion"],
  },
];

export default function WhatIDo() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden px-6 md:px-10 lg:px-16 py-14">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-10 items-start">
          {/* Left Side */}
          <div className="hidden lg:block sticky top-32">
            <h1
              className="
                font-sans
                font-black
                uppercase
                text-foreground
                leading-[0.9]
                tracking-[-0.04em]
                text-[4rem]
                xl:text-[5rem]
              "
            >
              WHAT
              <br />
              DO
              <br />
              I
              <br />
              DO
            </h1>
          </div>

          {/* Right Side */}
          <div className="space-y-5">
            {services.map((service, index) => {
              const isActive = hovered === index;

              return (
                <motion.div
                  key={service.num}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ y: -4 }}
                  className="
                    relative
                    rounded-[24px]
                    border
                    border-border/60
                    bg-card/40
                    backdrop-blur-xl
                    p-5
                    transition-all
                    duration-500
                  "
                >
                  {/* Number */}
                  <div className="absolute top-5 right-5 text-xs tracking-[0.3em] text-muted-foreground">
                    {service.num}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-black uppercase mb-2">
                    {service.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    {service.tagline}
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-7 text-muted-foreground max-w-xl">
                    {service.description}
                  </p>

                  {/* Tools */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tools.map((tool) => (
                      <span
                        key={tool}
                        className="
                          px-3
                          py-1.5
                          rounded-full
                          border
                          border-border
                          text-xs
                          text-muted-foreground
                        "
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Accent line */}
                  <motion.div
                    animate={{
                      width: isActive ? "100%" : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-[2px]
                      bg-accent
                      rounded-full
                    "
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
