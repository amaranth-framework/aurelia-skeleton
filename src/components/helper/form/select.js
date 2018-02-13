/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { bindable, customElement, inlineView } from 'aurelia-framework';

import { CHInputElement } from 'components/helper/form/input';
import { bindableHelper } from 'features/utils/constants';
import { extend } from 'features/utils/object';

/**
 * @type {String}
 */
export const SELECT_BIND_BY_VALUE = 'by-value';

/**
 * @type {String}
 */
export const SELECT_BIND_BY_MODEL = 'by-model';

/**
 * @type {String}
 */
const template = `<template bindable="value">
    <div class.bind="style">
        <label class.bind="settings.styles.label" for.bind="id">\${label}</label>
        <div class="settings.styles.controls">
            <select class="settings.styles.input" id.bind="id" multiple.bind="settings.multiple" value.bind="value">
                <option repeat.for="item of values" if.bind="bindBy === BIND_BY_VALUE" disabled.bind="item.disabled" label.bind="item.label" model.bind="item.value">
                    \${item.label}
                </option>
                <option repeat.for="item of values" if.bind="bindBy === BIND_BY_MODEL" disabled.bind="item.disabled" label.bind="item.label" model.bind="item">
                    \${item.label}
                </option>
            </select>
        </div>
    </div>
</template>`;

/**
 * Input Custom Element.
 * @example
 * <am-input settings.bind="{ settings }" value.bind="value">content</am-input>
 * @extends {Component}
 * @see https://amaranth-framework.github.com/aurelia-skeleton/helper-components/a
 * @see http://aurelia.io/docs/templating/custom-elements#introduction
 */
@customElement('am-select')
@inlineView(template)
export class CHSelectElement extends CHInputElement {
    @bindable(bindableHelper.twoWay) settings = {};
    @bindable(bindableHelper.twoWay) value = '';
    @bindable(bindableHelper.twoWay) values = [];
    @bindable(bindableHelper.twoWay) bindBy = SELECT_BIND_BY_VALUE;
    /**
     * @type {String}
     */
    static BIND_BY_VALUE = SELECT_BIND_BY_VALUE;
    /**
     * @type {String}
     */
    static BIND_BY_MODEL = SELECT_BIND_BY_MODEL;
    /**
     * @type {String}
     */
    BIND_BY_VALUE = SELECT_BIND_BY_VALUE;
    /**
     * @type {String}
     */
    BIND_BY_MODEL = SELECT_BIND_BY_MODEL;
    /**
     * Component's override settings key
     * @return {String}
     */
    overrideSettingsKey = 'components.helper/form-select';
    /**
     * Default Settings.
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            label: '',
            multiple: false
        });
    }
}
