import { createApp } from '#/server/app';
import { appRouter } from '#/trpc/routes';
import { createContext } from '#/trpc';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { getCertificate } from '@vitejs/plugin-basic-ssl';
import { createServer } from 'https';
import { WebSocketServer } from 'ws';

startServer();

async function startServer() {
  const certificate = await getCertificate('node_modules/.vite');

  const app = await createApp({ certificate });
  const server = createServer({ key: certificate, cert: certificate }, app);
  const wss = new WebSocketServer({ server });

  applyWSSHandler({
    wss,
    router: appRouter,
    createContext,
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running at https://127.0.0.1:${port}`);
  });
}
