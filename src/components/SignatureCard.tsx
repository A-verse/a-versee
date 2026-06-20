"use client";

import { motion } from "framer-motion";

export default function SignatureCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-card border border-border rounded-[24px] p-8 flex flex-col justify-between relative min-h-[340px] bg-[radial-gradient(600px_300px_at_50%_40%,hsl(var(--primary)/0.07),transparent_70%)]"
    >
      {/* Label */}
      <p className="text-xs tracking-widest text-muted-foreground uppercase">
        Visitors
      </p>

      {/* Headline */}
      <h2 className="mt-4 text-4xl md:text-5xl font-bold text-foreground tracking-tight">
        Leave your
        <br />
        <span className="font-display italic bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent text-4xl md:text-5xl">
          signature
        </span>
      </h2>

      {/* Subtext */}
      <p className="text-sm text-muted-foreground mt-4">
        Let me know you were here.
      </p>

      {/* Avatars Row */}
      <div className="flex items-center gap-2 mt-8">
        {[1, 2, 3, 4].map((i, idx) => (
          <img
            key={i}
            src={`/avatars/avatar${i}.jpg`}
            alt={`Visitor ${i}`}
            className={`w-8 h-8 rounded-full border border-border object-cover ${idx !== 0 ? "-ml-2" : ""}`}
          />
        ))}
      </div>

      {/* CTA Button */}
      <a
        href="/guestbook"
        className="mt-6 rounded-full border border-border bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent px-6 py-2 text-sm font-medium flex items-center gap-2 shadow hover:brightness-110 transition-all"
      >
        Sign Guestbook
        <span aria-hidden="true">→</span>
      </a>
    </motion.div>
  );
}
