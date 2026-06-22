import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiThreedotjs,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiGraphql,
  SiGit,
  SiDocker,
  SiVercel,
  SiLinux,
  SiFigma,
  SiPython,
  SiCplusplus,
} from "react-icons/si";
import flower from "@/assets/steel-flower.png";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const allSkills = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Framer Motion", icon: SiFramer },
  { name: "Three.js", icon: SiThreedotjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Prisma", icon: SiPrisma },
  { name: "GraphQL", icon: SiGraphql },
  { name: "Git", icon: SiGit },
  { name: "Docker", icon: SiDocker },
  { name: "Vercel", icon: SiVercel },
  { name: "Linux", icon: SiLinux },
  { name: "Figma", icon: SiFigma },
  { name: "Python", icon: SiPython },
  { name: "C++", icon: SiCplusplus },
];

const marqueeWords = [
  "Future-Proof",
  "SEO-Ready",
  "Immersive",
  "Protected",
  "Dependable",
  "Captivating",
  "Responsive",
  "Accessible",
];
export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const rawRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate = useSpring(rawRotate, {
    stiffness: 35,
    damping: 18,
    restDelta: 0.001,
  });
  const rawScale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);
  const scale = useSpring(rawScale, { stiffness: 45, damping: 22 });

  return (
    <section ref={sectionRef} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col items-center mb-20 md:mb-24">
            {/* Flower + Overlay Composition */}
            <div className="relative flex justify-center">
              {/* Flower */}
              <motion.img
                src={flower}
                alt=""
                aria-hidden="true"
                style={{ rotate, scale }}
                className="
                block
                pointer-events-none
                select-none
                w-[260px]
                md:w-[340px]
                lg:w-[420px]
                opacity-70
              "
              />

              {/* Overlay Content */}
              <div
                className="
                absolute
                bottom-[12%]
                left-1/2
                -translate-x-1/2
                z-20
                flex
                flex-col
                items-center
                whitespace-nowrap
              "
              >
                {/* Label */}
                <p
                  className="
                  text-[10px]
                  md:text-xs
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-white
                  mb-2
                "
                >
                  Technical Arsenal
                </p>

                {/* Heading */}
                <h2
                  className="
    text-center
    font-sans
    font-normal
    tracking-[-0.03em]
    leading-[0.9]
    text-foreground
    text-5xl
    md:text-7xl
    lg:text-8xl
  "
                >
                  The Magic{" "}
                  <span className="font-serif italic gradient-text font-normal text-accent">
                    Behind
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </ScrollReveal>
        {/* Skill Pills */}
        <div className="relative z-10 max-w-5xl mx-auto mt-20 md:mt-28 mb-16 md:mb-20">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {allSkills.map(({ name, icon: Icon }, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.03,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -3,
                  borderColor: "hsl(var(--accent) / 0.65)",
                  color: "hsl(var(--foreground))",
                  boxShadow: "0 0 16px hsl(var(--accent) / 0.18)",
                }}
                className="
                flex items-center gap-2
                px-4 py-2
                md:px-5 md:py-2.5
                rounded-full
                border border-border
                text-xs md:text-sm
                uppercase tracking-wide
                text-secondary-foreground
                cursor-default
                bg-card/40
                backdrop-blur-sm
                transition-colors
              "
              >
                <Icon className="text-base shrink-0" />
                <span>{name}</span>
              </motion.span>
            ))}
          </div>
        </div>

        {/* Cross Ribbon Marquee */}
        <div
          className="
    relative
    mt-32
    h-[220px]
    w-screen
    left-1/2
    -translate-x-1/2
    overflow-hidden
  "
        >
          {/* Back Ribbon */}
          <div className="absolute left-[-60%] top-[88px] w-[240%] -rotate-[3.5deg] opacity-25 z-10">
            <div className="bg-accent/35 py-5">
              <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ["-50%", "0%"] }}
                transition={{
                  duration: 55,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {[
                  ...marqueeWords,
                  ...marqueeWords,
                  ...marqueeWords,
                  ...marqueeWords,
                  ...marqueeWords,
                ].map((word, i) => (
                  <div
                    key={i}
                    className="
              inline-flex
              items-center
              shrink-0
              px-[3.5rem]
              text-[13px]
              md:text-[18px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-white/40
            "
                  >
                    <span className="mr-10 text-xl">✦</span>
                    {word}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Front Ribbon */}
          <div className="absolute left-[-60%] top-[72px] w-[240%] rotate-[3.5deg] z-20">
            <div className="bg-accent py-5 shadow-[0_0_120px_hsl(var(--accent)/0.15)]">
              <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 50,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {[
                  ...marqueeWords,
                  ...marqueeWords,
                  ...marqueeWords,
                  ...marqueeWords,
                  ...marqueeWords,
                ].map((word, i) => (
                  <div
                    key={i}
                    className="
              inline-flex
              items-center
              shrink-0
              px-[3.5rem]
              text-[13px]
              md:text-[18px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-white
            "
                  >
                    <span className="mr-10 text-xl">✦</span>
                    {word}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
