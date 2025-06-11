import { Navbar } from "@/components/Navbar";
// import { CalendarIcon } from "@heroicons/react/24/outline";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col h-dvh w-dvw bg-neutral">
      <Navbar />
      {children}
    </main>
  );
}
