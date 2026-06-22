"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Layers, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* Grain */}
      <div className="grain absolute inset-0 opacity-[0.03]" />

      {/* Mouse glow */}
      <motion.div
        animate={{
          x: mousePos.x - 175,
          y: mousePos.y - 175,
        }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 28,
        }}
        className="
    absolute
    h-[350px]
    w-[350px]
    rounded-full
    bg-gradient-to-r
    from-violet-500/10
    via-sky-400/8
    to-transparent
    blur-[120px]
    pointer-events-none
  "
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,hsl(var(--background)_/_0.92)_100%)]" />

      {/* Main */}
      <div
        className="
relative z-10
flex min-h-screen
flex-col
items-center
justify-center
text-center
px-6
pt-24
pb-24
max-w-5xl
mx-auto
"
      >
        {/* Pill Button */}

        <div className="mt-10 mb-12 md:mb-16">
          <button
            className="
      relative
      isolate
      overflow-hidden
      rounded-full
      p-[1px]
    "
          >
            {/* Rotating Beam */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-[-150%]"
            >
              <div
                className="
          absolute
          top-1/2
          left-1/2
          h-28
          w-6
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-gradient-to-b
          from-transparent
          via-orange-300
          to-transparent
          blur-2xl
        "
              />
            </motion.div>

            {/* Border base */}
            <div className="absolute inset-0 rounded-full bg-white/10" />
            {/* Button body */}
            <div
              className="
    relative
    z-10
    flex
    items-center
    gap-2
    rounded-full
    bg-card/90
    backdrop-blur-xl
    px-4
    py-2
  "
            >
              <span className="text-sm font-medium text-muted-foreground">
                Say hi on
              </span>

              <span className="text-lg text-foreground">𝕏</span>

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="text-muted-foreground"
              >
                <path
                  d="M8 5L16 12L8 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="
          font-sans
          not-italic
          font-black
          text-foreground
          leading-[0.85]
          tracking-[-0.03em]
          text-[4.5rem]
sm:text-[6rem]
md:text-[8rem]
xl:text-[10rem]
        "
        >
          ANJALI
        </motion.h1>
        {/* Small line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="
  mt-8
  md:mt-10
  text-xs
  md:text-sm
  tracking-[0.28em]
  text-muted-foreground
  font-medium
"
        >
          I DESIGN AND BUILD SCALABLE SYSTEMS THAT
        </motion.p>
        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="
          mt-5 md:mt-6
          mb-0
          font-serif
          italic
          leading-none
          text-foreground
          tracking-[-0.01em]
          text-2xl
md:text-4xl
xl:text-5xl
        "
        >
          solve real-world problems.
        </motion.h2>
      </div>

      {/* Left */}
      <div className="absolute left-6 bottom-6 md:left-14 md:bottom-10">
        <MapPin size={16} strokeWidth={1.8} className="mb-2 text-emerald-400" />

        <h3 className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-foreground">
          Based in Jaipur
        </h3>

        <p className="mt-1 text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
          India
        </p>
      </div>

      {/* Right */}
      <div className="absolute right-6 bottom-6 md:right-14 md:bottom-10 text-right">
        <Layers
          size={16}
          strokeWidth={1.8}
          className="mb-2 ml-auto text-sky-400"
        />
        <h3 className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-foreground">
          Full Stack Dev
        </h3>

        <p className="mt-1 text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
          & AI Engineer
        </p>
      </div>
    </motion.section>
  );
}
