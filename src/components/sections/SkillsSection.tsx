import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const allSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Framer Motion",
  "Three.js",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "REST APIs",
  "GraphQL",
  "Git",
  "Docker",
  "AWS",
  "Vercel",
  "Linux",
  "Figma",
  "Photography",
  "UI/UX Design",
  "Python",
  "C++",
  "AI / ML",
];

const marqueeWords = [
  "Scalable",
  "Adaptive",
  "Immersive",
  "User-First",
  "Performant",
  "Accessible",
  "Responsive",
  "Elegant",
  "Reliable",
  "Creative",
];

export default function SkillsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-end text-align-center gap-6 mb-10 md:mb-14 flex-wrap">
            <div>
              <p className="section-label">Technical Arsenal</p>
              <h2 className="section-heading">
                THE MAGIC{" "}
                <span className="font-serif italic gradient-text">Behind</span>
              </h2>
            </div>
          </div>
        </ScrollReveal>

        {/* Flat skill cloud */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start max-w-4xl mb-16">
          {allSkills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.025, ease: "easeOut" }}
              whileHover={{
                y: -3,
                borderColor: "hsl(var(--accent) / 0.6)",
                color: "hsl(var(--foreground))",
              }}
              className="px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-border text-xs md:text-sm uppercase tracking-widest text-secondary-foreground cursor-default bg-card/40 backdrop-blur-sm transition-colors"
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Marquee — now BELOW the heading */}
        <div className="relative mb-12 md:mb-16 -mx-5 md:-mx-16 lg:-mx-24 overflow-hidden">
          <div className="border-y border-border/60 py-3 md:py-4 bg-foreground/[0.015]">
            <motion.div
              className="flex gap-10 whitespace-nowrap text-sm md:text-base font-medium tracking-[0.3em] uppercase text-muted-foreground"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            >
              {[...marqueeWords, ...marqueeWords, ...marqueeWords].map(
                (w, i) => (
                  <span key={i} className="flex items-center gap-10">
                    {w}
                    <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                  </span>
                ),
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
