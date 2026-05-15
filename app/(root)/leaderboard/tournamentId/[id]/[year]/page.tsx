import {
    fetchLeaderboard,
    fetchTournament,
} from "@/actions/leaderboard.action";
import { Leaderboard } from "@/components/Leaderboard";
import { fetchGameTeams } from "@/lib/actions/tournament.action";
import { getAdjustedScore, parseScore } from "@/lib/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const getTournament = async (tournId: string, year: number): Promise<TournamentInfoProps> => {
  const response = await fetchTournament(tournId, year);
  const data = await response.json();

  dayjs.extend(utc);
  const begin = dayjs(+data.date.start.$date.$numberLong)
    .utc()
    .format("MMMM D");
  const end = dayjs(+data.date.end.$date.$numberLong).utc().format("D, YYYY");

  const holePars: number[] = data.courses[0].holes.map((h: { holeId: number; par: string }) => Number(h.par));

  const info: TournamentInfoProps = {
    name: data.name,
    date: begin + " - " + end,
    course: data.courses[0].courseName,
    status: data.status,
    par: data.courses[0].parTotal,
    holePars,
  };
  return info;
};

const Tournament = async ({ params }: { params: Promise<{ id: string; year: string }> }) => {
  const { id, year: yearStr } = await params;
  const year = Number(yearStr);

  const [leaderboard, tournamentInfo, gameData] = await Promise.all([
    fetchLeaderboard(id, year).then((r) => r.json()),
    getTournament(id, year),
    fetchGameTeams(id, year),
  ]);

  if (gameData.error || !gameData.teams) {
    return <div className="p-8 text-error">Failed to load team data: {gameData.error}</div>;
  }

  tournamentInfo.currentRound = leaderboard.roundId.$numberInt;

  if (leaderboard.cutLines.length > 0) {
    tournamentInfo.cutLine = leaderboard.cutLines[0].cutScore;
  }

  tournamentInfo.cutPenalty = gameData.cutPenalty ?? 3;

  const teams: Team[] = gameData.teams.map((team) => {
      const members: TeamMember[] = leaderboard.leaderboardRows
        .filter((row: any) => team.golferIds.includes(row.playerId))
        .map((row: any) => {
          const currentRound = Number(row.currentRound.$numberInt);

          const rounds: Map<number, number> = new Map(
            row.rounds.map((round: any) => [
              Number(round.roundId.$numberInt),
              parseScore(round.scoreToPar),
            ]),
          );

          if (row.status === "active") {
            rounds.set(currentRound, parseScore(row.currentRoundScore));
          }

          return {
            playerId: row.playerId,
            name: row.firstName + " " + row.lastName,
            isCut: row.status === "cut",
            isActive: row.status === "active",
            score: parseScore(row.total),
            adjusted: row.status === "cut" ? (gameData.cutPenalty ?? 3) : parseScore(row.total),
            rounds,
            holeStart: row.startingHole.$numberInt,
            thru: row.currentHole.$numberInt,
            currentRound,
            currentRoundScore: row.currentRoundScore,
          };
        });

      const score = members.reduce((acc: number, player: any) => {
        return acc + getAdjustedScore(player);
      }, 0);

      return {
        name: team.playerName,
        score,
        members,
        memberCount: members.length,
        cutMemberCount: members.filter((x: TeamMember) => x.isCut).length,
        activeMemberCount: members.filter((x: TeamMember) => x.isActive).length,
      };
    });

  const sorted = teams.sort((p1, p2) => p1.score - p2.score);

  return (
    <>
      {tournamentInfo && (
        <Leaderboard teams={sorted} holePars={tournamentInfo.holePars} tournamentInfo={tournamentInfo} tournId={id} year={year} />
      )}
    </>
  );
};

export default Tournament;
