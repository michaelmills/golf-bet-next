"use client";

import game from "../teams.json";
import data from "../data.json";
import {
  getAdjustedScore,
  parseScore,
  toDisplayScore,
  getTotalRoundScore,
} from "@/lib/utils";
import { Team } from "./Team";

interface LeaderboardProps {
  teams: Team[];
}

export const Leaderboard = ({ teams }: LeaderboardProps) => {
  return (
    <div className="md:w-2/3 justify-center items-center w-screen my-10 mx-auto">
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <div className="hidden">
          <div className="table table-auto w-full">
            <div className="table-header-group">
              <div className="table-cell text-left">Pos</div>
              <div className="table-cell text-left">Name</div>
              <div className="table-cell text-left">R1</div>
              <div className="table-cell text-left">R2</div>
              <div className="table-cell text-left">R3</div>
              <div className="table-cell text-left">R4</div>
              <div className="table-cell text-left">Total</div>
            </div>
            <div className="table-row-group">
              {teams.map((team, i) => (
                <div key={team.name} className="table-row">
                  <div className="table-cell">{i + 1}</div>
                  <div className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{team.name}</div>
                      </div>
                    </div>
                  </div>
                  <div className="table-cell">
                    {toDisplayScore(getTotalRoundScore(1, team.members))}
                  </div>
                  <div className="table-cell">
                    {toDisplayScore(getTotalRoundScore(2, team.members))}
                  </div>
                  <div className="table-cell">
                    {toDisplayScore(getTotalRoundScore(3, team.members))}
                  </div>
                  <div className="table-cell">
                    {toDisplayScore(getTotalRoundScore(4, team.members))}
                  </div>
                  <div className="table-cell">{toDisplayScore(team.score)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Name</th>
              <th className="hidden sm:table-cell">R1</th>
              <th className="hidden sm:table-cell">R2</th>
              <th className="hidden sm:table-cell">R3</th>
              <th className="hidden sm:table-cell">R4</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, i) => (
              <tr
                key={team.name}
                className="hover:bg-base-300"
                onClick={() =>
                  document.getElementById(team.name + "-board").showModal()
                }
              >
                <td className="w-10">{i + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{team.name}</div>
                    </div>
                  </div>
                </td>
                <td className="hidden sm:table-cell">
                  {toDisplayScore(getTotalRoundScore(1, team.members))}
                </td>
                <td className="hidden sm:table-cell">
                  {toDisplayScore(getTotalRoundScore(2, team.members))}
                </td>
                <td className="hidden sm:table-cell">
                  {toDisplayScore(getTotalRoundScore(3, team.members))}
                </td>
                <td className="hidden sm:table-cell">
                  {toDisplayScore(getTotalRoundScore(4, team.members))}
                </td>
                <td>{toDisplayScore(team.score)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {teams.map((team) => (
        <Team
          key={team.name + "-board"}
          id={team.name + "-board"}
          members={team.members}
        />
      ))}
    </div>
  );
};
