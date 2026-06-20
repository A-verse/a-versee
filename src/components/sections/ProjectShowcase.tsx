"use client";

import { useEffect, useRef, useState } from "react";

interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  tech: TechItem[];
  accent: string;
  images: {
    main: string; // large right card
    secondary: string; // top-left card
    tertiary: string; // bottom-left card
    sliderThumb: string;
  };
  link?: string;
}

interface TechItem {
  name: string;
  icon?: string;
}

const PROJECTS: Project[] = [
  {
    id: "01",
    category: "E-COMMERCE PLATFORM",
    title: "FABRO",
    description:
      "Modern customization-first apparel platform focused on Indian embroidery and premium shopping experiences. Built for scale with real-time inventory and dynamic product configurator.",
    features: [
      "Dynamic product customization engine",
      "Secure Stripe payment integration",
      "Prisma ORM with PostgreSQL architecture",
      "Admin dashboard with inventory management",
    ],
    tech: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Prisma" },
      { name: "Tailwind CSS" },
      { name: "Stripe" },
    ],
    accent: "#C9783A",
    link: "#",
    images: {
      main: "/images/fabro-desktop.jpg",
      secondary: "/images/fabro-phone1.jpg",
      tertiary: "/images/fabro-phone2.jpg",
      sliderThumb: "/assets/about.jpg",
    },
  },
  {
    id: "02",
    category: "ENTERPRISE PLATFORM",
    title: "JMRC",
    description:
      "Metro service management system with intelligent analytics and reporting capabilities. Designed for high-throughput operations with real-time data pipelines and role-based access control.",
    features: [
      "Role-based dashboards for operators",
      "Dynamic fare engine with zone mapping",
      "Real-time ridership analytics",
      "Automated reporting & PDF exports",
    ],
    tech: [
      { name: "React" },
      { name: "Node.js" },
      { name: "Express" },
      { name: "PostgreSQL" },
    ],
    accent: "#22c55e",
    link: "#",
    images: {
      main: "/images/jmrc-desktop.jpg",
      secondary: "/images/jmrc-phone1.jpg",
      tertiary: "/images/jmrc-phone2.jpg",
      sliderThumb: "/assets/about.jpg",
    },
  },
  {
    id: "03",
    category: "FOOD TECH APP",
    title: "PALATE",
    description:
      "AI-powered recipe discovery and personal kitchen journal with smart meal planning. Learns your taste profile over time and surfaces hyper-personalized recommendations.",
    features: [
      "AI-driven recipe recommendations",
      "Personal kitchen journal with cloud sync",
      "Weekly meal planner with grocery list",
      "Nutritional insights per meal",
    ],
    tech: [
      { name: "Next.js" },
      { name: "Supabase" },
      { name: "Tailwind CSS" },
      { name: "OpenAI" },
    ],
    accent: "#E91E8C",
    link: "#",
    images: {
      main: "/images/palate-desktop.jpg",
      secondary: "/images/palate-phone1.jpg",
      tertiary: "/images/palate-phone2.jpg",
      sliderThumb: "/assets/about.jpg",
    },
  },
  {
    id: "04",
    category: "HEALTH TECH",
    title: "NEUROSPEAK",
    description:
      "AI-powered assistive communication platform for non-verbal users and caregivers. Features real-time speech synthesis, emotion detection, and an emergency alert system.",
    features: [
      "Real-time AI speech synthesis",
      "Emotion detection via facial cues",
      "Emergency SOS alert system",
      "Caregiver & patient role-based routing",
    ],
    tech: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Anthropic API" },
      { name: "Web Speech API" },
      { name: "Tailwind CSS" },
    ],
    accent: "#7C3AED",
    link: "#",
    images: {
      main: "/images/neurospeak-desktop.jpg",
      secondary: "/images/neurospeak-phone1.jpg",
      tertiary: "/images/neurospeak-phone2.jpg",
      sliderThumb: "/assets/about.jpg",
    },
  },
  {
    id: "05",
    category: "PORTFOLIO PLATFORM",
    title: "S.NEHRA",
    description:
      "Bespoke portfolio and personal brand platform built for creative professionals. Features dynamic case studies, CMS-powered content, and cinematic motion design throughout.",
    features: [
      "Dynamic case studies with CMS",
      "Sanity-powered content management",
      "GSAP-driven motion design",
      "Lighthouse 98+ performance score",
    ],
    tech: [
      { name: "Next.js" },
      { name: "Framer Motion" },
      { name: "Sanity" },
      { name: "Vercel" },
    ],
    accent: "#F59E0B",
    link: "#",
    images: {
      main: "/images/snehra-desktop.jpg",
      secondary: "/images/snehra-phone1.jpg",
      tertiary: "/images/snehra-phone2.jpg",
      sliderThumb: "/assets/about.jpg",
    },
  },
];

