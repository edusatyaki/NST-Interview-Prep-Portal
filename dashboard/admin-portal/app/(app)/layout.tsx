import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex">
      <Sidebar />
      <Topbar />
      <main className="flex-1 md:ml-[260px] pt-16 md:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
