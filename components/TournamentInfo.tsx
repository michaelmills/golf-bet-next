"use client";

import { UserX } from "lucide-react";

export const TournamentInfo = (tournament: TournamentInfoProps) => {
  const status = tournament.status.toLowerCase();

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      {/* Status badge */}
      <div>
        {status === "official" && (
          <span className="inline-flex w-min items-center rounded-full bg-success px-2 align-middle text-xs font-bold text-success-content sm:text-sm md:px-3 md:text-base">
            Official
          </span>
        )}
        {status === "in progress" && (
          <span className="inline-flex w-min items-center gap-1.5 rounded-full border border-base-300 bg-info px-2 align-middle text-xs font-bold text-success sm:text-sm md:px-3 md:text-base">
            Round {tournament.currentRound}
            <span className="status status-success animate-ping size-1.5" />
          </span>
        )}
        {status === "suspended" && (
          <span className="inline-flex w-min items-center gap-1.5 rounded-full border border-base-300 bg-error px-2 align-middle text-xs font-bold text-error-content sm:text-sm md:px-3 md:text-base">
            Round {tournament.currentRound} suspended
            <span className="status status-error animate-ping size-1.5" />
          </span>
        )}
      </div>

      {/* Tournament name */}
      <div className="text-2xl/8 font-black text-base-content sm:text-3xl/10 md:text-4xl/14">
        {tournament.name}
      </div>

      {/* Metadata pill */}
      <div className="inline-flex items-center gap-2 rounded-full border border-base-300 px-3 py-1 text-xs text-base-content/70 sm:text-sm">
        <span>{tournament.date}</span>
        <span className="opacity-40">·</span>
        <span>{tournament.course}</span>
      </div>

      {/* Par + cut line */}
      <div className="flex items-center gap-3 text-xs text-base-content/70 sm:text-sm">
        <span className="font-medium">Par {tournament.par}</span>
        {tournament.cutLine && (
          <span className="inline-flex items-center gap-1 rounded-full bg-warning px-2 py-0.5 font-medium text-warning-content">
            <UserX className="size-3" />
            Cut {tournament.cutLine}
          </span>
        )}
      </div>
    </div>
  );
};
