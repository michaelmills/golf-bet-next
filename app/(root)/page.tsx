import { redirect } from "next/navigation";

const Home = async () => {
  redirect("/leaderboard/tournamentId/100");
};

export default Home;
