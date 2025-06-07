import { getLeaderboard } from "@/lib/actions/leaderboard.action";
import { Leaderboard } from "../../components/Leaderboard";
import { Leaderboard2 } from "../../components/Leaderboard2";

const Home = async () => {
  const teams = await getLeaderboard();

  return (
    <>
      {/* <div className="sm:w-1/2 m-auto h-2/5"></div> */}
      <Leaderboard2 teams={teams} />
      <div className="hidden">
        <Leaderboard teams={teams} />
      </div>
    </>
  );
};

export default Home;
