export const VITE_WSS_HOST = import.meta.env.VITE_WSS_HOST ?? import.meta.env.VITE_VERCEL_URL;
export const VITE_TRPC_HOST = import.meta.env.VITE_TRPC_HOST ?? import.meta.env.VITE_VERCEL_URL;

export const VITE_IS_VERCEL = import.meta.env.VITE_VERCEL !== undefined;
