import { createServerSideHelpers } from '@trpc/react-query/server';
import { appRouter } from './routes';
import { createContext } from '.';

export const helpers = createServerSideHelpers({
  router: appRouter,
  ctx: createContext(),
});
