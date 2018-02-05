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
import { extend } from 'features/utils/object';
import { bindableHelper } from 'features/utils/constants';

/**
 * Anchor component (also Custom Element).
 * @example
 * <am-a settings.bind="{ settings }">content</am-a>
 * <compose view-model="components/helper/a" model.bind="{ settings }"></compose>
 * @extends {Component}
 * @see https://amaranth-framework.github.com/aurelia-skeleton/helper-components/a
 * @see http://aurelia.io/docs/templating/custom-elements#introduction
 */
@customElement('am-a')
@inlineView('<template><a am-uuid.bind="__uuid" href.bind="href"><slot>\${content}</slot></a></template>')
@viewResources(PLATFORM.moduleName('resources/html-attributes/am-uuid'))
export class CHAnchor extends Component {
    @bindable(bindableHelper.twoWay) settings = {};
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.uk/a';
    /**
     *
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            href: '#!',
            route: null,
            ukIcon: null
        });
    }
    /**
     * Aurelia Component 'attached' event.
     * @see http://aurelia.io/docs/api/templating/interface/ComponentAttached/method/attached
     * @return {void}
     */
    attached() {
        this.renderUIKit();
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
    /**
     * Obtain anchor's href bases on its settings.
     * @return {String} URL to which anchor will point to.
     */
    get href() {
        const route = this.settings.route;
        const routeHref = route ? this.router._recognizer.generate(route.name, route.params || {}) : null;
        return this.settings.href || routeHref || '#!';
    }
}
