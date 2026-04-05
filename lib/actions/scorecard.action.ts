"use server";

// export const getLeaderboard = async (tournId: string): Promise<Team[]> => {
//   const response = await fetchLeaderboard(tournId);
//   const data = await response.json();
//
//   return Promise.resolve(sorted);
// };

export const fetchScorecard = async (
  tournId: number,
  year: number,
  playerId: number,
) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("x-rapidapi-host", process.env.GOLF_API_HOST as string);
  requestHeaders.set("x-rapidapi-key", process.env.GOLF_API_KEY as string);

  const params = new URLSearchParams({
    orgId: String(1),
    year: String(year),
    tournId: String(tournId),
    playerId: String(playerId),
  });

  const url = `https://live-golf-data.p.rapidapi.com/scorecard?${params}`;

  return await fetch(url, {
    headers: requestHeaders,
  });
};
