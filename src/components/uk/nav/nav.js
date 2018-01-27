/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import _ from 'lodash';

import { Component } from 'features/views/component';
import { extend } from 'features/utils';

/**
 * Dropdown Component based on UIKit
 * @link https://getuikit.com/docs/nav
 */
export class ComponentUKNav extends Component {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.uk/nav';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            filter: {
                nav: true
            },
            // @link https://getuikit.com/docs/nav#component-options
            nav: '',
            // routes to render
            routes: false,
            // style/layout for uk-nav
            style: 'uk-nav-default',
            // styles for uk-nav's sub-components
            styles: {

            }
        });
    }
    /**
     *
     * @param {{}} route
     */
    classForLi(route) {
        let set = [];
        route.isActive && set.push('uk-active');
        route.isDivider && set.push('uk-nav-divider');
        return set.join(' ');
    }
    /**
     *
     * @param {{}} route
     */
    classForA(route) {
        let set = (route.style || '').split(' ');
        route.icon && set.push('uk-icon');
        return set.join(' ');
    }
    /**
     * @param {Array} list
     * @return {String}
     */
    classForSubroutes(list) {
        let set = [];
        // @link https://getuikit.com/docs/navbar#multiple-columns
        if (this.hasMultipleColumns(list)) {
            set.push(`uk-navbar-dropdown-width-${list.length}`);
        }
        return set.join(' ');
    }
    /**
     * Obtain a set of routes based on a list of route names
     * @param {Array} list
     * @return {Array}
     */
    findSubroutes(list) {
        return _.filter(this.routes, (route) => (list || []).includes(route.name));
    }
    /**
     * Obtain the routes to render, based on a filter given in stetting object
     * @return {Array}
     */
    get filteredRoutes() {
        // filter the routes to display
        return _.filter(this.routes, this.settings.filter).map(route => {
            // set default params object if not exists
            route.params = route.params || {};
            return route;
        });
    }
    /**
     * Test wether list of subroutes is set on multiple columns. (Basicly test if array is formed of multiple arrays).
     * @param {Array} list
     */
    hasMultipleColumns(list) {
        return list.length > 1 && list.map(a => Array.isArray(a)).reduce((a, b) => a && b);
    }
    /**
     * @getter
     * @return {Array}
     */
    get routes() {
        // determine whether to use local routes or the global router
        return (this.settings.routes && this.settings.routes.length) ? this.settings.routes : this.router.routes;
    }
}
