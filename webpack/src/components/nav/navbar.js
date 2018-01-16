/**
 * Amaranth - Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { Component } from 'features/views/component';
import { extend } from 'features/utils';

/**
 * Components/Nav/Navbar
 */
export class CNavNavbar extends Component {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav/navbar';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            logo: {
                style: 'left'
            },
            routeFilter: {
                nav: true
            },
            routes: [],
            style: '',
            styles: {
                links: 'right'
            }
        });
    }
    /**
     * Obtain the routes to be render by the component
     * @getter
     */
    get routes() {
        // determine whether routes are to be taken from settings or from the app routes
        let routes = (this.settings.routes.length) ? this.settings.routes : this.router.routes;
        // filter routes
        // @see https://lodash.com/docs/4.17.4#filter
        return _.filter(routes, this.settings.routeFilter);
    }
}
