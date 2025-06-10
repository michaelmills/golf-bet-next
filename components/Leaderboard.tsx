"use client";

import game from "../data/teams.json";
import data from "../data/data.json";
import {
  getAdjustedScore,
  parseScore,
  toDisplayScore,
  getTotalRoundScore,
} from "@/lib/utils";
import { TeamBoard } from "./TeamBoard";
import { TeamRankBox } from "./TeamRankBox";
import { motion } from "motion/react";

interface LeaderboardProps {
  teams: Team[];
}

export const Leaderboard = ({ teams }: LeaderboardProps) => {
  return (
    <>
      {/* <motion.div */}
      {/*   initial={{ y: "100vh" }} */}
      {/*   animate={{ y: 0 }} */}
      {/*   transition={{ */}
      {/*     scale: { */}
      {/*       type: "spring", */}
      {/*       visualDuration: 0.5, */}
      {/*       bounce: 0.5, */}
      {/*     }, */}
      {/*   }} */}
      {/*   className="h-full bg-base-300 py-2 overflow-hidden" */}
      {/* > */}
      <div className="pb-2 overflow-hidden">
        <div className="w-screen md:w-2/3 h-full max-h-full justify-center mx-auto space-y-4 overflow-y-auto no-scrollbar">
          {teams.map((team, i) => (
            <TeamRankBox
              key={team.name}
              rank={i}
              team={team}
              handleClick={(teamName: string) =>
                document.getElementById(teamName + "-board").showModal()
              }
            />
          ))}
        </div>
        {/* </motion.div> */}
      </div>

      {teams.map((team) => (
        <TeamBoard
          key={team.name + "-board"}
          id={team.name + "-board"}
          name={team.name}
          members={team.members}
        />
      ))}
    </>
  );
};
