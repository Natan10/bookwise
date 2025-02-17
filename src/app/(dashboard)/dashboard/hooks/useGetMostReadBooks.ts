import { useQuery } from '@tanstack/react-query';

import { getPopularBooks } from '../_actions';

const key = 'main-stats-read-books';

export function useGetMostReadBooks() {
  const { data, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const [data, err] = await getPopularBooks();
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
