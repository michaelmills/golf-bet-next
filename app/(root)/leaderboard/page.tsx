import { getLeaderboard } from "@/lib/actions/leaderboard.action";
import { Leaderboard } from "../../../components/Leaderboard";

const Home = async () => {
  const teams = await getLeaderboard();

  return (
    <>
      <div className="relative w-full h-2/5 bg-cover bg-no-repeat">
        <div className="bg-[url(/balboa-golf-course.jpg)] absolute w-full h-full bg-cover bg-no-repeat brightness-90 blur-[1px]"></div>
        <div className="text-center w-full h-full relative">
          <p className="text-primary-content text-4xl font-semibold py-5">
            Leaderboard
          </p>
          <div className="backdrop-blur-xl m-auto w-2/3 py-2 mb-2 rounded-xl">
            <div className="text-sm font-regular text-primary-content">
              {/* <CalendarIcon className="size-6 mr-2 inline-block" /> */}
              <span className="text-lg font-black">PGA Championship</span>
              <br />
              May 15 - 18, 2025
              <br />
              Quail Hollow Club
            </div>
          </div>
        </div>
      </div>
      <Leaderboard teams={teams} />
    </>
  );
};

export default Home;
