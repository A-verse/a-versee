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
        const images = track.image ?? [];

        const art =
          images.find((i: any) => i.size === "extralarge")?.["#text"] ||
          images.find((i: any) => i.size === "large")?.["#text"] ||
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
      className="
        relative
        flex
        min-h-[460px]
        flex-col
        overflow-hidden
        rounded-[28px]
        border
        border-border
        bg-card
        pb-0
        mv-0
        shadow-sm
      "
    >
      {/* ── Background blurred album art (theme-aware opacity) ── */}
      {data?.albumArt && (
        <>
          <img
            src={data.albumArt}
            alt=""
            aria-hidden
            className="
        absolute
        inset-0
        h-full
        w-full
        object-cover
        object-top
        scale-150
        opacity-95
        blur-[2px]
      "
          />

          <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/65 to-background/85" />
        </>
      )}

      {/* ── Content ── */}
      <div className="relative z-10 flex h-full flex-col p-7">
        {/* Header */}
        <div className="flex items-center gap-3">
          <svg
            width="26"
            height="26"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="text-green-500 dark:text-green-400 flex-shrink-0"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02z" />
          </svg>

          <h3 className="text-2xl font-bold text-foreground">Last Played</h3>
        </div>

        {/* Track Info */}
        <div className="mt-7">
          {loading ? (
            <div className="space-y-1">
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
              <p className="text-lg leading-10 text-muted-foreground">
                I recently listened to{" "}
                <strong className="text-foreground font-semibold">
                  {data.title}
                </strong>{" "}
                by{" "}
                <strong className="text-foreground font-semibold">
                  {data.artist}
                </strong>{" "}
                from the album{" "}
                <strong className="text-foreground font-semibold">
                  {data.album}
                </strong>
              </p>
            </a>
          ) : (
            <p className="text-muted-foreground">Nothing scrobbled yet.</p>
          )}
        </div>

        {/* ── Vinyl + Album cover ──
            Container height increased + vinyl repositioned so the disc is
            fully visible (not clipped) both at rest and on hover.
        */}
        <div className="relative mt-auto h-[210px] overflow-hidden">
          {/* Vinyl disc */}
          <div
            className={`
              absolute
              left-1/2
              -translate-x-1/2
              z-[2]
              transition-all
              duration-700
              ease-out
              ${hovered ? "top-[-1px]" : "top-[20px]"}
            `}
          >
            <div
              className={`
                relative
                h-[160px]
                w-[160px]
                ${
                  hovered || data?.isPlaying
                    ? "animate-[vinyl-spin_6s_linear_infinite]"
                    : ""
                }
              `}
            >
              {/* Disc base — theme-aware (dark grey in both modes, vinyl is always black-ish) */}
              <div className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-zinc-950 shadow-2xl ring-1 ring-black/10 dark:ring-white/5" />

              {/* Grooves */}
              {[16, 32, 48, 64, 80, 96].map((i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-white/10 dark:border-white/8"
                  style={{ inset: `${i}px` }}
                />
              ))}

              {/* Highlight sheen */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.14)_0%,transparent_42%)]" />

              {/* Center label */}
              <div className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-700 dark:bg-zinc-800 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-black" />
              </div>
            </div>
          </div>

          {/* Album Cover */}
          {data?.albumArt && (
            <div
              className={`
                absolute
                left-1/2
                -translate-x-1/2
                z-10
                h-[200px]
                w-[200px]
                rounded-md
                overflow-hidden
                transition-all
                duration-700
                ease-out
                ${hovered ? "bottom-[-40px]" : "bottom-[-40px]"}
              `}
            >
              <img
                src={data.albumArt}
                alt={data.album}
                className="block h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes vinyl-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </motion.div>
  );
}
