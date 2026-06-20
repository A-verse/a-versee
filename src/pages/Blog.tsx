import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { Clock, ArrowUpRight } from "lucide-react";

export const posts = [
  {
    id: "1",
    title: "Turning Small Projects Into Big Ones",
    excerpt: "How simple ideas can evolve into meaningful software projects that make a real impact.",
    readTime: "5 min",
    date: "2025-01-15",
    tags: ["Development", "Growth"],
    content: `Starting small is the secret to building big. Every great project begins as a tiny idea — a weekend experiment, a curiosity-driven prototype. The key is to keep iterating, keep refining, and stay curious about what your project could become.\n\nIn my journey, I've learned that the best projects are those that solve a real problem for real people. When you start with empathy and curiosity, the technical challenges become puzzles worth solving.\n\nThe process usually follows a pattern: identify a pain point, build the simplest possible solution, gather feedback, and iterate. This cycle, repeated consistently, transforms small projects into impactful ones.`,
  },
  {
    id: "2",
    title: "Design Thinking in Code",
    excerpt: "Bridging the gap between visual design and software engineering for better products.",
    readTime: "4 min",
    date: "2025-02-01",
    tags: ["Design", "Engineering"],
    content: `Design thinking isn't just for designers. As developers, we can apply the same principles — empathy, ideation, prototyping, and testing — to write better code and build better products.\n\nWhen I approach a new feature, I don't start with the code. I start by understanding the user. What do they need? What frustrates them? How can the interface guide them naturally?\n\nThis mindset shift has transformed how I write code. Every function, every component, every API endpoint is designed with the end user in mind.`,
  },
  {
    id: "3",
    title: "My Open Source Journey",
    excerpt: "Lessons learned from contributing to open-source communities and growing as a developer.",
    readTime: "6 min",
    date: "2025-02-20",
    tags: ["Open Source", "Community"],
    content: `Contributing to open source was one of the most transformative experiences in my development journey. It taught me collaboration, code review etiquette, and the importance of documentation.\n\nDuring GSSoC, I had the opportunity to work with developers from around the world. Each pull request was a learning experience — not just in code, but in communication and teamwork.\n\nThe open source community is incredibly welcoming. If you're hesitant to start, just pick a project you use daily and look for beginner-friendly issues. Your first PR doesn't have to be perfect; it just has to exist.`,
  },
  {
    id: "4",
    title: "Building Beautiful UIs with Purpose",
    excerpt: "Why aesthetics matter in software and how to balance beauty with functionality.",
    readTime: "5 min",
    date: "2025-03-05",
    tags: ["UI/UX", "Design"],
    content: `A beautiful interface isn't just about aesthetics — it's about trust, usability, and emotion. When users encounter a well-designed application, they instinctively trust it more and find it easier to use.\n\nI approach UI design with three principles: clarity, consistency, and delight. Every element should serve a purpose, follow established patterns, and occasionally surprise the user with thoughtful details.\n\nThe best interfaces are invisible. They guide users effortlessly toward their goals without drawing attention to themselves.`,
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <div className="pt-28 md:pt-36 section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <p className="section-label">Blog</p>
            <h1 className="section-heading mb-4">
              Thoughts & <span className="font-serif italic gradient-text">Insights</span>
            </h1>
            <p className="text-sm text-muted-foreground mb-16">
              On software engineering, design, and creative technology.
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {posts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.06}>
                <Link
                  to={`/blog/${post.id}`}
                  className="glass-card p-6 md:p-8 block hover-lift group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="tag-pill">{tag}</span>
                        ))}
                      </div>
                      <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-foreground/80 transition-colors flex items-center gap-2">
                        {post.title}
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h2>
                      <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> {post.readTime}
                      </span>
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
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
