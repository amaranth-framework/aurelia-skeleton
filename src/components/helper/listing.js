/**
 * Amaranth :: Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import environment from 'environment';
import { Component } from 'features/views/component';
import { extend } from 'features/utils';

/**
 * Listing component, used for listing models.
 */
export class CHListing extends Component {
    /**
     * List of models to display
     * @type {Array<Model|Object>}
     */
    models = environment.modelList;
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'components.helper/listing';
    /**
     * @type {String}
     */
    VIEW_MODE_CARD = 'card';
    /**
     * @type {String}
     */
    static VIEW_MODE_CARD = 'card';
    /**
     * @type {String}
     */
    VIEW_MODE_TABLE = 'table';
    /**
     * @type {String}
     */
    static VIEW_MODE_TABLE = 'table';
    /**
     * @see View::attached()
     */
    attached() {
        // announce listing has been attached
        this.publishEvent(`listing:${this.settings.name}:attached`, this);
    }
    /**
     * See {@link View#defaultSettings}
     * @type {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            card: {
                model: PLATFORM.moduleName('components/helper/card'),
                view: PLATFORM.moduleName('components/helper/card.html')
            },
            name: 'default',
            style: '',
            styles: {
                cardList: 'uk-child-width-1-3@m'
            },
            table: {
                model: PLATFORM.moduleName('components/helper/table'),
                view: PLATFORM.moduleName('components/helper/table.html')
                // thead: []
            },
            view: 'card'
        });
    }
    /**
     * @see View::init()
     */
    init() {

        
    }
}
