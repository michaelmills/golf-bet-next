"use client";

import { getAdjustedScore, toDisplayScore } from "@/lib/utils";
import { forwardRef } from "react";

interface TeamBoardProps {
  name: string;
  members: TeamMember[];
}

export const TeamBoard = forwardRef<HTMLDialogElement, TeamBoardProps>(
  ({ name, members }: TeamBoardProps, ref) => {
    return (
      <dialog ref={ref} className="modal">
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
        <div className="modal-box rounded-3xl text-base-content lg:max-w-[700px]">
          <div className="font-semibold text-lg lg:text-xl underline underline-offset-8 text-center mb-2">
            {name}
          </div>
          <div className="overflow-x-auto">
            <table className="table table-auto table-zebra table-sm lg:table-lg table-pin-cols">
              <thead>
                <tr className="font-bold text-center lg:text-lg">
                  <th className="text-left">Player</th>
                  <td>Thru</td>
                  <td>Start</td>
                  <td>R1</td>
                  <td>R2</td>
                  <td>R3</td>
                  <td>R4</td>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr
                    key={member.name}
                    className={`font-regular text-center text-base ${member.isActive && "text-green-700"} ${member.isCut && "text-rose-600"}`}
                  >
                    <th className="text-left">{member.name}</th>
                    <td>{member.isActive ? member.thru : "-"}</td>
                    <td>{member.isActive ? member.holeStart : "-"}</td>
                    <td>{toDisplayScore(member.rounds.get(1))}</td>
                    <td>{toDisplayScore(member.rounds.get(2))}</td>
                    <td>{toDisplayScore(member.rounds.get(3))}</td>
                    <td>{toDisplayScore(member.rounds.get(4))}</td>
                    <th>{toDisplayScore(getAdjustedScore(member))}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    );
  },
);
