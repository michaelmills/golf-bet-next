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
    <main className="flex flex-col h-dvh w-dvw bg-base-200">
      <div className="mb-1">
        <Navbar />
      </div>
      {children}
    </main>
  );
}
