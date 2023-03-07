import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { getLoginUserUsingGET } from '@/services/api-backend/userController';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { requestConfig } from './requestConfig';
const loginPath = '/user/login';

/**
 * 无需用户登录态的页面
 */
const NO_NEED_LOGIN_WHITE_LIST = ['/user/register', loginPath];

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialState> {
  const state: InitialState = {
    loginUser: undefined,
  };
  // 当页面首次加载时，获取全局保存信息
  try {
    const res = await getLoginUserUsingGET();
    if (res.data) {
      state.loginUser = res.data;
    }
  } catch (error) {
    history.push(loginPath);
  }
  return state;
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout。水印设置
export const layout: RunTimeLayoutConfig = ({ initialState}) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.loginUser?.userAccount,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (NO_NEED_LOGIN_WHITE_LIST.includes(location.pathname)) {
        return;
      }
      // 如果没有登录，重定向到 login
      if (!initialState?.loginUser) {
        history.push(loginPath);
      }
    },
  };
};

/**
 * @name request 配置
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = requestConfig;
