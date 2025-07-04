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
        <div className="modal-box rounded-3xl text-base-content">
          <div className="font-semibold text-lg underline underline-offset-8 text-center mb-2">
            {name}
          </div>
          <div className="overflow-x-auto">
            <table className="table table-auto table-zebra table-sm table-pin-cols">
              <thead>
                <tr className="font-bold text-center">
                  <th className="text-left">Player</th>
                  <th>R1</th>
                  <th>R2</th>
                  <th>R3</th>
                  <th>R4</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr
                    key={member.name}
                    className="font-regular text-center text-base"
                  >
                    <th className="text-left">{member.name}</th>
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
