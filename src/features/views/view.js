// import { AureliaConfiguration } from 'aurelia-configuration';
import { Config as API } from 'aurelia-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject, LogManager } from 'aurelia-framework';
// import { I18N } from 'aurelia-i18n';
import { Router } from 'aurelia-router';

import { uuid } from 'uuid';

import { extend, className, parentClassName } from 'features/utils';

/**
 * Abstract Class for all Model Views (Components) used within the project
 *
 * @link https://www.danyow.net/inversion-of-control-with-aurelia-part-1/
 */
@inject(API, AureliaConfiguration, EventAggregator, I18N, Router)
export class AbstractView {
    /*************************************************************************************
     * Inherited
     *************************************************************************************/
    /**
     * Creates an instance of AbstractView.
     * @param {Config} api aurelia-api module
     * @param {AureliaConfiguration} config aurelia-configuraton module
     * @param {EventAggregator} events Aurelia EventsAggregator module
     * @param {I18N} i18n aurelia-i18n module
     * @param {Router} router Aurelia Router module
     */
    constructor(api, config, events, i18n, router) {
        this.api = api.getEndpoint('api');
        if (i18n) { this.i18n = i18n; }
        this.config = config;
        this.events = events;
        this.router = router;

        this.uuid = uuid;
    }
    /**
     * Implement this hook if you want to perform custom logic just before your view-model is displayed. You can
     * optionally return a promise to tell the router to wait to bind and attach the view until after you finish your
     * work.
     * Forms to call:
     * @method activate(model: Object) for components
     * @method activate(params: Object, routeConfig: Object, navigationInstruction: NavigationInstruction) for page templates
     */
    activate(...args) {
        // parse module variable
        if (args.length === 1) {
            let model = args.shift();

            for (let p in model) {
                this[p] = model[p];
            }
        }
        // parse template params
        if (args.length > 1) {
            // Save params
            this.params = args.shift();
            // Save routeConfig
            this.routeConfig = args.shift();
            // Save navigationInstruction
            this.navigationInstruction = args.shift();
            // obtain settings from routeConfig variable
            this.settings = this.routeConfig ? this.routeConfig.settings : {};
        }

        this.mergeSettings();

        this.events.subscribeOnce('session:ready', result => !this.initialized ? this.init() : false);

        if (this.config.get('session.ready') && !this.initialized) {
            this.init();
        }
    }
    /**
     * Invoked when the view that contains the extension is attached to the DOM.
     * @method attached
     */
    /**
     * Invoked when the databinding engine binds the view. The binding context is the instance that the view is
     * databound to.
     * @method bind
     * @param   {Object}  bindingContext
     * @param   {Object}  overrideContext?
     * @param   {Boolean} _systemUpdate? default true
     * @returns {void}
     */
    bind(bindingContext, overrideContext) {
        // obtain view parent
        this.parent = overrideContext.parentOverrideContext.bindingContext;
    }
    /**
     * Implement this hook if you want to control whether or not your view-model can be navigated to. Return a boolean
     * value, a promise for a boolean value, or a navigation command.
     * @method canActivate
     * @param {Object} params
     * @param {Object} routeConfig
     * @param {Object} navigationInstruction
     */
    /**
     * Implement this hook if you want to control whether or not the router can navigate away from your view-model when
     * moving to a new route. Return a boolean value, a promise for a boolean value, or a navigation command.
     * @method canDeactivate
     */
    /**
     * Implement this hook if your view-model needs to translating url changes into application state.
     * @method configureRouter
     * @param {Object} config
     * @param {Router} router
     */
    /**
     * Invoked once the component is created...
     * @method created
     * @param {View} view
     */
    /**
     * Invoked when the view that contains the extension is detached from the DOM.
     * @method detached
     */
    /**
     * Invoked when the databinding engine unbinds the view.
     * @method unbind
     */
    /*************************************************************************************
     * Amaranth
     *************************************************************************************/
    /**
     * Default View Settings. Can be null
     * @type {Object|null}
     */
    defaultSettings = null;
    /**
     * Override Settings Key.
     * If using 'aurelia-configuration', this key will be used to extract over writing settings from application config.
     * @type {String}
     */
    overrideSettingsKey = false;
    /**
     * Specific init function for each model view. AbstravView will call it at the end of the activate method.
     * Generaly this method may be async.
     * @method init
     */
    init() { }
    /**
     * Merge settings
     * @method mergeSettings
     */
    mergeSettings() {
        // in case a `defaultSettings` object exists, merge the `settings` object passed by @model
        // ofer the default settings.
        if (this.defaultSettings) {
            // this.logger.debug('ModelView::mergeSettings => overrideSettingsKey: ', this.overrideSettingsKey);
            // this.logger.debug('ModelView::mergeSettings => defaultSettings: ', extend({}, this.modelDefaultSettings || {}), this.defaultSettings);
            let defaultSettings = extend(true, this.modelDefaultSettings || {}, this.defaultSettings || {});
            delete this.modelDefaultSettings;
            // this.logger.debug('ModelView::mergeSettings => settings split:', defaultSettings, this.overrideSettings, extend({}, this.settings || {}));
            this.settings = extend(true, {}, defaultSettings, this.overrideSettings, this.settings || {});
            // this.logger.debug('ModelView::mergeSettings => settings:', this.settings);
        }
    }
    /**
     *
     * @return {String}
     */
    toString() {
        return `view@${this.uuid}`;
    }
    /**
     * Logger Getter
     * @method logger
     * @return {Logger}
     */
    get logger() {
        if (!this._logger) {
            this._logger = LogManager.getLogger(`${parentClassName(this)}/${className(this)}`);
        }
        return this._logger;
    }
    /**
     * Getter for component override settings. This settings should globaly override settings defined in a component's
     * `defaultSettings` variable. If the override settubgs do not exists, it will return an empty object.
     * @method overrideSettings
     * @return {Object}
     */
    get overrideSettings() {
        if (!this._overrideSettings) {
            this._overrideSettings = this.config.get(this.overrideSettingsKey) || {};
        }
        // this.logger.debug('defaultOverrideSettings: ', this._defaultOverrideSettings);
        return this._overrideSettings;
    }
    /**
     * Getter for concatenating component style/bind
     * @method style
     * @return {String}
     */
    get style() {
        return `${this.settings.style || ''} ${this.settings.layout || ''}`;
    }
}
