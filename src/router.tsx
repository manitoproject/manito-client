import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from './error-page';
import Index from './routes';
import Home from './routes/home';
import Join from './routes/join';
import KakaoRedirection from './routes/kakako_redirection';
import Layout from './routes/layout';
import My from './routes/my';
import RollingDetail from './routes/rolling-detail';
import RollingNew from './routes/rolling-new';
import RollingSetup from './routes/rolling-setup';
import SetupIntro from './routes/setup-intro';

export const routes = {
  index: '/' as const,
  join: '/join' as const,
  home: '/home' as const,
  my: '/my' as const,
  kakako_redirection: '/login/oauth/kakao/callback' as const,
  setupIntro: (content?: string) => `/intro/${content ?? ':content'}` as const,
  rolling: {
    default: '/rolling' as const,
    setup: () => `${routes.rolling.default}/setup` as const,
    detail: (id?: string) =>
      `${routes.rolling.default}/detail/${id ?? ':id'}` as const,
    new: () => `${routes.rolling.default}/new` as const,
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
              path: routes.my,
              element: <My />,
            },
            {
              path: routes.setupIntro(),
              element: <SetupIntro />,
            },
            {
              path: routes.rolling.setup(),
              element: <RollingSetup />,
            },
            {
              path: routes.rolling.detail(),
              element: <RollingDetail />,
            },
            {
              path: routes.rolling.new(),
              element: <RollingNew />,
            },
            {
              path: routes.kakako_redirection,
              element: <KakaoRedirection />,
            },
          ],
        },
      ],
    },
  ]);

export default router;
