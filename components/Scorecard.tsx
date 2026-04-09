"use client";

import { useState } from "react";

interface ScorecardProps {
	isVisible: boolean;
	members: TeamMember[];
	holePars: number[];
}

// Shape + color coding per golf scorecard convention:
// Eagle+: double circle (ring), Birdie: circle, Par: subtle fill,
// Bogey: square (default), Double+: double square (ring)
const scoreCell = (score: number, par: number): string => {
	if (score === 0) return "";
	const diff = score - par;
	if (diff <= -2) return "rounded-full bg-amber-400 text-black ring-2 ring-amber-400 ring-offset-1";
	if (diff === -1) return "rounded-full bg-green-500 text-white";
	if (diff === 0) return "bg-base-200";
	if (diff === 1) return "bg-orange-400 text-white";
	if (diff >= 2) return "bg-red-600 text-white ring-2 ring-red-600 ring-offset-1";
	return "";
};

const relativeScore = (total: number, par: number): string => {
	const diff = total - par;
	if (diff === 0) return "E";
	return diff > 0 ? `+${diff}` : String(diff);
};

const totCellColor = (strokes: number, par: number): string => {
	if (strokes === 0) return "!bg-base-100 dark:bg-neutral";
	const diff = strokes - par;
	if (diff < 0) return "!bg-green-100 dark:!bg-green-900";
	if (diff > 0) return "!bg-red-100 dark:!bg-red-900";
	return "!bg-base-100 dark:bg-neutral";
};

