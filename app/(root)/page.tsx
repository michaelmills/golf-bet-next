import { redirect } from "next/navigation";
import { fetchTournaments } from "@/lib/actions/tournament.action";

const Home = async () => {
  const { tournaments } = await fetchTournaments();
  const latest = tournaments?.[0];
  redirect(latest ? `/leaderboard/tournamentId/${latest.id}/${latest.year}` : "/leaderboard/tournamentId/100/2025");
};

export default Home;
