import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Supabase ────────────────────────────────────────────────────────────────
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string,
);

// ─── Types ───────────────────────────────────────────────────────────────────
interface Signature {
  id: string;
  name: string;
  message: string;
  avatar: string | null;
  created_at: string;
  pinned: boolean;
}

interface SupabaseUser {
  id: string;
  user_metadata: {
    full_name?: string;
    name?: string;
    avatar_url?: string;
    picture?: string;
  };
  email?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({
  src,
  name,
  size = 40,
}: {
  src?: string | null;
  name: string;
  size?: number;
}) {
  const [err, setErr] = useState(false);
  if (src && !err) {
    return (
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover shrink-0 ring-1 ring-border"
        style={{ width: size, height: size }}
        onError={() => setErr(true)}
      />
    );
  }
  return (
    <span
      className="rounded-full bg-muted text-muted-foreground font-semibold flex items-center justify-center text-sm shrink-0 ring-1 ring-border"
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials(name)}
    </span>
  );
}

// ─── Signature Card ───────────────────────────────────────────────────────────
function SignatureCard({ sig, index }: { sig: Signature; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.6),
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="
        group bg-card border border-border/80 hover:border-foreground/20 
        rounded-3xl overflow-hidden flex flex-col h-full
        shadow-sm hover:shadow-xl transition-all duration-500
      "
    >
      <div className="flex items-center gap-4 p-8 pb-6 border-b border-border/50">
        <Avatar src={sig.avatar} name={sig.name} size={52} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-foreground text-lg leading-none truncate">
            {sig.name}
          </p>
          <p className="text-muted-foreground text-sm mt-2.5">
            {formatDate(sig.created_at)}
          </p>
        </div>
      </div>

      <div className="flex-1 p-8 pb-6 text-foreground/90 text-[15px] leading-relaxed">
        {sig.message}
      </div>

      <div className="mt-auto border-t border-border/60 bg-muted/30 px-8 py-10">
        <div className="relative">
          <div className="font-serif italic text-3xl text-foreground/80 tracking-[-0.02em] select-none">
            — {sig.name}
          </div>
          <div className="absolute -bottom-1 left-0 w-3/4 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
        </div>
      </div>
    </motion.article>
  );
}

// ─── Section Divider ──────────────────────────────────────────────────────────
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-6 my-20" id="signatures">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <span className="text-xs font-mono tracking-[0.125em] uppercase text-muted-foreground px-6">
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

// ─── Auth Card ────────────────────────────────────────────────────────────────
function AuthCard() {
  const [loading, setLoading] = useState<"google" | "github" | null>(null);

  const signIn = async (provider: "google" | "github") => {
    setLoading(provider);
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.href },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="bg-card border border-border rounded-3xl p-10 w-full max-w-md shadow-xl"
    >
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground/60 mb-2">
          JOIN THE WALL
        </div>
        <h3 className="text-3xl font-semibold tracking-tight">
          Leave your signature
        </h3>
        <p className="text-muted-foreground mt-3 text-[15px]">
          Sign in to share your thoughts and connect with fellow visitors.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => signIn("google")}
          disabled={!!loading}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-border text-foreground font-medium rounded-2xl py-4 transition-all active:scale-[0.985]"
        >
          {loading === "google" ? <Spinner /> : <GoogleIcon />}
          Continue with Google
        </button>

        <button
          onClick={() => signIn("github")}
          disabled={!!loading}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-border text-foreground font-medium rounded-2xl py-4 transition-all active:scale-[0.985]"
        >
          {loading === "github" ? <Spinner /> : <GitHubIcon />}
          Continue with GitHub
        </button>
      </div>
    </motion.div>
  );
}

