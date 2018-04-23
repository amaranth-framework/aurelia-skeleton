
import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { bindable, customElement, inlineView } from 'aurelia-templating';

import { MDCToolbar } from '@material/toolbar';
// const toolbar = new MDCToolbar(document.querySelector('.mdc-toolbar'));

import { CustomElement } from './custom-element';

import '@material/toolbar/dist/mdc.toolbar.min.css';

//  click.trigger="events.publish('mdc:toolbar:menu-icon:click', target)"
const template = `<template>
    <header class.bind="classSet">
        <slot></slot>
    </header>
</template>`;

/**
 * Material Design Button
 * @see {@link https://material.io/components/web/catalog/toolbar/}
 * @see {@link https://material-components-web.appspot.com/toolbar/index.html}
 *
 * @example
 * <require from="aurelia-material-components-web/toolbar"></require>
 * <mdc-toolbar style="mdc-ripple-upgraded">Button</mdc-toolbar>
 */
@customElement('mdc-toolbar')
@inject(EventAggregator)
@inlineView(template)
export class Toolbar extends CustomElement {
    /**
     * @type {Boolean}
     */
    @bindable fixed = false;
    /**
     * @type {Boolean}
     */
    @bindable fixedLastrowOnly = false;
    /**
     * @type {Boolean}
     */
    @bindable flexible = false;
    /**
     * @type {Boolean}
     */
    @bindable waterfall = false;
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
     * Aurelia Attached Event
     */
    attached() {
        this.toolbarLegacy = new MDCToolbar(this.toolbarElement);
    }
    /**
     * Aurelia Bind Event
     * @param  {Object}  bindingContext
     * @param  {Object}  overrideContext
     * @param  {Boolean} [_systemUpdate=true]
     * @return {void}
     */
    bind(...args) {
        super.bind(...args);
        this.toolbarElement = this.element.querySelector('.mdc-toolbar');
    }
    /**
     * @return {String}
     */
    get classSet() {
        return this.prepareClasses({
            'mdc-toolbar': true,
            'mdc-toolbar--fixed': this.fixed,
            'mdc-toolbar--fixed-lastrow-only': this.fixedLastrowOnly,
            'mdc-toolbar--flexible': this.flexible,
            'mdc-toolbar--waterfall': this.waterfall
        });
    }
}

const templateRow = `<template>
    <div class="mdc-toolbar__row">
        <slot></slot>
    </div>
</template>`;

/**
 * Material Design Button
 * @see {@link https://material.io/components/web/catalog/toolbar/}
 * @see {@link https://material-components-web.appspot.com/toolbar/index.html}
 *
 * @example
 * <require from="aurelia-material-components-web/toolbar"></require>
 * <mdc-toolbar style="mdc-ripple-upgraded">Button</mdc-toolbar>
 */
@customElement('mdc-toolbar-row')
@inlineView(templateRow)
export class ToolbarRow extends CustomElement {
    /**
     * @return {String}
     */
    get classSet() {
        return this.prepareClasses({ 'mdc-toolbar__row': true });
    }
}

const templateSection = `<template>
    <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
        <slot></slot>
    </section>
</template>`;

/**
 * Material Design Button
 * @see {@link https://material.io/components/web/catalog/toolbar/}
 * @see {@link https://material-components-web.appspot.com/toolbar/index.html}
 *
 * @example
 * <require from="aurelia-material-components-web/toolbar"></require>
 * <mdc-toolbar style="mdc-ripple-upgraded">Button</mdc-toolbar>
 */
@customElement('mdc-toolbar-section')
@inlineView(templateSection)
export class ToolbarSection extends CustomElement {
    /**
     * @type {Boolean}
     */
    @bindable alignEnd = false;
    /**
     * @type {Boolean}
     */
    @bindable alignStart = false;
    /**
     * @type {Boolean}
     */
    @bindable shrinkToFit = false;
    /**
     * @return {String}
     */
    get classSet() {
        return this.prepareClasses({
            'mdc-toolbar__section': true,
            'mdc-toolbar__section--align-end': this.alignEnd,
            'mdc-toolbar__section--align-start': this.alignStart,
            'mdc-toolbar__section--shrink-to-fit': this.shrinkToFit
        });
    }
}

const templateSectionDefault = `<template>
    <mdc-toolbar-section styles.bind="styles">
        <a href="#" class.bind="classSetAnchor" click.trigger="events.publish('mdc:drawer:change', target)">menu</a>
        <span class.bind="classSetTitle"><slot></slot></span>
    </mdc-toolbar-section>
</template>`;

/**
 * Material Design Button
 * @see {@link https://material.io/components/web/catalog/toolbar/}
 * @see {@link https://material-components-web.appspot.com/toolbar/index.html}
 *
 * @example
 * <require from="aurelia-material-components-web/toolbar"></require>
 * <mdc-toolbar style="mdc-ripple-upgraded">Button</mdc-toolbar>
 */
@customElement('mdc-toolbar-section-default')
@inject(EventAggregator)
@inlineView(templateSectionDefault)
export class ToolbarSectionDefault extends CustomElement {
    /**
     * @type {String}
     */
    @bindable target = 'default';
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
    }
    /**
     * @return {String}
     */
    get classSetAnchor() {
        return this.prepareClasses({
            'material-icons': true,
            'mdc-toolbar__menu-icon': true
        }, 'Anchor');
    }
    /**
     * @return {String}
     */
    get classSetTitle() {
        return this.prepareClasses({ 'mdc-toolbar__title': true }, 'Title');
    }
}
