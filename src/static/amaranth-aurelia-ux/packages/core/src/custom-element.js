

import { Component } from 'static/amaranth-aurelia-utils';
import { bindable, customElement, inlineView } from 'aurelia-framework';

const template = '<slot></slot>';

/**
 *
 */
@customElement('am-ux-element')
@inlineView(template)
export class CustomElement extends Component {
    /**
     * @type {String}
     */
    overrideSettingsKey = 'am-ux/element';

    get defaultSettings() {
        return {
            theme: ''
        }
    }
}
