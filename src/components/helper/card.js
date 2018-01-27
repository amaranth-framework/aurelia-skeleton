import { Component } from 'features/views/component';
import { extend } from 'features/utils';

import UIkit from 'uikit';

/**
 *
 */
export class CHCard extends Component {
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
        })
    }
}
