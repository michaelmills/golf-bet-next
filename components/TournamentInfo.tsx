"use client";

import { UserX } from "lucide-react";

export const TournamentInfo = (tournament: TournamentInfoProps) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="max-w-max text-center text-2xl sm:text-3xl md:text-4xl font-black">
        {tournament.name}
        {tournament.status.toLowerCase() === "official" && (
          <span className="ml-3 align-middle w-min text-primary-content text-xs sm:text-sm md:text-base font-medium rounded-full bg-primary px-2 md:px-3">
            Official
          </span>
        )}
        {tournament.status.toLowerCase() === "In Progress" && (
          <span className="ml-3 align-middle w-min text-xs sm:text-sm md:text-base font-medium rounded-full bg-base-100 px-2 md:px-3 text-green-600/60 border border-base-300 shadow-lg shadow-base-300/50">
            Round 1
            <div className="ml-1 status status-success animate-ping"></div>
          </span>
        )}
      </div>
      {/* <span className="text-rose-700/60 text-xs border border-base-300 rounded-2xl bg-base-100 px-2 shadow-lg shadow-base-300/50"> */}
      {/*   Round 4 suspended */}
      {/*   <div className="ml-1 status status-error animate-ping"></div> */}
      {/* </span> */}
      <div className="content-center text-xs sm:text-sm md:text-base text-left text-base-content/60">
        {/* <CalendarDays size={16} className="inline mr-2" /> */}
        <span className="align-middle">{tournament.date}</span>
      </div>
      <div className="content-center text-xs sm:text-sm md:text-base text-left text-base-content/60">
        {/* <MapPin size={16} className="inline mr-2" /> */}
        <span className="align-middle">{tournament.course}</span>
      </div>
      <div className="content-center text-xs sm:text-sm md:text-base text-left text-base-content/60">
        {/* <Flag size={16} className="inline mr-2" /> */}
        <span className="align-middle">Par {tournament.par}</span>
      </div>
      {tournament.cutLine && (
        <div className="w-1/3 md:w-1/5 mt-4">
          <div className="rounded-full bg-warning text-center content-center text-sm sm:text-base md:text-lg text-base-content md:font-medium">
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
