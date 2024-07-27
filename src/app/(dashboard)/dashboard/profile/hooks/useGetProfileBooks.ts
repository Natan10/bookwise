import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { getProfileBooks } from '../_actions';

export function useGetProfileBooks() {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ['profile-books', session?.user?.email],
    queryFn: async () => {
      const [data, err] = await getProfileBooks();
      if (err) throw err;
      return data;
    },
    enabled: !!session?.user,
  });

  return { data, isLoading };
}
