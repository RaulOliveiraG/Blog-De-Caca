interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // adicione outras variáveis de ambiente que você possa ter aqui
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}