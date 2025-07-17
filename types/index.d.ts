declare interface TeamMember {
  name: string;
  isCut: boolean;
  isActive: boolean;
  rounds: Map<number, number>;
  score: number;
  adjusted: number;
  holeStart: number;
  thru: number;
}

declare interface Round {
  number: number;
  score: number;
}

declare interface Team {
  name: string;
  score: number;
  members: TeamMember[];
  memberCount: number;
  cutMemberCount: number;
  activeMemberCount: number;
}

interface TournamentInfoProps {
  name: string;
  date: string;
  course: string;
  status: string;
  par: string;
  cutLine?: string;
}

interface MatchTournament {
  tournament: TournamentInfoProps;
  teams: Team[];
}
