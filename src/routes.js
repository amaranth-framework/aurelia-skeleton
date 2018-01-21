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
        title: 'Helper Components'
    },
    // uikit components pages
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/uikit/uikit'),
        name: 'uikit-components',
        nav: true,
        route: 'uikit-components',
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
        moduleId: PLATFORM.moduleName('templates/demo/uikit/breadcrumb/breadcrumb'),
        name: 'uikit-components-dropdown',
        nav: false,
        route: 'uikit-components/dropdown',
        title: 'Dropdown'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/uikit/breadcrumb/breadcrumb'),
        name: 'uikit-components-messages',
        nav: false,
        route: 'uikit-components/messages',
        title: 'Messages'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/uikit/breadcrumb/breadcrumb'),
        name: 'uikit-components-nav',
        nav: false,
        route: 'uikit-components/nav',
        title: 'Nav'
    },
    {
        icon: 'code',
        moduleId: PLATFORM.moduleName('templates/demo/uikit/breadcrumb/breadcrumb'),
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
        title: 'Sample Pages'
    }
    // {
    //     route: 'users',
    //     name: 'users',
    //     moduleId: PLATFORM.moduleName('templates/demo/users/users-demo'),
    //     nav: true,
    //     title: 'Users',
    //     group: 'left-demo',
    //     icon: 'fa-user'
    // },
    // {
    //     route: 'users/:action?/:id?',
    //     href: '/users/add',
    //     name: 'users-edit',
    //     moduleId: PLATFORM.moduleName('templates/demo/users/users-demo'),
    //     nav: false,
    //     title: 'Users - Edit'
    // },
    // {
    //     route: 'login',
    //     name: 'login',
    //     moduleId: PLATFORM.moduleName('templates/demo/login/login-demo'),
    //     title: 'Login',
    //     settings: { auth: false }
    // },
    // {
    //     route: 'logout',
    //     name: 'logout',
    //     moduleId: PLATFORM.moduleName('templates/demo/logout/logout-demo'),
    //     title: 'Logout',
    //     settings: { auth: false }
    // },
    // // Keep this only if you need inspiration
    // {
    //     route: 'ui-elements',
    //     name: 'ui-elements',
    //     moduleId: PLATFORM.moduleName('templates/ui-elements/general'),
    //     nav: true,
    //     title: 'UI Elements',
    //     group: 'left-ui',
    //     icon: 'fa-window-restore'
    // },
    // {
    //     route: 'forms',
    //     name: 'forms',
    //     moduleId: PLATFORM.moduleName('templates/ui-elements/forms'),
    //     nav: true,
    //     title: 'Forms',
    //     group: 'left-ui',
    //     routes: ['forms-horizontal', 'forms-grid'],
    //     icon: 'fa-keyboard-o'
    // },
    // {
    //     route: 'forms-horizontal',
    //     name: 'forms-horizontal',
    //     moduleId: PLATFORM.moduleName('templates/ui-elements/forms-horizontal'),
    //     nav: false,
    //     title: 'Forms Horizontal',
    //     group: 'left-ui'
    // },
    // {
    //     route: 'forms-grid',
    //     name: 'forms-grid',
    //     moduleId: PLATFORM.moduleName('templates/ui-elements/forms-grid'),
    //     nav: false,
    //     title: 'Grid View',
    //     group: 'left-ui'
    // },
    // {
    //     route: 'listing',
    //     name: 'listing',
    //     moduleId: PLATFORM.moduleName('templates/ui-elements/listing'),
    //     nav: true,
    //     title: 'Listing',
    //     group: 'left-ui',
    //     routes: ['listing-as-table'],
    //     icon: 'fa-list'

    // },
    // {
    //     route: 'listing-as-table',
    //     name: 'listing-as-table',
    //     moduleId: PLATFORM.moduleName('templates/ui-elements/listing-as-table'),
    //     nav: false,
    //     title: 'Listing (as table)',
    //     group: 'left-ui',
    //     icon: 'fa-table'
    // },
    // {
    //     route: '404',
    //     name: '404',
    //     moduleId: PLATFORM.moduleName('templates/statuses/404'),
    //     title: 'Page does not exist.'
    // }
];
