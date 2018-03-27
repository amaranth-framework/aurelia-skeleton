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
 * @external {NavigationInstructions} http://aurelia.io/docs/api/router/interface/NavigationInstructions
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
 * @external {ComponentAttached} http://aurelia.io/docs/api/templating/interface/ComponentAttached/
 */
/**
 * @external {ComponentBind} http://aurelia.io/docs/api/templating/interface/ComponentBind/
 */
/**
 * @external {ComponentCreate} http://aurelia.io/docs/api/templating/interface/ComponentCreated/
 */
/**
 * @external {ComponentDetached} http://aurelia.io/docs/api/templating/interface/ComponentDetached/
 */
/**
 * @external {ComponentDetached.detached} http://aurelia.io/docs/api/templating/interface/ComponentDetached/method/detached
 */
/**
 * @external {ComponentUnbind} http://aurelia.io/docs/api/templating/interface/ComponentUnbind/
 */
/**
 * @external {ConfiguresRouter} http://aurelia.io/docs/api/templating/interface/ConfiguresRouter/
 */
/**
 * @external {DynamicComponentGetViewStrategy} http://aurelia.io/docs/api/templating/interface/DynamicComponentGetViewStrategy
 */
/**
 * @external {NavigationInstructions} http://aurelia.io/docs/api/router/interface/NavigationInstructions
 */
/**
 * @external {RoutableComponentActivate} http://aurelia.io/docs/api/router/interface/RoutableComponentActivate
 */
/**
 * @external {RoutableComponentCanActivate} http://aurelia.io/docs/api/router/interface/RoutableComponentCanActivate
 */
/**
 * @external {RoutableComponentCanDeactivate} http://aurelia.io/docs/api/router/interface/RoutableComponentCanDeactivate
 */
/**
 * @external {RoutableComponentDeactivate} http://aurelia.io/docs/api/router/interface/RoutableComponentDeactivate
 */
/**
 * @external {RouteConfig} http://aurelia.io/docs/api/router/interface/RouteConfig
 */

import { Container, inject, NewInstance } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AureliaConfiguration } from 'aurelia-configuration';
import { I18N } from 'aurelia-i18n';
import { Router } from 'aurelia-router';
import { validateTrigger, ValidationController } from 'aurelia-validation';
import { className, extend, parentClassName, traits, traitsExclude, uuid } from 'amaranth-utils';

import { Eventable, Loggable, RESTable } from './traits';

/**
 * Aurelia class base for almost each functionality we may build.
 * @abstract
 * @extends {Eventable}
 * @extends {Loggable}
 */
@inject(AureliaConfiguration, EventAggregator, I18N, Router)
export class Base {
    /**
     * Constructor
     * @param {AureliaConfiguration} config Aurelia configuration plugin
     * @param {EventAggregator}      events Aurelia EventAggregator module
     * @param {I18N}                 i18n   Aurelia i18n plugin
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
        this.__uuid = uuid();
        /**
         * @type {Logger}
         */
        this.logger = this.getLogger();
        /**
         * @type {Object}
         */
        this.settings = {};
    }
    /**
     * Reduce class to a string identifier
     * @return {String}
     */
    toString() {
        return `${parentClassName(this) || 'Object'}/${className(this)}@${this.__uuid}`;
    }
}
traits(
    Base,
    traitsExclude(Loggable, 'toString'),
    Eventable
);

/**
 * Abstract Class for all Model Views (Components) used within the project
 * @extends {Base}
 * @implements {ComponentAttached}
 * @implements {ComponentBind}
 * @implements {ComponentCreate}
 * @implements {ComponentDetached}
 * @implements {ComponentUnbind}
 * @implements {ConfiguresRouter}
 * @implements {DynamicComponentGetViewStrategy}
 * @implements {RoutableComponentActivate}
 * @implements {RoutableComponentCanActivate}
 * @implements {RoutableComponentCanDeactivate}
 * @implements {RoutableComponentDeactivate}
 */
