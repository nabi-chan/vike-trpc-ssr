import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '#/trpc/routes';

export const trpc = createTRPCReact<AppRouter>({
  abortOnUnmount: true,
});
