/// <reference types="vite/client" />
/// <reference types="@emotion/react/types/css-prop" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_CLIENT_ID: string;
  readonly VITE_CLIENT_URL: string;
  readonly VITE_KAKAO_REDIRECT_PATH: string;
  readonly VITE_KAKAO_JAVASCRIPT_KEY: string;
  readonly VITE_SERVER_URL: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_DISCORD_WEBHOOK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
