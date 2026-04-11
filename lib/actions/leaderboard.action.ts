"use server";

import matches from "@/data/matches.json";
import { getAdjustedScore, parseScore } from "@/lib/utils";
import { getCacheTTL } from "@/lib/settings";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import leaderboardData from "../../data/the-open-leaderboard.json";
import tournamentData from "../../data/the-open.json";

// export const getLeaderboard = async (tournId: string): Promise<Team[]> => {
//   // const response = await fetchLeaderboard(tournId);
//   // const data = await response.json();
//   const data = leaderboardData;
//
//   const teams: Team[] = matches.games
//     .find((g) => g.tournamentId === tournId)!
//     .teams.map((team) => {
//       const members = data.leaderboardRows
//         .filter((row: any) => team.golfers.includes(row.playerId))
//         .map((row: any) => {
//           const rounds: Map<number, number> = new Map(
//             row.rounds.map((round: any) => [
//               Number(round.roundId.$numberInt),
//               parseScore(round.scoreToPar),
//             ]),
//           );
//
//           if (row.status === "active") {
//             rounds.set(
//               Number(row.currentRound.$numberInt),
//               parseScore(row.currentRoundScore),
//             );
//           }
//
//           const member: TeamMember = {
//             playerId: row.playerId,
//             name: row.firstName + " " + row.lastName,
//             isCut: row.status === "cut",
//             isActive: row.status === "active",
//             score: parseScore(row.total),
//             adjusted: row.status === "cut" ? 2 : Number(row.total),
//             rounds: rounds,
//             holeStart: row.startingHole.$numberInt,
//             thru: row.currentHole.$numberInt,
//           };
//           return member;
//         });
//
//       const score = members.reduce((acc: number, player: any) => {
//         return acc + getAdjustedScore(player);
//       }, 0);
//
//       return {
//         name: team.player,
//         score: score,
//         members: members,
//         memberCount: members.length,
//         cutMemberCount: members.filter((x: TeamMember) => x.isCut).length,
//         activeMemberCount: members.filter((x: TeamMember) => x.isActive).length,
//       };
//     });
//
//   const sorted = teams.sort((p1, p2) => p1.score - p2.score);
//   return Promise.resolve(sorted);
// };

// export const getTournament = async (
//   tournId: string,
// ): Promise<TournamentInfoProps> => {
//   // const response = await fetchTournament(tournId);
//   // const data = await response.json();
//   const data = tournamentData;
//
//   dayjs.extend(utc);
//   const begin = dayjs(+data.date.start.$date.$numberLong)
//     .utc()
//     .format("MMMM D");
//   const end = dayjs(+data.date.end.$date.$numberLong).utc().format("D, YYYY");
//
//   const holePars: number[] = data.courses[0].holes.map((h: { holeId: number; par: string }) => Number(h.par));
//
//   const info: TournamentInfoProps = {
//     name: data.name,
//     date: begin + " - " + end,
//     course: data.courses[0].courseName,
//     status: data.status,
//     par: data.courses[0].parTotal,
//     holePars,
//   };
//   return Promise.resolve(info);
// };

export const fetchLeaderboard = async (tournId: string, year: number = 2025) => {
  const cacheTTL = await getCacheTTL();
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("x-rapidapi-host", process.env.GOLF_API_HOST as string);
  requestHeaders.set("x-rapidapi-key", process.env.GOLF_API_KEY as string);

  return await fetch(
    "https://live-golf-data.p.rapidapi.com/leaderboard?orgId=1&tournId=" +
      tournId +
      "&year=" + year,
    {
      headers: requestHeaders,
      next: { revalidate: cacheTTL },
    },
  );
};

export const fetchTournament = async (tournId: string, year: number = 2025) => {
  const cacheTTL = await getCacheTTL();
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("x-rapidapi-host", process.env.GOLF_API_HOST as string);
  requestHeaders.set("x-rapidapi-key", process.env.GOLF_API_KEY as string);

  return await fetch(
    `https://live-golf-data.p.rapidapi.com/tournament?orgId=1&tournId=${tournId}&year=${year}`,
    {
      headers: requestHeaders,
      next: { revalidate: cacheTTL },
    },
  );
};
