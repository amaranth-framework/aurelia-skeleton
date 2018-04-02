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

const template = `<template>
    <require from="components/helper/a"></require>
    <ul class.bind="style">
        <li repeat.for="icon of iconnavIcons()">
            <am-a settings.bind="icon"></am-a>
        </li>
    </ul>
</template>`;

/**
 * IconNav Custom Element
 * @example
 * <am-nav-iconnav settings.bind="{ ...settings? }" icons.bind="...icons"></am-nav-iconnav>
 * <compose view-model="components/nav/iconnav" model.bind="{ ...settings }"></compose>
 * @extends {Component}
 * @see https://amaranth-framework.github.com/aurelia-skeleton/helper-components/a
 * @see http://aurelia.io/docs/templating/custom-elements#introduction
 */
@inlineView(template)
@customElement('am-nav-iconnav')
export class CHIconNav extends Component {
    @bindable(bindableHelper.twoWay) settings = {};
    @bindable(bindableHelper.twoWay) icons = null;
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav/iconnav';
    /**
     *
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            icons: null
        });
    }
    /**
     * Addapted list of icons for component. Pulls information from `this.icons` and `this.settings.icons`.
     * @return {Array<Object>}
     */
    iconnavIcons() {
        const icons = this.icons || this.settings.icons || [];
        if (!icons.length) {
            this.logger.warning('IconNav component should be given a set of icons.');
        }
        return icons.map(icon  => ({
            ...icon
        }));
    }
}
