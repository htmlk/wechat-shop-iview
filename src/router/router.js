import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [

     {
        path: '/goods',
        icon: 'ios-paper',
        title: '商品信息',
        name: 'goods',
        component: Main,
        children: [
            { path: 'index', title: 'Page', name: 'goodslist', component: resolve => { require(['@/views/goods/goods.vue'], resolve); } }
        ]
    },
    {
        path: '/order',
        icon: 'ios-paper',
        title: '订单信息',
        name: 'order',
        component: Main,
        children: [
            { path: 'index', title: 'Page', name: 'orderlist', component: resolve => { require(['@/views/order/order.vue'], resolve); } }
        ]
    },
    {
        path: '/user',
        icon: 'ios-paper',
        title: '用户信息',
        name: 'user',
        component: Main,
        children: [
            { path: 'index', title: 'Page', name: 'userlist', component: resolve => { require(['@/views/user/user.vue'], resolve); } }
        ]
    },{
        path: '/finance',
        icon: 'ios-paper',
        title: '财务管理',
        name: 'finance',
        component: Main,
        children: [
            { path: 'index', title: 'Page', name: 'finance', component: resolve => { require(['@/views/finance/finance.vue'], resolve); } }
        ]
    }, {
        path: '/card',
        icon: 'ios-folder',
        name: 'card',
        title: '卡券管理',
        component: Main,
        children: [
            {
                path: 'addcard',
                icon: 'ios-paper-outline',
                name: 'addcard',
                title: '发放卡券',
                component: resolve => { require(['@/views/card/addcard/addcard.vue'], resolve); }
            },
            {
                path: 'codecard',
                icon: 'ios-list-outline',
                name: 'codecard',
                title: '卡券核销',
                component: resolve => { require(['@/views/card/codecard/codecard.vue'], resolve); }
            }
        ]
    },{
        path: '/setup',
        icon: 'ios-paper',
        title: '系统操作',
        name: 'setup',
        component: Main,
        children: [
            { path: 'index', title: 'Page', name: 'setup', component: resolve => { require(['@/views/setup/setup.vue'], resolve); } }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
