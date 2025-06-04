declare interface TeamMember {
  name: string;
  isCut: boolean;
  rounds: Map<number, number>;
  score: number;
  adjusted: number;
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
}
