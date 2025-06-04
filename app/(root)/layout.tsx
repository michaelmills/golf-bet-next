import { redirect } from "next/navigation";
import bg from "../../public/wave.svg";
import bgStackVertical from "../../public/stacked-waves-haikei-vertical-light.svg";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const style = {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${bgStackVertical.src})`,
  };
  return (
    <main
      className="flex flex-col h-screen w-full bg-slate-900 overflow-hidden"
      style={style}
    >
      <div className="text-center">
        <h1 className="text-white text-2xl font-bold pt-5">
          The Opus Golf Championship
        </h1>
        <h2 className="text-white text-lg italic mb-5">
          * PGA Championship Edition *
        </h2>
      </div>
      {children}
    </main>
  );
}
