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
          bg-accent/10
          blur-[140px]
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
        pb-20
        md:pt-0
        md:pb-24
      "
      >
        {/* Pill Button — with traced glow border */}
        <Link
          to="/contact"
          className="
    group
    relative
    inline-flex
    items-center
    rounded-full
    overflow-hidden
    p-[1px]
    mb-6 md:mb-8
  "
        >
          {/* Rotating border beam */}
          <motion.span
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[-80%] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_285deg,hsl(var(--accent))_315deg,hsl(var(--secondary-foreground))_340deg,transparent_360deg)]"
          />

          {/* Glow */}
          <motion.span
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[-80%] rounded-full blur-md opacity-80 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_285deg,hsl(var(--accent))_315deg,hsl(var(--secondary-foreground))_340deg,transparent_360deg)]"
          />

          {/* Button */}
          <span
            className="
      relative
      z-10
      flex
      items-center
      gap-1.5
      rounded-full
      bg-card
      px-4
      py-1.5
    "
          >
            <span className="text-[11px] font-medium tracking-wide text-card-foreground">
              Say Hi!
            </span>

            <FaXTwitter size={10} className="text-muted-foreground" />

            <ChevronRight
              size={12}
              className="
        text-muted-foreground
        transition-transform
        duration-300
        group-hover:translate-x-1
      "
            />
          </span>
        </Link>

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
          text-[6.5rem]
          sm:text-[8.5rem]
          md:text-[11rem]
          xl:text-[14rem]
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
          mt-10
          md:mt-12
          uppercase
          tracking-[0.4em]
          text-muted-foreground
          text-sm
          md:text-base
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
          text-4xl
          md:text-6xl
          xl:text-7xl
        "
        >
          solve real-world problems.
        </motion.h2>
      </div>

      {/* Left */}
      <div className="absolute left-6 bottom-6 md:left-14 md:bottom-10">
        <MapPin
          size={22}
          strokeWidth={1.8}
          className="mb-3 md:mb-4 text-emerald-400"
        />

        <h3 className="font-sans not-italic text-sm md:text-lg font-bold uppercase text-foreground">
          Based in Jaipur,
        </h3>
        <p className="font-sans not-italic mt-0.5 text-sm md:text-lg text-muted-foreground uppercase">
          India
        </p>
      </div>

      {/* Right */}
      <div className="absolute right-6 bottom-6 md:right-14 md:bottom-10 text-right">
        <Layers
          size={22}
          strokeWidth={1.8}
          className="mb-3 md:mb-4 ml-auto text-sky-400"
        />

        <h3 className="font-sans not-italic text-sm md:text-lg font-bold uppercase text-foreground">
          Full Stack Dev,
        </h3>
        <p className="font-sans not-italic mt-0.5 text-sm md:text-lg text-muted-foreground uppercase">
          & AI Engineer
        </p>
      </div>
    </motion.section>
  );
}
