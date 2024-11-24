const routes = {
  landing: '/',
  signup: '/signup',
  home: '/home',
  kakakoRedirection: '/login/oauth/kakao/callback',
  setupIntro: (content?: 'makecake' | 'rollingpaper' | 'treasurebox') =>
    `/intro/${content ?? ':content'}`,
  my: {
    default: '/my',
    setting: () => `${routes.my.default}/setting`,
    rename: () => `${routes.my.setting()}/rename`,
    contact: () => `${routes.my.setting()}/contact`,
  },
  rollingpaper: {
    default: '/rollingpaper',
    setup: () => `${routes.rollingpaper.default}/setup`,
    list: (id?: number) => `${routes.rollingpaper.default}/${id ?? ':id'}`,
    detail: (id?: number) =>
      `${routes.rollingpaper.default}/${id ?? ':id'}/detail`,
    messageCreate: (id?: number) =>
      `${routes.rollingpaper.default}/${id ?? ':id'}/create`,
    messageEdit: (id?: number) =>
      `${routes.rollingpaper.default}/${id ?? ':id'}/edit`,
  },
  makecake: {
    default: '/makecake',
    setup: () => `${routes.makecake.default}/setup`,
    list: (id?: number) => `${routes.makecake.default}/${id ?? ':id'}`,
    decorate: () => `${routes.makecake.default}/decorate`,
    messageCreate: (id?: number) =>
      `${routes.makecake.default}/${id ?? ':id'}/create`,
    messageEdit: (id?: number) =>
      `${routes.makecake.default}/${id ?? ':id'}/edit`,
    detail: (id?: number) => `${routes.makecake.default}/${id ?? ':id'}/detail`,
  },
  treasurebox: {
    default: '/treasurebox',
    setup: () => `${routes.treasurebox.default}/setup`,
    list: (id?: number) => `${routes.treasurebox.default}/${id ?? ':id'}`,
    detail: (id?: number) =>
      `${routes.treasurebox.default}/${id ?? ':id'}/detail`,
    messageCreate: (id?: number) =>
      `${routes.treasurebox.default}/${id ?? ':id'}/create`,
    messageEdit: (id?: number) =>
      `${routes.treasurebox.default}/${id ?? ':id'}/edit`,
  },
};

export default routes;
