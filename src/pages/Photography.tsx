import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const categories = ["All", "Nature", "Street", "Vibe", "Portraits"];

const photos = [
  { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80", category: "Nature", title: "Golden Valley" },
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80", category: "Nature", title: "Misty Mornings" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", category: "Portraits", title: "In Thought" },
  { src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80", category: "Street", title: "Urban Pulse" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80", category: "Nature", title: "Night Sky" },
  { src: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=800&q=80", category: "Vibe", title: "Warm Glow" },
  { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", category: "Nature", title: "Lake Serenity" },
  { src: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800&q=80", category: "Street", title: "City Lights" },
  { src: "https://images.unsplash.com/photo-1529686342540-1b43aec0df75?w=800&q=80", category: "Vibe", title: "Café Hours" },
];

export default function Photography() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? photos : photos.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <div className="pt-28 md:pt-36 section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="section-label">Photography</p>
            <h1 className="section-heading mb-4">
              Moments frozen in{" "}
              <span className="font-serif italic gradient-text">time</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg mb-10">
              I chase light the way some people chase deadlines. These are the frames that made me stop and feel something.
            </p>
          </ScrollReveal>

          {/* Category filters */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-2 rounded-full text-xs transition-all duration-300 ${
                    active === cat
                      ? "bg-foreground text-background"
                      : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Masonry grid */}
          <motion.div layout className="columns-2 md:columns-3 gap-3 space-y-3">
            <AnimatePresence>
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="break-inside-avoid cursor-pointer group"
                  onClick={() => setLightbox(i)}
                >
                  <div className="rounded-xl overflow-hidden bg-muted relative">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{photo.title}</p>
                        <p className="text-[10px] text-muted-foreground">{photo.category}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={filtered[lightbox].src}
              alt={filtered[lightbox].title}
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
