/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

 /**
  * Routes Object
  */
export default [
    {
        route: ['', 'home'],
        redirect: 'dashboard'
    },
    // demo app pages, comment and modify
    {
        icon: 'home',
        moduleId: PLATFORM.moduleName('templates/home'),
        name: 'dashboard',
        nav: true,
        route: 'dashboard',
        title: 'Dashboard'
    },
];
