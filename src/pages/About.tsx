import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import about from "@/assets/about.jpg";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";

import img1 from "@/assets/img1.jpeg";
import img2 from "@/assets/img2.jpg";
import img3 from "@/assets/img3.jpeg";
const images = [img1, img2, img3];

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const GITHUB_USERNAME = "A-verse";

const journey = [
  {
    period: "2026 — PRESENT",
    title: "Web Developer",
    company: "FABRO",
    location: "Remote, India",
    type: "Freelance / Contract",
    description: [
      "Delivered a scalable <b>e-commerce platform</b> showcasing Indian embroidery through high-impact visual storytelling.",
      "Built dynamic product pages with <b>Next.js and Tailwind CSS</b>, optimizing for performance and mobile responsiveness.",
      "Integrated <b>payment gateways and inventory systems</b>, enabling smooth end-to-end purchase flows.",
    ],
    skills: ["Next.js", "React", "Tailwind CSS", "Node.js"],
  },
  {
    period: "2025",
    title: "Software Developer",
    company: "JMRC",
    location: "Jaipur, India",
    type: "Internship",
    description: [
      "Developed <b>voice detection modules</b> using Python for real-time audio processing in metro operations.",
      "Contributed to a <b>smart complaint portal</b> streamlining citizen grievance redressal for metro staff.",
      "Collaborated with cross-functional teams in an <b>Agile environment</b>, participating in code reviews and sprint planning.",
    ],
    skills: ["Python", "Flask", "React", "PostgreSQL"],
  },
  {
    period: "2024 — 2025",
    title: "Core Committee Member",
    company: "APS, IIIT Jabalpur",
    location: "Jabalpur, India",
    type: "Leadership Role",
    description: [
      "Organized <b>technical workshops and coding sessions</b> for 200+ students across departments.",
      "Led <b>STEM engagement activities</b> fostering a culture of innovation and collaborative learning.",
      "Coordinated with faculty and external speakers to deliver <b>hands-on seminars</b> on emerging tech.",
    ],
    skills: ["Leadership", "Event Management", "Public Speaking"],
  },
  {
    period: "2024",
    title: "Open Source Contributor",
    company: "GSSoC",
    location: "Remote",
    type: "Open Source Program",
    description: [
      "Contributed <b>feature enhancements and bug fixes</b> to production-level open-source repositories.",
      "Improved <b>UI components and documentation</b> across multiple projects, increasing contributor accessibility.",
      "Engaged with maintainers through <b>pull requests and code reviews</b>, following best practices in OSS collaboration.",
    ],
    skills: ["Git", "React", "JavaScript", "Open Source"],
  },
  {
    period: "2023",
    title: "B.Tech Student",
    company: "IIIT Jabalpur",
    location: "Jabalpur, India",
    type: "Full-time Student",
    description: [
      "Began the journey into <b>computer science</b>, discovering a passion for building structured, scalable systems.",
      "Explored <b>data structures, algorithms, and systems programming</b> through coursework and self-driven projects.",
      "Built foundational projects in <b>C++, Python, and web technologies</b>, laying the groundwork for full-stack development.",
    ],
    skills: ["C++", "Python", "DSA", "Web Basics"],
  },
];

const interests = [
  "Photography",
  "Storytelling",
  "Writing",
  "Music",
  "Open Source",
  "Travel",
  "Cooking",
  "Design",
];

// ─────────────────────────────────────────────────────────────────────────────
// GITHUB ACTIVITY SECTION (real data via GitHub REST + contributions scrape)
// ─────────────────────────────────────────────────────────────────────────────

interface ContribDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

function levelFromCount(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  const ratio = count / Math.max(max, 1);
  if (ratio > 0.75) return 4;
  if (ratio > 0.5) return 3;
  if (ratio > 0.25) return 2;
  return 1;
}

