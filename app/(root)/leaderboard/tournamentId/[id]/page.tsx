import { getLeaderboard } from "@/lib/actions/leaderboard.action";
import { Leaderboard } from "../../../../../components/Leaderboard";

interface TournamentDetails {
  name: string;
  date: string;
  course: string;
}

const Tournament = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id);

  const pga: TournamentDetails = {
    name: "PGA Championship",
    date: "May 15 - 18, 2025",
    course: "Quail Hollow Club",
  };

  const usopen: TournamentDetails = {
    name: "US Open",
    date: "June 12 - 15, 2025",
    course: "Oakmont Country Club",
  };

  const tmap = new Map<string, TournamentDetails>([
    ["1", pga],
    ["2", usopen],
  ]);

  const teams = await getLeaderboard();

  return (
    <>
      {tmap.has(id) && (
        <>
          <div className="relative w-full h-2/5 md:h-1/5 bg-cover bg-no-repeat">
            <div className="bg-[url(/balboa-golf-course.jpg)] absolute w-full h-full bg-cover bg-no-repeat brightness-90 blur-[1px]"></div>
            <div className="text-center w-full h-full relative">
              <p className="text-primary-content text-3xl md:text-4xl font-semibold py-5">
                Leaderboard
              </p>
              <div className="backdrop-blur-xl m-auto w-2/3 md:w-[400px] py-2 mb-2 rounded-xl">
                <div className="text-sm md:text-lg font-regular text-primary-content">
                  {/* <CalendarIcon className="size-6 mr-2 inline-block" /> */}
                  <span className="text-lg md:text-xl font-black">
                    {tmap.get(id)!.name}
                  </span>
                  <br />
                  {tmap.get(id)!.date}
                  <br />
                  {tmap.get(id)!.course}
                </div>
              </div>
            </div>
          </div>
          <Leaderboard teams={teams} />
        </>
      )}
    </>
  );
};

export default Tournament;
