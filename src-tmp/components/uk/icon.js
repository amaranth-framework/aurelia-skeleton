/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { bindable, bindingMode, customElement, inlineView, viewResources } from 'aurelia-framework';
import UIkit from 'uikit';

import { Component } from 'features/views/component';
import { extend, waitForVariable } from 'features/utils';

/**
 * Dropdown Component based on UIKit
 * @link https://getuikit.com/docs/nav
 */
@customElement('am-icon')
@inlineView('<template><span am-uuid.bind="__uuid" class.bind="style"><slot></slot></span></template>')
@viewResources(PLATFORM.moduleName('resources/html-attributes/am-uuid'))
export class CUKIcon extends Component {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) settings = {};
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.uk/icon';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            ukIcon: null
        });
    }
    /**
     * See {@link View#attached}
     */
    attached() {
        this.renderIcon();
    }
    /**
     * @return {void}
     */
    async renderIcon() {
        await waitForVariable(this, obj => obj.settings);
        // console.log('renderIcon', this, this.htmlElement, this.settings);
        if (!this.settings.ukIcon) {
            this.logger.warn('`ukIcon` setting is not defined. Please define.');
        }
        if (!this.settings.ukIcon.icon) {
            this.logger.warn('`ukIcon.icon` setting is not defined. Please define.');
        }
        UIkit.icon(this.htmlElement, this.settings.ukIcon);
    }
}
