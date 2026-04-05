"use client";
// import { fetchScorecard } from "@/lib/actions/scorecard.action";
import data from "../data/scorecard.json";

interface ScorecardProps {
  isVisible: boolean;
  members: TeamMember[];
}

export const Scorecard = ({ isVisible, members }: ScorecardProps) => {
  // const response = awai fetchScorecard(100, 2025, 48081);
  // const data = await response.json();

  return (
    <div className={`${isVisible ? "" : "hidden"} p-2`}>
      Round {data[0].roundId.$numberInt} - Round Score{" "}
      {data[0].currentRoundScore}
      <div className="overflow-x-auto">
        <table className="table-pin-cols table table-zebra table-xs">
          <thead>
            <tr>
              <th>Hole</th>
              {Array(18)
                .fill(0)
                .map((_, i) => {
                  i++;
                  return <td key={"hole-" + i}>{i}</td>;
                })}
              <td key="total">Total</td>
            </tr>
            <tr>
              <th>Par</th>
              {Array(18)
                .fill(0)
                .map((_, i) => {
                  return <td key={"hole-par-" + i}>3</td>;
                })}
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.name}>
                <th>{member.name}</th>
                {Array(18)
                  .fill(0)
                  .map((_, i) => {
                    i++;
                    return (
                      <td key={i}>
                        {data[0].holes[String(i)].holeScore.$numberInt}
                      </td>
                    );
                  })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
