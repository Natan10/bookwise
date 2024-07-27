import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';

import { getLastBookRead } from '../_actions';

type UseGetLastReadBookProps = {
  session: Session | null;
};

const key = 'main-stats-last-read';

export function useGetLastReadBook({ session }: UseGetLastReadBookProps) {
  const { data, isLoading } = useQuery({
    queryKey: [key, session?.user?.email],
    queryFn: async () => {
      const [data, err] = await getLastBookRead();
      if (err) throw err;
      return data;
    },
    enabled: !!session,
    refetchOnWindowFocus: true,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });

  return { data, isLoading };
}
