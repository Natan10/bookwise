import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';

import { getProfileInfoStats } from '../_actions';

export function useGetProfileInfo({ session }: { session: Session | null }) {
  const { data } = useQuery({
    queryKey: ['profile-info', session?.user?.email],
    queryFn: async () => {
      const [data, err] = await getProfileInfoStats();
      if (err) throw err;
      return data;
    },
  });

  return { data };
}
