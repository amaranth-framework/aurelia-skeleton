/**
 * Aurelia Skeleton (https://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      https://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   https://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { EventAggregator } from 'aurelia-event-aggregator';

/**
 * Trait for handling events within a class.
 */
export class Eventable {
    /**
     * @private
     * @type {Array}
     */
    __events = [];
    /**
     * @private
     */
    __testEvents() {
        if (!this.events) {
            throw Error('Class is missing \'events\' variable. You cannot add \'Eventable\' trait.');
        }
        if (!this.events instanceof EventAggregator) {
            throw Error('Variable \'events\' is not of \'aurelia-event-aggregator/EventAgregator\' type. You cannot add \'Eventable\' trait.');
        }
    }
    /**
     * See {@link EventAggregator#subscribe}
     * @param  {String}   eventName
     * @param  {Function} eventMethod
     */
    subscribeEvent(...args) {
        this.__testEvents();
        this.__events = this.__events || [];
        this.__events.push(this.events.subscribe(...args));
        this.logger && this.logger instanceof Logger && this.logger.debug('Event subscribed: ', ...args);
    }
    /**
     * See {@link EventAggregator#subscribeOnce}
     * @param  {String}   eventName
     * @param  {Function} eventMethod
     */
    subscribeEventOnce(...args) {
        this.__testEvents();
        this.__events = this.__events || [];
        this.__events.push(this.events.subscribeOnce(...args));
        this.logger && this.logger instanceof Logger && this.logger.debug('Event subscribed (once): ', ...args);
    }
    /**
     * See {@link EventAggregator#publish}
     */
    publishEvent(...args) {
        this.__testEvents();
        this.events.publish(...args);
        this.logger && this.logger instanceof Logger && this.logger.debug('Event published: ', ...args);
    }
    /**
     * See {@link EventAggregator#subscribe#dispose}
     */
    disposeEvents() {
        this.__testEvents();
        if (this.__events && Array.isArray(this.__events)) {
            this.__events.forEach((event) => event.dispose());
        }
    }
}
