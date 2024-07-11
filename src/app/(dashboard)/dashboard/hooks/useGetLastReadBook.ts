import { Session } from "next-auth";
import { useQuery } from "@tanstack/react-query";

import { getLastBookRead } from "../_actions";

type UseGetLastReadBookProps = {
  session: Session | null;
};

const key = "main-stats-last-read";

export function useGetLastReadBook({ session }: UseGetLastReadBookProps) {
  const { data, isLoading } = useQuery({
    queryKey: [key, session?.user?.email],
    queryFn: async () => {
      if (!session || !session.user) return null;
      const data = await getLastBookRead({ email: session?.user.email! });
      return data;
    },
    enabled: !!session,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return { data, isLoading };
}
