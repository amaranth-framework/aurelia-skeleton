/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import 'highlight.js/styles/github.css';

import { TDemo } from 'templates/demo/demo';
import { extend } from 'features/utils';

/**
 * Home Template (Demo)
 */
export class TComponentsBreadcrumb extends TDemo {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.components/uk/breadcrumb';
    /**
     * @see View:defaultSettings
     * @type {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            pageTitle: {
                content: {
                    title: 'Breadcrumb'
                }
            }
        });
    }
}
