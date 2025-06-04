import { getLeaderboard } from "@/lib/actions/leaderboard.action";
import { Leaderboard } from "../components/Leaderboard";
import { Leaderboard2 } from "../components/Leaderboard2";

const Home = async () => {
  const teams = await getLeaderboard();

  return (
    <>
      <div className="sm:w-1/2 m-auto h-2/5">
        <div className="collapse collapse-plus bg-base-100 border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">Game rules</div>
          <div className="collapse-content text-sm">
            <p className="font-semibold text-md underline mb-2">Draft Rules</p>
            <ul className="list-disc list-inside">
              <li>Round buy-in is $20</li>
              <li>
                Drafts are conducted as a snake draft, meaning the order
                reverses after each round.
              </li>
              <li>A player may only be drafted once</li>
            </ul>
            <br />
            <p className="font-semibold text-md underline mb-2">Game Rules</p>
            <ul className="list-disc list-inside">
              <li>
                Total score of a golfer who misses the cut will be adjusted to
                +2
              </li>
              <li>
                Team with the lowest total score at the end of the tournament
                wins
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Leaderboard2 teams={teams} />
      <div className="hidden">
        <Leaderboard teams={teams} />
      </div>
    </>
  );
};

export default Home;
