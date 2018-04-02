/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import _ from 'lodash';

import { Template } from 'features/view/template';
import { extend } from 'features/utils/object';

/**
 * Home Template (Demo)
 */
export class TDComponents extends Template {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.components';
    /**
     * @see View:defaultSettings
     * @type {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            pageTitle: {
                content: {
                    title: 'Helper Components'
                }
            }
        });
    }
    /**
     * Obtain the list of routes for UIkit
     * @return {Array}
     */
    get routes() {
        const cRoute = _.find(this.router.routes, { name: 'components' });
        return _.filter(this.router.routes, route => cRoute.subroutes.includes(route.name));
    }
}