/**
 * Amaranth - Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

// import { inject } from 'aurelia-framework';
import _ from 'lodash';

// import { AuthorizeStepJWT as AuthorizeStep } from 'features/authorize-step/authorize-step';
import { ModelView } from 'features/model-view';

// import environment from 'environment';
import appRoutes from 'routes';

/**
 * Application
 */
// @inject(AuthorizeStep)
export class App extends ModelView {
    // /**
    //  * Constructor
    //  * @see Base::constructor() for the rest of the arguments
    //  * @param {AuthorizeStep}        authStep Authorization step
    //  */
    // // constructor(authStep, ...args) {
    // constructor(...args) {
    //     super(...args);
    //     // this.authStep = authStep;
    //     // this.config.set('auth-step', this.authStep);

    //     this.subscribeEvent('router:navigation:complete', (result) => {
    //         this.routerMarkActiveRoute(result.instruction.router, result.instruction.config.name);
    //     });
    // }
    /**
     * Configure Application router
     * @method configureRouter
     * @param  {RouterConfiguration}  config
     * @param  {AppRouter}            router
     */
    configureRouter(config, router) {
        config.title = 'Amaranth Framework';
        // force router to use / not /#
        config.options.pushState = true;
        // uncomment this if you're using authroization
        // config.addAuthorizeStep(this.authStep);
        // map unknown routes to a certain template
        config.mapUnknownRoutes(PLATFORM.moduleName('templates/statuses/404'));
        // map routes
        this.mapRoutes(config);
        // comment the line above and uncomment the one below, to load your router config from a REST service
        // this.mapRoutesFromREST(config);
        this.router = router;
    }
    /**
     * @see Base::init()
     */
    async activate() {
        this.events.publish('authorize-step::user-required');

        // Uncomment to enable service worker (application cache)
        // this.serviceWorker();
        // Uncomment to enable service worker (rest cache)
        // this.serviceWorkerREST();
        // Uncomment to enable service worker (websocket cache)
        // this.serviceWorkerSokets();
    }
    /**
     * Map routes from within the application class
     * @param  {RouterConfiguration}  config
     */
    mapRoutes(config) {
        config.map(appRoutes);
    }
    /**
     * Map the router with the help of a REST service
     * @param  {RouterConfiguration}  config
     */
    mapRoutesFromREST(config) {
        this.configApi.find(`${this.config.get('locale')}/routes.json`).then(response => {
            response.forEach(route => {
                route.settings = route.settings || {};
                route.moduleId = PLATFORM.moduleName(route.moduleId, route.name);
                this.router.addRoute(route);
            });

            this.router.refreshNavigation();

            const REQUEST = this.requestedRoute(this.router.routes);

            this.router.navigateToRoute(REQUEST.route, REQUEST.params, { replace: true });
            this.site.ready = true;
        });
    }
    /**
     * Extract initially requested route information
     * @param {Array} routes List of available routes
     * @returns {Object} Matching route to be loaded
     */
    requestedRoute(routes) {
        const path = (window.location.pathname.replace(/^\//, '').replace(/\/$/, '').length) ?
            window.location.pathname.replace(/^\//, '').replace(/\/$/, '').split('/') : null;
        let matchedRoute = path ? '404' : 'home';
        let matchedParams = {};
        let isFound = false;

        if (path) {
            routes.forEach(r => {
                const components = r.route.split('/');
                let isMatch = true;
                let params = {};

                if (!isFound) {
                    for (let index in components) {
                        if (components.length !== path.length) {
                            isMatch = false;
                            break;
                        }

                        if (components[index].match(/^\:/) && path[index]) {
                            params[components[index].replace(/^\:/, '')] = path[index];
                            continue;
                        }

                        if (components[index] !== path[index]) {
                            isMatch = false;
                            break;
                        }
                    }

                    if (isMatch) {
                        isFound = true;
                        matchedRoute = r.name;
                        matchedParams = params;
                    }
                }
            });

            if (window.location.search.length) {
                window.location.search.slice(1).split('&').map(param => {
                    const paramPair = param.split('=');
                    matchedParams[paramPair[0]] = paramPair[1];
                });
            }
        }

        return { route: matchedRoute, params: matchedParams };
    }
    /**
     * Search and mark active route when navigation completed.
     * @param  {NavRouter}  router
     * @param  {String}  name
     * @param  {Boolean} wipe   Default true.
     * @return {void}
     */
    routerMarkActiveRoute(router, name, wipe = true) {
        if (wipe) {
            router.routes.forEach(route => route.active = false);
        }
        let routes = _.filter(router.routes, route =>
            route.active === false &&
            (route.name === name || (Array.isArray(route.routes) && route.routes.includes(name))));
        routes.forEach((route) => {
            route.active = true;
            this.routerMarkActiveRoute(router, route.name, false);
        });
    }
    /**
     * @param  {String} sw
     */
    serviceWorker(sw = '/sw.js') {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register(sw).then(function(registration) {
                    // Registration was successful
                    this.logger.debug(`ServiceWorker (${sw}) registration successful with scope: `, registration.scope);
                }, (err) => {
                    // registration failed :(
                    this.logger.error(`ServiceWorker (${sw}) registration failed: `, err);
                });
            });
        } else {
            this.logger.warning('ServiceWorker is not enabled. Please enable ServiceWorkers. See \'https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers\'.');
        }
    }
    /**
     *
     */
    serviceWorkerREST() {
        this.serviceWorker('/ws-rest.js');
    }
    /**
     *
     */
    serviceWorkerSokets() {
        this.serviceWorker('/ws-sockets.js');
    }
}
