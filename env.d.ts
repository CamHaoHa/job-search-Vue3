/// <reference types="vite/client" />
//this syntax is used to reference a type declaration file for the vite development server's client - side APi
interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
//
