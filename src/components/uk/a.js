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
 * @link https://getuikit.com/docs/icon
 */
@customElement('am-a')
@inlineView(`<template>
    <a if.bind="!settings.route" am-uuid.bind="__uuid" href.bind="settings.href || '#!'"><slot></slot></a>
    <a if.bind="settings.route" am-uuid.bind="__uuid" route-href="route.bind: settings.route.name || ''"><slot></slot></a>
</template>`)
@viewResources(PLATFORM.moduleName('resources/html-attributes/am-uuid'))
export class CUKA extends Component {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) settings = {};
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
            href: '#!',
            route: null,
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
        // console.log('renderIcon', this.htmlElement, this.settings);
        // if (this.settings && this.settings.ukIcon) {
        //     UIkit.icon(this.htmlElement, this.settings.ukIcon);
        // }
    }
}