// @inject(Messages)
export class View extends Base {
    /*************************************************************************************
     * Inherited
     *************************************************************************************/
    /**
     * @see Base#constructor
     * @param {Messages} messages
     */
    // constructor(messages, ...args) {
    //     super(...args);
    //     /**
    //      * @type {Messages}
    //      */
    //     this.messages = messages;
    // }
    /**
     * Invoked when the databinding engine binds the view. The binding context is the instance that the view is
     * databound to.
     * @see http://aurelia.io/docs/api/templating/interface/ComponentBind/method/bind
     * @param  {Object}  bindingContext
     * @param  {Object}  overrideContext
     * @param  {Boolean} _systemUpdate default true
     * @return {void}
     */
    bind(bindingContext, overrideContext, _systemUpdate = true) {
        // this.logger.debug('test-life bind', bindingContext, overrideContext, _systemUpdate);
        /**
         * Parent view/model
         * @type {Object}
         */
        this.parent = overrideContext.parentOverrideContext.bindingContext;
    }
    /**
     * Default view settings, as follows
     * - style: '',    => css classes for page (each class will be added to body element having page- prefix)
     * - styles: {},   => set of css classes that can be used throughout different sections of the template
     * - content: {},  => translation keys for different text/html components in the template
     * - service: {},  => possible service settings for templates
     * - services: {}  => possible services settings for templates
     * @return {Object}
     */
    get defaultSettings() {
        return {
            style: '',
            styles: {},
            content: {},
            service: {},
            services: {}
        };
    }
    /**
     * @see http://aurelia.io/docs/api/templating/interface/ComponentDetached/method/detached
     */
    detached(...args) {
        // this.logger.debug('test-life detached', ...args);
        this.disposeEvents();
    }
    /**
     * Specific init function for each model view. AbstravView will call it at the end of the activate method.
     * Generaly this method may be async.
     * @return {void}
     */
    init() {
        this.mergeSettings();
        // this.logger.debug('View Initialized', this.settings);

        this.__initialized = true;
    }
    /**
     * Merge settings given for a view from different layers of the application:
     * - defaultSettings getter
     * - which can be overwritten by the settings from config.json (defined via) `overrideSettingsKey` key
     * - which can also be overwritten by the settings which are direclty binded to the view
     * @return {void}
     */
    async mergeSettings() {
        this.settings = this.settings || {};
        // in case a `defaultSettings` object exists, merge the `settings` object passed by @model ofer the default settings.
        if (this.defaultSettings) {
            // this.logger.debug('ModelView::mergeSettings => overrideSettingsKey: ', this.overrideSettingsKey);
            // this.logger.debug('ModelView::mergeSettings => defaultSettings: ', extend({}, this.modelDefaultSettings || {}), this.defaultSettings);
            let defaultSettings = extend(true, {}, this.defaultSettings || {});
            delete this.modelDefaultSettings;
            // this.logger.debug('ModelView::mergeSettings => settings split:', defaultSettings, this.overrideSettings, extend({}, this.settings || {}));
            this.settings = extend(
                true,                               // recursive merge
                {},                                 // cloning into a new object
                defaultSettings,                    // default settings provided by class definition
                this.overrideSettings,              // global settings provided by config.json
                this.settings,                      // settings obtained from application route
                // settings provided by config file mentioned in `_settingsPath`
                (this.settings && this.settings._settingsPath) ? await this.configApi.get(`${this.settings._settingsPath}.json`) : {}
            );
            // this.logger.debug('ModelView::mergeSettings => settings:', this.settings);
        }
    }
    /**
     * Getter for component override settings. This settings should globaly override settings defined in a component's
     * `defaultSettings` variable. If the override settubgs do not exists, it will return an empty object.
     * @return {Object}
     */
    get overrideSettings() {
        if (!this.overrideSettingsKey || this.overrideSettingsKey.length === 0) {
            throw new Error(`Class '${className(this)}' has no 'overrideSettingsKey' defined.`);
        }
        if (!this._overrideSettings) {
            this._overrideSettings = this.config.get(this.overrideSettingsKey) || {};
        }
        // this.logger.debug('defaultOverrideSettings: ', this._defaultOverrideSettings);
        return this._overrideSettings;
    }
    /**
     * Getter for concatenating component style/bind. Will concatenate styles found in 'settings.layout'
     * and 'settings.style' values. Will return empty string if none found.
     * @return {String}
     */
    get style() {
        return `${this.settings.style || ''} ${this.settings.layout || ''}`.trim();
    }

