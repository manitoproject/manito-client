const routes = {
  landing: '/',
  signup: '/signup',
  home: '/home',
  kakakoRedirection: '/login/oauth/kakao/callback',
  setupIntro: (content?: 'cake' | 'rollingpaper') =>
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
  cake: {
    default: '/cake',
    setup: () => `${routes.cake.default}/setup`,
    list: (id?: number) => `${routes.cake.default}/${id ?? ':id'}`,
    decorate: () => `${routes.cake.default}/decorate`,
    form: (type?: 'create' | 'edit', id?: number) =>
      `${routes.cake.default}/${id || ':id'}/${type || ':type'}`,
    messageCreate: (id?: number) =>
      `${routes.rollingpaper.default}/${id ?? ':id'}/create`,
    messageEdit: (id?: number) =>
      `${routes.rollingpaper.default}/${id ?? ':id'}/edit`,
    detail: (id?: number) => `${routes.cake.default}/${id ?? ':id'}/detail`,
  },
  treasure: {
    default: '/treasure',
    setup: () => `${routes.treasure.default}/setup`,
    list: (id?: number) => `${routes.treasure.default}/${id ?? ':id'}`,
    detail: (id?: number) => `${routes.treasure.default}/${id ?? ':id'}/detail`,
    form: (type?: 'create' | 'edit', id?: number) =>
      `${routes.cake.default}/${id || ':id'}/${type || ':type'}`,
    messageCreate: (id?: number) =>
      `${routes.rollingpaper.default}/${id ?? ':id'}/create`,
    messageEdit: (id?: number) =>
      `${routes.rollingpaper.default}/${id ?? ':id'}/edit`,
  },
};

export default routes;
