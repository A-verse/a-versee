import { motion } from "framer-motion";
import GithubCard from "@/components/GithubCard";
import SignatureCard from "@/components/SignatureCard";
import SpotifyCard from "@/components/SpotifyCard";

const BehindCurtainsSection = () => {
  return (
  <section className="py-24 px-4 md:px-8">
  <div className="w-full max-w-[98vw] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto">
    <p className="section-label">
      Behind the curtains
    </p>

    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="
        mt-4
        text-4xl
        md:text-6xl
        font-bold
        tracking-tight
        text-foreground
      "
    >
      Decoding logic

      <span
        className="
          font-display
          italic
          bg-gradient-to-r
          from-purple-400
          via-pink-400
          to-yellow-400
          bg-clip-text
          text-transparent
        "
      >
        {" "}
        && the lyrics
      </span>
    </motion.h2>
        
        {/* Grid — items-stretch forces equal height */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <GithubCard />
          <SignatureCard />
          <SpotifyCard />
        </div>
      </div>
    </section>
  );
};

export default BehindCurtainsSection;