export const Scorecard = ({ isVisible, members, holePars }: ScorecardProps) => {
	const parFront9 = holePars.slice(0, 9).reduce((a, b) => a + b, 0);
	const parBack9 = holePars.slice(9, 18).reduce((a, b) => a + b, 0);
	const total18 = parFront9 + parBack9;

	const availableRounds = [...members[0].scorecard.keys()].sort((a, b) => a - b);
	const [selectedRound, setSelectedRound] = useState(members[0].currentRound);

	const hasActiveMembers = members.some((m) => m.isActive);

	const teamRoundScore = (round: number): string => {
		const total = members.reduce((acc, m) => {
			const holes = m.scorecard.get(round);
			if (holes) {
				const strokes = holes.filter((s) => s > 0).reduce((a, b) => a + b, 0);
				const par = holes.reduce((a, s, i) => a + (s > 0 ? holePars[i] : 0), 0);
				return acc + (strokes - par);
			}
			return acc;
		}, 0);
		if (total === 0) return "E";
		return total > 0 ? `+${total}` : String(total);
	};

	return (
		<div className={`${isVisible ? "" : "hidden"} p-2`}>
			<div role="tablist" className="tabs tabs-border mb-3">
				{availableRounds.map((r) => {
					const score = teamRoundScore(r);
					const isLive = r === members[0].currentRound && hasActiveMembers;
					return (
						<button
							key={r}
							role="tab"
							className={`tab gap-1.5 ${selectedRound === r ? "tab-active" : ""}`}
							onClick={() => setSelectedRound(r)}
						>
							R{r}
							<span className="text-xs opacity-60">({score})</span>
							{isLive && (
								<span className="status status-success animate-ping size-1.5" />
							)}
						</button>
					);
				})}
			</div>
			<div className="overflow-x-auto">
				<table className="table-pin-cols table table-zebra table-xs">
					<thead>
						<tr>
							<th className="bg-base-100 dark:bg-neutral">Hole</th>
							{Array.from({ length: 9 }, (_, i) => (
								<td key={i + 1} className="text-center">{i + 1}</td>
							))}
							<td className="border-x border-base-300 bg-base-200/50 text-center font-bold">Out</td>
							{Array.from({ length: 9 }, (_, i) => (
								<td key={i + 10} className="text-center">{i + 10}</td>
							))}
							<td className="border-x border-base-300 bg-base-200/50 text-center font-bold">In</td>
							<th className="bg-base-100 dark:bg-neutral">Tot</th>
						</tr>
						<tr>
							<th className="bg-base-100 dark:bg-neutral">Par</th>
							{holePars.slice(0, 9).map((par, i) => (
								<td key={i} className="text-center">{par}</td>
							))}
							<td className="border-x border-base-300 bg-base-200/50 text-center font-bold">{parFront9}</td>
							{holePars.slice(9, 18).map((par, i) => (
								<td key={i + 9} className="text-center">{par}</td>
							))}
							<td className="border-x border-base-300 bg-base-200/50 text-center font-bold">{parBack9}</td>
							<th className="bg-base-100 dark:bg-neutral">{total18}</th>
						</tr>
					</thead>
					<tbody>
						{members.map((member) => {
							const holes = member.scorecard.get(selectedRound) ?? Array(18).fill(0);
							const front9 = holes.slice(0, 9);
							const back9 = holes.slice(9, 18);

							const outStrokes = front9.filter((s) => s > 0).reduce((a, b) => a + b, 0);
							const innStrokes = back9.filter((s) => s > 0).reduce((a, b) => a + b, 0);
							const playedFront = front9.some((s) => s > 0);
							const playedBack = back9.some((s) => s > 0);
							const playedParFront = front9.reduce((acc, s, i) => acc + (s > 0 ? holePars[i] : 0), 0);
							const playedParBack = back9.reduce((acc, s, i) => acc + (s > 0 ? holePars[i + 9] : 0), 0);

							// Thru indicator: show a right border after the last completed hole
							// for the active player in the current live round
							const isLiveRound = selectedRound === member.currentRound && member.isActive;
							const thruHole = isLiveRound ? Number(member.thru) : null;

							return (
								<tr key={member.name}>
									{/* #7 — name column with status badge */}
									<th className="bg-base-100 dark:bg-neutral">
										<div className="flex items-center gap-1">
											<span className="text-xs">{member.name}</span>
											{member.isCut && (
												<span className="badge badge-error badge-xs shrink-0">CUT</span>
											)}
											{member.isActive && (
												<span className="status status-success animate-ping size-1.5 shrink-0" />
											)}
										</div>
									</th>

									{/* Front 9 */}
									{front9.map((score, i) => {
										const holeNum = i + 1;
										const isThru = thruHole === holeNum;
										return (
											<td key={i} className={`text-center ${isThru ? "border-r-2 border-r-primary/60" : ""}`}>
												{score === 0 ? (
													<span className="opacity-25">·</span>
												) : (
													<span className={`inline-flex size-6 items-center justify-center text-xs ${scoreCell(score, holePars[i])}`}>
														{score}
													</span>
												)}
											</td>
										);
									})}

									<td className="border-x border-base-300 bg-base-200/50 text-center font-bold">
										{playedFront ? (
											<>
												<div>{outStrokes}</div>
												<div className="text-xs font-normal opacity-60">{relativeScore(outStrokes, playedParFront)}</div>
											</>
										) : "-"}
									</td>

									{/* Back 9 */}
									{back9.map((score, i) => {
										const holeNum = i + 10;
										const isThru = thruHole === holeNum;
										return (
											<td key={i + 9} className={`text-center ${isThru ? "border-r-2 border-r-primary/60" : ""}`}>
												{score === 0 ? (
													<span className="opacity-25">·</span>
												) : (
													<span className={`inline-flex size-6 items-center justify-center text-xs ${scoreCell(score, holePars[i + 9])}`}>
														{score}
													</span>
												)}
											</td>
										);
									})}

									<td className="border-x border-base-300 bg-base-200/50 text-center font-bold">
										{playedBack ? (
											<>
												<div>{innStrokes}</div>
												<div className="text-xs font-normal opacity-60">{relativeScore(innStrokes, playedParBack)}</div>
											</>
										) : "-"}
									</td>

									<th className={`text-center ${totCellColor(outStrokes + innStrokes, playedParFront + playedParBack)}`}>
										{playedFront || playedBack ? (
											<>
												<div>{outStrokes + innStrokes}</div>
												<div className="text-xs font-normal opacity-60">{relativeScore(outStrokes + innStrokes, playedParFront + playedParBack)}</div>
											</>
										) : "-"}
									</th>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
