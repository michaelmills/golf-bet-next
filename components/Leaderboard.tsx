"use client";

import { TeamRankBox } from "./TeamRankBox";

interface LeaderboardProps {
  teams: Team[];
}

export const Leaderboard = ({ teams }: LeaderboardProps) => {
  // const refs = teams.map((_) => React.createRef<HTMLDialogElement>());
  // const refs = teams.map((_) => React.createRef<HTMLDivElement>());

  return (
    <>
      <div className="mx-auto h-max w-screen justify-center space-y-1 md:w-2/3">
        {teams.map((team, i) => (
          <div key={team.name}>
            <TeamRankBox
              key={team.name}
              rank={i}
              team={team}
              handleClickAction={(teamName: string) => {
                // refs[i].current?.showModal();
              }}
            />
          </div>
        ))}
      </div>

      {/* {teams.map((team, i) => ( */}
      {/*   <TeamBoard */}
      {/*     key={i} */}
      {/*     ref={refs[i]} */}
      {/*     name={team.name} */}
      {/*     members={team.members} */}
      {/*   /> */}
      {/* ))} */}
    </>
  );
};
