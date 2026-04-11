"use server";

import { getCacheTTL } from "@/lib/settings";

export const fetchScorecard = async (
  tournId: string,
  year: number,
  playerId: number,
) => {
  const cacheTTL = await getCacheTTL();
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("x-rapidapi-host", process.env.GOLF_API_HOST as string);
  requestHeaders.set("x-rapidapi-key", process.env.GOLF_API_KEY as string);

  const params = new URLSearchParams({
    orgId: String(1),
    year: String(year),
    tournId: tournId,
    playerId: String(playerId),
  });

  const url = `https://live-golf-data.p.rapidapi.com/scorecard?${params}`;

  return await fetch(url, {
    headers: requestHeaders,
    next: { revalidate: cacheTTL },
  });
};
