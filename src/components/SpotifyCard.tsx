"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TrackData {
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  trackUrl: string;
  isPlaying: boolean;
}

export default function SpotifyCard() {
  const [data, setData] = useState<TrackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const API_KEY = "48276c4c49c980f6535897726fb9c568";
    const USERNAME = "a-verse";
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`,
    )
      .then((r) => r.json())
      .then((res) => {
        const track = res.recenttracks?.track?.[0];
        if (!track) return;
        const isPlaying = track["@attr"]?.nowplaying === "true";
        const images: { "#text": string; size: string }[] = track.image ?? [];
        const art =
          images.find((i) => i.size === "extralarge")?.["#text"] ||
          images.find((i) => i.size === "large")?.["#text"] ||
          "";
        setData({
          title: track.name,
          artist: track.artist["#text"],
          album: track.album["#text"],
          albumArt: art,
          trackUrl: track.url,
          isPlaying,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[28px] border border-border bg-card text-card-foreground"
    >
      {/* ── Full-bleed blurred album art background ── */}
      {data?.albumArt && (
        <>
          <img
            src={data.albumArt}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-125 object-cover object-top opacity-30 blur-[28px]"
          />
          {/* Dark gradient overlay so text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/50" />
        </>
      )}
      {/* Fallback bg when no art */}
      {!data?.albumArt && <div className="absolute inset-0 bg-card" />}

      {/* ── Content layer ── */}
      <div className="relative z-10 flex flex-col h-full p-7 pb-0">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-accent"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-[17px] font-bold text-foreground tracking-tight">
            Last Played
          </span>
        </div>

        {/* Track sentence */}
        <div className="mb-auto">
          {loading ? (
            <div className="space-y-2">
              <div className="h-4 w-4/5 rounded bg-muted animate-pulse" />
              <div className="h-4 w-3/5 rounded bg-muted animate-pulse" />
            </div>
          ) : data ? (
            <a
              href={data.trackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <p className="text-[15px] leading-7 text-foreground/80">
                I recently listened to{" "}
                <strong className="text-foreground font-bold">
                  {data.title}
                </strong>{" "}
                by{" "}
                <strong className="text-foreground font-bold">
                  {data.artist}
                </strong>{" "}
                from the album{" "}
                <strong className="text-foreground font-bold">
                  {data.album}
                </strong>
              </p>
            </a>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nothing scrobbled yet.
            </p>
          )}
        </div>

        {/* ── Vinyl + Album Cover Stack ── */}
        <div className="relative mt-8 h-[260px] w-full">
          {/* VINYL DISC */}
          <div
            className={`absolute left-1/2 top-[-30px] z-[2] h-[260px] w-[260px] -translate-x-1/2 transition-transform duration-[550ms] [transition-timing-function:cubic-bezier(0.34,1.3,0.64,1)] ${
              hovered ? "translate-y-[-35px]" : "translate-y-[30px]"
            }`}
          >
            {/* Outer vinyl */}
            <div
              className={`absolute inset-0 rounded-full shadow-[0_20px_60px_hsl(var(--foreground)/0.35),0_0_40px_hsl(var(--foreground)/0.2)] bg-[conic-gradient(from_0deg,hsl(var(--background))_0deg,hsl(var(--muted))_8deg,hsl(var(--background))_16deg,hsl(var(--card))_30deg,hsl(var(--background))_45deg,hsl(var(--muted))_60deg,hsl(var(--background))_90deg,hsl(var(--card))_120deg,hsl(var(--background))_150deg,hsl(var(--muted))_180deg,hsl(var(--background))_210deg,hsl(var(--card))_240deg,hsl(var(--background))_270deg,hsl(var(--muted))_300deg,hsl(var(--background))_330deg,hsl(var(--background))_360deg)] ${
                hovered ? "animate-[vinyl-spin_2.5s_linear_infinite]" : ""
              }`}
            />

            {/* Vinyl grooves */}
            {[30, 45, 60, 72, 82].map((pct, i) => (
              <div
                key={i}
                className={`absolute rounded-full border border-border/40 ${
                  pct === 30
                    ? "inset-[30px]"
                    : pct === 45
                      ? "inset-[45px]"
                      : pct === 60
                        ? "inset-[60px]"
                        : pct === 72
                          ? "inset-[72px]"
                          : "inset-[82px]"
                }`}
              />
            ))}

            {/* Sheen highlight */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_35%_30%,hsl(var(--foreground)/0.08)_0%,transparent_60%)]" />

            {/* Center spindle hole */}
            <div className="absolute left-1/2 top-1/2 z-[4] h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
          </div>

          {/* ALBUM COVER — peeks from bottom, slides up on hover */}
          {data?.albumArt && (
            <div
              className={`absolute left-1/2 bottom-0 z-[5] h-[200px] w-[200px] -translate-x-1/2 overflow-hidden rounded-xl border border-border shadow-[0_8px_32px_hsl(var(--foreground)/0.32)] transition-transform duration-[550ms] [transition-timing-function:cubic-bezier(0.34,1.2,0.64,1)] ${
                hovered ? "translate-y-[-14px]" : "translate-y-0"
              }`}
            >
              <img
                src={data.albumArt}
                alt={data.album}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <style>{`
  @keyframes vinyl-spin {
    from {
      rotate: 0deg;
    }

    to {
      rotate: 360deg;
    }
  }
`}</style>
    </motion.div>
  );
}
