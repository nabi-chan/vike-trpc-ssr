import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loggerLink, splitLink } from '@trpc/client';
import ReactDOMServer from 'react-dom/server';
import { dangerouslySkipEscape, escapeInject } from 'vike/server';
import ws from 'ws';
import favicon from '#/assets/favicon.svg';
import { PageContextServer } from '#/types/types';
import { trpc } from '#/trpc/trpc.client';
import { PageShell } from '#/components/pageShell/PageShell';
import { helpers } from '#/trpc/trpc.server';
import { VITE_TRPC_HOST, VITE_WSS_HOST } from '#/constants/env';
import { httpBatchLink, wsLink } from '#/trpc/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
globalThis.WebSocket = ws as any;

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    loggerLink(),
    splitLink({
      condition: (op) => op.type === 'subscription',
      true: wsLink({ url: `wss://${VITE_WSS_HOST}` }),
      false: httpBatchLink({ url: `https://${VITE_TRPC_HOST}/trpc` }),
    }),
  ],
});

export const passToClient = ['pageProps', 'routeParams', 'trpcState'];

export async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext;
  const trpcState = helpers.dehydrate();

  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined');

  const pageHtml = ReactDOMServer.renderToString(
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={trpcState}>
          <PageShell pageContext={pageContext}>
            <Page {...pageProps} />
          </PageShell>
        </Hydrate>
      </QueryClientProvider>
    </trpc.Provider>,
  );

  const { documentProps } = pageContext.exports;
  const title = (documentProps && documentProps.title) || 'vike-trpc-ssr';
  const desc = (documentProps && documentProps.description) || 'trpc ssr with vike';

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${favicon}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      trpcState,
    },
  };
}
