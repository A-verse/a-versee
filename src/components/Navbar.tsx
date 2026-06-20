"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Moon, Command } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blogs" },
];

const moreItems = [
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black text-white font-black text-sm">
          A.K
        </div>
        <div className="leading-tight text-left">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white">
            | Creative Engineer
          </p>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-400">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white">
              {" "}
              |{" "}
            </span>
            Available for hire
          </p>
        </div>
      </Link>

      {/* Center nav pill */}
      <nav
        className="
        absolute left-1/2 -translate-x-1/2
        flex items-center gap-1
        rounded-full
        border border-white/10
        bg-black/40
        backdrop-blur-2xl
        px-2 py-2
        shadow-[0_8px_40px_rgba(0,0,0,0.45)]
      "
      >
        {navItems.map((item) => {
          const active = location.pathname === item.href;

          return (
            <Link
              key={item.name}
              to={item.href}
              className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
            >
              {active && (
                <motion.div
                  layoutId="navbar-pill"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-white"
                />
              )}
              <span
                className={`relative z-10 ${
                  active ? "text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* More dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setMoreOpen(true)}
          onMouseLeave={() => setMoreOpen(false)}
        >
          <button
            className="
              flex items-center gap-1
              px-5 py-2.5
              rounded-full
              text-sm font-medium
              text-zinc-400 hover:text-white
              transition-colors
            "
          >
            More
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${
                moreOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {moreOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="
                  absolute top-full mt-2 left-1/2 -translate-x-1/2
                  flex flex-col gap-1
                  rounded-2xl
                  border border-white/10
                  bg-black/90
                  backdrop-blur-2xl
                  p-2
                  min-w-[140px]
                "
              >
                {moreItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="
                      rounded-xl px-4 py-2
                      text-sm text-zinc-400
                      hover:text-white hover:bg-white/5
                      transition-colors
                    "
                  >
                    {item.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Right side controls */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          className="
            flex h-11 w-11 items-center justify-center
            rounded-full
            border border-white/10
            bg-black/40
            backdrop-blur-2xl
            text-zinc-400
            hover:text-white
            transition-colors
          "
        >
          <Moon size={16} />
        </button>

        {/* Book a Call */}
        <Link
          to="/contact"
          className="
            rounded-full
            bg-white
            px-6 py-3
            text-sm font-semibold
            text-black
            transition-transform
            hover:scale-105
          "
        >
          Book a Call
        </Link>

        {/* Command icon */}
        <button
          className="
            flex h-11 w-11 items-center justify-center
            rounded-full
            border border-white/10
            bg-black/40
            backdrop-blur-2xl
            text-white
            hover:bg-white/5
            transition-colors
          "
        >
          <Command size={16} />
        </button>
      </div>
    </header>
  );
}
