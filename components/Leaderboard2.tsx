"use client";

import game from "../data/teams.json";
import data from "../data/data.json";
import {
  getAdjustedScore,
  parseScore,
  toDisplayScore,
  getTotalRoundScore,
} from "@/lib/utils";
import { Team } from "./Team";
import { TeamRankBox } from "./TeamRankBox";

interface LeaderboardProps {
  teams: Team[];
}

export const Leaderboard2 = ({ teams }: LeaderboardProps) => {
  return (
    <div className="h-full rounded-t-3xl bg-cyan-700 py-2 overflow-hidden">
      <div className="w-screen md:w-2/3 h-full max-h-full justify-center mx-auto space-y-2 overflow-y-auto">
        {teams.map((team, i) => (
          <TeamRankBox key={team.name} rank={i} team={team} />
        ))}
      </div>
    </div>
  );
};
