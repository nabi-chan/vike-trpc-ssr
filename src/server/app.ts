import express from 'express';
import compression from 'compression';
import { renderPage } from 'vike/server';
import { root } from './root';
import config from 'vite.config';
import { appRouter } from '#/trpc/routes';
import { createContext } from '#/trpc';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

const isProduction = process.env.NODE_ENV === 'production';

export async function createApp({ certificate }: { certificate?: string }) {
  const app = express();

  app.use(compression());

  if (isProduction) {
    const sirv = (await import('sirv')).default;
    app.use(sirv(`${root}/dist/client`));
  } else {
    const vite = await import('vite');
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: {
          middlewareMode: true,
          https: {
            key: certificate,
            cert: certificate,
          },
        },
        resolve: {
          alias: config.resolve?.alias,
        },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  app.get('*', async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) {
      return next();
    } else {
      const { body, statusCode, headers, earlyHints } = httpResponse;
      if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
      headers.forEach(([name, value]) => res.setHeader(name, value));
      res.status(statusCode);
      res.send(body);
    }
  });

  return app;
}
