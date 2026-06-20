import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const writings = [
  {
    type: "poem",
    title: "The Space Between",
    content: "There's a quiet in the code,\nbetween the semicolons and the sleep.\nWhere thoughts compile in silence\nand the cursor learns to breathe.",
    date: "March 2026",
  },
  {
    type: "thought",
    title: "On Building",
    content: "The best things I've built weren't measured in lines of code — they were measured in the moments someone paused, smiled, and thought: 'this was made for me.'",
    date: "February 2026",
  },
  {
    type: "poem",
    title: "Golden Hour",
    content: "She photographs in gold,\nthe kind that drips from rooftops\nand pools in coffee cups —\nthe kind that makes ordinary\nlook like a love letter to light.",
    date: "January 2026",
  },
  {
    type: "thought",
    title: "On Creativity",
    content: "Creativity isn't a switch. It's a muscle that strengthens with every bad sketch, every half-finished song, every paragraph you almost deleted.",
    date: "December 2025",
  },
  {
    type: "poem",
    title: "Midnight Architecture",
    content: "At 2 AM the ideas come unfiltered,\nraw blueprints drawn on sleepless nights.\nThe best designs aren't born in meetings —\nthey're whispered by the dark.",
    date: "November 2025",
  },
  {
    type: "thought",
    title: "On Imperfection",
    content: "Ship it imperfect. The world doesn't need another perfect thing collecting dust — it needs your honest, messy, beautifully unfinished attempt.",
    date: "October 2025",
  },
];

export default function Writing() {
  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <div className="pt-28 md:pt-36 section-padding">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="section-label">Writing & Poetry</p>
            <h1 className="section-heading mb-4">
              Words that{" "}
              <span className="font-serif italic gradient-text">linger</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg mb-16">
              Not everything needs a deploy button. Sometimes the best thing I build all day is a sentence.
            </p>
          </ScrollReveal>

          <div className="space-y-8">
            {writings.map((piece, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <motion.article
                  whileHover={{ x: 4 }}
                  className="glass-card p-8 border-l-2 border-l-accent/30 cursor-default"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="tag-pill text-[10px]">{piece.type}</span>
                    <span className="text-[10px] text-muted-foreground">{piece.date}</span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground mb-3 font-serif">{piece.title}</h2>
                  <p className={`text-sm leading-relaxed ${
                    piece.type === "poem"
                      ? "text-secondary-foreground font-serif italic whitespace-pre-line"
                      : "text-secondary-foreground"
                  }`}>
                    {piece.content}
                  </p>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
