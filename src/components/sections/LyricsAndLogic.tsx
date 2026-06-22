import { motion } from "framer-motion";
import GithubCard from "@/components/GithubCard";
import SignatureCard from "@/components/SignatureCard";
import SpotifyCard from "@/components/SpotifyCard";

const BehindCurtainsSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        <p className="section-label">Behind the curtains</p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            mt-3
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

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          <GithubCard />
          <SignatureCard />
          <SpotifyCard />
        </div>
      </div>
    </section>
  );
};

export default BehindCurtainsSection;
