const Rules = async () => {
  return (
    <div className="m-4">
      <p className="font-semibold text-xl underline mb-2">Draft Rules</p>
      <ul className="list-disc list-inside">
        <li>Round buy-in is $20</li>
        <li>
          Drafts are conducted as a snake draft, meaning the order reverses
          after each round.
        </li>
        <li>A player may only be drafted once</li>
      </ul>
      <br />
      <p className="font-semibold text-xl underline mb-2">Game Rules</p>
      <ul className="list-disc list-inside">
        <li>
          Total score of a golfer who misses the cut will be adjusted to +2
        </li>
        <li>
          Team with the lowest total score at the end of the tournament wins
        </li>
      </ul>
    </div>
  );
};

export default Rules;
