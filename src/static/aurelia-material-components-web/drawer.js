
import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { bindable, customElement, inlineView } from 'aurelia-templating';
import _ from 'lodash';
import { MDCTemporaryDrawer } from '@material/drawer';

import { CustomElement } from './custom-element';

import '@material/drawer/dist/mdc.drawer.min.css';

const template = `<template>
    <nav class.bind="classSet" click.trigger="events.publish('mdc:drawer:change', target)">
        <nav class.bind="classSetContent">
            <slot></slot>
        </nav>
    </nav>
</template>`;

const templateContent = `<template>
    <div class.bind="classSet">
        <slot></slot>
    </div>
</template>`;

const templateHeader = `<template>
    <header class.bind="classSet">
        <div class.bind="classSetContent">
            <slot></slot>
        </div>
    </header>
</template>`;

/**
 * Material Design Drawer
 * @see {@link https://material.io/components/web/catalog/drawers/}
 * @see {@link https://material-components-web.appspot.com/drawer/index.html}
 *
 * @example
 * <require from="aurelia-material-components-web/drawer"></require>
 * <mdc-drawer>
 *   <!-- Drawer's Content -->
 * </mdc-drawer>
 */
@customElement('mdc-drawer')
@inject(EventAggregator)
@inlineView(template)
export class Drawer extends CustomElement {
    /**
     * @type {Boolean}
     */
    @bindable open = false;
    /**
     * @type {Boolean}
     */
    @bindable permanent = false;
    /**
     * @type {Boolean}
     */
    @bindable persistent = false;
    /**
     * @type {String}
     */
    @bindable stylesContent = '';
    /**
     * @type {String}
     */
    @bindable target = 'default';
    /**
     * @type {Boolean}
     */
    @bindable temporary = false;
    /**
     * @param {EventAggregator} events
     */
    constructor(events, ...args) {
        super(...args);
        /**
         * @type {EventAggregator}
         */
        this.events = events;
    }
    /**
     * Aurelia Bind Event
     */
    bind(...args) {
        super.bind(...args);

        this.drawerElement = this.element.querySelector('.mdc-drawer');

        if (this.temporary) {
            this.drawerLegacy = new MDCTemporaryDrawer(this.drawerElement);
        }

        this.openEvent = this.events.subscribe('mdc:drawer:change', (target) => {
            if (this.target !== target) {
                return;
            }
            this.open = !this.open;
        });
    }
    /**
     * @return {String}
     */
    get classSet() {
        return this.prepareClasses({
            'mdc-drawer': true,
            'mdc-drawer--open': this.open,
            'mdc-drawer--permanent': this.permanent,
            'mdc-drawer--persistent': this.persistent,
            'mdc-drawer--temporary': this.temporary
        });
    }
    /**
     * @return {String}
     */
    get classSetContent() {
        return this.prepareClasses({ 'mdc-drawer__drawer': true }, 'Content');
    }
    /**
     *
     */
    unbind() {
        this.openEvent.dispose();
    }
}

/**
 * Material Design Drawer's Content
 * @see {@link https://material.io/components/web/catalog/drawers/}
 * @see {@link https://material-components-web.appspot.com/drawer/index.html}
 *
 * @example
 * <require from="aurelia-material-components-web/drawer"></require>
 * <mdc-drawer>
 *   <mdc-drawer-content>
 *     <!-- Drawer Content's Content -->
 *   </mdc-drawer-content>
 * </mdc-drawer>
 */
@customElement('mdc-drawer-content')
@inlineView(templateContent)
export class DrawerContent extends CustomElement {
    /**
     * @return {String}
     */
    get classSet() {
        return this.prepareClasses({ 'mdc-drawer__content': true });
    }
}

/**
 * Material Design Drawer's Header
 * @see {@link https://material.io/components/web/catalog/drawers/}
 * @see {@link https://material-components-web.appspot.com/drawer/index.html}
 *
 * @example
 * <require from="aurelia-material-components-web/drawer"></require>
 * <mdc-drawer>
 *   <mdc-drawer-header>
 *     <!-- Drawer Header's Content -->
 *   </mdc-drawer-header>
 * </mdc-drawer>
 */
@customElement('mdc-drawer-header')
@inlineView(templateHeader)
export class DrawerHeader extends CustomElement {
    /**
     * @type {String}
     */
    @bindable stylesContent = '';
    /**
     * @return {String}
     */
    get classSet() {
        return this.prepareClasses({ 'mdc-drawer__header': true });
    }
    /**
     * @return {String}
     */
    get classSetContent() {
        return this.prepareClasses({ 'mdc-drawer__header-content': true }, 'Content');
    }
}