    // attached(...args) {
    //     this.logger.debug('test-life attached', ...args);
    // }

    // canActivate(...args) {
    //     this.logger.debug('test-life canActivate', ...args);
    // }

    // canDeactivate(...args) {
    //     this.logger.debug('test-life canDeactivate', ...args);
    // }

    // created(...args) {
    //     this.logger.debug('test-life created', ...args);
    // }

    // deactivate(...args) {
    //     this.logger.debug('test-life deactivate', ...args);
    // }

    // deactivated(...args) {
    //     this.logger.debug('test-life deactivated', ...args);
    // }

    // unbind(...args) {
    //     this.logger.debug('test-life unbind', ...args);
    // }
}

/**
 * Component mode: <compose>
 * @type {String}
 */
export const MODE_COMPOSE = 'compose';

/**
 * Component mode: <custom-element></custom-element>
 * @type {String}
 */
export const MODE_CUSTOM_ELEMENT = 'custom-element';

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
    /**
     * Obtain the generated html element
     * @return {HTMLElement}
     */
    get htmlElement() {
        return document.querySelector(`[am-uuid="${this.__uuid}"]`);
    }
}

/**
 * Abstract Template View (usable in `src/templates`)
 * @extends {View}
 */
export class Template extends View {
    /**
     * Constructor
     */
    constructor(...args) {
        super(...args);
        /**
         * @type {Object}
         */
        this.settings = (this.activeRoute || {}).settings | {};
    }
    /**
     * @see http://aurelia.io/docs/api/router/interface/RoutableComponentActivate/method/activate
     * @return {void}
     */
    activate(...args) {
        if (!this.__initialized) {
            this.init();
        }
    }
    /**
     * Obtain current navigation instruction for the application.
     * @return {NavigationInstructions|null}
     */
    get activeRoute() {
        return (this.router || {}).currentInstruction;
    }
    /**
     * @return {void}
     */
    init() {
        super.init();

        // setting up a style class on the <body> element to be able to style page dependent elements
        const BODY = document.querySelector('body');
        BODY.className = BODY.className.replace(/page-[^ ]+ /gi, '');
        // step two: add all new classes (if present) prepending 'page-' prefix to each one
        BODY.className += _.get(this, 'settings.style', '').split(' ').map(name => `page-${name} `).join('');
    }
    /**
     * Set default activationStrategy
     *
     * @returns The activation strategy
     *
     * @memberof Template
     */
    determineActivationStrategy() {
        return 'replace';
    }
    /**
     * Get View Strategy (get the template modelView will use)
     * If `this.settings.routeTemplate` is not defined, it will return `routeConfig.moduleId` (which is the default
     * template); otherwise will return the new value.
     *
     * NOTE: Do not add .html in routeTmplate variable, function will concatenate it to the given template by default.
     *
     * @return {String}
     */
    getViewStrategy() {
        const template = (this.settings || {}).template || undefined;
        // this.logger.debug('getViewStrategy', this.activeRoute.config.moduleId, template);
        return ((typeof template !== 'string') ? this.activeRoute.config.moduleId : template) + '.html';
    }
}

