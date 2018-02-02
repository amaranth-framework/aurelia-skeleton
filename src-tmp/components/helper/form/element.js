/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { bindable, bindingMode, customElement, inlineView } from 'aurelia-framework';

import { Component } from 'features/views/component';
import { extend } from 'features/utils';

/**
 * Dropdown Component based on UIKit
 * @link https://getuikit.com/docs/icon
 */
@customElement('am-form-element')
@inlineView(`<div class.bind="style" class="am-element am-element--\${type}">
    <input class.bind="settings.styles.element" type.bind="settings.inputType" value.bind="value" />
    <ul if.bind="elementErrors.length" class="am-element-errors">
        <li repeat.for="error of elementErrors" innerhtml.bind="error"><li>
    </ul>
</div>`)
export class CUKA extends Component {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) settings = {};
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value = '';
    @bindable({ defaultBindingMode: bindingMode.twoWay }) elementErrors = [];
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.uk/a';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            styles: {
                /**
                 * @type {String}
                 */
                element: ''
            }
        });
    }
    /**
     * Return element type
     * @return {String}
     */
    get type() {
        return this.settings.type || 'input';
    }
}
