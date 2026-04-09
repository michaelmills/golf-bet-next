"use client";

import { toDisplayScore } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Scorecard } from "./Scorecard";

interface RankProps {
  rank: number;
  team: Team;
  holePars: number[];
  handleClickAction: (teamName: string) => void;
}

const rankStyle = (rank: number): string => {
  if (rank === 0) return "text-yellow-500";
  if (rank === 1) return "text-slate-400";
  if (rank === 2) return "text-amber-600";
  return "text-base-content/50";
};

const borderAccent = (rank: number): string => {
  if (rank === 0) return "border-l-yellow-400";
  if (rank === 1) return "border-l-slate-400";
  if (rank === 2) return "border-l-amber-600";
  return "border-l-base-300";
};

const scoreStyle = (score: number): string => {
  if (score < 0) return "text-green-500";
  if (score > 0) return "text-rose-500 dark:text-red-400";
  return "text-base-content";
};

export const TeamRankBox = ({ rank, team, holePars, handleClickAction }: RankProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
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
        {/* Card */}
        <div
          className={`h-max border border-base-300 border-l-4 bg-base-100 p-4 text-base-content transition-all dark:bg-neutral ${borderAccent(rank)} ${visible ? "rounded-t-lg" : "rounded-lg"}`}
          onClick={() => setVisible(!visible)}
        >
          <div className="flex min-h-full flex-row items-center">
            {/* Rank */}
            <div className={`min-w-8 shrink-0 grow-0 text-left text-2xl font-bold ${rankStyle(rank)}`}>
              {rank + 1}
            </div>

            {/* Avatar + name */}
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
                  <span className="inline-flex items-center gap-1 text-success">
                    {team.activeMemberCount > 0 && (
                      <span className="status status-success animate-ping size-1.5" />
                    )}
                    {team.activeMemberCount} active
                  </span>
                  &nbsp;&nbsp;&#183;&nbsp;&nbsp;
                  <span className="text-rose-600 dark:text-red-400">
                    {team.cutMemberCount} / {team.memberCount} cut
                  </span>
                </div>
              </div>
            </div>

            {/* Score + chevron */}
            <div className="flex shrink-0 items-center gap-2 pr-1">
              <div className={`text-right text-xl font-medium md:text-2xl ${scoreStyle(team.score)}`}>
                {toDisplayScore(team.score)}
              </div>
              <ChevronDown
                className={`size-4 shrink-0 text-base-content/40 transition-transform duration-200 ${visible ? "rotate-180" : ""}`}
              />
            </div>
          </div>
        </div>

        {/* Scorecard panel — connected to card */}
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ skewY: "0%" }}
              animate={{
                skewY: "100%",
                opacity: 1,
                transition: { opacity: { ease: "easeOut" } },
              }}
              exit={{ skewY: "0%" }}
              transition={{ ease: "linear" }}
              className={`rounded-b-lg border border-t-0 border-l-4 bg-base-100 dark:bg-neutral ${borderAccent(rank)}`}
            >
              <div className="mx-4 border-t border-base-300/50" />
              <Scorecard isVisible={true} members={team.members} holePars={holePars} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
