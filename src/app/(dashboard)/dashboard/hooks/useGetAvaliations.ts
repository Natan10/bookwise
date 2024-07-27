import { useQuery } from '@tanstack/react-query';

import { getLatestAvaliations } from '../_actions';

const key = 'main-stats-avaliations';

export function useGetAvaliations() {
  const { data, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const [data, err] = await getLatestAvaliations();
      if (err) throw err;
      return data;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });

  return { data, isLoading };
}
