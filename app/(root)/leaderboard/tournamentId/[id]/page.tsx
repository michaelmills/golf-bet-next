import {
    fetchLeaderboard,
    fetchTournament,
} from "@/actions/leaderboard.action";
import { Leaderboard } from "@/components/Leaderboard";
import { TournamentInfo } from "@/components/TournamentInfo";
import matches from "@/data/matches.json";
import { getAdjustedScore, parseScore } from "@/lib/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const getTournament = async (tournId: string): Promise<TournamentInfoProps> => {
  const response = await fetchTournament(tournId);
  const data = await response.json();

  dayjs.extend(utc);
  const begin = dayjs(+data.date.start.$date.$numberLong)
    .utc()
    .format("MMMM D");
  const end = dayjs(+data.date.end.$date.$numberLong).utc().format("D, YYYY");

  const info: TournamentInfoProps = {
    name: data.name,
    date: begin + " - " + end,
    course: data.courses[0].courseName,
    status: data.status,
    par: data.courses[0].parTotal,
  };
  return Promise.resolve(info);
};

const Tournament = async ({ params }: { params: Promise<{ id: string }> }) => {
  let { id } = await params;

  const leaderboard = await (await fetchLeaderboard(id)).json();
  let tournamentInfo = await getTournament(id);

  tournamentInfo.currentRound = leaderboard.roundId.$numberInt;

  if (leaderboard.cutLines.length > 0) {
    tournamentInfo.cutLine = leaderboard.cutLines[0].cutScore;
  }

  const teams: Team[] = matches.games
    .find((g) => g.tournamentId === id)!
    .teams.map((team) => {
      const members = leaderboard.leaderboardRows
        .filter((row: any) => team.golfers.includes(row.playerId))
        .map((row: any) => {
          const rounds: Map<number, number> = new Map(
            row.rounds.map((round: any) => [
              Number(round.roundId.$numberInt),
              parseScore(round.scoreToPar),
            ]),
          );

          if (row.status === "active") {
            rounds.set(
              Number(row.currentRound.$numberInt),
              parseScore(row.currentRoundScore),
            );
          }

          const member: TeamMember = {
            name: row.firstName + " " + row.lastName,
            isCut: row.status === "cut",
            isActive: row.status === "active",
            score: parseScore(row.total),
            adjusted: row.status === "cut" ? 2 : Number(row.total),
            rounds: rounds,
            holeStart: row.startingHole.$numberInt,
            thru: row.currentHole.$numberInt,
          };
          return member;
        });

      const score = members.reduce((acc: number, player: any) => {
        return acc + getAdjustedScore(player);
      }, 0);

      return {
        name: team.player,
        score: score,
        members: members,
        memberCount: members.length,
        cutMemberCount: members.filter((x: TeamMember) => x.isCut).length,
        activeMemberCount: members.filter((x: TeamMember) => x.isActive).length,
      };
    });

  const sorted = teams.sort((p1, p2) => p1.score - p2.score);

  return (
    <>
      {tournamentInfo && (
        <>
          <div className="w-full md:w-2/3 h-min p-4 mb-1 mx-auto bg-base-100 rounded-lg">
            <TournamentInfo {...tournamentInfo} />
          </div>
          <Leaderboard teams={sorted} />
        </>
      )}
    </>
  );
};

export default Tournament;
