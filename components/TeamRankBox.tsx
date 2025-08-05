"use client";

import { toDisplayScore } from "@/lib/utils";
import { motion } from "motion/react";

interface RankProps {
  rank: number;
  team: Team;
  handleClickAction: (teamName: string) => void;
}

export const TeamRankBox = ({ rank, team, handleClickAction }: RankProps) => {
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
        className={`h-max rounded-lg border-1 border-base-300 bg-base-100 p-4 text-base-content`}
        onClick={() => handleClickAction(team.name)}
      >
        <div className="flex min-h-full flex-row items-center">
          <div className="min-w-8 shrink-0 grow-0 items-center text-left text-2xl font-bold">
            {rank + 1}
          </div>
          <div className="flex grow items-center gap-3">
            <div className="avatar">
              <div className="mask h-16 w-16 mask-circle">
                {team.name.includes("Mauro") ? (
                  <img src="/IMG_0289.jpeg" alt="Mauro" />
                ) : (
                  <img
                    src="/IMG_6497.jpeg"
                    width={250}
                    height={250}
                    alt="Avatar Tailwind CSS Component"
                  />
                )}
              </div>
            </div>
            <div>
              <div className="min-w-48 text-xl font-medium md:text-2xl">
                {team.name}
              </div>
              <div className="text-xs font-medium uppercase proportional-nums md:text-sm">
                <span className="text-green-600/90">
                  {team.activeMemberCount} active
                </span>
                &nbsp;&nbsp;&#183;&nbsp;&nbsp;
                <span className="text-rose-700/90">
                  {team.cutMemberCount} / {team.memberCount} cut
                </span>
              </div>
            </div>
          </div>
          <div className="min-w-10 shrink-0 pr-4 text-right text-xl font-medium md:text-2xl">
            {toDisplayScore(team.score)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
