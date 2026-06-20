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
      className="relative flex flex-col rounded-[28px] border border-white/10 overflow-hidden"
      style={{ minHeight: 420 }}
    >
      {/* ── Full-bleed blurred album art background ── */}
      {data?.albumArt && (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${data.albumArt})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              filter: "blur(28px)",
              transform: "scale(1.2)",
              opacity: 0.3,
            }}
          />
          {/* Dark gradient overlay so text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/40" />
        </>
      )}
      {/* Fallback bg when no art */}
      {!data?.albumArt && <div className="absolute inset-0 bg-zinc-950" />}

      {/* ── Content layer ── */}
      <div className="relative z-10 flex flex-col h-full p-7 pb-0">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#1DB954">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-[17px] font-bold text-white tracking-tight">
            Last Played
          </span>
        </div>

        {/* Track sentence */}
        <div className="mb-auto">
          {loading ? (
            <div className="space-y-2">
              <div className="h-4 w-4/5 rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-3/5 rounded bg-white/10 animate-pulse" />
            </div>
          ) : data ? (
            <a
              href={data.trackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <p className="text-[15px] leading-7 text-white/80">
                I recently listened to{" "}
                <strong className="text-white font-bold">{data.title}</strong>{" "}
                by{" "}
                <strong className="text-white font-bold">{data.artist}</strong>{" "}
                from the album{" "}
                <strong className="text-white font-bold">{data.album}</strong>
              </p>
            </a>
          ) : (
            <p className="text-sm text-white/50">Nothing scrobbled yet.</p>
          )}
        </div>

        {/* ── Vinyl + Album Cover Stack ── */}
        <div className="relative w-full mt-8" style={{ height: 260 }}>
          {/* VINYL DISC */}
          <div
            className="absolute"
            style={{
              // centered horizontally, sits above album cover
              left: "50%",
              top: -30,
              width: 260,
              height: 260,
              transform: hovered
                ? "translateX(-50%) translateY(-35px)"
                : "translateX(-50%) translateY(30px)",
              transition: "transform 0.55s cubic-bezier(0.34, 1.3, 0.64, 1)",
              zIndex: 2,
            }}
          >
            {/* Outer vinyl */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg,#111 0deg,#1e1e1e 8deg,#0a0a0a 16deg,#181818 30deg,#0d0d0d 45deg,#1a1a1a 60deg,#0a0a0a 90deg,#161616 120deg,#0d0d0d 150deg,#1a1a1a 180deg,#111 210deg,#1e1e1e 240deg,#0a0a0a 270deg,#181818 300deg,#111 330deg,#0a0a0a 360deg)",

                boxShadow: "0 20px 60px rgba(0,0,0,.8),0 0 40px rgba(0,0,0,.5)",

                animation: hovered ? "vinyl-spin 2.5s linear infinite" : "none",
              }}
            />

            {/* Vinyl grooves */}
            {[30, 45, 60, 72, 82].map((pct, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-white/[0.05]"
                style={{
                  inset: `${pct}px`,
                }}
              />
            ))}

            {/* Sheen highlight */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)",
              }}
            />

            {/* Center spindle hole */}
            <div
              className="absolute rounded-full bg-black"
              style={{
                top: "50%",
                left: "50%",
                width: 10,
                height: 10,
                transform: "translate(-50%, -50%)",
                zIndex: 4,
              }}
            />
          </div>

          {/* ALBUM COVER — peeks from bottom, slides up on hover */}
          {data?.albumArt && (
            <div
              className="absolute rounded-xl overflow-hidden border border-white/10"
              style={{
                left: "50%",
                bottom: 0,
                width: 200,
                height: 200,
                transform: "translateX(-50%)",
                transition: "transform 0.55s cubic-bezier(0.34, 1.2, 0.64, 1)",
                zIndex: 5,
                boxShadow: "0 8px 32px rgba(0,0,0,0.8)",
              }}
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
