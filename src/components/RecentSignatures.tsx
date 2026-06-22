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
  size = 48,
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

// ─── Signature Card (matches your project's style) ───────────────────────────
function SignatureCard({
  name,
  message,
  avatar,
  date,
}: {
  name: string;
  message: string;
  avatar: string | null;
  date: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group bg-card border border-border/80 hover:border-foreground/20 rounded-3xl overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div className="flex items-center gap-4 p-8 pb-6 border-b border-border/50">
        <Avatar src={avatar} name={name} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-lg leading-none truncate">{name}</p>
          <p className="text-muted-foreground text-sm mt-2.5">{date}</p>
        </div>
      </div>

      <div className="flex-1 p-8 pb-6 text-foreground/90 text-[15px] leading-relaxed">
        {message}
      </div>

      <div className="mt-auto border-t border-border/60 bg-muted/30 px-8 py-10">
        <div className="font-serif italic text-3xl text-foreground/80 tracking-[-0.02em]">
          — {name}
        </div>
        <div className="mt-1 w-3/4 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
      </div>
    </motion.article>
  );
}

// ─── Recent Signatures Section (based on your snippet) ───────────────────────
function RecentSignatures({
  signatures,
  loading,
}: {
  signatures: Signature[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="animate-spin w-8 h-8 border-4 border-foreground/20 border-t-foreground rounded-full" />
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto mt-24 px-6" id="signatures">
      <div className="flex items-center gap-6 mb-14">
        <div className="h-px flex-1 bg-border" />
        <span className="tracking-[0.35em] text-xs uppercase text-muted-foreground">
          Recent Signatures
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7">
        {signatures.length === 0 ? (
          <div className="col-span-full flex flex-col items-center py-24 text-center">
            <div className="text-7xl opacity-75 mb-6">✍️</div>
            <p className="text-2xl font-medium">The wall is quiet...</p>
            <p className="text-muted-foreground mt-2">
              Be the first to leave your signature.
            </p>
          </div>
        ) : (
          signatures.map((entry, index) => (
            <SignatureCard
              key={entry.id}
              name={entry.name}
              message={entry.message}
              avatar={entry.avatar}
              date={formatDate(entry.created_at)}
            />
          ))
        )}
      </div>
    </section>
  );
}

// ─── Auth & Compose Components (kept compact) ───────────────────────────────
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
          className="w-full flex items-center justify-center gap-3 border border-border hover:bg-muted rounded-2xl py-4 transition-all active:scale-[0.985]"
        >
          {loading === "google" ? <Spinner /> : <GoogleIcon />}
          Continue with Google
        </button>
        <button
          onClick={() => signIn("github")}
          disabled={!!loading}
          className="w-full flex items-center justify-center gap-3 border border-border hover:bg-muted rounded-2xl py-4 transition-all active:scale-[0.985]"
        >
          {loading === "github" ? <Spinner /> : <GitHubIcon />}
          Continue with GitHub
        </button>
      </div>
    </motion.div>
  );
}

function ComposeForm({ user, onSubmit, onSignOut }: any) {
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
    setTimeout(() => setSuccess(false), 2500);
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
      id="leave"
      className="bg-card border border-border rounded-3xl p-10 w-full max-w-md shadow-xl"
    >
      {/* User info + sign out */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Avatar src={avatar} name={name} />
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-emerald-500 text-xs">• Signed in</p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Sign out
        </button>
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value.slice(0, maxLen))}
        placeholder="Share a memory, a kind word, or just say hello..."
        rows={5}
        className="w-full bg-background border border-border rounded-2xl px-6 py-5 text-base resize-y outline-none focus:border-foreground/40"
      />

      <div className="flex justify-between text-xs text-muted-foreground mt-4 mb-6">
        <span>
          {message.length}/{maxLen}
        </span>
        <AnimatePresence>
          {success && (
            <motion.span className="text-emerald-500">
              ✓ Added to the wall
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!message.trim() || loading}
        className="w-full bg-foreground text-background font-semibold py-4 rounded-2xl hover:bg-foreground/90 active:scale-[0.985] disabled:opacity-50"
      >
        {loading ? "Signing..." : "Sign the Guestbook →"}
      </button>
    </motion.div>
  );
}

function Spinner() {
  return (
    <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
  );
}

function GoogleIcon() {
  /* same as before */
}
function GitHubIcon() {
  /* same as before */
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SignatureBook() {
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) =>
        setUser((data.session?.user as SupabaseUser) ?? null),
      );
    const { data: sub } = supabase.auth.onAuthStateChange((_, session) => {
      setUser((session?.user as SupabaseUser) ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Fetch + Realtime
  useEffect(() => {
    const fetchSigs = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false });
      setSignatures(data || []);
      setLoading(false);
    };

    fetchSigs();

    const channel = supabase
      .channel("guestbook")
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

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-end">
          <div className="flex-1">
            <div className="uppercase tracking-[3px] text-xs font-mono text-muted-foreground mb-4">
              Digital Guestbook
            </div>
            <h1 className="text-[clamp(4rem,9vw,7rem)] leading-none font-black tracking-tighter">
              GUEST
              <br />
              BOOK
            </h1>
            <p className="mt-8 max-w-lg text-xl text-muted-foreground">
              A living memory wall. Leave your mark.
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

      <RecentSignatures signatures={signatures} loading={loading} />

      <Footer />
    </div>
  );
}
