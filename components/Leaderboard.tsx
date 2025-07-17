"use client";

import React from "react";
import { TeamBoard } from "./TeamBoard";
import { TeamRankBox } from "./TeamRankBox";

interface LeaderboardProps {
  teams: Team[];
}

export const Leaderboard = ({ teams }: LeaderboardProps) => {
  const refs = teams.map((item) => React.createRef<HTMLDialogElement>());

  return (
    <>
      <div className="pb-2 overflow-hidden">
        <div className="w-screen md:w-2/3 h-full max-h-full justify-center mx-auto space-y-2 overflow-y-auto no-scrollbar">
          {teams.map((team, i) => (
            <TeamRankBox
              key={team.name}
              rank={i}
              team={team}
              handleClickAction={(teamName: string) => {
                refs[i].current?.showModal();
              }}
            />
          ))}
        </div>
      </div>

      {teams.map((team, i) => (
        <TeamBoard
          key={i}
          ref={refs[i]}
          name={team.name}
          members={team.members}
        />
      ))}
    </>
  );
};
