import { createBrowserRouter } from 'react-router-dom';

import AuthRouter from './auth-router';
import Index from './routes';
import Contact from './routes/contact';
import ErrorPage from './routes/error-page';
import Home from './routes/home';
import Join from './routes/join';
import KakaoRedirection from './routes/kakako_redirection';
import Layout from './routes/layout';
import My from './routes/my';
import MySetting from './routes/my-setting';
import Rename from './routes/rename';
import RollingDetail from './routes/rolling-detail';
import RollingNew from './routes/rolling-new';
import RollingSetup from './routes/rolling-setup';
import SetupIntro from './routes/setup-intro';

export const routes = {
  index: '/' as const,
  join: '/join' as const,
  home: '/home' as const,
  kakako_redirection: '/login/oauth/kakao/callback' as const,
  setupIntro: (content?: string) => `/intro/${content ?? ':content'}` as const,
  my: {
    default: '/my' as const,
    setting: () => `${routes.my.default}/setting` as const,
    rename: () => `${routes.my.setting()}/rename`,
    contact: () => `${routes.my.setting()}/contact`,
  },
  rolling: {
    default: '/rolling' as const,
    setup: () => `${routes.rolling.default}/setup` as const,
    detail: (id?: number) =>
      `${routes.rolling.default}/detail/${id ?? ':id'}` as const,
    new: () => `${routes.rolling.default}/new` as const,
  },
};

const router = () =>
  createBrowserRouter([
    {
      errorElement: <ErrorPage />,
      children: [
        {
          path: routes.index,
          element: <Index />,
        },
        {
          path: routes.kakako_redirection,
          element: <KakaoRedirection />,
        },
        {
          element: <AuthRouter />,
          children: [
            {
              element: <Layout />,
              children: [
                {
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
                      path: routes.my.default,
                      element: <My />,
                    },
                    {
                      path: routes.my.setting(),
                      element: <MySetting />,
                    },
                    {
                      path: routes.my.contact(),
                      element: <Contact />,
                    },
                    {
                      path: routes.my.rename(),
                      element: <Rename />,
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
                      path: routes.rolling.new(),
                      element: <RollingNew />,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          element: <Layout />,
          children: [
            {
              path: routes.rolling.detail(),
              element: <RollingDetail />,
            },
          ],
        },
      ],
    },
  ]);

export default router;
