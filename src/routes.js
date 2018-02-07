export default [
    {
        route: ['', 'home'],
        redirect: 'dashboard'
    },
    // demo app pages, comment and modify
    {
        icon: 'home',
        moduleId: PLATFORM.moduleName('templates/demo/home/home'),
        name: 'dashboard',
        nav: true,
        route: 'dashboard',
        title: 'Dashboard'
    },
    // helper components pages
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/components'),
        name: 'components',
        nav: true,
        route: 'components',
        subroutes: [
            'components-page-breadcrumb',
            'components-page-title'
        ],
        title: 'Components'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/components/page-breadcrumb'),
        name: 'components-page-breadcrumb',
        nav: true,
        route: 'components/page-breadcrumb',
        title: 'Page Breadcrumb'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/components/page-title'),
        name: 'components-page-title',
        nav: true,
        route: 'components/page-title',
        title: 'Page Title'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/components/helper'),
        name: 'components-helpers',
        nav: true,
        route: 'components/helpers',
        subroutes: [
            'components-helper-a',
            // 'components-helpers-card',
            'components-helper-content',
            // 'components-helpers-form',
            // 'components-helpers-listing',
            'components-helper-table'
        ],
        title: 'Helper Components'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/components/helper/a'),
        name: 'components-helper-a',
        nav: false,
        route: 'components/helper/a',
        subroutes: [],
        title: 'Anchor'
    },
    // {
    //     icon: 'code',
    //     moduleId: PLATFORM.moduleName('templates/demo/helper/card/card'),
    //     name: 'components-helpers-card',
    //     nav: false,
    //     route: 'components/helpers/card',
    //     subroutes: [],
    //     title: 'Card'
    // },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/components/helper/content'),
        name: 'components-helper-content',
        nav: false,
        route: 'components/helper/content',
        subroutes: [],
        title: 'Content'
    },
    // {
    //     icon: 'code',
    //     moduleId: PLATFORM.moduleName('templates/demo/helper/helper'),
    //     name: 'components-helpers-form',
    //     nav: false,
    //     route: 'components/helpers/form',
    //     subroutes: [],
    //     title: 'Form'
    // },
    // {
    //     icon: 'code',
    //     moduleId: PLATFORM.moduleName('templates/demo/helper/listing/listing'),
    //     name: 'components-helpers-listing',
    //     nav: false,
    //     route: 'components/helpers/listing',
    //     subroutes: [],
    //     title: 'Listing'
    // },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/components/helper/table'),
        name: 'components-helper-table',
        nav: false,
        route: 'components/helper/table',
        subroutes: [],
        title: 'Table'
    },
    // // uikit components pages
    // {
    //     icon: 'code',
    //     moduleId: PLATFORM.moduleName('templates/demo/uikit/uikit'),
    //     name: 'uikit-components',
    //     nav: true,
    //     route: 'uikit-components',
    //     subroutes: [
    //         [
    //             'uikit-components-a',
    //             'uikit-components-breadcrumb',
    //             'uikit-components-dropdown',
    //             'uikit-components-messages'
    //         ],
    //         [
    //             'uikit-components-nav',
    //             'uikit-components-navbar'
    //         ]
    //     ],
    //     title: 'UiKit Components'
    // },
    // {
    //     icon: 'code',
    //     moduleId: PLATFORM.moduleName('templates/demo/uikit/a/a'),
    //     name: 'uikit-components-a',
    //     nav: false,
    //     route: 'uikit-components/a',
    //     title: 'Anchor'
    // },
    // {
    //     icon: 'code',
    //     moduleId: PLATFORM.moduleName('templates/demo/uikit/breadcrumb/breadcrumb'),
    //     name: 'uikit-components-breadcrumb',
    //     nav: false,
    //     route: 'uikit-components/breadcrumb',
    //     title: 'Breadcrumb'
    // },
    // {
    //     icon: 'code',
    //     moduleId: PLATFORM.moduleName('templates/demo/uikit/dropdown/dropdown'),
    //     name: 'uikit-components-dropdown',
    //     nav: false,
    //     route: 'uikit-components/dropdown',
    //     title: 'Dropdown'
    // },
    // {
    //     icon: 'code',
    //     moduleId: PLATFORM.moduleName('templates/demo/uikit/messages/messages'),
    //     name: 'uikit-components-messages',
    //     nav: false,
    //     route: 'uikit-components/messages',
    //     title: 'Messages'
    // },
    // {
    //     icon: 'code',
    //     moduleId: PLATFORM.moduleName('templates/demo/uikit/nav/nav'),
    //     name: 'uikit-components-nav',
    //     nav: false,
    //     route: 'uikit-components/nav',
    //     title: 'Nav'
    // },
    // {
    //     icon: 'code',
    //     moduleId: PLATFORM.moduleName('templates/demo/uikit/navbar/navbar'),
    //     name: 'uikit-components-navbar',
    //     nav: false,
    //     route: 'uikit-components/navbar',
    //     title: 'Navbar'
    // },
    // // sample pages
    // {
    //     icon: 'code',
    //     moduleId: PLATFORM.moduleName('templates/demo/pages/pages'),
    //     name: 'pages',
    //     nav: true,
    //     route: 'pages',
    //     subroutes: [
    //         'pages-users',
    //         'pages-login',
    //         'pages-logout'
    //     ],
    //     title: 'Sample Pages'
    // },
    // {
    //     icon: 'fa-user',
    //     moduleId: PLATFORM.moduleName('templates/demo/pages/users/users'),
    //     name: 'pages-users',
    //     nav: false,
    //     route: 'users',
    //     title: 'Users'
    // },
    // {
    //     href: '/users/add',
    //     moduleId: PLATFORM.moduleName('templates/demo/pages/users/users'),
    //     name: 'pages-users-edit',
    //     nav: false,
    //     route: 'users/:action?/:id?',
    //     title: 'Users - Edit'
    // },
    // {
    //     moduleId: PLATFORM.moduleName('templates/demo/pages/login/login'),
    //     name: 'pages-login',
    //     nav: false,
    //     route: 'login',
    //     title: 'Login'
    // },
    // {
    //     moduleId: PLATFORM.moduleName('templates/demo/pages/logout/logout'),
    //     name: 'pages-logout',
    //     nav: false,
    //     route: 'logout',
    //     title: 'Logout'
    // },
    // utility pages
    {
        route: '404',
        name: '404',
        moduleId: PLATFORM.moduleName('templates/statuses/404'),
        title: 'Page does not exist.'
    }
];
