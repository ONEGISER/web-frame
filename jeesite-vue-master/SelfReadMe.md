# 添加绕过登录的门户页面

1. 添加白名单 `路径：src\enums\pageEnum.ts`

```typescript
//PageEnum添加如下枚举
export enum PageEnum {
  //山洪一张图门户
  MY_PORTAL_PAGE = '/portal',
  //山洪一张图门户地图
  MY_PORTAL_MAP_PAGE = '/portal/map',
}
```

`路径：src\router\guard\permissionGuard.ts`

```typescript
const MY_PORTAL_PAGE = PageEnum.MY_PORTAL_PAGE;
const MY_PORTAL_MAP_PAGE = PageEnum.MY_PORTAL_MAP_PAGE;

//白名单添加MY_PORTAL_PAGE及MY_PORTAL_MAP_PAGE
const whitePathList: PageEnum[] = [MY_PORTAL_PAGE, MY_PORTAL_MAP_PAGE];
```

2.添加组件`路径：src\components\Portal。下面以 Header 组件为例`

```typescript
<template>
  <div>我是头部</div>
</template>
```

3.添加页面

(1).地图页面`路径：src\views\portal\map`

```typescript
<template>
  <div> 地图 </div>
</template>
```

(2).门户页面`路径：src\views\portal\index.vue`

```typescript
<template>
  <Header />
  <RouterView />
</template>
<script setup lang="ts">
  import { Header } from '/@/components/Portal';
</script>
```

4.添加路由`路径：src\router\routes\index.ts`

```typescript
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

//basicRoutes里面增加PortalRoute
export const basicRoutes = [PortalRoute];
```

# 更换 logo

`路径：public\resource\img`
