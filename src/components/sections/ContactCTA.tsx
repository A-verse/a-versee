"use client";

import { motion } from "framer-motion";
import aboutImg from "@/assets/about.jpg";

export default function ContactCTA() {
  return (
    <section className="bg-background overflow-hidden py-16 md:py-24">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* First Line */}
          <div className="flex items-center gap-3 md:gap-5 mb-2">
            <div className="h-12 w-12 md:h-16 md:w-16 lg:h-24 lg:w-24 rounded-full overflow-hidden shrink-0 border border-border">
              <img
                src={aboutImg}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <h1
              className="
                font-display
                font-normal
                leading-[0.9]
                text-foreground
                text-[2.5rem]
                sm:text-[3.5rem]
                md:text-[5rem]
                lg:text-[7rem]
              "
              style={{ letterSpacing: "-0.04em" }}
            >
              Let's create
            </h1>
          </div>

          {/* Second Line */}
          <h1
            className="
              font-display
              font-normal
              leading-[0.9]
              text-muted-foreground
              text-[2.5rem]
              sm:text-[3.5rem]
              md:text-[5rem]
              lg:text-[7rem]
            "
            style={{ letterSpacing: "-0.04em" }}
          >
            something real.
          </h1>

          {/* Description */}
          <p className="mt-6 md:mt-10 max-w-xl text-sm md:text-lg leading-relaxed text-muted-foreground">
            Building digital experiences that matter.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
