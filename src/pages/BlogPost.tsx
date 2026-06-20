import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { posts } from "@/pages/Blog";
import { ArrowLeft, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function BlogPost() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background noise-overlay">
      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5">
        <div
          className="h-full transition-all duration-150"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #f97316, #eab308)",
          }}
        />
      </div>

      <Navbar />
      <article className="pt-28 md:pt-36 section-padding">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-10 transition-colors"
          >
            <ArrowLeft size={12} /> Back to blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock size={10} /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground tracking-tight">
            {post.title}
          </h1>
          <p className="text-xs text-muted-foreground mb-12">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {post.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-sm text-secondary-foreground leading-relaxed mb-5">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
      <Footer />
    </div>
  );
}
