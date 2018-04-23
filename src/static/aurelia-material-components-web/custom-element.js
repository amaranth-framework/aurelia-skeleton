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
     * Aurelia Bind Event
     * @param  {Object}  bindingContext
     * @param  {Object}  overrideContext
     * @param  {Boolean} [_systemUpdate=true]
     * @return {void}
     */
    bind(bindingContext, overrideContext, _systemUpdate = true) {
        // this.parent = _.get(overrideContext, 'parentOverrideContext.bindingContext');
    }
    /**
     * @return {HTMLElement}
     */
    getElement() {
        return this.element;
    }
    /**
     * @param {Object} classes
     * @param {String} [suffix='']
     */
    prepareClasses(classes = {}, suffix = '') {
        // append class properties
        classes[`${this['styles' + suffix]}`] = true;
        // return class list
        return Object.keys(classes).filter(key => classes[key]).join(' ');
    }
}