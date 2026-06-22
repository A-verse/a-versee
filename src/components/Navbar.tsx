"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Moon, Sun, Command } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Creative", href: "/creative" },
  { name: "Blogs", href: "/blog" },
];

const moreItems = [
  {
    name: "Links",
    desc: "Socials & Profiles",
    href: "/links",
    icon: "link",
  },
  {
    name: "Uses",
    desc: "My gear & software",
    href: "/uses",
    icon: "monitor",
  },
  {
    name: "Guestbook",
    desc: "Sign my wall",
    href: "/guestbook",
    icon: "book",
  },
];

export default function Navbar() {
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Scroll detection — collapses navbar to a single compact
  // centered pill once user scrolls past the hero section ──
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Theme toggle — real dark/light mode using the `dark` class
  // on <html>. Persists choice in localStorage. ──
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored ? stored === "dark" : true;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (isMobile) {
    return (
      <header className="fixed top-5 left-0 right-0 z-50 px-4">
        <div className="mx-auto flex max-w-sm items-center justify-between rounded-full border border-border bg-background/80 px-4 py-2 backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-xs font-bold">
              AK
            </div>

            <span className="text-sm font-medium">Anjali Kamal</span>
          </Link>

          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            {isDark ? <Moon size={15} /> : <Sun size={15} />}
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className={`
      flex items-center
      rounded-full
      border border-border/10
      bg-background/60
      text-foreground
      backdrop-blur-2xl
      shadow-none
      px-2 py-1
      gap-1
      ${scrolled ? "justify-center" : "w-full max-w-6xl justify-between"}
    `}
      >
        <motion.div
          animate={{
            width: scrolled ? 0 : "auto",
            opacity: scrolled ? 0 : 1,
            marginRight: scrolled ? 0 : 12,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-visible"
        >
          <Link
            to="/"
            className="flex items-center gap-3 rounded-full px-3 py-2"
          >
            <div
              className="
    flex
    h-10
    w-10
    items-center
    justify-center
    rounded-full
    border
    border-border
    bg-card/80
    backdrop-blur-xl
    shadow-sm
    overflow-hidden
  "
            >
              <img
                src={logo}
                alt="Logo"
                className="h-full w-full object-cover"
              />
            </div>
          </Link>
        </motion.div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                location.pathname === item.href
                  ? "bg-foreground text-background"
                  : "hover:bg-muted"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* More */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="flex items-center gap-1 rounded-full px-4 py-2 text-sm hover:bg-muted"
            >
              More
              <ChevronDown size={15} />
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-2 w-60 rounded-2xl border border-border bg-background p-2 shadow-xl"
                >
                  {moreItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block rounded-xl px-4 py-3 hover:bg-muted"
                      onClick={() => setMoreOpen(false)}
                    >
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2 border-l border-border/20 pl-3">
          {/* Theme toggle always visible */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-muted"
          >
            {isDark ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Hide these when collapsed */}
          <motion.div
            className="flex items-center gap-2 overflow-hidden"
            animate={{
              width: scrolled ? 0 : "auto",
              opacity: scrolled ? 0 : 1,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-muted">
              <Command size={16} />
            </button>

            <a
              href="mailto:anjalikamal3105@gmail.com"
              className="whitespace-nowrap rounded-full bg-foreground px-5 py-2 text-sm text-background"
            >
              Book a Call
            </a>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}
