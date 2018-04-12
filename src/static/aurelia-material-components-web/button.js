
import { bindable, customElement, inlineView } from 'aurelia-templating';

import { CustomElement } from './custom-element';

import '@material/button/dist/mdc.button.min.css';

const template = `<template>
    <button class.bind="classSet" disabled.bind="disabled">
        <slot></slot>
    </button>
</template>`;

/**
 * Material Design Button
 * @see {@link https://material.io/components/web/catalog/buttons/}
 * @see {@link https://material-components-web.appspot.com/button.html}
 *
 * @example
 * <require from="aurelia-material-components-web/button"></require>
 * <mdc-button style="mdc-ripple-upgraded">Button</mdc-button>
 */
@customElement('mdc-button')
@inlineView(template)
export class Button extends CustomElement {
    /**
     * @type {Boolean}
     */
    @bindable disabled = false;
    /**
     * @type {Boolean}
     */
    @bindable raised = false;
    /**
     * @type {Boolean}
     */
    @bindable unelevated = false;
    /**
     * @type {Boolean}
     */
    @bindable stroked = false;
    /**
     * @return {String}
     */
    get classSet() {
        return [
            'mdc-button',
            this.raised && 'mdc-button--raised' || '',
            this.unelevated && 'mdc-button--unelevated' || '',
            this.stroked && 'mdc-button--stroked' || '',
            this.styles
        ].join(' ').trim();
    }
}


