import { createBrowserRouter } from 'react-router-dom';

import routes from '@/routes';
import AuthGuard from '@/routes/auth-guard';
import CakeDecorate from '@/routes/cake/decorate';
import CakeForm from '@/routes/cake/form';
import CakeListPage from '@/routes/cake/list';
import CakeSetup from '@/routes/cake/setup';
import Contact from '@/routes/contact';
import ErrorPage from '@/routes/error-page';
import Home from '@/routes/home';
import KakaoRedirection from '@/routes/kakako-redirection';
import Landing from '@/routes/landing';
import Layout from '@/routes/layout';
import My from '@/routes/my';
import MySetting from '@/routes/my-setting';
import Rename from '@/routes/rename';
import RollingpaperDetail from '@/routes/rollingpaper/detail';
import RollingpaperForm from '@/routes/rollingpaper/form';
import RollingpaperList from '@/routes/rollingpaper/list';
import RollingpaperSetup from '@/routes/rollingpaper/setup';
import SetupIntro from '@/routes/setup-intro';
import Signup from '@/routes/signup';

const router = () =>
  createBrowserRouter([
    {
      errorElement: <ErrorPage />,
      children: [
        {
          path: routes.landing,
          element: <Landing />,
        },
        {
          path: routes.kakakoRedirection,
          element: <KakaoRedirection />,
        },
        {
          element: <AuthGuard />,
          children: [
            {
              element: <Layout />,
              children: [
                {
                  children: [
                    {
                      path: routes.signup,
                      element: <Signup />,
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
                      path: routes.rollingpaper.setup(),
                      element: <RollingpaperSetup />,
                    },
                    {
                      path: routes.rollingpaper.form(),
                      element: <RollingpaperForm />,
                    },
                    {
                      path: routes.cake.setup(),
                      element: <CakeSetup />,
                    },
                    {
                      path: routes.cake.list(),
                      element: <CakeListPage />,
                    },
                    {
                      path: routes.cake.decorate(),
                      element: <CakeDecorate />,
                    },
                    {
                      path: routes.cake.form(),
                      element: <CakeForm />,
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
              path: routes.rollingpaper.list(),
              element: <RollingpaperList />,
            },
            {
              path: routes.rollingpaper.detail(),
              element: <RollingpaperDetail />,
            },
          ],
        },
      ],
    },
  ]);

export default router;
