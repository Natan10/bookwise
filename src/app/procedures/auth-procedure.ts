import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { createServerActionProcedure } from 'zsa';

import { authOptions } from '@/lib/auth-options';

export const authProcedure = createServerActionProcedure().handler(async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/login');
  }

  return {
    session,
  };
});
