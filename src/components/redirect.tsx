'use client';

import { useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';

type RedirectProps = {
  protectedRoutes: string[];
};

export function Redirect({ protectedRoutes }: RedirectProps) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const endOfPath = pathname.split('/');
  const path = endOfPath[endOfPath.length - 1];

  if (!session && protectedRoutes.includes(path)) {
    redirect('/login');
  }

  return null;
}
