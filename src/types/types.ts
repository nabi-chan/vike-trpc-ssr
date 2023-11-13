import { DehydratedState } from '@tanstack/react-query';

export type {
  PageContextServer,
  PageContextClientWithServerRouting as PageContextClient,
  PageContextWithServerRouting as PageContext,
} from 'vike/types';
export type { PageProps };

declare global {
  namespace Vike {
    interface PageContext {
      Page: Page;
      trpcState: DehydratedState;
      pageProps?: {
        [key: string]: unknown;
      };
      urlPathname: string;
      exports: {
        documentProps?: {
          title?: string;
          description?: string;
        };
      };
    }
  }
}

type Page = (pageProps: PageProps) => React.ReactElement;
type PageProps = Record<string, unknown>;
