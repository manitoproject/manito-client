import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import ToastProvier from '@/components/common/toast';
import ReactHelmet from '@/helmet';
import { enableMocking } from '@/mocks/browser';
import router from '@/router';
import global from '@/styles/global';
import theme from '@/styles/theme';

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 0 } },
});

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <HelmetProvider>
        <ReactHelmet />
        <ThemeProvider theme={theme}>
          <Global styles={global} />
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router()} />
            <ToastProvier />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </React.StrictMode>,
  );
});
