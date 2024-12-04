import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import {
  authTokenLoader,
  privateGuardLoader,
  publicGuardLoader,
} from '@/loaders/loader';
import { queryClient } from '@/main';
import ErrorPage from '@/pages/error-page';
import Home from '@/pages/home';
import KakaoRedirection from '@/pages/kakako-redirection';
import Landing from '@/pages/landing';
import Layout from '@/pages/layout';
import MakeCakeDecorate from '@/pages/makecake/decorate';
import MakeCakeDetail from '@/pages/makecake/detail';
import MakeCakeList from '@/pages/makecake/list';
import MakeCakeCreateMessage from '@/pages/makecake/message-create';
import MakeCakeEditMessage from '@/pages/makecake/message-edit';
import MakeCakeSetup from '@/pages/makecake/setup';
import MyContact from '@/pages/my/contact';
import My from '@/pages/my/my';
import MySetting from '@/pages/my/my-setting';
import MyRename from '@/pages/my/rename';
import RollingpaperDetail from '@/pages/rollingpaper/detail';
import RollingpaperList from '@/pages/rollingpaper/list';
import RollingpaperCreateMessage from '@/pages/rollingpaper/message-create';
import RollingpaperEditMessage from '@/pages/rollingpaper/message-edit';
import RollingpaperSetup from '@/pages/rollingpaper/setup';
import SetupIntro from '@/pages/setup-intro';
import Signup from '@/pages/signup';
import TreasureBoxDetail from '@/pages/treasurebox/detail';
import TreasureBoxList from '@/pages/treasurebox/list';
import TreasureBoxCreateMessage from '@/pages/treasurebox/message-create';
import TreasureBoxEditMessage from '@/pages/treasurebox/message-edit';
import TreasureBoxSetup from '@/pages/treasurebox/setup';
import routes from '@/routes';

const router = () =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorPage />}>
        <Route path="/" element={<Landing />} />
        <Route
          path={routes.kakakoRedirection}
          element={<KakaoRedirection />}
          loader={authTokenLoader(queryClient)}
        />

        <Route element={<Layout />} loader={privateGuardLoader(queryClient)}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.my.default} element={<My />} />
          <Route path={routes.my.setting()} element={<MySetting />} />
          <Route path={routes.my.contact()} element={<MyContact />} />
          <Route path={routes.my.rename()} element={<MyRename />} />
          <Route path={routes.setupIntro()} element={<SetupIntro />} />
          <Route
            path={routes.rollingpaper.setup()}
            element={<RollingpaperSetup />}
          />
          <Route
            path={routes.rollingpaper.messageEdit()}
            element={<RollingpaperEditMessage />}
          />
          <Route
            path={routes.rollingpaper.messageCreate()}
            element={<RollingpaperCreateMessage />}
          />
          <Route path={routes.makecake.setup()} element={<MakeCakeSetup />} />
          <Route
            path={routes.makecake.decorate()}
            element={<MakeCakeDecorate />}
          />
          <Route
            path={routes.makecake.messageCreate()}
            element={<MakeCakeCreateMessage />}
          />
          <Route
            path={routes.makecake.messageEdit()}
            element={<MakeCakeEditMessage />}
          />
          <Route
            path={routes.treasurebox.setup()}
            element={<TreasureBoxSetup />}
          />
          <Route
            path={routes.treasurebox.messageCreate()}
            element={<TreasureBoxCreateMessage />}
          />
          <Route
            path={routes.treasurebox.messageEdit()}
            element={<TreasureBoxEditMessage />}
          />
        </Route>
        <Route element={<Layout />}>
          <Route
            path={routes.signup}
            element={<Signup />}
            loader={publicGuardLoader(queryClient)}
          />
          <Route
            path={routes.rollingpaper.list()}
            element={<RollingpaperList />}
          />
          <Route
            path={routes.rollingpaper.detail()}
            element={<RollingpaperDetail />}
          />
          <Route path={routes.makecake.list()} element={<MakeCakeList />} />
          <Route path={routes.makecake.detail()} element={<MakeCakeDetail />} />
          <Route
            path={routes.treasurebox.list()}
            element={<TreasureBoxList />}
          />
          <Route
            path={routes.treasurebox.detail()}
            element={<TreasureBoxDetail />}
          />
        </Route>
      </Route>,
    ),
  );

export default router;
