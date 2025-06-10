import { redirect } from "next/navigation";
import bg from "../../public/wave.svg";
import bgStackVertical from "../../public/stacked-waves-haikei-vertical-light.svg";
import balboaGolfCourse from "../../public/balboa-golf-course.jpg";
import { Navbar } from "@/components/Navbar";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col h-dvh w-dvw bg-neutral">
      <Navbar />
      <div className="relative w-full h-2/5 bg-cover bg-no-repeat">
        <div className="bg-[url(/balboa-golf-course.jpg)] absolute w-full h-full bg-cover bg-no-repeat brightness-90 blur-[1px]"></div>
        {/* <input */}
        {/*   type="checkbox" */}
        {/*   value="synthwave" */}
        {/*   className="toggle theme-controller" */}
        {/* /> */}
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
      {children}
    </main>
  );
}
