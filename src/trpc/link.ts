import { VITE_IS_VERCEL } from '#/constants/env';
import { loggerLink, wsLink as trpcWsLink, httpBatchLink as trpcHttpBatchLink, createWSClient } from '@trpc/client';
import ws from 'ws';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
globalThis.WebSocket = ws as any;

const vercelWsLink = () => () => {
  throw new Error("Can't use websocket in Vercel deployment");
};

export { loggerLink };
export const wsLink = ({ url }: { url: string }) =>
  VITE_IS_VERCEL ? trpcWsLink({ client: createWSClient({ url }) }) : vercelWsLink;
export const httpBatchLink = ({ url }: { url: string }) => trpcHttpBatchLink({ url });
