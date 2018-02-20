/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { bindable, customElement, inlineView, viewResources } from 'aurelia-framework';
import UIkit from 'uikit';

import { Component } from 'features/view/component';
import { waitForVariable } from 'features/utils/async';
import { bindableHelper } from 'features/utils/constants';
import { extend } from 'features/utils/object';

const template = `<template>
    <a am-uuid.bind="__uuid" href.bind="aHref" target.bind="aTarget" title.bind="aTitle"><i if.bind="aFaIcon" class="fa fa-\${aFaIcon}"></i><slot>\${aContent}</slot></a>
</template>`;

/**
 * Anchor component (also Custom Element).
 * @example
 * <am-a settings.bind="{ settings }">content</am-a>
 * <compose view-model="components/helper/a" model.bind="{ settings }"></compose>
 * @extends {Component}
 * @see https://amaranth-framework.github.com/aurelia-skeleton/helper-components/a
 * @see http://aurelia.io/docs/templating/custom-elements#introduction
 */
@inlineView(template)
@customElement('am-a')
@viewResources(PLATFORM.moduleName('resources/html-attributes/am-uuid'))
export class CHAnchor extends Component {
    @bindable(bindableHelper.twoWay) settings = {};
    @bindable(bindableHelper.twoWay) faIcon = '';
    @bindable(bindableHelper.twoWay) href = '';
    @bindable(bindableHelper.twoWay) route = null;
    @bindable(bindableHelper.twoWay) target = '_self';
    @bindable(bindableHelper.twoWay) title = '';
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.uk/a';
    /**
     *
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            dispatchEvents: [ 'click' ],
            href: '#!',
            route: null,
            target: '_self',
            title: '',
            ukIcon: null
        });
    }
    /**
     * Aurelia Component 'attached' event.
     * @see http://aurelia.io/docs/api/templating/interface/ComponentAttached/method/attached
     * @return {void}
     */
    attached() {
        // rendering UIKit
        this.renderUIKit();
    }
    /**
     * Obtain anchor's content based on its bindings & settings.
     * @return {String}
     */
    get aContent() {
        return this.content || this.aTitle;
    }
    /**
     * Obtain anchor's faIcon (FontAwesome Icon) based on its bindings & settings.
     * @return {String}
     */
    get aFaIcon() {
        return this.settings.faIcon || this.faIcon;
    }
    /**
     * Obtain anchor's href based on its bindings & settings.
     * @return {String} URL to which anchor will point to.
     */
    get aHref() {
        // aurelia route parameter primes
        const route = this.route || this.settings.route;
        const routeHref = route ? this.router._recognizer.generate(route.name, route.params || {}) : null;
        // return aurelia route obtained href, element binded href or settings href
        return routeHref || this.href || this.settings.href;
    }
    /**
     * Obtain anchor's title based on its bindings & settings.
     * @return {String}
     */
    get aTarget() {
        return this.target || this.settings.target; // || (this.htmlElement || {}).innerText;
    }
    /**
     * Obtain anchor's title based on its bindings & settings.
     * @return {String}
     */
    get aTitle() {
        return this.title || this.settings.title; // || (this.htmlElement || {}).innerText;
    }
    /**
     * Render UIKit options.
     * @see https://getuikit.com/docs/icon#javascript
     * @return {void}
     */
    async renderUIKit() {
        // await for the object seetings
        await waitForVariable(this, obj => obj.settings);
        // console.log('renderIcon', this.htmlElement, this.settings);
        if (this.settings && this.settings.ukIcon) {
            UIkit.icon(this.htmlElement, this.settings.ukIcon);
        }
    }
}
