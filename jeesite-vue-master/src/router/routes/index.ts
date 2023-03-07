import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { mainOutRoutes } from './mainOut';
import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';

const modules = import.meta.glob('./modules/**/*.ts', { eager: true });

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.MY_PORTAL_PAGE,
  meta: {
    title: 'Root',
  },
};

export const PortalRoute: AppRouteRecordRaw = {
  path: PageEnum.MY_PORTAL_PAGE,
  name: 'Portal',
  component: () => import('/@/views/portal/index.vue'),
  children: [
    {
      path: '/portal/map',
      name: 'Map',
      component: () => import('/@/views/portal/map/index.vue'),
      meta: {
        title: 'Map',
      },
    },
  ],
  meta: {
    title: 'Map',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

const ModPwdRoute: AppRouteModule = {
  path: '/modPwd',
  name: 'ModPwd',
  component: () => import('/@/views/sys/account/modPwd.vue'),
  meta: {
    icon: 'ion:key-outline',
    title: t('sys.account.modifyPwd'),
  },
};

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  ModPwdRoute,
  PortalRoute,
  RootRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
