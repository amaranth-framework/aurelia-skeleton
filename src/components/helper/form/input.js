/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { bindable, customElement, inlineView } from 'aurelia-framework';

import { Component } from 'features/view/component';
import { bindableHelper } from 'features/utils/constants';
import { extend } from 'features/utils/object';

const template = `<template bindable="value">
    <div class.bind="style">
        <label class.bind="settings.styles.label" for.bind="id">\${label}</label>
        <div class="settings.styles.controls">
            <input class="settings.styles.input" id.bind="id" type="type || settings.type" placeholder.bind="settings.placeholder" value.two-way="value">
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
@customElement('am-input')
@inlineView(template)
export class CHInputElement extends Component {
    @bindable(bindableHelper.twoWay) settings = {};
    @bindable(bindableHelper.twoWay) value = '';
    @bindable(bindableHelper.twoWay) type = 'text';
    /**
     * Component's override settings key
     * @return {String}
     */
    overrideSettingsKey = 'components.helper/form-input';
    /**
     * Default Settings.
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            label: '',
            placeholder: '',
            type: 'text'
        });
    }
    /**
     * Component created callable.
     * @see ...
     */
    created() {
        if (!this.inititalized) {
            this.init();
        }
    }
    /**
     * ID Getter.
     * @return {String}
     */
    get id() {
        return `input-${this.__uuid}`;
    }
    /**
     * Label getter
     * @return {String}
     */
    get label() {
        return (this.settings || {}).label || this.id;
    }
}
