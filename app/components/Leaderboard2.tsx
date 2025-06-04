"use client";

import game from "../teams.json";
import data from "../data.json";
import {
  getAdjustedScore,
  parseScore,
  toDisplayScore,
  getTotalRoundScore,
} from "@/lib/utils";
import { Team } from "./Team";

interface LeaderboardProps {
  teams: Team[];
}

export const Leaderboard2 = ({ teams }: LeaderboardProps) => {
  return (
    <div className="h-full rounded-t-3xl bg-cyan-700 py-2 overflow-hidden">
      <div className="w-screen md:w-2/3 h-full max-h-full justify-center mx-auto space-y-2 overflow-y-auto">
        {teams.map((team, i) => (
          <div
            key={team.name}
            className="rounded-2xl bg-base-100 px-2 h-max mx-2 py-4"
          >
            <div className="flex flex-row items-center min-h-full">
              <div className="text-2xl font-bold text-center items-center grow-0 shrink-0 min-w-8 mr-2">
                {i + 1}
              </div>
              <div className="flex grow items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-14 w-14">
                    <img
                      src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="min-w-48 font-light text-xl">{team.name}</div>
                  <div className="uppercase text-xs proportional-nums">
                    <span className="text-green-600">
                      {team.memberCount} active
                    </span>
                    &nbsp;&nbsp;&#183;&nbsp;&nbsp;
                    <span className="text-rose-700">
                      {team.cutMemberCount} / {team.memberCount} cut
                    </span>
                  </div>
                </div>
              </div>
              <div className="shrink-0 min-w-10 pr-2 text-right font-light text-2xl">
                {toDisplayScore(team.score)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
