import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const allProjects = [
  {
    id: "fabro",
    title: "FABRO",
    category: "E-Commerce · Web Development",
    description: "Modern e-commerce platform engineered for customization-first apparel ordering with performance-optimized architecture.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    year: "2026",
    link: "https://fabro-handcrafted-indian-embroidery.vercel.app/",
    problem: "FABRO needed a digital storefront that could showcase intricate Indian embroidery with high-fidelity visuals while supporting custom ordering workflows.",
    approach: "Built a modular Next.js App Router architecture with dynamic state management for product customization. Integrated WhatsApp-based checkout with structured message payloads for seamless vendor communication.",
    tools: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "SEO Optimization"],
    result: "A production-ready e-commerce platform that showcases embroidery collections with immersive visuals and supports end-to-end custom ordering via WhatsApp integration.",
    bullets: [
      "Designed modular product + customization flow with dynamic state management",
      "Implemented WhatsApp-integrated checkout logic with structured message payloads",
      "Optimized image-heavy layout using Next.js image pipeline",
    ],
  },
  {
    id: "jmrc",
    title: "JMRC Metro Services Portal",
    category: "Enterprise · Full Stack",
    description: "Scalable service management platform built with serverless APIs and algorithm-driven fare computation.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    year: "2025",
    link: "https://jmrc-service-portal-nl7e.vercel.app/",
    problem: "JMRC needed a digital platform to manage metro fare calculations, complaint workflows, and service analytics — replacing manual, fragmented processes.",
    approach: "Designed a route-based fare calculation engine with inter-line transfer logic. Built complaint lifecycle APIs with SLA monitoring and sentiment analysis dashboards.",
    tools: ["Next.js 16", "TypeScript (Strict)", "Zod", "Serverless Functions"],
    result: "A comprehensive metro services portal that automates fare computation, streamlines complaint resolution, and provides real-time analytics for operations teams.",
    bullets: [
      "Designed route-based fare calculation engine with inter-line transfer logic",
      "Implemented complaint lifecycle APIs with SLA breach monitoring",
      "Built analytics dashboard with sentiment analysis and resolution tracking",
    ],
  },
  {
    id: "palate",
    title: "Palate",
    category: "Full Stack · Recipe Platform",
    description: "Scalable full-stack recipe management platform with modern App Router architecture and typed API routes.",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80",
    year: "2025",
    link: "https://palate-nu.vercel.app/",
    problem: "Home cooks and food enthusiasts needed a centralized platform to manage, discover, and share recipes with proper authentication and media handling.",
    approach: "Built a relational data model with Prisma ORM and PostgreSQL. Implemented Supabase Auth for protected routes and integrated cloud storage for recipe images.",
    tools: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Supabase Auth"],
    result: "A full-featured recipe platform with user authentication, cloud image storage, and a clean interface for discovering and managing culinary creations.",
    bullets: [
      "Designed relational schema with Prisma ORM and PostgreSQL",
      "Implemented protected API routes with Supabase authentication",
      "Integrated cloud image storage with role-based access policies",
    ],
  },
  {
    id: "focusmate",
    title: "FocusMate",
    category: "IoT · Edge Computing",
    description: "Modular edge-computing system connecting physical workspace signals with intelligent digital automation.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    year: "2025",
    problem: "Students and remote workers needed a way to automate their digital workspace based on physical presence without relying on cloud services.",
    approach: "Built a Raspberry Pi-based edge computing system with presence monitoring, event-driven automation, and a companion Android app for personalized control.",
    tools: ["Raspberry Pi", "Python", "Android", "Event-Driven Systems"],
    result: "A privacy-first smart workspace system that operates entirely locally, automating digital workflows based on real-world presence signals.",
    bullets: [
      "Real-time presence monitoring and event-driven decision engine",
      "Android control app for personalized focus management",
      "Privacy-first architecture with fully local processing",
    ],
  },
  {
    id: "aps",
    title: "APS Official Website",
    category: "Community · Web Platform",
    description: "Community-focused web platform engineered to streamline event communication and member engagement.",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
    year: "2024",
    link: "https://aps-iiitdmj.vercel.app/",
    problem: "The Astronomy & Physics Society needed a digital presence to showcase events, manage member engagement, and share educational content.",
    approach: "Designed modular event and gallery components with structured routing for dynamic detail pages. Integrated Framer Motion for polished UI transitions.",
    tools: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    result: "An engaging community website that serves as the primary digital hub for APS, increasing student participation and event visibility.",
    bullets: [
      "Designed modular event and gallery components",
      "Implemented structured routing for dynamic event detail pages",
      "Integrated motion-based UI transitions for enhanced user experience",
    ],
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <div className="pt-28 md:pt-36 section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="section-label">Portfolio</p>
            <h1 className="section-heading mb-4">
              All <span className="font-serif italic gradient-text">Projects</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg mb-16">
              A curated collection of projects spanning full-stack development, system design, and creative technology.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {allProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.08}>
                <Link
                  to={`/projects/${project.id}`}
                  className="group block glass-card overflow-hidden hover-lift h-full"
                >
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-accent uppercase tracking-widest">{project.category}</span>
                      <span className="text-xs text-muted-foreground">{project.year}</span>
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-foreground/80 transition-colors flex items-center gap-2">
                      {project.title}
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h2>
                    <p className="text-sm text-secondary-foreground line-clamp-2">{project.description}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
