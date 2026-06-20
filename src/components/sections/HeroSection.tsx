"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Layers, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
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
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Grain */}
      <div className="grain absolute inset-0 opacity-[0.03]" />

      {/* Mouse glow */}
      <motion.div
        animate={{
          x: mousePos.x - 250,
          y: mousePos.y - 250,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 30,
        }}
        className="
          absolute
          h-[500px]
          w-[500px]
          rounded-full
          bg-orange-500/10
          blur-[140px]
          pointer-events-none
        "
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />

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
        pb-20
      "
      >
        {/* Pill Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-10"
        >
          <Link
            to="/contact"
            className="
            group
            relative
            inline-flex
            items-center
            gap-2.5
            rounded-full
            border border-white/10
            bg-[#0a0a0a]
            px-6 py-3
          "
          >
            <span className="text-sm text-zinc-300 font-medium">Say Hi!</span>

            <FaXTwitter size={13} className="text-zinc-500" />

            <ChevronRight
              size={15}
              className="
              text-zinc-500
              transition-transform duration-300
              group-hover:translate-x-1
            "
            />
          </Link>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="
  font-sans
  not-italic
  font-black
  text-white
  leading-[0.85]
  tracking-[-0.03em]
  text-[6rem]
  sm:text-[8rem]
  md:text-[10.5rem]
  xl:text-[13rem]
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
          mt-7
          uppercase
          tracking-[0.5em]
          text-zinc-500
          text-[11px]
          md:text-sm
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
          mt-3
          font-serif
          italic
          leading-none
          text-white
          text-3xl
          md:text-5xl
          xl:text-6xl
        "
        >
          solve real-world problems.
        </motion.h2>
      </div>

      {/* Left */}
      <div className="absolute left-8 bottom-8 md:left-14 md:bottom-10">
        <MapPin size={22} strokeWidth={1.8} className="mb-4 text-emerald-400" />

        <h3 className="text-base md:text-lg font-bold uppercase text-white">
          Based in Jaipur,
        </h3>
        <p className="mt-0.5 text-base md:text-lg text-zinc-500 uppercase">
          India
        </p>
      </div>

      {/* Right */}
      <div className="absolute right-8 bottom-8 md:right-14 md:bottom-10 text-right">
        <Layers
          size={22}
          strokeWidth={1.8}
          className="mb-4 ml-auto text-sky-400"
        />

        <h3 className="text-base md:text-lg font-bold uppercase text-white">
          Full Stack Dev,
        </h3>
        <p className="mt-0.5 text-base md:text-lg text-zinc-500 uppercase">
          & AI Engineer
        </p>
      </div>
    </motion.section>
  );
}
