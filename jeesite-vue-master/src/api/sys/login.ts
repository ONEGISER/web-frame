/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
 */
import { defHttp } from '/@/utils/http/axios';
import { UserInfo } from '/#/store';
import { ErrorMessageMode } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';
import { encryptByBase64 } from '/@/utils/cipher';
import { Menu } from '/@/router/types';
import { useAppStore } from '/@/store/modules/app';

const { adminPath } = useGlobSetting();

export interface LoginParams {
  username: string;
  password: string;
  validCode?: string;
  rememberMe?: boolean;
}

export interface LoginResult {
  result: string;
  message: string;
  sessionid: string;
  user: UserInfo;
  demoMode: boolean;
  useCorpModel: boolean;
  currentCorpCode: string;
  currentCorpName: string;
  modifyPasswordTip: string;
  modifyPasswordMsg: string;
  sysCode: string;
  isValidCodeLogin: boolean;
}

export interface AuthInfo {
  stringPermissions: string[];
  roles: string[];
}

export const loginApi = (params: LoginParams, mode: ErrorMessageMode = 'none') => {
  params.username = encryptByBase64(params.username);
  params.password = encryptByBase64(params.password);
  if (params.validCode) {
    params.validCode = encryptByBase64(params.validCode);
  }
  return defHttp.post<LoginResult>(
    { url: adminPath + '/login', params, timeout: 20 * 1000 },
    { errorMessageMode: mode },
  );
};

export const switchSys = (sysCode: string) => {
  return defHttp.get({ url: adminPath + '/switch/' + sysCode });
};

export const switchSkin = (name = '') => {
  if (name == '') {
    const appStore = useAppStore();
    if (appStore.getDarkMode === 'dark') {
      name = 'skin-dark';
    } else {
      const themeColor = appStore.getProjectConfig.themeColor;
      name = themeColor == '#1890ff' ? 'skin-blue-light3' : 'skin-blue3';
    }
  }
  return defHttp.get({ url: adminPath + '/switchSkin/' + name });
};

export const userInfoApi = (mode: ErrorMessageMode = 'message') =>
  defHttp.get<LoginResult>(
    { url: adminPath + '/index', timeout: 10 * 1000 },
    { errorMessageMode: mode },
  );

export const authInfoApi = () => defHttp.get<AuthInfo>({ url: adminPath + '/authInfo' });

export const menuRouteApi = () => defHttp.get<Menu[]>({ url: adminPath + '/menuRoute' });

export const logoutApi = () => defHttp.get({ url: adminPath + '/logout' });
