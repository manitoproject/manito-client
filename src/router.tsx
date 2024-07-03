import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from './error-page';
import Index from './routes';
import Home from './routes/home';
import Join from './routes/join';
import Layout from './routes/layout';
import Rolling from './routes/rolling';
import RollingSetup from './routes/rolling-setup';

export const routes = {
  index: '/' as const,
  join: '/join' as const,
  home: '/home' as const,
  rolling: {
    default: '/rolling' as const,
    setup: () => `${routes.rolling.default}/setup` as const,
    detail: (id?: string) =>
      `${routes.rolling.default}/detail/${id ?? ':id'}` as const,
  },
};

const router = () =>
  createBrowserRouter([
    {
      path: routes.index,
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
              path: routes.join,
              element: <Join />,
            },
            {
              path: routes.home,
              element: <Home />,
            },
            {
              path: routes.rolling.setup(),
              element: <RollingSetup />,
            },
            {
              path: routes.rolling.detail(),
              element: <Rolling />,
            },
          ],
        },
      ],
    },
  ]);

export default router;
