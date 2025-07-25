import { FlagIcon } from "@heroicons/react/24/solid";

const Rules = async () => {
  return (
    <div className="flex flex-col gap-10 mx-auto text-base-content">
      <div className="card mt-4 bg-base-100 w-96 lg:w-full shadow-sm">
        <div className="card-body">
          <h2 className="card-title uppercase">Draft</h2>
          <ul className="list-none lg:text-lg">
            <li className="-indent-6 pl-8 mb-4">
              <FlagIcon className="inline size-4 lg:size-5 mr-2 align-[-2px]" />
              Round buy in is $20.
            </li>
            <li className="-indent-6 pl-8 mb-4">
              <FlagIcon className="inline size-4 lg:size-5 mr-2 align-[-2px]" />
              Drafts are conducted as a snake draft, meaning the order reverses
              after each round until all teams are filled.
            </li>
            <li className="-indent-6 pl-8 mb-4">
              <FlagIcon className="inline size-4 lg:size-5 mr-2 align-[-2px]" />
              A player may only be drafted once.
            </li>
          </ul>
        </div>
      </div>
      <div className="card bg-base-100 w-96 lg:w-full shadow-sm">
        <div className="card-body">
          <h2 className="card-title uppercase">Game</h2>
          <ul className="list-none lg:text-lg">
            <li className="-indent-6 pl-8 mb-4">
              <FlagIcon className="inline size-4 lg:size-5 mr-2 align-[-2px]" />
              Cut player penalty is the ceiling of half the offical cut line and
              maxes out at +2.
              <br />
              &nbsp;i.e. Cut line of +7, results in a penalty of +4. Cut line of
              +1, results in a penalty of +2.
            </li>
            <li className="-indent-6 pl-8 mb-4">
              <FlagIcon className="inline size-4 lg:size-5 mr-2 align-[-2px]" />
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
