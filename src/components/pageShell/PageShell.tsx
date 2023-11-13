import React from 'react';
import { PageContextProvider } from '#/contexts/usePageContext/PageContextProvider';
import type { PageContext } from '#/types/types';
import '#/components/pageShell/PageShell.css';

export function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>{children}</PageContextProvider>
    </React.StrictMode>
  );
}
