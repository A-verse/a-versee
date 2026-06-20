import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import img1 from "@/assets/img1.jpeg";
import img2 from "@/assets/img2.jpg";
import img3 from "@/assets/img3.jpeg";
const images = [img1, img2, img3];

const stats = [
  { value: "10+", label: "Projects Delivered" },
  { value: "4+", label: "Professional Roles" },
  { value: "2+", label: "Years of Experience" },
];

export default function AboutPreview() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Left */}
          <ScrollReveal>
            <p className="section-label">A LITTLE ABOUT ME</p>

            <h2 className="section-heading mb-8">
              Turning imagination into{" "}
              <span className="gradient-text font-serif italic">
                interaction
              </span>
            </h2>

            <p className="mb-6 text-sm leading-relaxed text-secondary-foreground">
              I'm Anjali Kamal — a B.Tech student at IIIT Jabalpur, full-stack
              developer, and creative thinker who believes technology should
              feel human. I build systems that are scalable, reliable, and
              beautiful.
            </p>

            <p className="mb-8 text-sm leading-relaxed text-secondary-foreground">
              From embedded IoT systems to modern web platforms, my work bridges
              engineering precision with design sensibility. Currently exploring
              AI, data science, and the art of visual storytelling.
            </p>

            {/* Social Icons */}
            <div className="mb-8 flex items-center gap-3">
              <a
                href="#"
                className="glass-card rounded-full p-3 transition-all duration-300 hover:scale-110 hover:text-primary"
              >
                <FaGithub size={16} />
              </a>

              <a
                href="#"
                className="glass-card rounded-full p-3 transition-all duration-300 hover:scale-110 hover:text-primary"
              >
                <FaLinkedin size={16} />
              </a>

              <a
                href="#"
                className="glass-card rounded-full p-3 transition-all duration-300 hover:scale-110 hover:text-primary"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="#"
                className="glass-card rounded-full p-3 transition-all duration-300 hover:scale-110 hover:text-primary"
              >
                <FaXTwitter size={16} />
              </a>
            </div>

            <Link to="/about" className="btn-outline text-xs">
              More about me <ArrowRight size={12} />
            </Link>
          </ScrollReveal>

          {/* Right */}
          <ScrollReveal delay={0.2}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Swiper
                effect="coverflow"
                centeredSlides
                slidesPerView={3}
                loop
                speed={1200}
                grabCursor
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 220,
                  modifier: 2,
                  scale: 0.9,
                  slideShadows: false,
                }}
                modules={[EffectCoverflow, Autoplay]}
                className="w-full max-w-xl"
              >
                {images.map((image, i) => (
                  <SwiperSlide
                    key={i}
                    className="!w-[280px] overflow-hidden rounded-3xl glass-card shadow-2xl"
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-[450px] w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-card rounded-2xl p-5 text-center"
                  >
                    <h3 className="gradient-text text-2xl font-bold">
                      {stat.value}
                    </h3>

                    <p className="mt-2 text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
