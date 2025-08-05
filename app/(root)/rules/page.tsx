import { FlagIcon } from "@heroicons/react/24/solid";

const Rules = async () => {
  return (
    <div className="mx-auto flex flex-col gap-10 text-base-content">
      <div className="card mt-4 w-96 bg-base-100 shadow-sm lg:w-full">
        <div className="card-body">
          <h2 className="card-title uppercase">Draft</h2>
          <ul className="list-none lg:text-lg">
            <li className="mb-4 pl-8 -indent-6">
              <FlagIcon className="mr-2 inline size-4 align-[-2px] lg:size-5" />
              Round buy in is $20.
            </li>
            <li className="mb-4 pl-8 -indent-6">
              <FlagIcon className="mr-2 inline size-4 align-[-2px] lg:size-5" />
              Drafts are conducted as a snake draft, meaning the order reverses
              after each round until all teams are filled.
            </li>
            <li className="mb-4 pl-8 -indent-6">
              <FlagIcon className="mr-2 inline size-4 align-[-2px] lg:size-5" />
              A player may only be drafted once.
            </li>
          </ul>
        </div>
      </div>
      <div className="card w-96 bg-base-100 shadow-sm lg:w-full">
        <div className="card-body">
          <h2 className="card-title uppercase">Game</h2>
          <ul className="list-none lg:text-lg">
            <li className="mb-4 pl-8 -indent-6">
              <FlagIcon className="mr-2 inline size-4 align-[-2px] lg:size-5" />
              Cut player penalty is the ceiling of half the offical cut line and
              maxes out at +2.
              <br />
              &nbsp;i.e. Cut line of +7, results in a penalty of +4. Cut line of
              +1, results in a penalty of +2.
            </li>
            <li className="mb-4 pl-8 -indent-6">
              <FlagIcon className="mr-2 inline size-4 align-[-2px] lg:size-5" />
              Team with the lowest total score at the end of the tournament
              wins.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Rules;
