"use client";

import {
  saveNewTournament,
  fetchGolfersForTournament,
  fetchSchedule,
  fetchPlayers,
  Golfer,
  GolferEntry,
  ScheduleEntry,
  Player,
} from "@/actions/tournament.action";
import { useEffect, useRef, useState } from "react";

const PLAYER_NAMES = [
  "Michael Mills",
  "Mauro Ormedilla",
  "Jon Yi",
  "Anthony Artuso",
  "Patrick Podue",
];

const GOLFERS_PER_PLAYER = 4;

const emptyEntries = (): GolferEntry[] =>
  PLAYER_NAMES.map((name) => ({
    playerName: name,
    golferIds: Array(GOLFERS_PER_PLAYER).fill(""),
  }));

const fuzzyMatch = (query: string, target: string): boolean => {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
};

// Reusable fuzzy combobox for player name
interface PlayerComboboxProps {
  value: string;
  players: Player[];
  onChange: (name: string) => void;
}

const PlayerCombobox = ({ value, players, onChange }: PlayerComboboxProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const suggestions = value.trim()
    ? players.filter((p) => fuzzyMatch(value, p.name))
    : players;

  const isNew = value.trim() && !players.some(
    (p) => p.name.toLowerCase() === value.trim().toLowerCase(),
  );

  return (
    <div className="relative grow" ref={ref}>
      <input
        type="text"
        placeholder="Player name"
        className="input input-bordered input-sm w-full font-medium"
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
      />
      {isNew && (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-success">
          new
        </span>
      )}
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-base-300 bg-base-100 shadow-lg dark:bg-neutral">
          {suggestions.map((p) => (
            <li
              key={p.id}
              className="cursor-pointer px-3 py-2 text-sm hover:bg-base-200 dark:hover:bg-base-300"
              onMouseDown={() => { onChange(p.name); setOpen(false); }}
            >
              {p.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function AdminPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [scheduleStatus, setScheduleStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");

  const [tournamentName, setTournamentName] = useState("");
  const [tournamentId, setTournamentId] = useState("");
  const [tournamentStartDate, setTournamentStartDate] = useState("");
  const [showTournSuggestions, setShowTournSuggestions] = useState(false);
  const tournComboRef = useRef<HTMLDivElement>(null);

  const [players, setPlayers] = useState<Player[]>([]);
  const [entries, setEntries] = useState<GolferEntry[]>(emptyEntries());
  const [golfers, setGolfers] = useState<Golfer[]>([]);
  const [loadStatus, setLoadStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");
  const [loadError, setLoadError] = useState("");

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [saveError, setSaveError] = useState("");

  // Fetch schedule + players on mount / year change
  useEffect(() => {
    if (!year || year < 2000) return;
    setScheduleStatus("loading");
    setSchedule([]);
    setTournamentName("");
    setTournamentId("");
    setTournamentStartDate("");
    setGolfers([]);
    setLoadStatus("idle");

    fetchSchedule(year).then((result) => {
      if (result.error || !result.schedule) {
        setScheduleStatus("error");
      } else {
        setSchedule(result.schedule);
        setScheduleStatus("loaded");
      }
    });
  }, [year]);

  useEffect(() => {
    fetchPlayers().then((result) => {
      if (result.players) setPlayers(result.players);
    });
  }, []);

  // Close tournament suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (tournComboRef.current && !tournComboRef.current.contains(e.target as Node)) {
        setShowTournSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const tournSuggestions = tournamentName.trim()
    ? schedule.filter((t) => fuzzyMatch(tournamentName, t.name))
    : schedule;

  const selectTournament = (t: ScheduleEntry) => {
    setTournamentName(t.name);
    setTournamentId(t.tournId);
    setTournamentStartDate(t.startDate);
    setShowTournSuggestions(false);
    setGolfers([]);
    setLoadStatus("idle");
    setEntries(emptyEntries());
  };

  const handleLoadGolfers = async () => {
    setLoadStatus("loading");
    setLoadError("");
    setGolfers([]);
    setEntries(emptyEntries());

    const result = await fetchGolfersForTournament(tournamentId, year);
    if (result.error || !result.golfers) {
      setLoadStatus("error");
      setLoadError(result.error ?? "Failed to fetch golfers");
    } else {
      setGolfers(result.golfers);
      setLoadStatus("loaded");
    }
  };

  const updateGolferId = (playerIndex: number, golferIndex: number, value: string) => {
    setEntries((prev) =>
      prev.map((entry, i) => {
        if (i !== playerIndex) return entry;
        const updated = [...entry.golferIds];
        updated[golferIndex] = value;
        return { ...entry, golferIds: updated };
      }),
    );
  };

  const updatePlayerName = (playerIndex: number, name: string) => {
    setEntries((prev) =>
      prev.map((entry, i) =>
        i === playerIndex ? { ...entry, playerName: name } : entry,
      ),
    );
  };

  const addPlayer = () => {
    setEntries((prev) => [
      ...prev,
      { playerName: "", golferIds: Array(GOLFERS_PER_PLAYER).fill("") },
    ]);
  };

  const removePlayer = (index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const pickedIds = (excludePlayer: number, excludeSlot: number): Set<string> => {
    const ids = new Set<string>();
    entries.forEach((entry, pi) =>
      entry.golferIds.forEach((id, gi) => {
        if (id && !(pi === excludePlayer && gi === excludeSlot)) ids.add(id);
      }),
    );
    return ids;
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    setSaveError("");
    const result = await saveNewTournament({
      tournamentId,
      tournamentName,
      tournamentYear: year,
      tournamentStartDate: tournamentStartDate || undefined,
      entries,
    });
    if (result.success) {
      setSaveStatus("success");
      // Refresh player list in case new players were created
      fetchPlayers().then((r) => { if (r.players) setPlayers(r.players); });
    } else {
      setSaveStatus("error");
      setSaveError(result.error ?? "Unknown error");
    }
  };

  const isValid =
    loadStatus === "loaded" &&
    tournamentId &&
    tournamentName.trim() &&
    entries.every(
      (e) =>
        e.playerName.trim() &&
        e.golferIds.filter((id) => id.trim()).length === GOLFERS_PER_PLAYER,
    );

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4">
      <h1 className="text-2xl font-black text-base-content">New Tournament</h1>

      {/* Tournament details */}
      <div className="rounded-lg border border-base-300 bg-base-100 p-4 dark:bg-neutral">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-base-content/60">
          Tournament
        </h2>
        <div className="grid grid-cols-2 gap-3">

          {/* Year */}
          <div className="col-span-2 sm:col-span-1">
            <label className="label text-xs">Year</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />
            {scheduleStatus === "loading" && (
              <p className="mt-1 flex items-center gap-1 text-xs text-base-content/50">
                <span className="loading loading-spinner loading-xs" /> Fetching schedule…
              </p>
            )}
            {scheduleStatus === "loaded" && (
              <p className="mt-1 text-xs text-base-content/50">
                {schedule.length} tournaments loaded
              </p>
            )}
          </div>

          {/* Tournament name — fuzzy combobox */}
          <div className="relative col-span-2" ref={tournComboRef}>
            <label className="label text-xs">
              Tournament Name
              {tournamentId && (
                <span className="ml-2 font-mono text-base-content/40">ID: {tournamentId}</span>
              )}
            </label>
            <input
              type="text"
              placeholder={scheduleStatus === "loaded" ? "Type to search…" : "Enter year first"}
              className="input input-bordered w-full"
              disabled={scheduleStatus !== "loaded"}
              value={tournamentName}
              onChange={(e) => {
                setTournamentName(e.target.value);
                setTournamentId("");
                setShowTournSuggestions(true);
                setGolfers([]);
                setLoadStatus("idle");
              }}
              onFocus={() => setShowTournSuggestions(true)}
            />
            {showTournSuggestions && tournSuggestions.length > 0 && (
              <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-base-300 bg-base-100 shadow-lg dark:bg-neutral">
                {tournSuggestions.map((t) => (
                  <li
                    key={t.tournId}
                    className="flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-base-200 dark:hover:bg-base-300"
                    onMouseDown={() => selectTournament(t)}
                  >
                    <span className="text-sm">{t.name}</span>
                    {t.startDate && (
                      <span className="ml-4 shrink-0 font-mono text-xs text-base-content/40">
                        {new Date(t.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Load golfers button */}
        <button
          className="btn btn-outline btn-sm mt-3 w-full"
          onClick={handleLoadGolfers}
          disabled={!tournamentId || loadStatus === "loading"}
        >
          {loadStatus === "loading" ? (
            <><span className="loading loading-spinner loading-xs" /> Loading golfers…</>
          ) : loadStatus === "loaded" ? (
            `${golfers.length} golfers loaded — reload`
          ) : (
            "Load Golfers"
          )}
        </button>
        {loadStatus === "error" && (
          <div className="alert alert-error mt-2 text-sm">{loadError}</div>
        )}
      </div>

      {/* Player entries */}
      {loadStatus === "loaded" && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-base-content/60">
            Players &amp; Picks
          </h2>
          {entries.map((entry, playerIndex) => (
            <div
              key={playerIndex}
              className="rounded-lg border border-base-300 bg-base-100 p-4 dark:bg-neutral"
            >
              <div className="mb-3 flex items-center gap-2">
                <PlayerCombobox
                  value={entry.playerName}
                  players={players}
                  onChange={(name) => updatePlayerName(playerIndex, name)}
                />
                <button
                  className="btn btn-ghost btn-sm text-error"
                  onClick={() => removePlayer(playerIndex)}
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {entry.golferIds.map((golferId, golferIndex) => {
                  const slotTaken = pickedIds(playerIndex, golferIndex);
                  return (
                    <div key={golferIndex}>
                      <label className="label text-xs opacity-50">
                        Golfer {golferIndex + 1}
                      </label>
                      <select
                        className="select select-bordered select-sm w-full"
                        value={golferId}
                        onChange={(e) =>
                          updateGolferId(playerIndex, golferIndex, e.target.value)
                        }
                      >
                        <option value="">— Select golfer —</option>
                        {golfers.map((g) => (
                          <option
                            key={g.id}
                            value={g.id}
                            disabled={slotTaken.has(g.id)}
                          >
                            {g.name}{slotTaken.has(g.id) ? " (picked)" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <button className="btn btn-outline btn-sm w-full" onClick={addPlayer}>
            + Add Player
          </button>
        </div>
      )}

      {/* Save status */}
      {saveStatus === "success" && (
        <div className="alert alert-success">Tournament saved successfully.</div>
      )}
      {saveStatus === "error" && (
        <div className="alert alert-error">{saveError}</div>
      )}

      {loadStatus === "loaded" && (
        <button
          className="btn btn-primary w-full"
          onClick={handleSave}
          disabled={!isValid || saveStatus === "saving"}
        >
          {saveStatus === "saving" ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Save Tournament"
          )}
        </button>
      )}
    </div>
  );
}
