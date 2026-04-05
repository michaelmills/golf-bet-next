"use client";

import clsx from "clsx";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  const [visible, setVisible] = useState(true);

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

  return (
    <div
      id="navbar"
      className={clsx(
        "fixed navbar h-10 min-h-0 bg-linear-to-r from-emerald-700 from-10% to-emerald-950 to-80% text-neutral-content transition-transform duration-300 lg:h-14 z-100",
        {
          "ease-out": visible,
          "ease-in": !visible,
          "-translate-y-full": !visible,
          "translate-y-0": visible,
        },
      )}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn px-2 btn-ghost lg:hidden"
          >
            <Menu />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu z-1 mt-3 w-max menu-lg rounded-box bg-neutral p-2 shadow"
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
        <Link href="/" className="btn text-xl btn-ghost lg:text-2xl">
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
            className="dropdown-content menu z-1 w-52 rounded-box bg-neutral p-2 pt-4 shadow-sm lg:text-lg"
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
        <Link href="/rules" className="btn rounded-field btn-ghost lg:text-lg">
          Rules
        </Link>
      </div>
      <div className="navbar-end">
        <ThemeToggle />
        <></>
      </div>
    </div>
  );
};
