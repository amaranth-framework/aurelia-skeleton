/**
 * Amaranth Aurelia Utils Library (https://github.com/amaranth-framework/aurelia-utils/)
 *
 * @link      https://github.com/amaranth-framework/aurelia-utils/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   https://github.com/amaranth-framework/aurelia-utils/LICENSE MIT License
 */

/**
 * Aurelia Utils Configuration Object
 * @type {Object}
 */
export let UTILS = {
    /**
     * If packing Aurelia with Webpack, PLATFORM needs to be the value of imported PLATFORM from `aurelia-pal` module.
     * @type {Object|undefined}
     * @example
     * // in main.js
     * import { PLATFORM } from 'aurelia-pal';
     * import { UTILS } from 'static/amaranth-aurelia-utils';
     * 
     * UTILS.PLATFORM = PLATFORM;
     */
    PLATFORM: undefined
}

export { UuidAttribute } from './attributes';

export { Eventable, Loggable, RESTable, RouteActive, RoutableREST, Routable } from './traits';

export { Base, Component, Model, View, Template } from './view';
