"use server";

import { supabase } from "@/lib/supabase";
import { fetchLeaderboard } from "@/actions/leaderboard.action";
import { getCacheTTL } from "@/lib/settings";

export interface Player {
  id: number;
  name: string;
}

export interface TournamentEntry {
  id: string;
  name: string;
  year: number;
}

export const fetchTournaments = async (): Promise<{ tournaments?: TournamentEntry[]; error?: string }> => {
  const { data, error } = await supabase
    .from("tournament")
    .select("id, name, year, start_date")
    .order("start_date", { ascending: false, nullsFirst: false })
    .order("year", { ascending: false });
  if (error) return { error: error.message };
  return { tournaments: data };
};

export interface GameTeam {
  playerName: string;
  golferIds: string[];
}

export const fetchGameTeams = async (
  tournamentId: string,
  year: number,
): Promise<{ teams?: GameTeam[]; year?: number; error?: string }> => {
  const { data, error } = await supabase
    .from("game")
    .select(`
      tournament_year,
      entry (
        player ( name ),
        pick ( pga_player_id )
      )
    `)
    .eq("tournament_id", tournamentId)
    .eq("tournament_year", year)
    .single();

  if (error) return { error: error.message };

  const teams: GameTeam[] = (data.entry as any[]).map((e) => ({
    playerName: e.player.name,
    golferIds: (e.pick as any[]).map((p) => p.pga_player_id),
  }));

  return { teams, year: data.tournament_year };
};

export const fetchPlayers = async (): Promise<{ players?: Player[]; error?: string }> => {
  const { data, error } = await supabase
    .from("player")
    .select("id, name")
    .order("name");
  if (error) return { error: error.message };
  return { players: data };
};

export interface ScheduleEntry {
  tournId: string;
  name: string;
  startDate: string;
}

export const fetchSchedule = async (
  year: number,
): Promise<{ schedule?: ScheduleEntry[]; error?: string }> => {
  try {
    const cacheTTL = await getCacheTTL();
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("x-rapidapi-host", process.env.GOLF_API_HOST as string);
    requestHeaders.set("x-rapidapi-key", process.env.GOLF_API_KEY as string);

    const response = await fetch(
      `https://live-golf-data.p.rapidapi.com/schedule?orgId=1&year=${year}`,
      { headers: requestHeaders,
				next: { revalidate: cacheTTL },
			},
    );
    const data = await response.json();
    const schedule: ScheduleEntry[] = (data.schedule ?? []).map((t: any) => ({
      tournId: t.tournId,
      name: t.name,
      startDate: t.date?.start?.$date?.$numberLong
        ? new Date(Number(t.date.start.$date.$numberLong)).toISOString()
        : "",
    }));
    return { schedule };
  } catch (e: any) {
    return { error: e.message ?? "Failed to fetch schedule" };
  }
};

export interface Golfer {
  id: string;
  name: string;
}

export const fetchGolfersForTournament = async (
  tournId: string,
  year: number,
): Promise<{ golfers?: Golfer[]; error?: string }> => {
  try {
    const response = await fetchLeaderboard(tournId, year);
    const data = await response.json();
    const golfers: Golfer[] = (data.leaderboardRows ?? [])
      .map((row: any) => ({
        id: row.playerId,
        name: `${row.firstName} ${row.lastName}`,
      }))
      .sort((a: Golfer, b: Golfer) => a.name.localeCompare(b.name));
    return { golfers };
  } catch (e: any) {
    return { error: e.message ?? "Failed to fetch golfers" };
  }
};

export interface GolferEntry {
  playerName: string;
  golferIds: string[];
}

export interface NewTournamentPayload {
  tournamentId: string;
  tournamentName: string;
  tournamentYear: number;
  tournamentStartDate?: string;
  entries: GolferEntry[];
}

export interface SaveResult {
  success: boolean;
  error?: string;
}

export const saveNewTournament = async (
  payload: NewTournamentPayload,
): Promise<SaveResult> => {
  const { tournamentId, tournamentName, tournamentYear, tournamentStartDate, entries } = payload;

  // 1. Upsert tournament
  const { error: tournamentError } = await supabase
    .from("tournament")
    .upsert({
      id: tournamentId,
      name: tournamentName,
      year: tournamentYear,
      ...(tournamentStartDate ? { start_date: tournamentStartDate } : {}),
    });

  if (tournamentError) return { success: false, error: tournamentError.message };

  // 2. Upsert game
  const { data: gameData, error: gameError } = await supabase
    .from("game")
		.upsert({ tournament_id: tournamentId, tournament_year: tournamentYear })
		.select("id")
		.single();

  if (gameError) return { success: false, error: gameError.message };
  const gameId = gameData.id;

  for (const entry of entries) {
    const playerName = entry.playerName.trim();
    if (!playerName) continue;

    // 3. Upsert player
    const { data: playerData, error: playerError } = await supabase
      .from("player")
      .upsert({ name: playerName }, { onConflict: "name" })
      .select("id")
      .single();

    if (playerError) return { success: false, error: playerError.message };
    const playerId = playerData.id;

    // 4. Upsert entry
    const { data: entryData, error: entryError } = await supabase
      .from("entry")
      .upsert(
        { game_id: gameId, player_id: playerId },
        { onConflict: "game_id,player_id" },
      )
      .select("id")
      .single();

    if (entryError) return { success: false, error: entryError.message };
    const entryId = entryData.id;

    // 5. Upsert picks
    const picks = entry.golferIds
      .map((id) => id.trim())
      .filter(Boolean)
      .map((pga_player_id) => ({ entry_id: entryId, pga_player_id }));

    if (picks.length > 0) {
      const { error: picksError } = await supabase
        .from("pick")
        .upsert(picks, { onConflict: "entry_id,pga_player_id" });

      if (picksError) return { success: false, error: picksError.message };
    }
  }

  return { success: true };
};
