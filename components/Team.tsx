"use client";

import { getAdjustedScore, toDisplayScore } from "@/lib/utils";

interface TeamBoardProps {
  id: string;
  members: TeamMember[];
}

export const Team = ({ id, members }: TeamBoardProps) => {
  return (
    <dialog id={id} className="modal">
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
      <div className="modal-box">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th className="hidden sm:table-cell">R1</th>
                <th className="hidden sm:table-cell">R2</th>
                <th className="hidden sm:table-cell">R3</th>
                <th className="hidden sm:table-cell">R4</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.name}>
                  <th>{member.name}</th>
                  <td className="hidden sm:table-cell">
                    {toDisplayScore(member.rounds.get(1))}
                  </td>
                  <td className="hidden sm:table-cell">
                    {toDisplayScore(member.rounds.get(2))}
                  </td>
                  <td className="hidden sm:table-cell">
                    {toDisplayScore(member.rounds.get(3))}
                  </td>
                  <td className="hidden sm:table-cell">
                    {toDisplayScore(member.rounds.get(4))}
                  </td>
                  <td>{toDisplayScore(getAdjustedScore(member))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  );
};
