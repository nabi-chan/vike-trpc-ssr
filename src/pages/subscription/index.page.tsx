import { trpc } from '#/trpc/trpc.client';
import { useState } from 'react';

export function Page() {
  const [count, setCount] = useState(0);

  trpc.greetWs.useSubscription('world', {
    onData: () => setCount((c) => c + 1),
  });

  return <div>{count}</div>;
}
