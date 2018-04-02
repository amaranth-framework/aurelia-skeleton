/**
 * Aurelia Skeleton (https://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      https://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   https://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { View } from 'features/view/view';

const MODE_COMPOSE = 'compose';

const MODE_CUSTOM_ELEMENT = 'custom-element';

/**
 * Abstract Component View (usable with <compose>)
 * @extends {View}
 */
export class Component extends View {
    /**
     * @type {String}
     * @private
     */
    __mode = MODE_COMPOSE;
    /**
     * Describe model given when component is called as <compose/>
     * @type {Object|null}
     * @private
     */
    __model = null;
    /**
     * @see http://aurelia.io/docs/api/router/interface/RoutableComponentActivate/method/activate
     * @return {void}
     */
    activate(model) {

        // copy component's bindables which are passed via model.bind
        // <compose view-model="components/page/title" model.bind="{ settings, ... }"></compose>
        this.__model = model;

        for (let p in model) {
            this[p] = this.__model[p];
        }
        
        if (!this.__initialized) {
            this.init();
            this.__mode = MODE_COMPOSE;
        }
    }
    /**
     * @see http://aurelia.io/docs/api/templating/interface/ComponentCreated/method/created
     * @return {void}
     */
    created(...args) {
        if (!this.__initialized) {
            this.init();
            this.__mode = MODE_CUSTOM_ELEMENT;
        }
    }
}
