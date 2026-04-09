"use client";

import clsx from "clsx";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { fetchTournaments, TournamentEntry } from "@/lib/actions/tournament.action";

const groupByYear = (tournaments: TournamentEntry[]): [number, TournamentEntry[]][] => {
  const map = new Map<number, TournamentEntry[]>();
  for (const t of tournaments) {
    if (!map.has(t.year)) map.set(t.year, []);
    map.get(t.year)!.push(t);
  }
  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
};

export const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [tournaments, setTournaments] = useState<TournamentEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    fetchTournaments().then((r) => {
      if (r.tournaments) setTournaments(r.tournaments);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const controlNav = () => {
      let currentScrollPos = window.scrollY;
      if (prevScrollPos < currentScrollPos && currentScrollPos > 15) {
        setVisible(false);
      } else if (currentScrollPos < 15) {
        setVisible(true);
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", controlNav);
    return () => window.removeEventListener("scroll", controlNav);
  }, []);

  const tournamentHref = (t: TournamentEntry) =>
    `/leaderboard/tournamentId/${t.id}/${t.year}`;

  const isActiveTournament = (t: TournamentEntry) =>
    pathname === tournamentHref(t);

  const isRulesActive = pathname === "/rules";

  const grouped = groupByYear(tournaments);

  const TournamentSkeleton = () => (
    <div className="space-y-2 px-3 py-1">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-4 animate-pulse rounded bg-white/10" />
      ))}
    </div>
  );

  const DesktopTournamentList = () => (
    <>
      {loading ? (
        <TournamentSkeleton />
      ) : (
        grouped.map(([year, ts]) => (
          <div key={year}>
            {grouped.length > 1 && (
              <li className="menu-title px-3 py-1 text-xs opacity-50">{year}</li>
            )}
            {ts.map((t) => (
              <li key={`${t.id}-${t.year}`}>
                <Link
                  href={tournamentHref(t)}
                  onClick={() => (document.activeElement as HTMLElement).blur()}
                  className={clsx("link link-hover", {
                    "border-b-2 border-emerald-400 font-semibold text-emerald-300": isActiveTournament(t),
                  })}
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </div>
        ))
      )}
    </>
  );

  const MobileTournamentList = () => (
    <>
      {loading ? (
        <TournamentSkeleton />
      ) : (
        grouped.map(([year, ts]) => (
          <div key={year}>
            {grouped.length > 1 && (
              <li className="menu-title px-3 py-1 text-xs opacity-50">{year}</li>
            )}
            {ts.map((t) => (
              <li key={`${t.id}-${t.year}`}>
                <Link
                  href={tournamentHref(t)}
                  onClick={() => (document.activeElement as HTMLElement).blur()}
                  className={clsx({
                    "font-semibold text-emerald-400": isActiveTournament(t),
                  })}
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </div>
        ))
      )}
    </>
  );

  return (
    <div
      id="navbar"
      className={clsx(
        "fixed navbar h-10 min-h-0 z-100",
        "bg-emerald-900/80 backdrop-blur-md",
        "border-b border-white/10 shadow-lg",
        "text-neutral-content transition-transform duration-300 lg:h-14",
        {
          "ease-out": visible,
          "ease-in": !visible,
          "-translate-y-full": !visible,
          "translate-y-0": visible,
        },
      )}
    >
      {/* Mobile: hamburger left, logo center, theme right */}
      <div className="navbar-start lg:hidden">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-square"
          >
            <Menu />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu z-1 mt-3 w-max menu-lg rounded-box border border-white/10 bg-emerald-950 p-2 shadow-lg"
          >
            <li>
              <Link
                href="/rules"
                onClick={() => (document.activeElement as HTMLElement).blur()}
                className={clsx("opacity-70 hover:opacity-100", {
                  "!opacity-100 font-semibold text-emerald-400": isRulesActive,
                })}
              >
                Rules
              </Link>
            </li>
            <li>
              <p>Leaderboard</p>
              <ul className="p-2">
                <MobileTournamentList />
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-center lg:hidden">
        <Link href="/" className="btn btn-ghost flex items-center gap-1.5 text-xl">
					<Image src="/icon.png" alt="MGC" width={20} height={20} />
          MGC
        </Link>
      </div>

      {/* Desktop: logo left, nav center, theme right */}
      <div className="navbar-start hidden lg:flex">
        <Link href="/" className="btn btn-ghost flex items-center gap-2 lg:text-2xl">
					<Image src="/icon.png" alt="MGC" width={24} height={24} />
					MGC
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <div className="dropdown-hover dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn rounded-field btn-ghost lg:text-lg"
          >
            Leaderboard
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu z-1 w-52 rounded-box border border-white/10 bg-emerald-950 p-2 pt-4 shadow-lg lg:text-lg"
          >
            <DesktopTournamentList />
          </ul>
        </div>
        <Link
          href="/rules"
          className={clsx("btn rounded-field btn-ghost text-sm opacity-70 hover:opacity-100 lg:text-base", {
            "!opacity-100 font-bold": isRulesActive,
          })}
        >
          Rules
        </Link>
      </div>

      <div className="navbar-end">
        <ThemeToggle />
      </div>
    </div>
  );
};
