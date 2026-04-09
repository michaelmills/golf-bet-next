import {
    fetchLeaderboard,
    fetchTournament,
} from "@/actions/leaderboard.action";
import { Leaderboard } from "@/components/Leaderboard";
import { TournamentInfo } from "@/components/TournamentInfo";
import { fetchGameTeams } from "@/lib/actions/tournament.action";
import { getAdjustedScore, parseScore } from "@/lib/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { fetchScorecard } from "@/actions/scorecard.action";

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

  const teams: Team[] = await Promise.all(gameData.teams
    .map(async (team) => {
      const members = await Promise.all(leaderboard.leaderboardRows
        .filter((row: any) => team.golferIds.includes(row.playerId))
        .map(async (row: any) => {
          const scorecardResponse = await fetchScorecard(id, year, row.playerId);
          const scorecardData = await scorecardResponse.json();

          const scorecard: Map<number, number[]> = new Map(
            scorecardData
              .filter((r: any) => Object.keys(r.holes).length > 0)
              .map((r: any) => [
                Number(r.roundId.$numberInt),
                Array.from({ length: 18 }, (_, i) =>
                  Number(r.holes?.[String(i + 1)]?.holeScore?.$numberInt ?? 0)
                ),
              ])
          );

          const roundScores: Map<number, string> = new Map(
            scorecardData.map((r: any) => [
              Number(r.roundId.$numberInt),
              r.currentRoundScore as string,
            ])
          );

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

          const member: TeamMember = {
            name: row.firstName + " " + row.lastName,
            isCut: row.status === "cut",
            isActive: row.status === "active",
            score: parseScore(row.total),
            adjusted: row.status === "cut" ? 2 : Number(row.total),
            rounds,
            holeStart: row.startingHole.$numberInt,
            thru: row.currentHole.$numberInt,
            scorecard,
            roundScores,
            currentRound,
            currentRoundScore: row.currentRoundScore,
          };
          return member;
        }));

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
    }));

  const sorted = teams.sort((p1, p2) => p1.score - p2.score);

  return (
    <>
      {tournamentInfo && (
        <>
          <div className="mx-auto my-1 h-min w-full rounded-lg border-1 border-base-300 bg-base-100 p-4 md:w-2/3 dark:bg-neutral">
            <TournamentInfo {...tournamentInfo} />
          </div>
          <Leaderboard teams={sorted} holePars={tournamentInfo.holePars} />
        </>
      )}
    </>
  );
};

export default Tournament;
