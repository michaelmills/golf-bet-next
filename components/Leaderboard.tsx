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
      <div className="mx-auto h-max w-screen justify-center space-y-1 md:w-2/3">
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
