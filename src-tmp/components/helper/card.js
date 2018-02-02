/**
 * Amaranth :: Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import UIkit from 'uikit';

import { Component } from 'features/views/component';
import { extend } from 'features/utils';
import environment from 'environment';

/**
 *
 */
export class CHCard extends Component {
    /**
     * Card's model
     * @type {Model|Object}
     */
    model = environment.modelList[0] || {};
    /**
     * See {@link View#overrideSettingsKey}
     * @type {String}
     */
    overrideSettingsKey = 'components.helper/card';
    /**
    * See {@link View#defaultSettings}
    * @return {Object}
    */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            actions: [
                { icon: { icon: 'file-edit' }, title: 'Edit', event: 'model:edit' },
                { icon: { icon: 'trash' }, title: 'Remove', event: 'model:remove' }
            ]
        });
    }
    /**
     * Determines whether icon setting from action is a string.
     * @param  {Object}   action
     * @return {Boolean}
     */
    actionIconIsString(action) {
        return typeof (action || {}).icon === 'string';
    }
    /**
     *
     */
    attached() {
        this.renderActionIcons();
    }
    /**
     *
     */
    renderActionIcons() {
        $(`#card-${this.__uuid} .am-card-actions a`).each((i, element) => {
            let icon = this.settings.actions[i].icon;
            typeof icon === 'object' && UIkit.icon(element, icon);
        });
    }
}
