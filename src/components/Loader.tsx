import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 1800;
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / duration);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setShowWelcome(true);
        setTimeout(() => setDone(true), 700);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pct = Math.round(progress * 100);
  // marquee words behind the pill
  const words = ["DESIGN", "CRAFT", "CODE", "MOTION", "STORY", "DETAIL"];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.7, 0, 0.3, 1] } }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 noise-overlay pointer-events-none opacity-60" />

          {/* Marquee background text */}
          <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
            <motion.div
              className="flex gap-12 whitespace-nowrap text-[18vw] md:text-[10vw] font-black tracking-tighter text-foreground/[0.06]"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            >
              {[...words, ...words, ...words].map((w, i) => (
                <span key={i}>{w} •</span>
              ))}
            </motion.div>
          </div>

          {/* Pill loader */}
          <div className="relative rounded-full p-[1.5px] overflow-hidden">
            {/* gradient glow ring */}
            <motion.div
              className="absolute inset-[-50%]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, hsl(var(--accent)) 60deg, #ec4899 120deg, transparent 180deg, transparent 360deg)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, ease: "linear", repeat: Infinity }}
            />
            <div className="relative rounded-full bg-background/95 backdrop-blur-xl px-10 py-5 min-w-[260px] flex items-center justify-center gap-5">
              <AnimatePresence mode="wait">
                {!showWelcome ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-sm tracking-[0.3em] text-foreground font-medium">
                      LOADING
                    </span>
                    <span className="text-xs tabular-nums text-muted-foreground w-9 text-right">
                      {pct}%
                    </span>
                    <div className="h-2 w-14 bg-foreground/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent to-pink-400 origin-left rounded-full"
                        style={{ scaleX: progress }}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.span
                    key="welcome"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="text-sm tracking-[0.4em] text-foreground font-medium"
                  >
                    WELCOME
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* corner brand */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-6 left-6 text-xs font-bold tracking-tight text-foreground"
          >
            A<span className="text-accent">.</span>verse
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-6 left-6 text-[10px] tracking-[0.3em] uppercase text-muted-foreground"
          >
            v2026 · portfolio
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-6 right-6 text-[10px] tracking-[0.3em] uppercase text-muted-foreground italic font-serif"
          >
            something aesthetic
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
