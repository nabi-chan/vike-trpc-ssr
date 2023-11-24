import { PageShell } from '#/components/pageShell/PageShell';
import { httpBatchLink, loggerLink, wsLink } from '#/trpc/link';
import { trpc } from '#/trpc/trpc.client';
import { PageContextClient } from '#/types/types';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { splitLink } from '@trpc/client';
import { createRoot, hydrateRoot, type Root } from 'react-dom/client';

let root: Root;

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    loggerLink(),
    splitLink({
      condition: (op) => op.type === 'subscription',
      true: wsLink({ url: `wss://${window.location.host}` }),
      false: httpBatchLink({ url: `https://${window.location.host}/trpc` }),
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
