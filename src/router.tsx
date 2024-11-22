import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import ErrorPage from '@/pages/error-page';
import Home from '@/pages/home';
import KakaoRedirection from '@/pages/kakako-redirection';
import Landing from '@/pages/landing';
import Layout from '@/pages/layout';
import CakeDecorate from '@/pages/makecake/decorate';
import CakeDetail from '@/pages/makecake/detail';
import CakeListPage from '@/pages/makecake/list';
import CakeMessageCreate from '@/pages/makecake/message-create';
import CakeMessageEdit from '@/pages/makecake/message-edit';
import CakeSetup from '@/pages/makecake/setup';
import Contact from '@/pages/my/contact';
import My from '@/pages/my/my';
import MySetting from '@/pages/my/my-setting';
import Rename from '@/pages/my/rename';
import RollingpaperDetail from '@/pages/rollingpaper/detail';
import RollingpaperList from '@/pages/rollingpaper/list';
import RollingpaperMessageCreate from '@/pages/rollingpaper/message-create';
import RollingpaperMessageEdit from '@/pages/rollingpaper/message-edit';
import RollingpaperSetup from '@/pages/rollingpaper/setup';
import SetupIntro from '@/pages/setup-intro';
import Signup from '@/pages/signup';
import routes from '@/routes';

const router = () =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorPage />}>
        <Route path="/" element={<Landing />} />
        <Route path={routes.kakakoRedirection} element={<KakaoRedirection />} />
        <Route element={<Layout />}>
          <Route path={routes.signup} element={<Signup />} />
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.my.default} element={<My />} />
          <Route path={routes.my.setting()} element={<MySetting />} />
          <Route path={routes.my.contact()} element={<Contact />} />
          <Route path={routes.my.rename()} element={<Rename />} />
          <Route path={routes.setupIntro()} element={<SetupIntro />} />
          <Route
            path={routes.rollingpaper.list()}
            element={<RollingpaperList />}
          />
          <Route
            path={routes.rollingpaper.detail()}
            element={<RollingpaperDetail />}
          />
          <Route
            path={routes.rollingpaper.setup()}
            element={<RollingpaperSetup />}
          />
          <Route
            path={routes.rollingpaper.messageEdit()}
            element={<RollingpaperMessageEdit />}
          />
          <Route
            path={routes.rollingpaper.messageCreate()}
            element={<RollingpaperMessageCreate />}
          />
          <Route path={routes.makecake.setup()} element={<CakeSetup />} />
          <Route path={routes.makecake.list()} element={<CakeListPage />} />
          <Route path={routes.makecake.decorate()} element={<CakeDecorate />} />
          <Route
            path={routes.makecake.messageCreate()}
            element={<CakeMessageCreate />}
          />
          <Route
            path={routes.makecake.messageEdit()}
            element={<CakeMessageEdit />}
          />
          <Route path={routes.makecake.detail()} element={<CakeDetail />} />
        </Route>
      </Route>,
    ),
  );

export default router;
