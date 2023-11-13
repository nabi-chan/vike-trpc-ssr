import { PageShell } from '#/components/pageShell/PageShell';
import { trpc } from '#/trpc/trpc.client';
import { PageContextClient } from '#/types/types';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWSClient, httpBatchLink, loggerLink, splitLink, wsLink } from '@trpc/react-query';
import { createRoot, hydrateRoot, type Root } from 'react-dom/client';

let root: Root;

const queryClient = new QueryClient();
const wsClient = createWSClient({
  url: `wss://${import.meta.env.VITE_WSS_HOST}`,
});
const trpcClient = trpc.createClient({
  links: [
    loggerLink(),
    splitLink({
      condition: (op) => op.type === 'subscription',
      true: wsLink({ client: wsClient }),
      false: httpBatchLink({ url: `https://${import.meta.env.VITE_TRPC_HOST}/trpc` }),
    }),
  ],
});

export async function render(pageContext: PageContextClient) {
  const { Page, pageProps, trpcState } = pageContext;

  if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined');

  const container = document.getElementById('root');
  if (!container) throw new Error('DOM element #root not found');

  const page = (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={trpcState}>
          <PageShell pageContext={pageContext}>
            <Page {...pageProps} />
          </PageShell>
        </Hydrate>
      </QueryClientProvider>
    </trpc.Provider>
  );

  if (pageContext.isHydration) {
    root = hydrateRoot(container, page);
  } else {
    if (!root) {
      root = createRoot(container);
    }
    root.render(page);
  }
}

export const clientRouting = true;

export const hydrationCanBeAborted = true;
