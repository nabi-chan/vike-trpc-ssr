import { trpc } from '#/trpc/trpc.client';

export function Page() {
  const { data } = trpc.greet.useQuery('world');

  return <div>{data?.greeting}</div>;
}
