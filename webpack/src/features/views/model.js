import { Container } from 'aurelia-dependency-injection';

import { Component } from 'features/views/component';
import { className, deprecate, extend, waitForVariable } from 'features/utils';

/**
 * Experimental decorator for mentioning the model's table properties.
 * @TODO: Method leaves room for validation & other toys.
 * @param  {Array[String|Object]} list
 */
export function properties(list) {
    return (target, key) => {
        list.forEach(item => property(target, item));
    }
}

/**
 * Experimental decorator for mentioning the model's variable is actualy a table property.
 * @TODO: Method leaves room for validation & other toys.
 * @link https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841
 * @param  {String} target
 * @param  {String} key
 * @param  {Object} descriptor
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
        let props = {};
        // considering the fact that you can also use the `@property` decorator, we need to determine whether
        // we have a key name defined by `localKey` or we're just using the variable upon the decorator has been placed.
        key = localKey || key;
        // because when using `@properties(...)` we need to remember both property settings and the target, we're forced
        // to send the entire settings object as the key parameter
        if (key.name) {
            props = key;
            key = key.name;
        }
        // push the key to the list of model properties
        target._properties = (target._properties || []).concat([key]);
        target._propertySettings = target._propertySettings || {};
        target._propertySettings[key] = props;
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
                get: function () {
                    return this["__" + key];
                },
                set: function (newValue) {
                    this["__" + key] = newValue;
                },
                enumerable: true,
                configurable: true
            });
        }
        // set the default value if it exists
        if (props.default) {
            target[key] = props.default;
        }
    }
    // if calling `@property(...)`
    if (args.length < 2) {
        return decorator;
    }
    // if calling `@property`
    // @NOTE: For the moment this method will not work with html bindable variables
    return decorator.apply(null, args);
}

/**
 * Abstract Model View (usable with <compose>)
 * @note Please keep in mind that Component and Model are almost the same thing, however Model is oriented to the idea
 * of a model-view having all it's functionality within a Model class, while the notion of a component can be extended
 * to any piece of replicable code or functionality within the website.
 */
export class Model extends Component {
    /**
     * @see View::detached()
     */
    detached() {
        $('.modal-backdrop').fadeOut('fast');
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
     * Return new empty instance of the model
     * @return {Model}
     */
    static newInstance() {
        // return new this();
        return Container.instance.get(this);
    }
    /**
     * Load data for a certain model, by model's id.
     * @param {Number} id?
     * @returns {Object}
     */
    async load(id = null) {
        this.id = this.id || id;

        const result = await this.getEndpoint(this.settings.endpoint || 'rest').findOne(this.settings.services.load, id);
        this.setData(result);
    }
    /**
     * List the entire set of entities from the table.
     * @param  {Array|String|null} properties
     * @param  {Array|String|null} filter
     * @return {Promise}
     */
    static async list(properties = null, filter = null) {
        const model = this.instance;
        if (model.canActivate && !model.canActivate()) {
            throw Error(`'${className(model)}' could not pass by 'canActivate()' method.`);
        }
        model.activate();
        return model.getEndpoint(model.settings.endpoint || 'rest').find(model.settings.services.list);
    }
    /**
     * Remove existing model
     * @return {Object}
     */
    async remove() {
        return await this.getEndpoint(this.settings.endpoint || 'rest').destroyOne(this.settings.services.remove, this.id);
    }
    /**
     * Remove the model with id ...
     * @param  {Number} id
     * @return {Promise}
     */
    static async remove(id) {
        let model = this.newInstance();
        model.id = id;
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
     * @returns {Boolean}
     */
    async save() {
        if (this.id) {
            return await this.getEndpoint(this.settings.endpoint || 'rest').updateOne(this.settings.services.update, this.id, this.toObject());
        }
        return await this.getEndpoint(this.settings.endpoint || 'rest').create(this.settings.services.save, this.toObject());
    }
    /**
     * Convert model to list of inputs for form component.
     * @method toFormConfig
     * @return {Object}
     */
    toFormConfig() {
        return this._properties.map((key) => {
            const input = {
                type: 'text',
                label: this._propertySettings[key].name || key,
                name:  this._propertySettings[key].name || key
            };
            return key.formConfig ? extend(true, input, key.formConfig) : input;
        });
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
}
