"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SignatureCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        bg-card
        border
        border-border
        rounded-[24px]
        p-6
        min-h-[380px]
        flex
        flex-col
      "
    >
      {/* Label */}
      <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
        Visitors
      </p>

      {/* Heading */}
      <div className="mt-6 leading-[0.95]">
        <h2
          className="
            font-display
            text-6xl
            font-medium
            tracking-[-0.05em]
          "
        >
          Leave your
        </h2>

        <h2
          className="
            font-accent
            font-bold
            text-6xl
            leading-none
            mt-1
          "
        >
          signature
        </h2>
      </div>

      {/* Description */}
      <p className="mt-6 text-muted-foreground text-base">
        Let me know you were here.
      </p>

      {/* Bottom */}
      <div className="mt-auto flex items-center justify-between gap-4">
        {/* Avatars */}
        <div className="flex items-center">
          {[1, 2, 3].map((i, idx) => (
            <img
              key={i}
              src={`/avatars/avatar${i}.jpg`}
              alt=""
              className={`h-9 w-9 rounded-full border border-border object-cover ${
                idx !== 0 ? "-ml-2" : ""
              }`}
            />
          ))}

          <span className="ml-3 text-muted-foreground text-base">
            Join others
          </span>
        </div>

        {/* Button */}
        <Link
          to="/signature-book"
          className="
    flex
    items-center
    gap-3
    rounded-full
    border
    border-border
    px-5
    py-3
    text-sm
    font-medium
    hover:bg-muted
    transition-all
  "
        >
          <span>Sign Guestbook</span>
          <span>→</span>
        </Link>
      </div>
    </motion.div>
  );
}
