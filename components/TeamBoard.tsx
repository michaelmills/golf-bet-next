"use client";

import { getAdjustedScore, toDisplayScore } from "@/lib/utils";

interface TeamBoardProps {
  id: string;
  name: string;
  members: TeamMember[];
}

export const TeamBoard = ({ id, name, members }: TeamBoardProps) => {
  return (
    <dialog id={id} className="modal">
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
      <div className="modal-box rounded-3xl">
        <div className="overflow-x-auto">
          <div className="font-bold text-xl underline underline-offset-8 text-center">
            {name}
          </div>
          <table className="table table-zebra">
            <thead>
              <tr className="font-bold text-lg">
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
                <tr key={member.name} className="font-semibold text-base">
                  <td className="">{member.name}</td>
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
