import { ReactNode } from "react";
import { NavigationSidebar } from "@/components/navigation-sidebar";
import { QueryProvider } from "@/contexts/query-context";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <main className="h-full flex bg-gray-800">
        <NavigationSidebar />
        <section className="flex-1 overflow-y-auto">{children}</section>
      </main>
    </QueryProvider>
  );
}
