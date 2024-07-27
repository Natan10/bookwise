import { useQuery } from '@tanstack/react-query';

import { getLatestAvaliations } from '../_actions';

const key = 'main-stats-avaliations';

export function useGetAvaliations() {
  const { data, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () => await getLatestAvaliations(),
    refetchOnWindowFocus: true,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });

  return { data, isLoading };
}
