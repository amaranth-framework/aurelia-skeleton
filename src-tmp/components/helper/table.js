/**
 * Amaranth :: Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import UIkit from 'uikit';

import { Component } from 'features/views/component';
import { extend } from 'features/utils';
import environment from 'environment';

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
    thead = [
        {
            title: 'Preserve',
            style: 'uk-table-shrink'
        },
        {
            title: 'Preserve',
            style: 'uk-table-expand'
        },
        {
            title: 'Expand + Link',
            style: 'uk-table-expand'
        }
    ];
    /**
     * Defines the array of models that are binded to the table
     * @type {Array<Model|Object>}
     */
    tbody = environment.modelList;
    /**
     * Defines the array of selected models
     * @type {Array}
     */
    selection = [];
    /**
     * See {@link <View#attached>}
     */
    attached() {
        this.renderActionIcons();
    }
    /**
     * See {@link View#defaultSettings}
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            actions: [],
            isSelectable: true,
            name: 'default',
            style: 'uk-table-hover uk-table-divider',
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
                { icon: { icon: 'file-edit' }, title: 'Edit', event: 'table:${this.settings.name}:edit' },
                { icon: { icon: 'trash' }, title: 'Remove', event: 'table:${this.settings.name}:remove' }
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
     * Render table's actions uikit icons.
     */
    renderActionIcons() {
        $(`#table-${this.__uuid} .am-table-actions`).each((x, td) => {
            $(td).find('a').each((i, a) => {
                const icon = this.settings.actions[i].icon;
                typeof icon === 'object' && UIkit.icon(a, icon);
            });
        });
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
