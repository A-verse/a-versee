"use client";

import { Github, Linkedin, Instagram, Send, Twitter, Mail } from "lucide-react";

const socials = [
  { icon: Github, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Send, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Mail, href: "mailto:anjalikamal3105@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="bg-background px-6 md:px-8 lg:px-12 py-8">
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Copyright */}
          <p className="text-[11px] md:text-sm uppercase tracking-[0.22em] text-muted-foreground text-center">
            © 2026 AVERSE. ALL RIGHTS RESERVED.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="
                  h-11
                  w-11
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.02]
                  flex
                  items-center
                  justify-center
                  text-muted-foreground
                  transition-all
                  duration-300
                  hover:border-pink-400/60
                  hover:bg-pink-500/10
                  hover:text-white
                  hover:-translate-y-1
                "
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
