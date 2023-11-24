[<img src="https://vike.dev/vike-readme.svg" align="right" height="90">](https://vike.dev)

## Integration of Vike with TRPC and React Query

To run this example:

```bash
# clone repository
git clone git@github.com:nabi-chan/vike-trpc-ssr
cd vike-trpc-ssr

# with pnpm
pnpm install
pnpm run dev

# or with npm
npm install
npm run dev
```

## Prefetch (SSR)

You can use `helpers.greet.prefetch` method for prefetching data.

See [pages/index/index.page.server.ts](./src/pages/index/index.page.server.ts).

```ts
import { helpers } from '#/trpc/trpc.server';

export async function onBeforeRender() {
  await helpers.greet.prefetch('world');
}
```

## WebSocket

> [!WARNING]
> Due to vercel limitations, WebSocket is not available in vercel deployment.
> If you use WebSocket on Vercel deployment, Page will be crashed.

Also, you can use WebSocket with `trpc.useSubscription`

See [pages/subscription/index.page.tsx](./src/pages/subscription/index.page.tsx).

```tsx
import { trpc } from '#/trpc/trpc.client';
import { useState } from 'react';

export function Page() {
  const [count, setCount] = useState(0);

  trpc.greetWs.useSubscription('world', {
    onData: () => setCount((c) => c + 1),
  });

  return <div>{count}</div>;
}
```

## Vercel deployment

You can deploy this example to vercel.

See https://vike-trpc-ssr.vercel.app

```bash
vercel . --prod
```

## Recommend documents

- **[trpc docs](https://trpc.io/docs)**
- **[tanstack query docs](https://tanstack.com/query/latest/docs)**
- **[vike docs](https://vike.dev)**
