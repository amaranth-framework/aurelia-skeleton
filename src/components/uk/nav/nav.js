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
     * Obtain the routes to render, based on a filter given in stetting object
     * @return {Array}
     */
    get filteredRoutes() {
        // determine whether to use local routes or the global router
        let routes = (this.settings.routes && this.settings.routes.length) ? this.settings.routes : this.router.routes;
        // console.log(routes);
        // filter the routes to display
        return _.filter(routes, this.settings.filter).map(route => {
            // set default params object if not exists
            route.params = route.params || {};
            return route;
        });
    }
}
