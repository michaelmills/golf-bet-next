import { Navbar } from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Major Golf Championship",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-dvh w-dvw flex-col bg-base-200">
      <Navbar />
      {/* <div className="no-scrollbar overflow-y-auto pb-3">{children}</div> */}
      <div className="pt-10 lg:pt-14">{children}</div>
    </main>
  );
}
