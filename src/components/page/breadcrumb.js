/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import _ from 'lodash';

import { Component } from 'features/view/component';
import { extend } from 'features/utils/object';

/**
 * Page title component (also Custom Element).
 * @example
 * <am-breadcrumb settings.bind="{ settings }">Page Title</am-breadcrumb>
 * <compose view-model="components/page/title" model.bind="{ settings }"></compose>
 * @extends {Component}
 * @see https://amaranth-framework.github.com/aurelia-skeleton/components/breadcrumb
 * @see http://aurelia.io/docs/templating/custom-elements#introduction
 */
export class CPBreadcrumb extends Component {
    @bindable(bindableHelper.twoWay) settings = {};
    /**
     * @type {String}
     */
    overrideSettingsKey = 'components.page/breadcrumb';
    /**
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            routes: [{route: ''}]
        });
    }
	/**
     * @return {void}
     */
    init() {
        super.init();
        // Override routes with list from settings
        if (this.settings.routes) {
            this.routes = this.settings.routes;
        }
        // add title to predefined routes
        this.routes.forEach((route, i) => {
            this.routes[i] = this.discoverRouteByName(route.route);
        });

        let tokens = this.router.currentInstruction.config.route.split('/');
        let route = '';
        while (tokens.length) {
            route += `/${tokens.shift()}`;
            let r = this.discoverRouteByName(route.substr(1));
            if (r) {
                this.routes.push(extend(true, r, {
                    params: this.filterParams(this.router.currentInstruction.params, r),
                    isActive: this.router.currentInstruction.config.name === r.name
                }));
            }
        }
        this.routes =  _.uniqBy(this.routes, 'name');

        this.events.subscribe('components::breacrumbs::routes', (routes = null) => {
            if (routes !== null && Array.isArray(routes)) {
                this.routes = _.uniqBy(routes, 'name');
            }
            return this.routes;
        });
    }
	/**
	 * Discover route by it's name (route key)
	 * @param  {String} route  The name of the route you're searching for.
	 * @return {Object|null}
	 */
    discoverRouteByName(route) {
        let r = _.find(this.router.routes, (o) => o.route === route || o.route.includes(route));
        if (r.redirect) {
            r = _.find(this.router.routes, { route: r.redirect });
        }
        return r;
    }
	/**
	 * [filterParams description]
	 * @method filterParams
	 * @param  {[type]}     params [description]
	 * @param  {[type]}     route  [description]
	 * @return {[type]}            [description]
	 */
    filterParams(params, route) {
        let newParams = {};
        Object.keys(params).forEach((key) => {
            if (route.route.match(new RegExp(`\/:${key}`))) {
                newParams[key] = params[key];
            }
        });
        return newParams;
    }
	/**
	 * @emits 'components::breadcrumbs::attached'
	 */
    attached() {
        this.publishEvent('components::breadcrumbs::attached', this.routes);
    }
}
