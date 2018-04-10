/**
 * Amaranth Aurelia Utils Library (https://github.com/amaranth-framework/aurelia-utils/)
 *
 * @link      https://github.com/amaranth-framework/aurelia-utils/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   https://github.com/amaranth-framework/aurelia-utils/LICENSE MIT License
 */

import { className, parentClassName, traits } from '../amaranth-utils';
import { Config } from 'aurelia-api';
import { Container } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LogManager } from 'aurelia-framework';
import { Logger } from 'aurelia-logging';
import { PLATFORM } from 'aurelia-pal';

/**
 * Trait for handling events within a class.
 */
export class Eventable {
    /**
     * @private
     * @type {Array}
     */
    __events = [];
    /**
     * @private
     */
    __testEvents() {
        if (!this.events) {
            throw Error('Class is missing \'events\' variable. You cannot add \'Eventable\' trait.');
        }
        if (!this.events instanceof EventAggregator) {
            throw Error('Variable \'events\' is not of \'aurelia-event-aggregator/EventAgregator\' type. You cannot add \'Eventable\' trait.');
        }
    }
    /**
     * See {@link http://aurelia.io/docs/api/event-aggregator/class/EventAggregator/method/publish}
     * @param  {any} args
     * @return {void}
     */
    subscribeEvent(...args) {
        this.__testEvents();
        this.__events = this.__events || [];
        this.__events.push(this.events.subscribe(...args));
        this.logger && this.logger instanceof Logger && this.logger.debug('Event subscribed: ', ...args);
    }
    /**
     * See {@link http://aurelia.io/docs/api/event-aggregator/class/EventAggregator/method/subscribeOnce}
     * @param  {any} args
     * @return {void}
     */
    subscribeEventOnce(...args) {
        this.__testEvents();
        this.__events = this.__events || [];
        this.__events.push(this.events.subscribeOnce(...args));
        this.logger && this.logger instanceof Logger && this.logger.debug('Event subscribed (once): ', ...args);
    }
    /**
     * See {@link http://aurelia.io/docs/api/event-aggregator/class/EventAggregator/method/subscribe}
     * @param  {any} args
     * @return {void}
     */
    publishEvent(...args) {
        this.__testEvents();
        this.events.publish(...args);
        this.logger && this.logger instanceof Logger && this.logger.debug('Event published: ', ...args);
    }
    /**
     * Will dispose all active events
     * See {@link http://aurelia.io/docs/api/event-aggregator/interface/Subscription/method/dispose}
     * @return {void}
     */
    disposeEvents() {
        this.__testEvents();
        if (this.__events && Array.isArray(this.__events)) {
            this.__events.forEach((event) => event.dispose());
        }
    }
}

/**
 * Logable class. Trait for class that needs logger object.
 */
export class Loggable {
    /**
     * Getter: Obtain logger instance for the class.
     * @return {LogManager}
     */
    getLogger() {
        if (!this.__logger) {
            this.__logger = LogManager.getLogger(this.toString());
        }
        return this.__logger;
    }

    /**
     * Reduce class to a string identifier
     * @return {String}
     */
    toString() {
        return `${parentClassName(this) || 'Object'}/${className(this)}}`;
    }
}

/**
 * Abstract TRAIT for REST api
 * @abstract
 */
export class RESTable {
    settleEndpoint(name = 'default') {
        this.endpoint = this.getEndpoint(name);
    }
    getEndpoint(name = 'default') {
        return Container.instance.get(Config).getEndpoint(name);
    }
}

/**
 * @experimental USE ON YOUR OWN RISK
 * @example
 * class App {
 *   constructor(...args) {
 *     this.subscribeRouteActiveEvent()
 *   }
 * }
 * traits(App, Eventable, RouteActive)
 */
export class RouteActive {
    /**
     * @experimental USE ON YOUR OWN RISK
     */
    subscribeRouteActiveEvent() {
        this.subscribeEvent('router:navigation:complete', (result) => {
            this.routerMarkActiveRoute(result.instruction.router, result.instruction.config.name);
        });
    }
    /**
     * Search and mark active route when navigation completed.
     * @experimental USE ON YOUR OWN RISK
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
}

/**
 * Routable trait, using an object to add route to the application.
 * Requires the definition of `appRoutes` Array within the component/template class.
 *
 * @example
 * class App {
 *   appRoutes = []
 * }
 * traits(App, Loggable, Routable)
 */
export class Routable {
    /**
     * Configure Application router
     * @method configureRouter
     * @param  {RouterConfiguration}  config
     * @param  {AppRouter}            router
     */
    configureRouter(config, router) {
        this.logger.info('Configuring router (from static data)');
        // force router to use / not /#
        config.options.pushState = true;
        // map unknown routes to a certain template
        config.mapUnknownRoutes(PLATFORM.moduleName('templates/statuses/404'));
        // map routes
        config.map(this.appRoutes);
        // assing router
        this.router = router;
    }
}
traits(Routable, RouteActive);

/**
 * Routable trait, using REST for importing the routes to the application.
 * Requires the use of `aurelia-api` plugin,the addition of RESTable class and the definition of a `router` endpoint within the
 * addition of `aurelia-api` plugin in `main.js`.
 *
 * @experimental USE ON YOUR OWN RISK
 *
 * @example
 * class App {}
 * traits(App, RESTable, RoutableREST)
 */
export class RoutableREST {
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
        // map unknown routes to a certain template
        config.mapUnknownRoutes(PLATFORM.moduleName('templates/statuses/404'));
        // map routes
        this.mapRoutesFromREST(config);
        // assing router
        this.router = router;
    }
    /**
     * Obtain the routes path.
     * @return {String}
     */
    get routesPath() {
        return 'routes.json';
    }
    /**
     * Map the router with the help of a REST service
     * @param  {RouterConfiguration}  config
     */
    mapRoutesFromREST(config) {
        if (!this.getEndpoint) {
            throw Error('Cannot use mapRoutesFromREST. `RESTable` trait was not added to class.');
        }
        this.getEndpoint('router').find(this.routesPath).then(response => {
            response.forEach(route => {
                route.settings = route.settings || {};
                route.moduleId = PLATFORM.moduleName(route.moduleId);
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
}
traits(RoutableREST, RouteActive);

// export class ServiceWorker {
// /**
//      * @param  {String} sw
//      */
//     serviceWorker(sw = '/sw.js') {
//         if ('serviceWorker' in navigator) {
//             window.addEventListener('load', () => {
//                 navigator.serviceWorker.register(sw).then(function(registration) {
//                     // Registration was successful
//                     this.logger.debug(`ServiceWorker (${sw}) registration successful with scope: `, registration.scope);
//                 }, (err) => {
//                     // registration failed :(
//                     this.logger.error(`ServiceWorker (${sw}) registration failed: `, err);
//                 });
//             });
//         } else {
//             this.logger.warning('ServiceWorker is not enabled. Please enable ServiceWorkers. See \'https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers\'.');
//         }
//     }
//     /**
//      *
//      */
//     serviceWorkerREST() {
//         this.serviceWorker('/ws-rest.js');
//     }
//     /**
//      *
//      */
//     serviceWorkerSokets() {
//         this.serviceWorker('/ws-sockets.js');
//     }
// }