/**
 * Abstract Model View (usable with <compose>)
 * @note Please keep in mind that Component and Model are almost the same thing, however Model is oriented to the idea
 * of a model-view having all it's functionality within a Model class, while the notion of a component can be extended
 * to any piece of replicable code or functionality within the website.
 * @extends {Component}
 */
@inject(NewInstance.of(ValidationController))
export class Model extends Component {
    /**
     * Model Index Field Name
     * @type {String}
     */
    static INDEX_NAME = 'id';
    /**
     * @see View#constructor
     * @param {ValidationController} validationController
     */
    constructor(validationController, ...args) {
        super(...args);

        this.validationController = validationController;
        this.validationController.validateTrigger = validateTrigger.change;
    }
    /**
     * @see View::attached()
     */
    attached() {
        this.publishEvent(`model:${this.settings.name}:attached`, this);
    }
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            endpoint: 'default',
            name: 'abstract-model'
        });
    }
    /**
     * @see View::detached()
     */
    detached() {
        super.detached();
        this.publishEvent(`model:${this.settings.name}:detached`, this);
    }
    /**
     * @see View::init()
     */
    init() {
        super.init();
        // init validation if method exists
        if (typeof this.applyValidationRules === 'function') {
            this.applyValidationRules();
        }
        // validate at request
        this.subscribeEvent(`model:${this.settings.name}:validate`, (model) => model === this ? this.validate() : false);
        // publish form passed init
        this.publishEvent(`model:${this.settings.name}:init`, this);
    }
    /**
     * @singleton
     * @type {[type]}
     */
    static get instance() {
        if (!this.__instance__) {
            this.__instance__ = this.newInstance();
        }
        return this.__instance__;
    }
    /**
     * Load data for a certain model, by model's id.
     * @param  {Number} id Default null.
     * @return {Promise} Promise<Object>|Promise<Error>
     */
    async load(id = null) {
        let prototype = Object.getPrototypeOf(this);
        this[prototype.INDEX_NAME] = this[prototype.INDEX_NAME] || id;

        if (!this[prototype.INDEX_NAME]) {
            throw Error(`Model has no '${prototype.INDEX_NAME}' value. Cannot load an empty model.`);
        }

        return await this.getEndpoint(this.settings.endpoint)
            .findOne(this.settings.services.load, this[prototype.INDEX_NAME])
            .then(result => {
                this.setData(result);
                return this.toObject();
            });
    }
    /**
     * List the entire set of entities from the table.
     * @param  {Array|String|null} props
     * @param  {Array|String|null} filter
     * @return {Promise<Array>|Promise<Error>}
     */
    static async list(props = null, filter = null) {
        const model = this.instance;
        if (model.canActivate && !model.canActivate()) {
            throw Error(`'${className(model)}' could not pass by 'canActivate()' method.`);
        }
        model.activate();
        return model.getEndpoint(model.settings.endpoint || 'default').find(model.settings.services.list);
    }
    /**
     * Return new empty instance of the model
     * @return {Model}
     */
    static newInstance() {
        // return new this();
        return Container.instance.get(this);
    }
    /**
     * Remove existing model
     * @return {Promise<*>|Promise<Error>}
     */
    async remove() {
        let prototype = Object.getPrototypeOf(this);
        return await this.getEndpoint(this.settings.endpoint)
            .destroyOne(this.settings.services.remove, this[prototype.INDEX_NAME]);
    }
    /**
     * Remove the model with id ...
     * @param  {Number} id
     * @return {Promise<*>|Promise<Error>}
     */
    static async remove(id) {
        let model = this.newInstance();
        let prototype = Object.getPrototypeOf(model);
        model[prototype.INDEX_NAME] = id;
        return model.remove();
    }
    /**
     * Set data to the model, from an external source.
     * @param  {Object} data
     */
    setData(data) {
        this._properties.forEach((key) => {
            if (data[key] !== undefined) {
                this[key] = data[key];
            }
        });
    }
    /**
     * Save model.
     * @return {Promise<*>|Promise<Error>}
     */
    async save() {
        let prototype = Object.getPrototypeOf(this);
        if (this[prototype.INDEX_NAME]) {
            return await this.getEndpoint(this.settings.endpoint)
                .updateOne(this.settings.services.update, this[prototype.INDEX_NAME], this.toObject());
        }

        return await this.getEndpoint(this.settings.endpoint)
            .create(this.settings.services.save, this.toObject());
    }
    /**
     * Take the entire Model class and obtain only the saveable/workable object data.
     * @return {Object}
     */
    toObject() {
        let obj = {};
        this._properties.forEach((key) => obj[key] = this[key]);
        return obj;
    }
    /**
     * Validate method.
     */
    async validate() {
        const RESULT = await this.validationController.validate();
        if (RESULT.valid) {
            this.events.publish(`model:${this.settings.name}:validated`, this);
            return;
        }
        this.events.publish(`model:${this.settings.name}:invalid`, {
            model: this,
            result: RESULT
        });
    }
}
traits(Model, RESTable);

