import { createContext } from '#/trpc';
import { appRouter } from '#/trpc/routes';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

export default async function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/trpc',
    req,
    router: appRouter,
    createContext,
  });
}
