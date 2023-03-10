// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  return {
    routes: {"1":{"path":"/","name":"index","icon":"smile","parentId":"ant-design-pro-layout","id":"1"},"2":{"path":"/interface_info/:id","parentId":"ant-design-pro-layout","id":"2"},"3":{"path":"/user","layout":false,"id":"3"},"4":{"name":"登录","path":"/user/login","parentId":"3","id":"4"},"5":{"name":"注册","path":"/user/register","parentId":"3","id":"5"},"6":{"path":"/admin","name":"管理页","icon":"crown","access":"canAdmin","parentId":"ant-design-pro-layout","id":"6"},"7":{"name":"接口管理","icon":"接口展示","path":"/admin/interface_info","parentId":"6","id":"7"},"8":{"name":"接口分析","icon":"analysis","path":"/admin/interface_analysis","parentId":"6","id":"8"},"9":{"path":"*","layout":false,"id":"9"},"ant-design-pro-layout":{"id":"ant-design-pro-layout","path":"/","isLayout":true}},
    routeComponents: {
'1': React.lazy(() => import(/* webpackChunkName: "p__Index__index" */'@/pages/Index/index.tsx')),
'2': React.lazy(() => import(/* webpackChunkName: "p__InterfaceInfo__index" */'@/pages/InterfaceInfo/index.tsx')),
'3': React.lazy(() => import( './EmptyRoute')),
'4': React.lazy(() => import(/* webpackChunkName: "p__User__Login__index" */'@/pages/User/Login/index.tsx')),
'5': React.lazy(() => import(/* webpackChunkName: "p__User__Register__index" */'@/pages/User/Register/index.tsx')),
'6': React.lazy(() => import( './EmptyRoute')),
'7': React.lazy(() => import(/* webpackChunkName: "p__Admin__InterfaceInfo__index" */'@/pages/Admin/InterfaceInfo/index.tsx')),
'8': React.lazy(() => import(/* webpackChunkName: "p__Admin__InterfaceAnalysis__index" */'@/pages/Admin/InterfaceAnalysis/index.tsx')),
'9': React.lazy(() => import(/* webpackChunkName: "p__404" */'@/pages/404.tsx')),
'ant-design-pro-layout': React.lazy(() => import(/* webpackChunkName: "t__plugin-layout__Layout" */'F:/Project/项目/api/api-frontend/src/.umi-production/plugin-layout/Layout.tsx')),
},
  };
}
