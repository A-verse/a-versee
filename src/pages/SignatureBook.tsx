import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Entry {
  id: number;
  name: string;
  message: string;
  date: string;
  avatar: string;
}

const mockEntries: Entry[] = [
  { id: 1, name: "Riya Sharma", message: "Your portfolio is an absolute vibe. The attention to detail is insane! 🔥", date: "Mar 2026", avatar: "RS" },
  { id: 2, name: "Aarav Patel", message: "Stumbled upon your site and spent 20 minutes just exploring. Beautiful work, Anjali.", date: "Feb 2026", avatar: "AP" },
  { id: 3, name: "Priya Mehta", message: "The photography section made me feel things. Keep creating magic ✨", date: "Feb 2026", avatar: "PM" },
  { id: 4, name: "Kabir Singh", message: "As a fellow developer, I'm genuinely inspired by how you blend code with creativity.", date: "Jan 2026", avatar: "KS" },
  { id: 5, name: "Sneha Gupta", message: "The way you write about technology feels like poetry. Rare talent!", date: "Jan 2026", avatar: "SG" },
  { id: 6, name: "Arjun Reddy", message: "That FABRO case study is chef's kiss. Bookmarking your site for inspiration.", date: "Dec 2025", avatar: "AR" },
];

export default function SignatureBook() {
  const [entries, setEntries] = useState<Entry[]>(mockEntries);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: Entry = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      avatar: name.trim().split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
    };

    setEntries([newEntry, ...entries]);
    setName("");
    setMessage("");
    toast.success("Your signature has been added! ✨");
  };

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <div className="pt-28 md:pt-36 section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen size={20} className="text-accent" />
              <p className="section-label mb-0">Signature Book</p>
            </div>
            <h1 className="section-heading mb-4">
              Leave your{" "}
              <span className="font-serif italic gradient-text">mark</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg mb-16">
              A digital memory wall. If you've made it this far, you're already someone I'd love to hear from. Drop a note, a thought, or just say hi.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-5 gap-10">
            {/* Form */}
            <ScrollReveal className="md:col-span-2">
              <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4 sticky top-28">
                <h3 className="text-sm font-semibold text-foreground mb-2">Sign the book</h3>
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1.5 block uppercase tracking-widest">Your Name</label>
                  <Input
                    placeholder="What should I call you?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-muted border-border text-foreground placeholder:text-muted-foreground text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1.5 block uppercase tracking-widest">Your Message</label>
                  <Textarea
                    placeholder="A thought, a memory, or just hello..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-muted border-border text-foreground placeholder:text-muted-foreground min-h-[100px] text-sm"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full gap-2 bg-foreground text-background hover:bg-foreground/90 rounded-full h-10 text-sm"
                >
                  <Send size={13} />
                  Leave Signature
                </Button>
              </form>
            </ScrollReveal>

            {/* Entries */}
            <div className="md:col-span-3 space-y-4">
              <AnimatePresence>
                {entries.map((entry, i) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card p-5 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-xs font-bold text-accent">
                        {entry.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-sm font-semibold text-foreground">{entry.name}</p>
                          <span className="text-[10px] text-muted-foreground">{entry.date}</span>
                        </div>
                        <p className="text-sm text-secondary-foreground leading-relaxed">{entry.message}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
