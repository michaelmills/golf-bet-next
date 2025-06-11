"use client";

import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="navbar text-neutral-content bg-linear-to-r from-neutral from-20% via-base-content via-60% to-accent to-95% shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
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
                    href="/leaderboard/tournamentId/2"
                    onClick={() =>
                      (document.activeElement as HTMLElement).blur()
                    }
                  >
                    US Open 2025
                  </Link>
                </li>
                <li>
                  <Link
                    href="/leaderboard/tournamentId/1"
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
                href="/leaderboard/tournamentId/2"
                onClick={() => (document.activeElement as HTMLElement).blur()}
                className="link link-hover"
              >
                US Open 2025
              </Link>
              <a></a>
            </li>
            <li>
              <Link
                href="/leaderboard/tournamentId/1"
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
      <div className="navbar-end"></div>
    </div>
  );
};
