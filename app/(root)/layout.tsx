import { redirect } from "next/navigation";
import bg from "../../public/wave.svg";
import bgStackVertical from "../../public/stacked-waves-haikei-vertical-light.svg";
import balboaGolfCourse from "../../public/balboa-golf-course.jpg";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const style = {
    height: "100dvh",
    width: "100dvw",
    // backgroundImage: `url(${bgStackVertical.src})`,
    // backgroundImage: `url(${balboaGolfCourse.src})`,
  };
  return (
    <main className="flex flex-col h-dvh w-screen bg-base-100" style={style}>
      <div className="bg-[url(/balboa-golf-course.jpg)] brightness-85 w-screen h-2/5 bg-cover bg-no-repeat">
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold pt-5">
            The Opus Golf Championship
          </h1>
          <h2 className="text-white text-lg italic mb-5">
            * PGA Championship Edition *
          </h2>
          <div className="backdrop-blur-xl m-auto w-3/5 py-2 rounded-xl">
            <h2 className="text-2xl font-semibold">Leaderboard</h2>
          </div>
        </div>
      </div>
      {children}
    </main>
  );
}
