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
        moduleId: PLATFORM.moduleName('templates/demo/helper/helper'),
        name: 'helper-components',
        nav: true,
        route: 'helper-components',
        subroutes: [
            'helper-components-card',
            'helper-components-content',
            'helper-components-form',
            'helper-components-listing',
            'helper-components-table'
        ],
        title: 'Helper Components'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/helper/card/card'),
        name: 'helper-components-card',
        nav: false,
        route: 'helper-components/card',
        subroutes: [],
        title: 'Card'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/helper/content/content'),
        name: 'helper-components-content',
        nav: false,
        route: 'helper-components/content',
        subroutes: [],
        title: 'Content'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/helper/helper'),
        name: 'helper-components-form',
        nav: false,
        route: 'helper-components/form',
        subroutes: [],
        title: 'Form'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/helper/listing/listing'),
        name: 'helper-components-listing',
        nav: false,
        route: 'helper-components/listing',
        subroutes: [],
        title: 'Listing'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/helper/table/table'),
        name: 'helper-components-table',
        nav: false,
        route: 'helper-components/table',
        subroutes: [],
        title: 'Table'
    },
    // uikit components pages
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/uikit/uikit'),
        name: 'uikit-components',
        nav: true,
        route: 'uikit-components',
        subroutes: [
            [
                'uikit-components-breadcrumb',
                'uikit-components-dropdown',
                'uikit-components-messages'
            ],
            [
                'uikit-components-nav',
                'uikit-components-navbar'
            ]
        ],
        title: 'UiKit Components'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/uikit/breadcrumb/breadcrumb'),
        name: 'uikit-components-breadcrumb',
        nav: false,
        route: 'uikit-components/breadcrumb',
        title: 'Breadcrumb'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/uikit/dropdown/dropdown'),
        name: 'uikit-components-dropdown',
        nav: false,
        route: 'uikit-components/dropdown',
        title: 'Dropdown'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/uikit/messages/messages'),
        name: 'uikit-components-messages',
        nav: false,
        route: 'uikit-components/messages',
        title: 'Messages'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/uikit/nav/nav'),
        name: 'uikit-components-nav',
        nav: false,
        route: 'uikit-components/nav',
        title: 'Nav'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/uikit/navbar/navbar'),
        name: 'uikit-components-navbar',
        nav: false,
        route: 'uikit-components/navbar',
        title: 'Navbar'
    },
    // sample pages
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/pages/pages'),
        name: 'pages',
        nav: true,
        route: 'pages',
        subroutes: [
            'pages-users',
            'pages-login',
            'pages-logout'
        ],
        title: 'Sample Pages'
    },
    {
        icon: 'fa-user',
        moduleId: PLATFORM.moduleName('templates/demo/pages/users/users'),
        name: 'pages-users',
        nav: false,
        route: 'users',
        title: 'Users'
    },
    {
        href: '/users/add',
        moduleId: PLATFORM.moduleName('templates/demo/pages/users/users'),
        name: 'pages-users-edit',
        nav: false,
        route: 'users/:action?/:id?',
        title: 'Users - Edit'
    },
    {
        moduleId: PLATFORM.moduleName('templates/demo/pages/login/login'),
        name: 'pages-login',
        nav: false,
        route: 'login',
        title: 'Login'
    },
    {
        moduleId: PLATFORM.moduleName('templates/demo/pages/logout/logout'),
        name: 'pages-logout',
        nav: false,
        route: 'logout',
        title: 'Logout'
    },
    // utility pages
    {
        route: '404',
        name: '404',
        moduleId: PLATFORM.moduleName('templates/statuses/404'),
        title: 'Page does not exist.'
    }
];
