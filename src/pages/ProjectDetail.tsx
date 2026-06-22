import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = allProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Project not found.</p>
          <Link to="/projects" className="btn-outline text-xs">
            <ArrowLeft size={12} /> Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <article className="pt-28 md:pt-36">
        {/* Header */}
        <div className="section-padding pb-10">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-10 transition-colors"
              >
                <ArrowLeft size={12} /> Back to projects
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-accent uppercase tracking-widest">
                  {project.category}
                </span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">
                  {project.year}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                {project.title}
              </h1>
              <p className="text-base text-secondary-foreground max-w-2xl leading-relaxed">
                {project.description}
              </p>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-8 text-xs"
                >
                  View Live <ArrowUpRight size={12} />
                </a>
              )}
            </ScrollReveal>
          </div>
        </div>

        {/* Hero image */}
        <ScrollReveal>
          <div className="max-w-6xl mx-auto px-6 md:px-16">
            <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Case study content */}
        <div className="section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 mb-20">
              <ScrollReveal>
                <h3 className="text-xs text-accent uppercase tracking-widest mb-4">
                  The Problem
                </h3>
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  {project.problem}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h3 className="text-xs text-accent uppercase tracking-widest mb-4">
                  The Approach
                </h3>
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  {project.approach}
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal>
              <h3 className="text-xs text-accent uppercase tracking-widest mb-6">
                Key Contributions
              </h3>
              <ul className="space-y-3 mb-20">
                {project.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-secondary-foreground"
                  >
                    <span className="text-accent mt-0.5 shrink-0">→</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h3 className="text-xs text-accent uppercase tracking-widest mb-6">
                Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-2 mb-20">
                {project.tools.map((tool) => (
                  <span key={tool} className="tag-pill">
                    {tool}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="glass-card p-8 md:p-12">
                <h3 className="text-xs text-accent uppercase tracking-widest mb-4">
                  The Result
                </h3>
                <p className="text-base text-secondary-foreground leading-relaxed">
                  {project.result}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
