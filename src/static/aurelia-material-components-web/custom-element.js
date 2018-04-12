import { inject } from 'aurelia-dependency-injection';
import { bindable } from 'aurelia-templating';

@inject(Element)
export class CustomElement {
    @bindable styles = '';
    /**
     * Constructor
     * @param {HTMLElement} element
     */
    constructor(element) {
        this.element = element;
    }
    /**
     * @return {HTMLElement}
     */
    getElement() {
        return this.element;
    }
}