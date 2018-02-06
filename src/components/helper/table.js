/**
 * Amaranth :: Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

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
     * Defines the array of headdings for a specific table
     * @type {Array<Object|String>}
     */
    thead = environment.thead || [];
    /**
     * Defines the array of models that are binded to the table
     * @type {Array<Model|Object>}
     */
    tbody = environment.modelList || [];
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
            isSelectable: true,
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
            this.selection = this.tbody;
        } else {
            this.selection = [];
        }
        this.publishSelection();
    }
}
