import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';

import { getProfileInfoStats } from '../_actions';

export function useGetProfileInfo({ session }: { session: Session | null }) {
  const { data } = useQuery({
    queryKey: ['profile-info', session?.user?.email],
    queryFn: async () => {
      if (!session || !session.user) return null;
      const data = await getProfileInfoStats({ email: session.user.email! });
      return data;
    },
  });

  return { data };
}
