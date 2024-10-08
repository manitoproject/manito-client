const routes = {
  landing: '/' as const,
  signup: '/signup' as const,
  home: '/home' as const,
  kakakoRedirection: '/login/oauth/kakao/callback' as const,
  setupIntro: (content?: 'cake' | 'rollingpaper') =>
    `/intro/${content ?? ':content'}` as const,
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
  cake: {
    default: '/cake' as const,
    setup: () => `${routes.cake.default}/setup` as const,
    list: (id?: number) => `${routes.cake.default}/${id ?? ':id'}` as const,
    detail: (id?: number) =>
      `${routes.cake.default}/${id ?? ':id'}/detail` as const,
  },
  treasure: {
    default: '/treasure' as const,
    setup: () => `${routes.treasure.default}/setup` as const,
    list: (id?: number) => `${routes.treasure.default}/${id ?? ':id'}` as const,
    detail: (id?: number) =>
      `${routes.treasure.default}/${id ?? ':id'}/detail` as const,
  },
};

export default routes;
