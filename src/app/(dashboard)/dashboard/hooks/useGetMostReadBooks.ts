import { useQuery } from '@tanstack/react-query';
import { getPopularBooks } from '../_actions';

const key = 'main-stats-read-books';

export function useGetMostReadBooks() {
  const { data, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const response = await getPopularBooks();
      return response;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return { data, isLoading };
}
