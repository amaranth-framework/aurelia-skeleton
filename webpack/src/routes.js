export default [
    {
        route: ['', 'home'],
        redirect: 'dashboard'
    },
    // demo app pages, comment and modify
    {
        route: 'dashboard',
        name: 'dashboard',
        moduleId: PLATFORM.moduleName('templates/demo/home/home-demo'),
        nav: true,
        title: 'Dashboard',
        group: 'left-demo',
        settings: {
            auth: true
        },
        icon: 'home'
    },
    {
        route: 'users',
        name: 'users',
        moduleId: PLATFORM.moduleName('templates/demo/users/users-demo'),
        nav: true,
        title: 'Users',
        group: 'left-demo',
        icon: 'fa-user'
    },
    {
        route: 'users/:action?/:id?',
        href: '/users/add',
        name: 'users-edit',
        moduleId: PLATFORM.moduleName('templates/demo/users/users-demo'),
        nav: false,
        title: 'Users - Edit'
    },
    {
        route: 'login',
        name: 'login',
        moduleId: PLATFORM.moduleName('templates/demo/login/login-demo'),
        title: 'Login',
        settings: { auth: false }
    },
    {
        route: 'logout',
        name: 'logout',
        moduleId: PLATFORM.moduleName('templates/demo/logout/logout-demo'),
        title: 'Logout',
        settings: { auth: false }
    },
    // Keep this only if you need inspiration
    {
        route: 'ui-elements',
        name: 'ui-elements',
        moduleId: PLATFORM.moduleName('templates/ui-elements/general'),
        nav: true,
        title: 'UI Elements',
        group: 'left-ui',
        icon: 'fa-window-restore'
    },
    {
        route: 'forms',
        name: 'forms',
        moduleId: PLATFORM.moduleName('templates/ui-elements/forms'),
        nav: true,
        title: 'Forms',
        group: 'left-ui',
        routes: ['forms-horizontal', 'forms-grid'],
        icon: 'fa-keyboard-o'
    },
    {
        route: 'forms-horizontal',
        name: 'forms-horizontal',
        moduleId: PLATFORM.moduleName('templates/ui-elements/forms-horizontal'),
        nav: false,
        title: 'Forms Horizontal',
        group: 'left-ui'
    },
    {
        route: 'forms-grid',
        name: 'forms-grid',
        moduleId: PLATFORM.moduleName('templates/ui-elements/forms-grid'),
        nav: false,
        title: 'Grid View',
        group: 'left-ui'
    },
    {
        route: 'listing',
        name: 'listing',
        moduleId: PLATFORM.moduleName('templates/ui-elements/listing'),
        nav: true,
        title: 'Listing',
        group: 'left-ui',
        routes: ['listing-as-table'],
        icon: 'fa-list'

    },
    {
        route: 'listing-as-table',
        name: 'listing-as-table',
        moduleId: PLATFORM.moduleName('templates/ui-elements/listing-as-table'),
        nav: false,
        title: 'Listing (as table)',
        group: 'left-ui',
        icon: 'fa-table'
    },
    {
        route: '404',
        name: '404',
        moduleId: PLATFORM.moduleName('templates/statuses/404'),
        title: 'Page does not exist.'
    }
];
