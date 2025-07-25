"use client";

import { UserX } from "lucide-react";

export const TournamentInfo = (tournament: TournamentInfoProps) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="mb-1">
        {tournament.status.toLowerCase() === "official" && (
          <span className="align-middle w-min text-primary-content text-xs sm:text-sm md:text-base font-bold rounded-full bg-primary px-2 md:px-3">
            Official
          </span>
        )}
        {tournament.status.toLowerCase() === "in progress" && (
          <span className="align-middle w-min text-xs sm:text-sm md:text-base font-bold rounded-full bg-base-100 px-2 md:px-3 text-green-600/60 border border-base-300 shadow-lg shadow-base-300/50">
            Round {tournament.currentRound}
            <div className="ml-1 status status-success animate-ping"></div>
          </span>
        )}
        {tournament.status.toLowerCase() === "suspended" && (
          <span className="align-middle w-min text-xs sm:text-sm md:text-base font-bold rounded-full bg-base-100 px-2 md:px-3 text-rose-700/60 border border-base-300 shadow-lg shadow-base-300/50">
            Round {tournament.currentRound} suspended
            <div className="ml-1 status status-error animate-ping"></div>
          </span>
        )}
      </div>
      <div className="max-w-max text-center text-2xl/8 sm:text-3xl/10 md:text-4xl/16 font-black text-base-content">
        {tournament.name}
      </div>
      <div className="content-center text-xs sm:text-sm md:text-base text-left text-base-content/60">
        <div className="align-middle">{tournament.date}</div>
        <div className="align-middle">{tournament.course}</div>
        <div className="align-middle">Par {tournament.par}</div>
      </div>
      {tournament.cutLine && (
        <div className="w-1/3 md:w-1/5 mt-4">
          <div className="rounded-full bg-warning text-center content-center text-xs sm:text-sm md:text-base text-warning-content md:font-medium">
            <UserX className="inline size-4 md:size-5 mr-2" />
            <span className="align-middle">
              Cut Line&nbsp;{tournament.cutLine}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
