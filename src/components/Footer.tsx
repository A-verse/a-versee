"use client";

import { Github, Linkedin, Instagram, Send, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background px-4 md:px-8 pt-10 pb-8 overflow-hidden">
      {/* Top Card */}
      <div
        className="
        relative
        overflow-x-auto
        scrollbar-none
      "
      >
        <div
          className="
          min-w-[1100px]
          max-w-[1800px]
          mx-auto
          rounded-[40px]
          border border-border/40
          bg-card
          px-8
          md:px-14
          py-12
        "
        >
          <div className="grid grid-cols-[1.7fr_1fr_1fr_1fr_1fr] gap-14">
            {/* LEFT */}
            <div className="relative">
              {/* Glow */}
              <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-accent/10 blur-[100px]" />

              <h2
                className="
                relative
                text-5xl
                md:text-6xl
                font-black
                tracking-[-0.08em]
                text-foreground
              "
              >
                AVERSE
              </h2>

              <p
                className="
                mt-8
                max-w-[420px]
                text-muted-foreground
                text-lg
                leading-[1.8]
              "
              >
                Building digital experiences that matter, one line of code at a
                time. Crafting interfaces that feel alive and turning ideas into
                reality.
              </p>

              {/* Badge */}
              <div
                className="
                mt-8
                inline-flex
                items-center
                gap-3
                rounded-full
                border border-border
                bg-background/60
                px-4
                py-2
              "
              >
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

                <span className="text-sm text-foreground/80">
                  Available for opportunities
                </span>
              </div>
            </div>

            {/* GENERAL */}
            <div>
              <h3 className="text-muted-foreground text-lg mb-8">General</h3>

              <div className="flex flex-col gap-5 text-foreground text-xl font-medium">
                <a href="/">Home</a>
                <a href="/blogs">Blogs</a>
                <a href="/guestbook">Guestbook</a>
                <a href="/uses">Uses</a>
              </div>
            </div>

            {/* ABOUT */}
            <div>
              <h3 className="text-muted-foreground text-lg mb-8">About</h3>

              <div className="flex flex-col gap-5 text-foreground text-xl font-medium">
                <a href="/about">About Me</a>
                <a href="/projects">Projects</a>
                <a href="/contact">Contact</a>
              </div>
            </div>

            {/* PROJECTS */}
            <div>
              <h3 className="text-muted-foreground text-lg mb-8">Projects</h3>

              <div className="flex flex-col gap-5 text-foreground text-xl font-medium">
                <a href="#">FABRO</a>
                <a href="#">JMRC Portal</a>
                <a href="#">Palate</a>
                <a href="#">NeuroSpeak</a>
                <a href="#">S.Nehra</a>
              </div>
            </div>

            {/* LEGAL */}
            <div>
              <h3 className="text-muted-foreground text-lg mb-8">Legal</h3>

              <div className="flex flex-col gap-5 text-foreground text-xl font-medium">
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms-and-conditions">Terms & Conditions</a>
              </div>

              <div className="mt-10 border-t border-border pt-6">
                <div
                  className="
                  inline-flex
                  items-center
                  rounded-md
                  bg-muted
                  px-4
                  py-2
                  text-sm
                  text-foreground/80
                "
                >
                  DMCA PROTECTED
                </div>

                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  This site is protected. Read our Privacy Policy & Terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1800px] mx-auto mt-10 border-t border-border pt-8">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <p
            className="
            text-muted-foreground
            text-sm
            uppercase
            tracking-wide
          "
          >
            © 2026 AVERSE. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-7 text-muted-foreground">
            <a
              className="hover:text-foreground transition"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github size={28} />
            </a>
            <a
              className="hover:text-foreground transition"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin size={28} />
            </a>
            <a
              className="hover:text-foreground transition"
              aria-label="Twitter"
              title="Twitter"
            >
              <Twitter size={28} />
            </a>
            <a
              className="hover:text-foreground transition"
              aria-label="Send"
              title="Send"
            >
              <Send size={28} />
            </a>
            <a
              className="hover:text-foreground transition"
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram size={28} />
            </a>
            <a
              href="mailto:anjalikamal3105@gmail.com"
              className="hover:text-foreground transition"
              aria-label="Email"
              title="Email"
            >
              <Mail size={28} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
