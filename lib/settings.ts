"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";

const fetchCacheTTLFromDB = async (): Promise<number> => {
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "cache_ttl_minutes")
    .single();

  const minutes = data ? Number(data.value) : Number(process.env.CACHE_TTL_MINUTES ?? 1);
  return minutes * 60;
};

// Cache the settings lookup itself for 5 minutes to avoid DB calls on every request
export const getCacheTTL = unstable_cache(
  fetchCacheTTLFromDB,
  ["cache_ttl"],
  { revalidate: 300 }
);
