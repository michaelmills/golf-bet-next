"use client";

import Image from "next/image";
import { toDisplayScore } from "@/lib/utils";
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
        className={`rounded-xl bg-base-100 px-2 py-4 ${rank === 0 ? "mt-1" : ""} h-max border-2 border-base-300 text-base-content`}
        onClick={() => handleClick(team.name)}
      >
        <div className="flex flex-row items-center min-h-full">
          <div className="text-2xl font-bold text-center items-center grow-0 shrink-0 min-w-8 mr-2">
            {rank + 1}
          </div>
          <div className="flex grow items-center gap-3">
            <div className="avatar">
              <div className="mask mask-circle h-16 w-16">
                <Image
                  src="/IMG_0289.jpeg"
                  width={500}
                  height={500}
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div className="min-w-48 text-xl font-semibold">{team.name}</div>
              <div className="uppercase text-sm font-regular proportional-nums">
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
          <div className="shrink-0 min-w-10 pr-4 text-right font-semibold text-2xl">
            {toDisplayScore(team.score)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