/**
 * Experimental decorator for mentioning the model's table properties.
 * Paramaeter is an array of {String} or {Object} elements.
 * @TODO: Method leaves room for validation & other toys.
 * @param  {Array} list
 */
export function properties(list) {
    return (target, key) => {
        list.forEach(item => property(target, item));
    };
}

/**
 * Experimental decorator for mentioning the model's variable is actualy a table property.
 * @TODO: Method leaves room for validation & other toys.
 * Params description:
 * - {String} target
 * - {String} key
 * - {Object} descriptor
 * @see {@link https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841}
 * @param  {any} args
 * @return {Object}
 */
export function property(...args) {
    /**
     * Properties of the defined table property
     * @type {Object}
     */
    let props = args[0];
    /**
     * Name of the defined table property
     * @type {String|Boolean}
     */
    let localKey = false;

    // if we're using decorators like `@property({list of properties})` or `@property('propertyName')`
    // we need to departe localKey from the rest of the object.
    if (args.length < 2) {
        if (props.name) {
            localKey = props.name;
        } else {
            localKey = props;
            props = {
                name: localKey
            };
        }
    }

    /**
     * The real decorator we're embeding. We didn't add the descriptor param because we're not using it, however
     * it exists.
     * @param {Object}        target
     * @param {String|Object} key
     * @param {Object}        descriptor
     */
    let decorator = (target, key) => {
        let dprops = {};
        // considering the fact that you can also use the `@property` decorator, we need to determine whether
        // we have a key name defined by `localKey` or we're just using the variable upon the decorator has been placed.
        key = localKey || key;
        // because when using `@properties(...)` we need to remember both property settings and the target, we're forced
        // to send the entire settings object as the key parameter
        if (key.name) {
            dprops = key;
            key = key.name;
        }
        // push the key to the list of model properties
        target._properties = (target._properties || []).concat([key]);
        target._propertySettings = target._propertySettings || {};
        target._propertySettings[key] = dprops;
        // determine whether it already has a descriptor definition
        let definition = Object.getOwnPropertyDescriptor(target, key);
        // if it has a descriptor definition already, work around the getter and setter that were already defined
        if (definition) {
            Object.defineProperty(target, key, {
                get: definition.get,
                set: (newValue) => definition.set.call(target, newValue),
                enumerable: true,
                configurable: true
            });
            // otherwise, just add our own getter and setter descriptor
        } else {
            Object.defineProperty(target, key, {
                get: function() {
                    return this['__' + key];
                },
                set: function(newValue) {
                    this['__' + key] = newValue;
                },
                enumerable: true,
                configurable: true
            });
        }
        // set the default value if it exists
        if (dprops.default) {
            target[key] = dprops.default;
        }
    };
    // if calling `@property(...)`
    if (args.length < 2) {
        return decorator;
    }
    // if calling `@property`
    // @NOTE: For the moment this method will not work with html bindable variables
    return decorator.apply(null, args);
}

