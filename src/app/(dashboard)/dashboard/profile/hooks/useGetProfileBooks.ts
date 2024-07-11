import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

import { getProfileBooks } from "../_actions";

export function useGetProfileBooks({ session }: { session: Session | null }) {
  const { data, isLoading } = useQuery({
    queryKey: ["profile-books", session?.user?.email],
    queryFn: async () => {
      if (!session || !session.user) return null;
      const data = await getProfileBooks({ email: session.user.email! });
      return data;
    },
    enabled: !!session?.user,
  });

  return { data, isLoading };
}