const TOTAL = PROJECTS.length;
const SCROLL_THRESHOLD = 80;
const TRACK_H = 320;
const THUMB_H = 52;
const THUMB_W = 40;

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function ProjectCursor({
  x,
  y,
  visible,
}: {
  x: number;
  y: number;
  visible: boolean;
}) {
  const text = "VISIT PROJECT · VISIT PROJECT · ";
  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        width: 108,
        height: 108,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.18s ease",
      }}
    >
      <svg
        viewBox="0 0 108 108"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          animation: "cur-spin 5s linear infinite",
        }}
      >
        <defs>
          <path
            id="cp"
            d="M54,54 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
          />
        </defs>
        <text
          fontSize="7.5"
          fill="currentColor"
          className="text-foreground font-sans"
          letterSpacing="2.8"
          fontWeight="700"
        >
          <textPath href="#cp">{text}</textPath>
        </text>
      </svg>
      {/* Center circle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 46,
          height: 46,
          transform: "translate(-50%, -50%)",
          background: "hsl(var(--foreground) / 0.12)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: "50%",
          border: "1px solid hsl(var(--foreground) / 0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-foreground"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
    </div>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
function Timeline({
  activeIndex,
  thumbSrc,
}: {
  activeIndex: number;
  thumbSrc: string;
}) {
  const step = (TRACK_H - THUMB_H) / (TOTAL - 1);
  const thumbY = activeIndex * step;
  const dotY = thumbY + THUMB_H / 2;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 0,
        userSelect: "none",
        position: "relative",
        paddingTop: "0.5rem",
      }}
    >
      {/* Counter */}
      <div
        style={{ textAlign: "center", marginBottom: "1rem", lineHeight: 1.1 }}
      >
        <div
          className="text-foreground"
          style={{ fontSize: "1rem", fontWeight: 800 }}
        >
          {String(activeIndex + 1).padStart(2, "0")}
        </div>
        <div className="text-muted-foreground" style={{ fontSize: "0.62rem" }}>
          {String(TOTAL).padStart(2, "0")}
        </div>
      </div>

      <div
        style={{ position: "relative", width: THUMB_W + 20, height: TRACK_H }}
      >
        {/* Background track */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 4,
            height: "100%",
            background: "hsl(var(--muted))",
            borderRadius: 4,
          }}
        />

        {/* Filled track — pink gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 4,
            height: dotY,
            background:
              "linear-gradient(180deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 60%, hsl(var(--secondary)) 100%)",
            borderRadius: 4,
            transition: "height 0.5s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: "0 0 8px hsl(var(--accent) / 0.4)",
          }}
        />

        {/* Sliding thumbnail */}
        <div
          style={{
            position: "absolute",
            top: thumbY,
            left: "50%",
            transform: "translateX(-50%)",
            width: THUMB_W,
            height: THUMB_H,
            borderRadius: 12,
            overflow: "hidden",
            border: "2px solid hsl(var(--accent))",
            boxShadow:
              "0 0 14px hsl(var(--accent) / 0.35), 0 8px 24px hsl(var(--foreground) / 0.28)",
            transition: "top 0.5s cubic-bezier(0.4,0,0.2,1)",
            zIndex: 2,
            background: "hsl(var(--card))",
          }}
        >
          <img
            src={thumbSrc}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
        </div>

        {/* Dot */}
        <div
          style={{
            position: "absolute",
            top: dotY,
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: "hsl(var(--background))",
            border: "2.5px solid hsl(var(--accent))",
            boxShadow: "0 0 10px hsl(var(--accent) / 0.53)",
            transition: "top 0.5s cubic-bezier(0.4,0,0.2,1)",
            zIndex: 3,
          }}
        />

        {/* Remaining track */}
        <div
          style={{
            position: "absolute",
            top: dotY,
            left: "50%",
            transform: "translateX(-50%)",
            width: 4,
            height: TRACK_H - dotY,
            background: "hsl(var(--muted))",
            borderRadius: 4,
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}

// ─── Left Panel ───────────────────────────────────────────────────────────────
function LeftPanel({
  project,
  visible,
}: {
  project: Project;
  visible: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.42s ease, transform 0.42s ease",
        pointerEvents: visible ? "auto" : "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 0,
      }}
    >
      {/* Category */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          marginBottom: "0.75rem",
        }}
      >
        <span
          style={{
            width: "1.4rem",
            height: 2,
            background: project.accent,
            flexShrink: 0,
            display: "block",
            borderRadius: 2,
          }}
        />
        <span
          style={{
            fontSize: "0.58rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: project.accent,
            fontWeight: 700,
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Title */}
      <h2
        style={{
          fontSize: "clamp(2.6rem, 4vw, 4rem)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
          color: "hsl(var(--foreground))",
          margin: "0 0 1rem",
        }}
      >
        {project.title}
      </h2>

      {/* Description */}
      <p
        style={{
          fontSize: "0.85rem",
          color: "hsl(var(--muted-foreground))",
          lineHeight: 1.8,
          margin: "0 0 1.2rem",
          maxWidth: 420,
        }}
      >
        {project.description}
      </p>

      {/* Features */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 1.4rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {project.features.map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.6rem",
              fontSize: "0.82rem",
              color: "hsl(var(--secondary-foreground))",
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{ flexShrink: 0, marginTop: 2 }}
            >
              <path
                d="M2 7l3.5 3.5L12 3"
                stroke={project.accent}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {/* Tech pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.tech.map((t) => (
          <span
            key={t.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.3rem 0.85rem",
              border: "1px solid hsl(var(--border))",
              borderRadius: 999,
              fontSize: "0.7rem",
              color: "hsl(var(--muted-foreground))",
              background: "hsl(var(--card))",
            }}
          >
            {t.icon && (
              <img
                src={t.icon}
                alt=""
                style={{ width: 12, height: 12, objectFit: "contain" }}
              />
            )}
            {t.name}
          </span>
        ))}
      </div>

      {/* CTA */}
      {project.link && project.link !== "#" && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "1.4rem",
            width: "fit-content",
            padding: "0.55rem 1.2rem",
            border: `1px solid ${project.accent}44`,
            borderRadius: 999,
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: project.accent,
            textTransform: "uppercase",
            textDecoration: "none",
            background: `${project.accent}11`,
            transition: "background 0.2s ease",
          }}
        >
          View Project
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      )}
    </div>
  );
}

