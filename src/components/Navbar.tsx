"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Moon, Sun, Command } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Blogs", href: "/blogs" },
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
  shadow-[0_8px_30px_hsl(var(--foreground)/0.18)]
  px-1.5 py-1
  gap-1
  ${scrolled ? "justify-center" : "w-full max-w-6xl justify-between"}
`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 pl-2 pr-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-card-foreground font-bold text-xs">
            AK
          </div>

          <AnimatePresence>
            {!scrolled && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden whitespace-nowrap leading-tight text-left ml-1"
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Creative Engineer
                </p>
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-accent">
                  Available for hire
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        {/* Center nav pill */}
        <nav className="flex items-center gap-0.5 rounded-full bg-card/40 px-1 py-1">
          {navItems.map((item) => {
            const active = location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                className="relative px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors"
              >
                {active && (
                  <motion.div
                    layoutId="navbar-pill"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-foreground"
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active
                      ? "text-background"
                      : "text-muted-foreground hover:text-foreground"
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
              className={`
                flex items-center gap-1
                px-3.5 py-1.5
                rounded-full
                text-[13px] font-medium
                transition-colors
                ${
                  moreOpen
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              More
              <ChevronDown
                size={13}
                className={`transition-transform duration-300 ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="
                    absolute top-full mt-3 right-0
                    flex
                    rounded-2xl
                    border border-border
                    bg-card
                    shadow-[0_20px_60px_hsl(var(--foreground)/0.22)]
                    overflow-hidden
                    min-w-[420px]
                  "
                >
                  {/* Featured panel */}
                  <Link
                    to="/labs"
                    className="
                      relative flex-1
                      w-[180px]
                      flex flex-col justify-end
                      p-5
                      border-r border-border
                      bg-gradient-to-br from-background/60 to-transparent
                      hover:bg-background/70
                      transition-colors
                    "
                  >
                    <p className="text-base font-bold text-foreground mb-1">
                      Labs
                    </p>
                    <p className="text-xs leading-snug text-muted-foreground">
                      Experimental playground &amp; fun micro-tools
                    </p>
                  </Link>

                  {/* List items */}
                  <div className="flex flex-col gap-1 p-2 flex-1">
                    {moreItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="
                          flex items-center gap-3
                          rounded-xl px-3 py-2.5
                          hover:bg-muted
                          transition-colors
                        "
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card/50 text-muted-foreground">
                          {item.icon === "link" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1" />
                              <path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1" />
                            </svg>
                          )}
                          {item.icon === "monitor" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect x="2" y="3" width="20" height="14" rx="2" />
                              <path d="M8 21h8M12 17v4" />
                            </svg>
                          )}
                          {item.icon === "book" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect x="5" y="2" width="14" height="20" rx="2" />
                            </svg>
                          )}
                        </span>
                        <span>
                          <p className="text-sm font-semibold text-foreground">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.desc}
                          </p>
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-1.5 pl-1 pr-1">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
            className="
              flex h-8 w-8 items-center justify-center
              rounded-full
text-muted-foreground
hover:text-foreground
              hover:bg-muted
              transition-colors
            "
          >
            {isDark ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          {/* Book a Call */}
          <Link
            to="/contact"
            className="
    relative
    overflow-hidden
    rounded-full
    px-3.5 py-1.5
    text-[13px]
    font-semibold
    text-background
    whitespace-nowrap
    border border-border
    transition-all
    duration-300
    hover:scale-[1.02]
  "
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--foreground) / 0.95), hsl(var(--foreground) / 0.78))",
              boxShadow:
                "inset 0 1px 0 hsl(var(--background) / 0.16), 0 8px 20px hsl(var(--foreground) / 0.18)",
            }}
          >
            Book a Call
          </Link>

          {/* Command icon */}
          <button
            aria-label="Open command palette"
            title="Open command palette"
            className="
              flex h-8 w-8 items-center justify-center
              rounded-full
              border border-border
              text-foreground
              hover:bg-muted
              transition-colors
            "
          >
            <Command size={14} />
          </button>
        </div>
      </motion.div>
    </header>
  );
}
