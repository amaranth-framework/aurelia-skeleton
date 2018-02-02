/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import _ from 'lodash';

import { Template } from 'features/views/template';
import { extend } from 'features/utils';

/**
 * Home Template (Demo)
 */
export class TPages extends Template {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.pages';
    /**
     * @see View:defaultSettings
     * @type {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            pageTitle: {
                content: {
                    title: 'Pages'
                }
            }
        });
    }
    /**
     * Obtain the list of routes for UIkit
     * @return {Array}
     */
    get pagesRoutes() {
        return _.filter(this.router.routes, route => (route.name || '').match(/^pages-/));
    }
}
