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
      if (!session || !session.user) return null;
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      const data = await getLastBookRead({ email: session?.user.email! });
      return data;
    },
    enabled: !!session,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });

  return { data, isLoading };
}
