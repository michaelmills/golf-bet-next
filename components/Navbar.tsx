"use client";

import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="navbar bg-neutral shadow-sm">
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
            className="menu menu-lg dropdown-content bg-base-content rounded-box z-1 mt-3 w-max p-2 shadow"
          >
            <li>
              <Link href="/rules">Rules</Link>
              <p>Leaderboard</p>
              <ul className="p-2">
                <li>
                  <a>US Open 2025</a>
                </li>
                <li>
                  <a>PGA Championship 2025</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          MGC
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Leaderboard</summary>
              <ul className="p-2 bg-base-content z-1">
                <li>
                  <a>US Open 2025</a>
                </li>
                <li>
                  <a>PGA Championship 2025</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link href="/rules">Rules</Link>
          </li>
        </ul>
      </div>
      {/* <div className="navbar-end"> */}
      {/*   <a className="btn">Button</a> */}
      {/* </div> */}
    </div>
  );
};
