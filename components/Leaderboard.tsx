"use client";

import { useState } from "react";
import { TeamRankBox } from "./TeamRankBox";
import { TournamentInfo } from "./TournamentInfo";
import { ChevronsDown, ChevronsUp } from "lucide-react";

interface LeaderboardProps {
  teams: Team[];
  holePars: number[];
  tournamentInfo: TournamentInfoProps;
  tournId: string;
  year: number;
}

export const Leaderboard = ({ teams, holePars, tournamentInfo, tournId, year }: LeaderboardProps) => {
  const [expanded, setExpanded] = useState<Map<string, boolean>>(new Map());

  const isExpanded = (name: string) => expanded.get(name) ?? false;
  const toggle = (name: string) =>
    setExpanded((prev) => new Map(prev).set(name, !prev.get(name)));
  const expandAll = () => setExpanded(new Map(teams.map((t) => [t.name, true])));
  const collapseAll = () => setExpanded(new Map(teams.map((t) => [t.name, false])));

  return (
    <>
      <div className="mx-auto my-1 h-min w-full rounded-lg border-1 border-base-300 bg-base-100 p-4 md:w-2/3 dark:bg-neutral">
        <TournamentInfo {...tournamentInfo} />
        <div className="mt-3 flex justify-end">
          <div className="inline-flex rounded-full border border-base-300 text-base-content/50">
            <button className="px-2 py-1 hover:text-base-content transition-colors" title="Expand all" onClick={expandAll}>
              <ChevronsDown className="size-4" />
            </button>
            <div className="w-px bg-base-300" />
            <button className="px-2 py-1 hover:text-base-content transition-colors" title="Collapse all" onClick={collapseAll}>
              <ChevronsUp className="size-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto h-max w-screen justify-center space-y-1 pb-24 md:w-2/3">
        {teams.map((team, i) => (
          <div key={team.name}>
            <TeamRankBox
              key={team.name}
              rank={i}
              team={team}
              holePars={holePars}
              visible={isExpanded(team.name)}
              tournId={tournId}
              year={year}
              handleClickAction={toggle}
            />
          </div>
        ))}
      </div>
    </>
  );
};
