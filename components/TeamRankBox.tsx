"use client";

import {
  getAdjustedScore,
  parseScore,
  toDisplayScore,
  getTotalRoundScore,
} from "@/lib/utils";
import { Team } from "./Team";
import { motion } from "motion/react";

interface RankProps {
  rank: number;
  team: Team;
  handleClick: (teamName: string) => void;
}

export const TeamRankBox = ({ rank, team, handleClick }: RankProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: rank / 10 + 0.4,
        scale: {
          type: "spring",
          visualDuration: 0.5,
          bounce: 0.5,
        },
      }}
    >
      <div
        className="rounded-2xl bg-base-200 border border-primary px-2 h-max mx-2 py-4"
        onClick={() => handleClick(team.name)}
      >
        <div className="flex flex-row items-center min-h-full">
          <div className="text-2xl font-bold text-secondary text-center items-center grow-0 shrink-0 min-w-8 mr-2">
            {rank + 1}
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
              <div className="min-w-48 text-secondary text-xl font-semibold">
                {team.name}
              </div>
              <div className="uppercase text-sm font-semibold proportional-nums">
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
          <div className="shrink-0 min-w-10 pr-4 text-right text-secondary font-semibold text-2xl">
            {toDisplayScore(team.score)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
