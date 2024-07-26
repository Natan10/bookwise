import { ReactNode } from 'react';

import { NavigationSidebar } from '@/components/navigation-sidebar';
import { Redirect } from '@/components/redirect';
import { QueryProvider } from '@/contexts/query-context';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <main className="flex h-full bg-gray-800">
        <NavigationSidebar />
        <section className="flex-1 overflow-y-auto">{children}</section>
      </main>
      <Redirect protectedRoutes={['profile']} />
    </QueryProvider>
  );
}
