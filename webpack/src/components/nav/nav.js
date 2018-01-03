import _ from 'lodash';

import { Component } from 'features/views/component';
import { extend } from 'features/utils';

export class ComponentNav extends Component {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav';
    /**
     * @param  {{}}       route [description]
     * @return {String}         [description]
     */
    cssClassesDropdownItem(route) {
        let classes = [];
        route.divider && classes.push('dropdown-divider');
        route.divider || classes.push('dropdown-item');
        route.active && classes.push('active');
        return classes.join(' ');
    }
    /**
    * @param  {{}}       route [description]
    * @return {String}         [description]
    */
    cssClassesNavItem(route) {
        let classes = [];
        route.active && classes.push('active');
        route.routes && route.routes.length && classes.push('dropdown');
        return classes.join(' ');
    }
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            routes: [],
            filter: {
                nav: true
            }
        });
    }
    /**
     * Search for a list of routes, by their name
     * @param  {Array}   names
     * @return {Array[Object]}
     */
    findRoutes(names) {
        return names.map((name) => this.findRoute(name));
    }
    /**
     * Search for a route name in the routes array
     * @param  {String} name
     * @return {Object}
     */
    findRoute(name) {
        return _.find(this.router.routes, {name: name}) || {name: name};
    }
    /**
     * [filteredRoutes description]
     * @return {Array}
     */
    get filteredRoutes() {
        return _.filter(
            (this.settings.routes.length) ? this.settings.routes : this.router.routes,
            this.settings.filter
        );
    }
    /**
     * Determine whether is navbar-nav or not.
     * @return {Boolean}
     */
    get isNavbarNav() {
        return this.settings.style && this.settings.style.match(/navbar-nav/);
    }
}
