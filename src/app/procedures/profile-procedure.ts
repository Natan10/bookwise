import { createServerActionProcedure } from 'zsa';

import { authProcedure } from './auth-procedure';

export const profileDataProcedure = createServerActionProcedure(authProcedure).handler(
  ({ ctx }) => {
    const { session } = ctx;
    return {
      email: session.user!.email!,
    };
  },
);
