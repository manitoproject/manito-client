import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { enableMocking } from './mocks/browser';
import router from './router';
import global from './styles/global';
import theme from './styles/theme';

const queryClient = new QueryClient();

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Global styles={global} />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router()} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>,
  );
});
