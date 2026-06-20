import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";
import { Send, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const socials = [
  { label: "GitHub", href: "https://github.com/A-verse" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anjalikamal-ak3105/" },
  { label: "Instagram", href: "https://instagram.com/anjalikamal3105" },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <div className="pt-28 md:pt-36 section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="section-label">Get in Touch</p>
            <h1 className="section-heading mb-4">
              Let's build something{" "}
              <span className="font-serif italic gradient-text">aesthetic</span>{" "}
              together
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg mb-16">
              Whether you have a project idea, want to collaborate, or just want to say hello — my inbox is always open.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-5 gap-12">
            {/* Form */}
            <ScrollReveal className="md:col-span-3">
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Name</label>
                    <Input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Message</label>
                  <Textarea
                    placeholder="Tell me about your project..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-muted border-border text-foreground placeholder:text-muted-foreground min-h-[150px]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full gap-2 bg-foreground text-background hover:bg-foreground/90 rounded-full h-12"
                >
                  <Send size={14} />
                  Send Message
                </Button>
              </form>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal delay={0.2} className="md:col-span-2">
              <div className="space-y-8">
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail size={16} className="text-accent" />
                    <span className="text-xs text-accent uppercase tracking-widest">Email</span>
                  </div>
                  <a
                    href="mailto:anjalikamal3105@gmail.com"
                    className="text-sm text-foreground hover:text-secondary-foreground transition-colors"
                  >
                    anjalikamal3105@gmail.com
                  </a>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin size={16} className="text-accent" />
                    <span className="text-xs text-accent uppercase tracking-widest">Location</span>
                  </div>
                  <p className="text-sm text-foreground">Jaipur, India</p>
                  <p className="text-xs text-muted-foreground mt-1">Available for remote work worldwide</p>
                </div>

                <div className="glass-card p-6">
                  <p className="text-xs text-accent uppercase tracking-widest mb-4">Socials</p>
                  <div className="space-y-2">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-sm text-secondary-foreground hover:text-foreground transition-colors group"
                      >
                        {s.label}
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
