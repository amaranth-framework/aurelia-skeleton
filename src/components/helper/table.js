/**
 * Amaranth :: Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { bindable, customElement } from 'aurelia-framework';

import { bindableHelper } from 'features/utils/constants';
import environment from 'environment';
import { Component } from 'features/view/component';
import { extend } from 'features/utils/object';

/**
 * Table component.
 * @example
 * <compose view-model="components/helper/table" model.bind="{ settings, models }"></compose>
 * @extends {Component}
 * @see https://amaranth-framework.github.com/aurelia-skeleton/helper/table
 * @see http://aurelia.io/docs/templating/custom-elements#introduction
 */
export class CHTable extends Component {
    /**
     * See {@link View#overrideSettingsKey}
     * @type {String}
     */
    overrideSettingsKey = 'components.helper/table';
    /**
     * Defines the array of selected models
     * @type {Array}
     */
    selection = [];
    /**
     * See {@link View#defaultSettings}
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            actions: [],
            columns: environment.defaults.table.columns,
            headers: environment.defaults.table.headers,
            isSelectable: true,
            isActionable: false,
            models: environment.defaults.models,
            name: 'default',
            style: '',
            styles: {}
        });
    }
    /**
     * @see View#init()
     */
    init() {
        super.init();

        if (this.settings.actions && !this.settings.actions.length) {
            this.settings.actions = [
                { ukIcon: { icon: 'file-edit' }, title: 'Edit', event: `table:${this.settings.name}:edit` },
                { ukIcon: { icon: 'trash' }, title: 'Remove', event: `table:${this.settings.name}:remove` }
            ];
        }

        this.subscribeEvent(`table:${this.settings.name}:selection-request`, () => this.publishSelection());
    }
    /**
     * Event Handler for `table:*:selection-present` events.
     * @emits table:?:selection-present
     * @listens table:?:selection-request
     */
    publishSelection() {
        // leave browser time to process item selection
        setTimeout(
            () => this.publishEvent(`table:${this.settings.name}:selection-present`, this.selection),
            50
        );
    }
    /**
     * Select all visible rows.
     */
    selectAllVisible() {
        /**
         * @type {Boolean}
         */
        this.isSelectAllVisible = !(this.isSelectAllVisible || false);
        if (this.isSelectAllVisible) {
            this.selection = this.tableModels;
        } else {
            this.selection = [];
        }
        this.publishSelection();
    }
    /**
     * @return {Array}
     */
    get tableColumns() {
        return this.columns || this.settings.columns;
    }
    /**
     * @return {Object}
     */
    get tableHead() {
        return this.headers || this.settings.headers;
    }
    /**
     * @return {Array<Model|Object>}
     */
    get tableModels() {
        return this.models || this.settings.models;
    }
}


/**
 * Table Custom Element
 * @example
 * <am-table settings.bind="{ settings }"></am-table>
 * @extends {CHTable}
 * @see https://amaranth-framework.github.com/aurelia-skeleton/helper-components/a
 * @see http://aurelia.io/docs/templating/custom-elements#introduction
 */
@customElement('am-table')
export class CHTableElement extends CHTable {
    @bindable(bindableHelper.twoWay) settings = {};
    @bindable(bindableHelper.twoWay) text = '';
    @bindable(bindableHelper.twoWay) title = '';
    created() {
        this.logger.debug('test');
        if (!this.inititalized) {
            this.init();
        }
    }
}
