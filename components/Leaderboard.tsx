"use client";

// import game from "../data/teams.json";
// import data from "../data/data.json";
import { TeamBoard } from "./TeamBoard";
import { TeamRankBox } from "./TeamRankBox";
import React, { useRef } from "react";

interface LeaderboardProps {
  teams: Team[];
}

export const Leaderboard = ({ teams }: LeaderboardProps) => {
  const refsss = teams.map((item) => React.createRef<HTMLDialogElement>());

  return (
    <>
      <div className="pb-2 overflow-hidden">
        <div className="w-screen md:w-2/3 h-full max-h-full justify-center mx-auto space-y-4 overflow-y-auto no-scrollbar">
          {teams.map((team, i) => (
            <TeamRankBox
              key={team.name}
              rank={i}
              team={team}
              handleClick={(teamName: string) => {
                refsss[i].current?.showModal();
              }}
            />
          ))}
        </div>
      </div>

      {teams.map((team, i) => (
        <TeamBoard
          key={i}
          ref={refsss[i]}
          name={team.name}
          members={team.members}
        />
      ))}
    </>
  );
};
