/**
 * Aurelia Skeleton (https://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      https://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   https://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

/**
 * @external {AureliaConfiguration} https://github.com/Vheissu/aurelia-configuration
 */
/**
 * @external {EventAggregator} http://aurelia.io/docs/api/event-aggregator
 */
/**
 * @external {I18N} http://aurelia.io/docs/api/i18n
 */
/**
 * @external {Logger} http://aurelia.io/docs/api/logging
 */
/**
 * @external {Router} http://aurelia.io/docs/api/router
 */
/**
 * @external {UUID} https://github.com/pnegri/uuid-js
 */

// import { inject, LogManager } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AureliaConfiguration } from 'aurelia-configuration';
import { inject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { Router } from 'aurelia-router';
import { excludes, traits } from 'traits-decorator';
import UUID from 'uuid-js';

import { Eventable } from 'features/traits/eventable';
import { Loggable } from 'features/traits/loggable';
import { RESTable } from 'features/traits/restable';
import { className, parentClassName } from 'features/utils';

/**
 * Aurelia class base for almost each functionality we may build.
 * 
 * @extends {Eventable}
 * @extends {Loggable}
 * @extends {RESTable}
 */
@traits(Eventable, Loggable::excludes('toString'), RESTable)
@inject(AureliaConfiguration, EventAggregator, I18N, Router)
export class Base {
    /**
     * Constructor
     * 
     * @param {AureliaConfiguration} config Aurelia configuration plugin
     * @param {EventAggregator}      events Aurelia EventAggregator module
     * @param {I18N}                 i18n   Aaurelia i18n plugin
     * @param {Router}               router Aurelia Router module
     */
    constructor(config, events, i18n, router) {
        /**
         * @type {AureliaConfiguration}
         */
        this.config = config;
        /**
         * @type {EventAggregator}
         */
        this.events = events;
        /**
         * @type {I18N}
         */
        this.i18n = i18n;
        /**
         * @type {Router}
         */
        this.router = router;
        /**
         * @type {UUID}
         */
        this.__uuid = UUID.create(4);
        /**
         * @type {Logger}
         */
        this.logger = this.getLogger();
    }
    /**
     * Reduce class to a string identifier
     * @return {String}
     */
    toString() {
        return `${parentClassName(this) || 'Object'}/${className(this)}/${this.__uuid.toString()}`;
    }
}
