import { createBrowserRouter } from 'react-router-dom';

import AuthGuard from '@/pages/auth-guard';
import CakeDecorate from '@/pages/cake/decorate';
import CakeDetail from '@/pages/cake/detail';
import CakeForm from '@/pages/cake/form';
import CakeListPage from '@/pages/cake/list';
import CakeSetup from '@/pages/cake/setup';
import Contact from '@/pages/contact';
import ErrorPage from '@/pages/error-page';
import Home from '@/pages/home';
import KakaoRedirection from '@/pages/kakako-redirection';
import Landing from '@/pages/landing';
import Layout from '@/pages/layout';
import My from '@/pages/my';
import MySetting from '@/pages/my-setting';
import Rename from '@/pages/rename';
import RollingpaperDetail from '@/pages/rollingpaper/detail';
import RollingpaperList from '@/pages/rollingpaper/list';
import MessageEdit from '@/pages/rollingpaper/message-edit';
import MessageCreate from '@/pages/rollingpaper/messge-create';
import RollingpaperSetup from '@/pages/rollingpaper/setup';
import SetupIntro from '@/pages/setup-intro';
import Signup from '@/pages/signup';
import routes from '@/routes';

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
                      path: routes.rollingpaper.messageEdit(),
                      element: <MessageEdit />,
                    },
                    {
                      path: routes.rollingpaper.messageCreate(),
                      element: <MessageCreate />,
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
                    {
                      path: routes.cake.detail(),
                      element: <CakeDetail />,
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
