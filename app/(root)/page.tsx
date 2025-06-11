import { redirect } from "next/navigation";

const Home = async () => {
  redirect("/leaderboard/tournamentId/2");
};

export default Home;
