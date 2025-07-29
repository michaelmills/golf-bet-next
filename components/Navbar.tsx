"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <div className="navbar min-h-0 h-10 md:h-14 text-neutral-content bg-linear-to-r from-emerald-700 from-10% to-emerald-950 to-80%">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost px-2 lg:hidden"
          >
            <Menu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content bg-neutral rounded-box z-1 mt-3 w-max p-2 shadow"
          >
            <li>
              <Link
                href="/rules"
                onClick={() => (document.activeElement as HTMLElement).blur()}
              >
                Rules
              </Link>
              <p>Leaderboard</p>
              <ul className="p-2">
                <li>
                  <Link
                    href="/leaderboard/tournamentId/100"
                    onClick={() =>
                      (document.activeElement as HTMLElement).blur()
                    }
                  >
                    The Open Championship 2025
                  </Link>
                </li>
                <li>
                  <Link
                    href="/leaderboard/tournamentId/026"
                    onClick={() =>
                      (document.activeElement as HTMLElement).blur()
                    }
                  >
                    US Open 2025
                  </Link>
                </li>
                <li>
                  <Link
                    href="/leaderboard/tournamentId/033"
                    onClick={() =>
                      (document.activeElement as HTMLElement).blur()
                    }
                  >
                    PGA Championship 2025
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl lg:text-2xl">
          MGC
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <div className="dropdown dropdown-hover dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost rounded-field lg:text-lg"
          >
            Leaderboard
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content lg:text-lg bg-neutral rounded-box z-1 w-52 p-2 pt-4 shadow-sm"
          >
            <li>
              <Link
                href="/leaderboard/tournamentId/100"
                onClick={() => (document.activeElement as HTMLElement).blur()}
                className="link link-hover"
              >
                The Open Championship 2025
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard/tournamentId/026"
                onClick={() => (document.activeElement as HTMLElement).blur()}
                className="link link-hover"
              >
                US Open 2025
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard/tournamentId/033"
                onClick={() => (document.activeElement as HTMLElement).blur()}
                className="link link-hover"
              >
                PGA Championship 2025
              </Link>
            </li>
          </ul>
        </div>
        <Link href="/rules" className="btn btn-ghost rounded-field lg:text-lg">
          Rules
        </Link>
      </div>
      <div className="navbar-end">
        <ThemeToggle />
      </div>
    </div>
  );
};
