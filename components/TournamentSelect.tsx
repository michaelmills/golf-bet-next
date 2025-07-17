export const TournamentSelect = () => {
  return (
    <div className="w-full h-max pl-4">
      <div className="my-2">
        <button
          className="btn rounded-xl px-4 mr-4 text-sm"
          popoverTarget="year-popover"
          style={{ anchorName: "--year-anchor" } as React.CSSProperties}
        >
          2025
          <ChevronDown size={20} />
        </button>

        <ul
          className="dropdown menu w-max rounded-box bg-base-100 shadow-sm text-base-content"
          popover="auto"
          id="year-popover"
          style={{ positionAnchor: "--year-anchor" } as React.CSSProperties}
        >
          <li className="text-base-content text-sm">
            <Link href="/rules">2025</Link>
          </li>
        </ul>
        <button
          className="btn rounded-xl px-4 text-sm"
          popoverTarget="tournament-popover"
          style={
            {
              anchorName: "--tournament-anchor",
            } as React.CSSProperties
          }
        >
          Tournaments
          <ChevronDown size={20} />
        </button>

        <ul
          className="dropdown menu w-max rounded-box bg-base-100 shadow-sm text-base-content"
          popover="auto"
          id="tournament-popover"
          style={
            {
              positionAnchor: "--tournament-anchor",
            } as React.CSSProperties
          }
        >
          <li className="text-base-content text-sm">
            <a>PGA Championship</a>
            <a>U.S. Open</a>
            <a>The Open</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
