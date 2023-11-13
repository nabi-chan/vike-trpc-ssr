interface ImportMetaEnv {
  readonly VITE_WSS_HOST: string;
  readonly VITE_TRPC_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
