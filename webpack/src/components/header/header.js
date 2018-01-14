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
 * Components/Header
 */
export class CHeader extends Component {
    /**
     * @type {String}
     */
    overrideSettingsKey = 'components.header';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {});
    }
}
