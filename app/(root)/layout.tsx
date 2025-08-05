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
    <main className="flex h-dvh w-dvw flex-col bg-base-200">
      <div className="">
        <Navbar />
      </div>
      {children}
    </main>
  );
}
