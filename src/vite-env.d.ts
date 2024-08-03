/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_KAKAO_CLIENT_ID: string;
  readonly VITE_CLIENT_URL: string;
  readonly VITE_KAKAO_REDIRECT_PATH: string;
  readonly VITE_SERVER_URL: string;
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
