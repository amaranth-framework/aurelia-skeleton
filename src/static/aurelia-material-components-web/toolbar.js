
import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { bindable, customElement, inlineView } from 'aurelia-templating';

import { CustomElement } from './custom-element';

import '@material/toolbar/dist/mdc.toolbar.min.css';

const template = `<template>
    <header class.bind="classSet">
        <div class.bind="classSetRow">
            <section if.bind="useDefaultHeader" class="mdc-toolbar__section mdc-toolbar__section--align-start">
                <a href="#" click.trigger="events.publish('mdc:toolbar:menu-icon:click', target)" class="material-icons mdc-toolbar__menu-icon">menu</a>
                <span class="mdc-toolbar__title" innerhtml.bind="title"></span>
            </section>
        </div>
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
    @bindable useDefaultHeader = true;
    /**
     * @type {String}
     */
    @bindable styleRow = '';
    /**
     * @type {String}
     */
    @bindable target = 'main-drawer';
    /**
     * @type {String}
     */
    @bindable title = 'Toolbar Title';
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
     * @return {String}
     */
    get classSet() {
        return [
            'mdc-toolbar',
            this.styles
        ].join(' ').trim();
    }
    /**
     * @return {String}
     */
    get classSetRow() {
        return [
            'mdc-toolbar__row',
            this.stylesRow
        ].join(' ').trim();
    }
}
