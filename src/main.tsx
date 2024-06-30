import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './error-page';
import { enableMocking } from './mocks/browser';
import Index from './routes';
import ContentHome from './routes/content-home';
import Home from './routes/home';
import Join from './routes/join';
import Layout from './routes/layout';
import RollingPaper from './routes/rolling-paper';
import global from './styles/global';
import theme from './styles/theme';

const queryClient = new QueryClient();

const router = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <Index />,
      errorElement: <ErrorPage />,
    },
    {
      element: <Layout />,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            {
              path: '/join',
              element: <Join />,
            },
            {
              path: '/home',
              element: <Home />,
            },
            {
              path: '/home/:content',
              element: <ContentHome />,
            },
            {
              path: '/rolling-paper/:id',
              element: <RollingPaper />,
            },
          ],
        },
      ],
    },
  ]);

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