function GitHubActivity() {
  const [weeks, setWeeks] = useState<ContribDay[][]>([]);
  const [totalContribs, setTotalContribs] = useState<number | null>(null);
  const [months, setMonths] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchContributions() {
      try {
        // github-contributions-api (public, no auth needed) mirrors the
        // contribution graph data shown on github.com profile pages.
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
        );
        if (!res.ok) throw new Error("Failed to fetch contributions");
        const data = await res.json();

        const contributions: { date: string; count: number }[] =
          data.contributions || [];

        if (contributions.length === 0) throw new Error("No data");

        const maxCount = Math.max(...contributions.map((d) => d.count), 1);
        const total = contributions.reduce((sum, d) => sum + d.count, 0);

        // group into weeks (columns), each week = array of up to 7 days
        const grouped: ContribDay[][] = [];
        let currentWeek: ContribDay[] = [];

        contributions.forEach((day, idx) => {
          const dateObj = new Date(day.date);
          const dow = dateObj.getDay(); // 0 = Sunday
          if (idx === 0) {
            // pad first week so it starts on Sunday
            for (let i = 0; i < dow; i++) {
              currentWeek.push({ date: "", count: -1, level: 0 });
            }
          }
          currentWeek.push({
            date: day.date,
            count: day.count,
            level: levelFromCount(day.count, maxCount),
          });
          if (dow === 6) {
            grouped.push(currentWeek);
            currentWeek = [];
          }
        });
        if (currentWeek.length > 0) grouped.push(currentWeek);

        // month labels — one per ~4.3 weeks
        const monthLabels: string[] = [];
        let lastMonth = -1;
        grouped.forEach((week) => {
          const firstValidDay = week.find((d) => d.date);
          if (firstValidDay) {
            const m = new Date(firstValidDay.date).getMonth();
            if (m !== lastMonth) {
              monthLabels.push(
                new Date(firstValidDay.date).toLocaleString("en-US", {
                  month: "short",
                }),
              );
              lastMonth = m;
            } else {
              monthLabels.push("");
            }
          } else {
            monthLabels.push("");
          }
        });

        if (!cancelled) {
          setWeeks(grouped);
          setTotalContribs(total);
          setMonths(monthLabels);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }

    fetchContributions();
    return () => {
      cancelled = true;
    };
  }, []);

  const levelColors = ["#1a1a1a", "#0e4429", "#006d32", "#26a641", "#39d353"];

  return (
    <section className="py-20 md:py-28">
      <ScrollReveal>
        <p className="section-label text-center">MY CODE JOURNEY</p>
        <h2 className="section-heading mb-3 text-center">GitHub Activity</h2>
        <h2 className="text-center mb-12">
          <span
            className="font-serif italic text-[2.2rem] md:text-[3.2rem] leading-none bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #3b82f6, #a855f7, #ec4899)",
            }}
          >
            &amp;&amp; Open Source
          </span>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="glass-card rounded-2xl p-4 md:p-8 overflow-hidden">
          {/* Top row: github icon + count + legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 16 16"
                className="w-5 h-5 md:w-6 md:h-6 text-foreground"
                fill="currentColor"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span className="text-sm md:text-base text-secondary-foreground">
                {loading
                  ? "Loading contributions…"
                  : error
                    ? "Couldn't load live data"
                    : `${totalContribs} contributions in the last year`}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span>Less</span>
              {levelColors.map((c, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: c }}
                />
              ))}
              <span>More</span>
            </div>
          </div>

          {/* Graph */}
          <div className="overflow-x-auto pb-2 -mx-1 px-1">
            {loading ? (
              <div className="flex gap-1">
                {Array.from({ length: 52 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <div
                        key={j}
                        className="w-[10px] h-[10px] md:w-3 md:h-3 rounded-sm bg-zinc-800/50 animate-pulse"
                      />
                    ))}
                  </div>
                ))}
              </div>
            ) : error ? (
              <p className="text-sm text-zinc-500 py-8 text-center">
                Live GitHub data unavailable right now — please check back
                later.
              </p>
            ) : (
              <div className="inline-flex flex-col gap-1 min-w-full">
                {/* Month labels */}
                <div className="flex gap-1 ml-8 mb-1">
                  {months.map((m, i) => (
                    <div
                      key={i}
                      className="w-[10px] md:w-3 text-[9px] md:text-[10px] text-zinc-500 flex-shrink-0"
                    >
                      {m}
                    </div>
                  ))}
                </div>

                <div className="flex gap-1">
                  {/* Day labels */}
                  <div className="flex flex-col gap-1 mr-1 flex-shrink-0">
                    {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                      <div
                        key={i}
                        className="w-6 h-[10px] md:h-3 text-[9px] md:text-[10px] text-zinc-500 flex items-center"
                      >
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Weeks */}
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-1 flex-shrink-0">
                      {Array.from({ length: 7 }).map((_, di) => {
                        const day = week[di];
                        if (!day || day.count === -1) {
                          return (
                            <div
                              key={di}
                              className="w-[10px] h-[10px] md:w-3 md:h-3 rounded-sm"
                              style={{ backgroundColor: "transparent" }}
                            />
                          );
                        }
                        return (
                          <div
                            key={di}
                            title={`${day.date}: ${day.count} contributions`}
                            className="w-[10px] h-[10px] md:w-3 md:h-3 rounded-sm transition-colors"
                            style={{
                              backgroundColor: levelColors[day.level],
                            }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineColRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [lineLeft, setLineLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [avatarPx, setAvatarPx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ── Detect mobile breakpoint ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Measures only lineLeft (horizontal position of the vertical line).
  // Dot vertical positions are NOT cached here anymore — they're read
  // live on every scroll tick instead, to avoid stale-measurement drift.
  const measureLineLeft = () => {
    if (!timelineRef.current || !lineColRef.current) return;
    const containerRect = timelineRef.current.getBoundingClientRect();
    const lineRect = lineColRef.current.getBoundingClientRect();
    setLineLeft(lineRect.left - containerRect.left + lineRect.width / 2);
  };

  useLayoutEffect(() => {
    measureLineLeft();

    const ro = new ResizeObserver(() => measureLineLeft());
    if (timelineRef.current) ro.observe(timelineRef.current);

    window.addEventListener("resize", measureLineLeft);
    const timers = [100, 300, 600, 1000, 1600].map((t) =>
      setTimeout(measureLineLeft, t),
    );

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureLineLeft);
      timers.forEach(clearTimeout);
    };
  }, [isMobile]);

  // rAF-driven scroll tracking — re-measures dot positions live on every
  // tick (instead of relying on cached state), so the thumb never drifts
  // even after layout shifts or long scroll sessions.
  useEffect(() => {
    let rafId: number;
    let ticking = false;

    const update = () => {
      ticking = false;

      if (!timelineRef.current) return;

      const containerRect = timelineRef.current.getBoundingClientRect();

      const tops = dotRefs.current
        .map((el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return r.top - containerRect.top + r.height / 2;
        })
        .filter((v): v is number => v !== null);

      if (tops.length < 2) return;

      const first = tops[0];
      const last = tops[tops.length - 1];

      const sectionTop = window.scrollY + containerRect.top;

      // start when timeline top reaches center of screen
      const start = sectionTop - window.innerHeight * 0.35;

      // finish when bottom reaches center
      const end =
        sectionTop +
        timelineRef.current.offsetHeight -
        window.innerHeight * 0.5;

      const progress = Math.max(
        0,
        Math.min(1, (window.scrollY - start) / (end - start)),
      );

      // progress = 0 keeps the thumb exactly centered on the first dot
      setAvatarPx(first + progress * (last - first));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    // run once on mount
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background noise-overlay overflow-x-hidden">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════
          NEW SECTION — "ABOUT ME" full hero 
      ═══════════════════════════════════════════════════════════════════ */}

      <div className="px-5 md:px-16 lg:px-24 pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto">
          {/* ───────────────── STORY ───────────────── */}
          <ScrollReveal className="text-center mb-6">
            <p className="section-label">GET TO KNOW ME BETTER </p>

            <h2 className="section-heading mb-6">
              Nice to meet you. I'm{" "}
              <span className="gradient-text font-serif italic">Anjali.</span>
            </h2>
          </ScrollReveal>

          {/* ───────────────── CAROUSEL ───────────────── */}
          <ScrollReveal delay={0.1}>
            <div className="mb-10">
              <div className="relative h-[360px] flex justify-center items-center overflow-hidden">
                {images.map((image, i) => {
                  const positions = [
                    {
                      x: -140,
                      y: 15,
                      scale: 0.75,
                      rotate: 0,
                      opacity: 0.45,
                      zIndex: 1,
                    },
                    {
                      x: 0,
                      y: -5,
                      scale: 1,
                      rotate: 0,
                      opacity: 1,
                      zIndex: 3,
                    },
                    {
                      x: 140,
                      y: 15,
                      scale: 0.75,
                      rotate: 0,
                      opacity: 0.45,
                      zIndex: 1,
                    },
                  ];

                  const pos = positions[(i + currentImage) % 3];

                  return (
                    <motion.img
                      key={i}
                      src={image}
                      className="
              absolute
              object-cover
              rounded-[34px]
              border border-white/10
              shadow-[0_20px_80px_rgba(0,0,0,0.55)]
            "
                      style={{
                        width: pos.scale === 1 ? 220 : 150,
                        height: pos.scale === 1 ? 320 : 220,
                        zIndex: pos.zIndex,
                      }}
                      animate={{
                        x: pos.x,
                        y: pos.y,
                        scale: pos.scale,
                        rotate: pos.rotate,
                        opacity: pos.opacity,
                      }}
                      transition={{
                        duration: 1.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* ───────────────── CONTENT ───────────────── */}
          <div className="max-w-5xl mx-auto mt-4">
            <ScrollReveal>
              <div className="space-y-7 text-[15px] md:text-[16px] leading-[2.1] text-secondary-foreground">
                <p>
                  I'm a final year student at IIIT Jabalpur who builds for the
                  web and is slowly falling for the part of computer science
                  that lives under the hood. There's a specific kind of joy I've
                  gotten hooked on: that moment when an API stops returning
                  errors, the UI finally behaves, and the thing you imagined in
                  your head is actually running on a screen. That feeling is
                  probably the biggest reason I keep coming back to my laptop.
                </p>

                <p>
                  Most days you'll find me building full-stack applications,
                  debugging something I broke an hour ago, or squeezing in
                  another DSA problem before placement season arrives. Recently,
                  I've become increasingly curious about machine learning and
                  how AI can quietly improve products — not as a flashy label,
                  but as something that genuinely makes life easier for the
                  person using it.
                </p>

                <p>
                  Over the last few years, experiences like my internship at
                  Jaipur Metro Rail Corporation, contributing to open source
                  through GirlScript Summer of Code, and organizing events for
                  the Astronomy and Physics Society have taught me that
                  engineering is never just about code. It's also about
                  collaboration, communication, and learning to build things
                  bigger than yourself. I don't believe great software is built
                  by chasing complexity. I think the best technology feels
                  invisible — simple enough to be forgotten, yet useful enough
                  to make someone's day just a little easier.
                </p>

                <p>
                  Outside of programming, I'm usually behind a camera, buried in
                  a book, rebuilding playlists for the third time in a month, or
                  writing thoughts that will probably never be published.
                  Photography remains the one hobby I always come back to — it
                  feels strangely similar to debugging, except instead of
                  finding clarity in code, you're finding it in light.
                </p>
                {/* Philosophy */}
                <div className="pt-12 mt-10 border-t border-border">
                  <blockquote
                    className="
            font-serif
            italic
            text-center
            text-[1rem]
            md:text-[1.2rem]
            leading-[1.45]
            max-w-4xl
            mx-auto
            text-foreground
        "
                  >
                    “I'm not trying to know everything. I'm trying to stay
                    curious long enough to keep becoming a better engineer.”
                  </blockquote>
                </div>
              </div>

              {/* Socials */}
              <div className="flex justify-center gap-4 mt-8 mb-32">
                <a className="glass-card rounded-full p-3 hover:scale-110 transition-all duration-300">
                  <FaGithub size={16} />
                </a>

                <a className="glass-card rounded-full p-3 hover:scale-110 transition-all duration-300">
                  <FaLinkedin size={16} />
                </a>

                <a className="glass-card rounded-full p-3 hover:scale-110 transition-all duration-300">
                  <FaInstagram size={16} />
                </a>

                <a className="glass-card rounded-full p-3 hover:scale-110 transition-all duration-300">
                  <FaXTwitter size={16} />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              EXPERIENCE / JOURNEY TIMELINE — fully responsive
          ═══════════════════════════════════════════════════════════════ */}
          <ScrollReveal className="pt-20 md:pt-28">
            <p className="section-label">CAREER PATH</p>

            <h2 className="section-heading mb-14 md:mb-20">
              The chapters{" "}
              <span className="font-serif italic gradient-text">
                behind the work
              </span>
            </h2>
          </ScrollReveal>

          {/* ── DESKTOP / TABLET TIMELINE (md and up) ── */}
          <div
            ref={timelineRef}
            className="relative mb-32 md:mb-40 hidden md:block"
          >
            {lineLeft > 0 && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 30 }}
              >
                {/* Base grey line */}
                <div
                  className="absolute top-0 bottom-0 rounded-full bg-zinc-800"
                  style={{
                    left: lineLeft - 3,
                    width: 6,
                  }}
                />

                {/* Pink progress line — directly bound, no animate/spring */}
                <div
                  className="absolute top-0 rounded-full"
                  style={{
                    left: lineLeft - 3,
                    width: 6,
                    height: avatarPx,
                    background:
                      "linear-gradient(to bottom,#f97316,#ec4899,#ef4444)",
                    willChange: "height",
                  }}
                />

                {/* Slider thumb — directly bound, no animate/spring */}
                <div
                  style={{
                    position: "absolute",
                    left: lineLeft,
                    top: avatarPx,
                    transform: "translate(-50%, -50%)",
                    willChange: "top",
                  }}
                >
                  <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-pink-500 bg-background">
                    <img
                      src={about}
                      className="w-full h-full object-cover"
                      alt="avatar"
                    />
                  </div>
                </div>
              </div>
            )}

            <div
              className="grid"
              style={{ gridTemplateColumns: "minmax(220px,280px) 72px 1fr" }}
            >
              {journey.map((item, i) => (
                <React.Fragment key={i}>
                  {/* LEFT */}
                  <motion.div
                    key={`left-${i}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-right pr-8 pb-32 md:pb-44 pt-1"
                    style={{ gridColumn: 1, gridRow: i + 1 }}
                  >
                    <p className="text-[11px] font-medium tracking-[0.22em] text-zinc-500 uppercase mb-2.5">
                      {item.period}
                    </p>
                    <h4
                      className="font-serif italic text-[1.6rem] md:text-[1.85rem] mb-4 leading-none tracking-tight bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #f97316, #ec4899)",
                      }}
                    >
                      {item.company}
                    </h4>
                    <div className="space-y-2 text-sm text-zinc-500">
                      <p className="flex items-center justify-end gap-2">
                        <svg
                          className="w-3.5 h-3.5 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                          />
                          <circle cx="12" cy="9" r="2.5" strokeWidth={1.5} />
                        </svg>
                        {item.location}
                      </p>
                      <p className="flex items-center justify-end gap-2">
                        <svg
                          className="w-3.5 h-3.5 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="2"
                            y="7"
                            width="20"
                            height="14"
                            rx="2"
                            strokeWidth={1.5}
                          />
                          <path
                            strokeLinecap="round"
                            strokeWidth={1.5}
                            d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
                          />
                        </svg>
                        {item.type}
                      </p>
                    </div>
                  </motion.div>

                  {/* CENTER — measurement dot */}
                  <div
                    key={`center-${i}`}
                    ref={i === 0 ? lineColRef : undefined}
                    className="flex justify-center pt-1"
                    style={{ gridColumn: 2, gridRow: i + 1 }}
                  >
                    <div
                      ref={(el) => {
                        dotRefs.current[i] = el;
                      }}
                      className="h-2 w-2 rounded-full opacity-0 mt-1"
                    />
                  </div>

                  {/* RIGHT */}
                  <motion.div
                    key={`right-${i}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: 0.08,
                    }}
                    className="pl-8 pb-32 md:pb-44 pt-1"
                    style={{ gridColumn: 3, gridRow: i + 1 }}
                  >
                    <h3 className="text-[1.7rem] md:text-[2.1rem] font-bold text-white mb-5 leading-tight tracking-tight">
                      {item.title}
                    </h3>
                    <ul className="space-y-3 mb-7">
                      {item.description.map((desc, j) => (
                        <li
                          key={j}
                          className="text-zinc-400 leading-[1.85] text-[14px] md:text-[15px] [&_b]:text-zinc-100 [&_b]:font-semibold"
                          dangerouslySetInnerHTML={{ __html: desc }}
                        />
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/60 text-xs text-zinc-300 tracking-wide"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── MOBILE TIMELINE (below md) — vertical stack, line on left ── */}
          <div className="relative mb-24 md:hidden">
            {/* gradient line on the left */}
            <div
              className="absolute top-0 bottom-0 rounded-full bg-zinc-800"
              style={{ left: "11px", width: 5 }}
            />
            <motion.div
              className="absolute top-0 rounded-full"
              style={{
                left: "11px",
                width: 5,
                height: "100%",
                background:
                  "linear-gradient(to bottom, #f97316, #ec4899, #ef4444)",
                opacity: 0.9,
              }}
            />

            <div className="flex flex-col gap-12">
              {journey.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative pl-9"
                >
                  {/* dot */}
                  <div
                    className="absolute rounded-full border-2 border-orange-400 overflow-hidden"
                    style={{
                      left: "0px",
                      top: "2px",
                      width: 24,
                      height: 24,
                    }}
                  >
                    <img
                      src={about}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>

                  <p className="text-[10px] font-medium tracking-[0.2em] text-zinc-500 uppercase mb-1.5">
                    {item.period}
                  </p>
                  <h4
                    className="font-serif italic text-lg mb-1 leading-tight tracking-tight bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #f97316, #ec4899)",
                    }}
                  >
                    {item.company}
                  </h4>
                  <div className="flex flex-col gap-1 text-xs text-zinc-500 mb-4">
                    <span>{item.location}</span>
                    <span>{item.type}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <ul className="space-y-2.5 mb-5">
                    {item.description.map((desc, j) => (
                      <li
                        key={j}
                        className="text-zinc-400 leading-[1.75] text-[13.5px] [&_b]:text-zinc-100 [&_b]:font-semibold"
                        dangerouslySetInnerHTML={{ __html: desc }}
                      />
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full border border-zinc-700 bg-zinc-900/60 text-[11px] text-zinc-300 tracking-wide"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              NEW SECTION — GitHub Activity (real API, matches screenshot 2)
          ═══════════════════════════════════════════════════════════════ */}
          <GitHubActivity />

          {/* ── Interests ── */}
          <ScrollReveal>
            <p className="section-label">Beyond Code</p>
            <h2 className="section-heading mb-10">
              Things I{" "}
              <span className="font-serif italic gradient-text">love</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest, i) => (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-border text-sm text-secondary-foreground hover:border-accent/30 hover:text-foreground transition-all cursor-default"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <Footer />
    </div>
  );
}
