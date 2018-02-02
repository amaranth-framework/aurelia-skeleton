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
export class ComponentUKNavbar extends Component {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.uk/navbar';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            components: [
                {
                    module: PLATFORM.moduleName('components/uk/nav/nav'),
                    settings: {
                        isPartOfNavbar: true,
                        style: 'uk-navbar-nav'
                    },
                    type: 'nav-left'
                }
            ],
            styles: {
                'nav-left': 'uk-navbar-left'
            }
        });
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
