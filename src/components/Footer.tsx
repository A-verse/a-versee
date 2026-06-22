"use client";

import { Github, Linkedin, Instagram, Send, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background px-5 md:px-8 lg:px-12 py-4">
      <div className="max-w-[1700px] mx-auto border-t border-border pt-4">
        <div
          className="
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-3
          "
        >
          {/* Copyright */}
          <p
            className="
              text-[11px]
              md:text-sm
              uppercase
              tracking-[0.15em]
              text-muted-foreground
              text-center
            "
          >
            © 2026 AVERSE. ALL RIGHTS RESERVED.
          </p>

          {/* Socials */}
          <div
            className="
              flex
              items-center
              justify-center
              gap-4
              text-muted-foreground
            "
          >
            <a className="hover:text-foreground transition-colors">
              <Github size={18} />
            </a>

            <a className="hover:text-foreground transition-colors">
              <Linkedin size={18} />
            </a>

            <a className="hover:text-foreground transition-colors">
              <Twitter size={18} />
            </a>

            <a className="hover:text-foreground transition-colors">
              <Send size={18} />
            </a>

            <a className="hover:text-foreground transition-colors">
              <Instagram size={18} />
            </a>

            <a
              href="mailto:anjalikamal3105@gmail.com"
              className="hover:text-foreground transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
