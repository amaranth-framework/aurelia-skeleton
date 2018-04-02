/**
 * Amaranth Aurelia Utils Library (https://github.com/amaranth-framework/aurelia-utils/)
 *
 * @link      https://github.com/amaranth-framework/aurelia-utils/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   https://github.com/amaranth-framework/aurelia-utils/LICENSE MIT License
 */

import { inject } from 'aurelia-dependency-injection';
import { customAttribute } from 'aurelia-templating';

/**
 * `am-uuid` attribute used by `View` class to select an internal element generated by a component/template
 */
@customAttribute('am-uuid')
@inject(DOM.Element)
export class UuidAttribute {
    /**
     * Creates a new instance of Hide.
     * @param element Target element to conditionally hide. DOM.
     */
    constructor(element) {
        this.element = element;
    }
    /**
     *
     */
    bind() {
        this.element.setAttribute('am-uuid', this.value);
    }
    /**
     * Value Change Event
     * @param  {String}   newValue
     * @param  {String}   oldValue
     * @return {void}
     */
    valueChanged(newValue, oldValue) {
        this.element.style.backgroundColor = newValue;
    }
}
