import UIkit from 'uikit';

import { Component } from 'features/views/component';
import { extend } from 'features/utils';
import environment from 'environment';

/**
 *
 */
export class CHTable extends Component {
    /**
     * See {@link View#overrideSettingsKey}
     * @type {String}
     */
    overrideSettingsKey = 'components.helper/table';
    /**
     * Defines the array of headdings for a specific table
     * @type {Array}
     */
    thead = [
        {
            title: 'Preserve',
            style: 'uk-table-shrink'
        },
        {
            title: 'Expand + Link',
            style: 'uk-table-expand'
        }
    ];
    /**
     * Defines the array of models that are binded to the table
     * @type {Array}
     */
    tbody = [
        {
            image: `${environment.imagesSource}/128/128/people/?tag=${new Date()}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
        },
        {
            image: `${environment.imagesSource}/128/128/people/?tag=${new Date()}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
        },
        {
            image: `${environment.imagesSource}/128/128/people/?tag=${new Date()}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
        }
    ];
    /**
     * Defines the array of selected models
     * @type {Array}
     */
    selection = [];
    /**
     * 
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
            actions: [
                { icon: { icon: 'file-edit' }, title: 'Edit', event: 'model:edit' },
                { icon: { icon: 'trash' }, title: 'Remove', event: 'model:remove' }
            ],
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

        this.subscribeEvent(`table:${this.settings.name}:selection-request`, () => {
            this.publishEvent(`table:${this.settings.name}:selection-present`, this.selection);
        });
    }
    /**
     * 
     */
    renderActionIcons() {
        $(`#table-${this.__uuid} .am-table-actions`).each((x, td) => {
            $(td).find('a').each((i, a) => {
                const icon = this.settings.actions[i].icon;
                console.log(i, a, icon);
                typeof icon === 'object' && UIkit.icon(a, icon);
            });
        });
    }
    /**
     * 
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
    }
}
