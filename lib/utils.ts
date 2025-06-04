export function getAdjustedScore(player: TeamMember): number {
  return player.isCut ? player.adjusted : player.score;
}

export function parseScore(score: string): number {
  return score === "E" ? 0 : Number(score);
}

export function toDisplayScore(score: number | undefined): string {
  if (score === undefined) return "-";
  else if (score === 0) return "E";
  else if (score > 0) return "+" + score;
  else return String(score);
}

export function getTotalRoundScore(
  round: number,
  golfers: TeamMember[],
): number {
  return golfers.reduce((acc, golfer) => {
    return acc + (golfer.rounds.has(round) ? golfer.rounds.get(round) : 0);
  }, 0);
}
