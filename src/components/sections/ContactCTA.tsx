"use client";

import { motion } from "framer-motion";
import aboutImg from "@/assets/about.jpg";

function GlowRing() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.03, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
      relative
      w-[60px]
      h-[60px]
      sm:w-[80px]
      sm:h-[80px]
      md:w-[120px]
      md:h-[120px]
      lg:w-[170px]
      lg:h-[170px]
    "
    >
      {/* Ambient Glow */}
      <div className="absolute inset-[-20%] rounded-full blur-[70px] bg-[radial-gradient(circle,hsl(var(--primary)/0.18)_0%,hsl(var(--accent)/0.14)_45%,transparent_75%)]" />

      {/* Main Ring */}
      <div className="absolute inset-0 rounded-full border-[4px] border-transparent bg-[linear-gradient(hsl(var(--background)),hsl(var(--background)))_padding-box,linear-gradient(135deg,hsl(var(--primary)),hsl(var(--secondary-foreground)),hsl(var(--accent)),hsl(var(--accent)/0.8))_border-box] shadow-[0_0_20px_hsl(var(--primary)/0.28),0_0_50px_hsl(var(--accent)/0.16)]" />

      {/* Bottom Highlight */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-3 w-14 rounded-full blur-xl bg-foreground/80" />
    </motion.div>
  );
}

export default function ContactCTA() {
  return (
    <section className="bg-background overflow-hidden py-20 lg:py-28">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        <div className="relative">
          {/* Ring */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
            viewport={{ once: true }}
            className="
            absolute
            top-0
            right-0
            pointer-events-none
          "
          >
            <GlowRing />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            viewport={{ once: true }}
          >
            {/* First line */}
            <div className="flex items-center gap-3 mb-1">
              <div
                className="
                w-12
                h-12
                md:w-14
                md:h-14
                lg:w-[72px]
                lg:h-[72px]
                rounded-full
                overflow-hidden
                border border-border
                shrink-0
              "
              >
                <img
                  src={aboutImg}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2
                className="
                font-bold
                leading-[0.82]
                tracking-[-0.1em]
                text-[2rem]
                sm:text-[2.8rem]
                md:text-[4.8rem]
                lg:text-[7rem]
                text-foreground
              "
              >
                Let's create
              </h2>
            </div>

            {/* Second line */}
            <h2
              className="
              font-bold
              leading-[0.82]
              tracking-[-0.1em]
              text-[2rem]
              sm:text-[2.8rem]
              md:text-[4.8rem]
              lg:text-[7rem]
              text-muted-foreground
            "
            >
              something real.
            </h2>

            {/* Description */}
            <p
              className="
              mt-6
              max-w-lg
              text-muted-foreground
              text-base
              leading-relaxed
            "
            >
              Building digital experiences that matter, one line of code at a
              time.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex gap-4 flex-wrap">
              <button
                className="
                px-6
                py-3
                rounded-full
                bg-foreground
                text-background
                text-sm
                font-medium
                hover:scale-[1.03]
                transition
              "
              >
                Start Project
              </button>

              <button
                className="
                px-6
                py-3
                rounded-full
                border border-border
                bg-card
                text-card-foreground
                text-sm
                hover:bg-muted
                transition
              "
              >
                View Work
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
