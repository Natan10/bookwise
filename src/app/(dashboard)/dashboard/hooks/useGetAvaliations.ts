import { useQuery } from '@tanstack/react-query';

import { getLatestAvaliations } from '../_actions';

const key = 'main-stats-avaliations';

export function useGetAvaliations() {
  const { data, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const data = await getLatestAvaliations();
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return { data, isLoading };
}