// ─── Compose Form ─────────────────────────────────────────────────────────────
function ComposeForm({
  user,
  onSubmit,
  onSignOut,
}: {
  user: SupabaseUser;
  onSubmit: (message: string) => Promise<void>;
  onSignOut: () => void;
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const maxLen = 320;

  const handleSubmit = async () => {
    if (!message.trim() || loading) return;
    setLoading(true);
    await onSubmit(message.trim());
    setMessage("");
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2800);
  };

  const name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Anonymous";

  const avatar =
    user.user_metadata?.avatar_url || user.user_metadata?.picture || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      id="leave"
      className="bg-card border border-border rounded-3xl p-10 w-full max-w-md shadow-xl"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Avatar src={avatar} name={name} size={48} />
          <div>
            <p className="font-semibold text-lg tracking-tight">{name}</p>
            <p className="text-xs text-emerald-500">• Signed in</p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Sign out
        </button>
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value.slice(0, maxLen))}
        placeholder="Share a memory, a kind word, or just say hello..."
        rows={5}
        className="w-full bg-background border border-border focus:border-foreground/40 rounded-2xl px-6 py-5 text-base resize-y min-h-[140px] outline-none transition-colors leading-relaxed"
      />

      <div className="flex items-center justify-between mt-4 mb-6 text-xs text-muted-foreground">
        <span>
          {message.length}/{maxLen}
        </span>
        <AnimatePresence>
          {success && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-emerald-500 font-medium"
            >
              ✓ Added to the wall
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!message.trim() || loading}
        className="w-full bg-foreground hover:bg-foreground/90 active:bg-foreground text-background font-semibold py-4 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.985]"
      >
        {loading ? "Signing the wall..." : "Sign the Guestbook →"}
      </button>
    </motion.div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="col-span-full flex flex-col items-center py-24 gap-6 text-center"
    >
      <div className="text-7xl opacity-75">✍️</div>
      <div>
        <p className="text-2xl font-medium text-foreground">
          The wall is quiet...
        </p>
        <p className="text-muted-foreground mt-2 max-w-xs">
          Be the first to leave your signature.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SignatureBook() {
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loadingSigs, setLoadingSigs] = useState(true);

  // Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser((data.session?.user as SupabaseUser) ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser((session?.user as SupabaseUser) ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const fetchSignatures = async () => {
    setLoadingSigs(true);
    const { data } = await supabase
      .from("guestbook")
      .select("*")
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });
    setSignatures((data as Signature[]) ?? []);
    setLoadingSigs(false);
  };

  useEffect(() => {
    fetchSignatures();

    const channel = supabase
      .channel("guestbook-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook" },
        (payload) => {
          setSignatures((prev) => [payload.new as Signature, ...prev]);
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const handleSubmit = async (message: string) => {
    if (!user) return;
    const name =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "Anonymous";

    const avatar =
      user.user_metadata?.avatar_url || user.user_metadata?.picture || null;

    await supabase.from("guestbook").insert({ name, message, avatar });
  };

  const handleSignOut = () => supabase.auth.signOut();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-end">
          <div className="flex-1">
            <div className="uppercase text-xs tracking-[3px] font-mono text-muted-foreground mb-4">
              Digital Guestbook
            </div>
            <h1 className="text-[clamp(4.2rem,10vw,7.5rem)] leading-[0.92] font-black tracking-tighter">
              GUEST
              <br />
              BOOK
            </h1>
            <p className="mt-8 max-w-lg text-xl text-muted-foreground">
              A space for thoughts, memories, and quiet hellos. Your signature
              becomes part of this living archive.
            </p>
          </div>

          <div className="lg:w-[420px] flex-shrink-0">
            {user ? (
              <ComposeForm
                user={user}
                onSubmit={handleSubmit}
                onSignOut={handleSignOut}
              />
            ) : (
              <AuthCard />
            )}
          </div>
        </div>
      </section>

      <SectionDivider label="RECENT SIGNATURES" />

      {/* SIGNATURE GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-24" id="signatures">
        {loadingSigs ? (
          <div className="flex justify-center py-32">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {signatures.length === 0 ? (
              <EmptyState />
            ) : (
              signatures.map((sig, i) => (
                <SignatureCard key={sig.id} sig={sig} index={i} />
              ))
            )}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
