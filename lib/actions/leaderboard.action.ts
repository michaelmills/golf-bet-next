"use server";

import game from "../../data/teams.json";
import data from "../../data/data.json";
import { getAdjustedScore, parseScore } from "@/lib/utils";

export const getLeaderboard = async (): Promise<Team[]> => {
  const teams: Team[] = game.teams.map((team) => {
    const members = data.leaderboardRows
      .filter((row) => team.golfers.includes(row.playerId))
      .map((row) => {
        const rounds = new Map(
          row.rounds.map((round) => [
            Number(round.roundId.$numberInt),
            parseScore(round.scoreToPar),
          ]),
        );
        const member: TeamMember = {
          name: row.firstName + " " + row.lastName,
          isCut: row.status === "cut",
          score: parseScore(row.total),
          adjusted: row.status === "cut" ? 2 : Number(row.total),
          rounds: rounds,
        };
        return member;
      });

    const score = members.reduce((acc, player) => {
      return acc + getAdjustedScore(player);
    }, 0);

    return {
      name: team.player,
      score: score,
      members: members,
      memberCount: members.length,
      cutMemberCount: members.filter((x) => x.isCut).length,
    };
  });

  const sorted = teams.sort((p1, p2) => p1.score - p2.score);
  return Promise.resolve(sorted);
};
