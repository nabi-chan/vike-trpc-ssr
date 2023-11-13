import { helpers } from '#/trpc/trpc.server';

export async function onBeforeRender() {
  await helpers.greet.prefetch('world');
}
