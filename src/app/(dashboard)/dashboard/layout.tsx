import { ReactNode } from "react";
import { NavigationSidebar } from "@/components/navigation-sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="h-full p-5 flex bg-gray-800">
      <NavigationSidebar />
      <section className="flex-1">{children}</section>
    </main>
  );
}
