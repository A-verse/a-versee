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
      <div
        className="absolute inset-[-20%] rounded-full blur-[70px]"
        style={{
          background:
            "radial-gradient(circle, rgba(96,165,250,.25) 0%, rgba(168,85,247,.18) 45%, transparent 75%)",
        }}
      />

      {/* Main Ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: "4px solid transparent",
          background: `
            linear-gradient(#000,#000) padding-box,
            linear-gradient(
              135deg,
              #60a5fa,
              #818cf8,
              #a855f7,
              #e879f9
            ) border-box
          `,
          boxShadow: `
            0 0 20px rgba(96,165,250,.7),
            0 0 50px rgba(168,85,247,.35)
          `,
        }}
      />

      {/* Bottom Highlight */}
      <div
        className="
        absolute
        bottom-2
        left-1/2
        -translate-x-1/2
        w-14
        h-3
        rounded-full
        blur-xl
      "
        style={{
          background: "rgba(255,255,255,.85)",
        }}
      />
    </motion.div>
  );
}

export default function ContactCTA() {
  return (
    <section className="bg-black overflow-hidden py-20 lg:py-28">
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
                border border-white/10
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
                text-white
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
              text-zinc-500
            "
            >
              something real.
            </h2>

            {/* Description */}
            <p
              className="
              mt-6
              max-w-lg
              text-zinc-500
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
                bg-white
                text-black
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
                border border-white/10
                bg-white/[0.03]
                text-white
                text-sm
                hover:bg-white/[0.06]
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
