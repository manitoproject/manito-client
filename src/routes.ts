const routes = {
  landing: '/' as const,
  signup: '/signup' as const,
  home: '/home' as const,
  kakako_redirection: '/login/oauth/kakao/callback' as const,
  setupIntro: (content?: string) => `/intro/${content ?? ':content'}` as const,
  my: {
    default: '/my' as const,
    setting: () => `${routes.my.default}/setting` as const,
    rename: () => `${routes.my.setting()}/rename` as const,
    contact: () => `${routes.my.setting()}/contact` as const,
  },
  rollingpaper: {
    default: '/rollingpaper' as const,
    setup: () => `${routes.rollingpaper.default}/setup` as const,
    list: (id?: number) =>
      `${routes.rollingpaper.default}/${id ?? ':id'}` as const,
    detail: (id?: number) =>
      `${routes.rollingpaper.default}/${id ?? ':id'}/detail` as const,
    form: (type?: 'create' | 'edit', id?: number) =>
      `${routes.rollingpaper.default}/${id || ':id'}/${
        type || ':type'
      }` as const,
  },
};

export default routes;

// rollingpaper/80
// rollingpaper/80/detail
// rollingpaper/80/create
// rollingpaper/80/edit
