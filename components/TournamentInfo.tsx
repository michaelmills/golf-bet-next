"use client";

import { UserX } from "lucide-react";

export const TournamentInfo = (tournament: TournamentInfoProps) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="mb-1">
        {tournament.status.toLowerCase() === "official" && (
          <span className="w-min rounded-full bg-success px-2 align-middle text-xs font-bold text-primary-content sm:text-sm md:px-3 md:text-base">
            Official
          </span>
        )}
        {tournament.status.toLowerCase() === "in progress" && (
          <span className="w-min rounded-full border border-base-300 bg-info px-2 align-middle text-xs font-bold text-green-600/60 shadow-lg shadow-base-300/50 sm:text-sm md:px-3 md:text-base">
            Round {tournament.currentRound}
            <div className="ml-1 status animate-ping status-success"></div>
          </span>
        )}
        {tournament.status.toLowerCase() === "suspended" && (
          <span className="w-min rounded-full border border-base-300 bg-error px-2 align-middle text-xs font-bold text-rose-700/60 shadow-lg shadow-base-300/50 sm:text-sm md:px-3 md:text-base">
            Round {tournament.currentRound} suspended
            <div className="ml-1 status animate-ping status-error"></div>
          </span>
        )}
      </div>
      <div className="max-w-max text-center text-2xl/8 font-black text-base-content sm:text-3xl/10 md:text-4xl/16">
        {tournament.name}
      </div>
      <div className="content-center text-left text-xs text-base-content/70 sm:text-sm md:text-base">
        <div className="align-middle">{tournament.date}</div>
        <div className="align-middle">{tournament.course}</div>
        <div className="align-middle">Par {tournament.par}</div>
      </div>
      {tournament.cutLine && (
        <div className="mt-4 w-1/3 md:w-1/5">
          <div className="content-center rounded-full bg-warning text-center text-xs text-warning-content sm:text-sm md:text-base md:font-medium">
            <UserX className="mr-2 inline size-4 md:size-5" />
            <span className="align-middle">
              Cut Line&nbsp;{tournament.cutLine}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
