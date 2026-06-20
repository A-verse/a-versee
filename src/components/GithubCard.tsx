import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LatestPush {
  message: string;
  repo: string;
  isPrivate: boolean;
  timeAgo: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

export default function GithubCard() {
  const [push, setPush] = useState<LatestPush | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/A-verse/events/public?per_page=10")
      .then((r) => r.json())
      .then((events: any[]) => {
        const pushEvent = events.find((e) => e.type === "PushEvent");
        if (pushEvent) {
          const commits = pushEvent.payload.commits ?? [];
          const msg =
            commits[commits.length - 1]?.message ?? "No commit message";
          const repoName = pushEvent.repo.name.split("/")[1];
          setPush({
            message: msg,
            repo: repoName,
            isPrivate: !pushEvent.public,
            timeAgo: timeAgo(pushEvent.created_at),
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative flex flex-col justify-between rounded-[28px] border border-white/10 bg-zinc-950/80 backdrop-blur-xl p-7 overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-purple-500/10 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-pink-500/8 blur-[80px]" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-8">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span className="font-serif italic text-xl text-white tracking-tight">
            Anjali'Github
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            Latest Push
          </p>
          {!loading && push && (
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              {push.timeAgo}
            </span>
          )}
        </div>

        {loading ? (
          <div className="space-y-2 mt-2">
            <div className="h-4 w-4/5 rounded bg-white/5 animate-pulse" />
            <div className="h-4 w-3/5 rounded bg-white/5 animate-pulse" />
          </div>
        ) : push ? (
          <p className="text-[17px] font-semibold leading-7 text-white">
            "{push.message}"
          </p>
        ) : (
          <p className="text-zinc-500 text-sm">No recent public pushes.</p>
        )}

        {!loading && push && (
          <p className="mt-3 text-sm text-zinc-500">
            Repo:{" "}
            {push.isPrivate ? (
              <span className="font-mono text-pink-400">Private work</span>
            ) : (
              <a
                href={`https://github.com/A-verse/${push.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-pink-400 hover:underline"
              >
                {push.repo}
              </a>
            )}
          </p>
        )}
      </div>

      <div className="relative mt-auto pt-8">
        <div className="h-px w-full bg-white/8 mb-6" />
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/A-verse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/parthh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://twitter.com/parthh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