// ─── Right Images — 3-card layout matching screenshot ─────────────────────────
function RightImages({
  project,
  visible,
  onEnter,
  onLeave,
}: {
  project: Project;
  visible: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        inset: 0,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.42s ease",
        pointerEvents: visible ? "auto" : "none",
        cursor: "none",
      }}
    >
      {/* LEFT COLUMN: two stacked cards */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "44%",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Top-left card */}
        <div
          style={{
            flex: "0 0 48%",
            borderRadius: 18,
            overflow: "hidden",
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            boxShadow: "0 16px 48px hsl(var(--foreground) / 0.24)",
          }}
        >
          <img
            src={project.images.secondary}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Bottom-left card */}
        <div
          style={{
            flex: "0 0 46%",
            borderRadius: 18,
            overflow: "hidden",
            background: project.accent,
            border: "1px solid hsl(var(--border))",
            boxShadow: `0 12px 40px ${project.accent}44`,
          }}
        >
          <img
            src={project.images.tertiary}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              mixBlendMode: "luminosity",
              opacity: 0.75,
            }}
          />
        </div>
      </div>

      {/* RIGHT COLUMN: one tall card */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "53%",
          borderRadius: 18,
          overflow: "hidden",
          background: `${project.accent}22`,
          border: "1px solid hsl(var(--border))",
          boxShadow: `0 20px 60px ${project.accent}33`,
        }}
      >
        <img
          src={project.images.main}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -300, y: -300 });
  const [cursorVisible, setCursorVisible] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollAcc = useRef(0);
  const isLocked = useRef(false);
  const inView = useRef(false);

  const cur = PROJECTS[activeIndex];

  useEffect(() => {
    const move = (e: MouseEvent) =>
      setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!inView.current) return;
      if (activeIndex === 0 && e.deltaY < 0) return;
      if (activeIndex === TOTAL - 1 && e.deltaY > 0) return;
      e.preventDefault();
      if (isLocked.current) return;
      scrollAcc.current += e.deltaY;
      if (Math.abs(scrollAcc.current) >= SCROLL_THRESHOLD) {
        const dir = scrollAcc.current > 0 ? 1 : -1;
        scrollAcc.current = 0;
        advance(activeIndex + dir);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [activeIndex]);

  useEffect(() => {
    let sy = 0;
    const onStart = (e: TouchEvent) => {
      sy = e.touches[0].clientY;
    };
    const onMove = (e: TouchEvent) => {
      if (!inView.current) return;
      const dy = sy - e.touches[0].clientY;
      if (activeIndex === 0 && dy < 0) return;
      if (activeIndex === TOTAL - 1 && dy > 0) return;
      e.preventDefault();
      if (isLocked.current) return;
      scrollAcc.current += dy * 1.5;
      sy = e.touches[0].clientY;
      if (Math.abs(scrollAcc.current) >= SCROLL_THRESHOLD) {
        const dir = scrollAcc.current > 0 ? 1 : -1;
        scrollAcc.current = 0;
        advance(activeIndex + dir);
      }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: false });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
    };
  }, [activeIndex]);

  const advance = (next: number) => {
    if (next < 0 || next >= TOTAL) return;
    isLocked.current = true;
    setActiveIndex(next);
    setTimeout(() => {
      isLocked.current = false;
    }, 520);
  };

  return (
    <>
      <style>{`
        @keyframes cur-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <ProjectCursor x={cursorPos.x} y={cursorPos.y} visible={cursorVisible} />

      <section
        ref={sectionRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          maxWidth: "100vw",
          overflow: "hidden",
          background: "hsl(var(--background))",
          display: "flex",
          flexDirection: "column",
          cursor: "none",
        }}
      >
        {/* ── HEADING ── */}
        <div
          style={{
            flexShrink: 0,
            paddingTop: "1.5rem",
            textAlign: "center",
            zIndex: 20,
          }}
        >
          <p
            style={{
              fontSize: "0.56rem",
              letterSpacing: "0.24em",
              color: "hsl(var(--muted-foreground))",
              textTransform: "uppercase",
              margin: "0 0 0.3rem",
            }}
          >
            Crafting Modern Experiences
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0.4rem",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "clamp(1.8rem, 4.5vw, 3.8rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "hsl(var(--foreground))",
                textTransform: "uppercase",
              }}
            >
              VENTURE
            </span>
            {/* SHOWCASE — always pink gradient, never changes */}
            <span
              style={{
                fontSize: "clamp(1.5rem, 3.8vw, 3.2rem)",
                fontWeight: 400,
                fontStyle: "italic",
                background:
                  "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 50%, hsl(var(--secondary)) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Showcase
            </span>
          </div>
        </div>

        {/* ── SCENE ── */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 80px 1fr",
            alignItems: "center",
            gap: "0 clamp(1rem, 2vw, 2rem)",
            padding: "0 clamp(2rem, 5vw, 5rem)",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          {/* LEFT */}
          <div style={{ position: "relative", height: "100%", minHeight: 0 }}>
            {PROJECTS.map((p, i) => (
              <LeftPanel key={p.id} project={p} visible={i === activeIndex} />
            ))}
          </div>

          {/* TIMELINE */}
          <Timeline
            activeIndex={activeIndex}
            thumbSrc={cur.images.sliderThumb}
          />

          {/* RIGHT */}
          <div
            style={{
              position: "relative",
              height: "min(500px, 68vh)",
              minHeight: 0,
            }}
          >
            {PROJECTS.map((p, i) => (
              <RightImages
                key={p.id}
                project={p}
                visible={i === activeIndex}
                onEnter={() => setCursorVisible(true)}
                onLeave={() => setCursorVisible(false)}
              />
            ))}
          </div>
        </div>

        {/* ── PROGRESS DOTS ── */}
        <div
          style={{
            flexShrink: 0,
            paddingBottom: "1rem",
            display: "flex",
            justifyContent: "center",
            gap: 6,
            alignItems: "center",
          }}
        >
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => advance(i)}
              aria-label={`Project ${i + 1}`}
              style={{
                height: 5,
                width: i === activeIndex ? 22 : 5,
                borderRadius: 3,
                background:
                  i === activeIndex
                    ? "linear-gradient(90deg, hsl(var(--accent)), hsl(var(--primary)))"
                    : "hsl(var(--muted))",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.4s ease, background 0.4s ease",
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
