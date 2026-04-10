import { CheckCircle } from "lucide-react";

const Rules = async () => {
  return (
    <div className="mx-auto mt-4 flex max-w-2xl flex-col gap-4 px-4 text-base-content">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black">Rules</h1>
        <p className="text-sm text-base-content/60">How the game works</p>
      </div>

      <div className="card w-full bg-base-100 shadow-sm dark:bg-neutral">
        <div className="card-body gap-4">
          <h2 className="card-title uppercase">Draft</h2>
          <ul className="space-y-4 lg:text-lg">
            <li className="flex gap-3">
              <CheckCircle className="mt-0.5 shrink-0 size-5 text-emerald-500 lg:size-6" />
              <span>Round buy in is $20.</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="mt-0.5 shrink-0 size-5 text-emerald-500 lg:size-6" />
              <span>
                Drafts are conducted as a snake draft, meaning the order
                reverses after each round until all teams are filled.
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="mt-0.5 shrink-0 size-5 text-emerald-500 lg:size-6" />
              <span>A player may only be drafted once.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card bg-base-100 shadow-sm dark:bg-neutral">
        <div className="card-body gap-4">
          <h2 className="card-title uppercase">Game</h2>
          <ul className="space-y-4 lg:text-lg">
            <li className="flex gap-3">
              <CheckCircle className="mt-0.5 shrink-0 size-5 text-emerald-500 lg:size-6" />
              <span className="flex flex-col gap-2">
                <span>
                  Any golfer who misses the cut is assigned a fixed score of +3
                  for the remainder of the tournament. Their actual scorecard is
                  preserved but does not count toward the team total.
                </span>
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="mt-0.5 shrink-0 size-5 text-emerald-500 lg:size-6" />
              <span>
                Team with the lowest total score at the end of the tournament
                wins.
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="mt-0.5 shrink-0 size-5 text-emerald-500 lg:size-6" />
              <span>
                No trading is allowed.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Rules;
