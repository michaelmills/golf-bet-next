import { getLeaderboard } from "@/lib/actions/leaderboard.action";
import { Leaderboard } from "../../components/Leaderboard";

const Home = async () => {
  const teams = await getLeaderboard();

  return (
    <>
      <Leaderboard teams={teams} />
    </>
  );
};

export default Home;
