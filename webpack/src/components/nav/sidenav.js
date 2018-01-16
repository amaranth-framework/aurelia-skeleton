/**
 * Amaranth - Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { Component } from 'features/views/component';
import { extend, waitForElements } from 'features/utils';

/**
 * Components/Nav/Sidenav
 */
export class CNavSidenav extends Component {
    /**
     * @type {String}
     */
    overrideSettingsKey = 'components.nav/sidenav';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            routeFilter: {
                nav: true
            },
            routes: [],
            styles: {
                sidenav: '',
                sidenavTrigger: ''
            }
        });
    }
    /**
     * @see View:attached()
     */
    attached() {
        waitForElements(`#nav-mobile-${this.__uuid}`).then(() => {
            $('.sidenav').sidenav();
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
