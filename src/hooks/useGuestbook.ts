// src/hooks/useGuestbook.ts
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!,
);

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  avatar: string | null;
  created_at: string;
}

export function useGuestbook() {
  const [data, setData] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGuestbook() {
      try {
        setIsLoading(true);
        const { data: entries, error } = await supabase
          .from("guestbook")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setData(entries || []);
      } catch (err: any) {
        setError(err.message);
        console.error("Failed to fetch guestbook:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGuestbook();

    // Realtime subscription
    const channel = supabase
      .channel("guestbook-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "guestbook",
        },
        (payload) => {
          const newEntry = payload.new as GuestbookEntry;
          setData((prev) => [newEntry, ...prev]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { data, isLoading, error };
}
