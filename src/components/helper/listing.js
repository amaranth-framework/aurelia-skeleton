/**
 * Amaranth :: Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { Component } from 'features/views/component';

/**
 * Listing component, used for listing models.
 */
export class ComponentHelperListing extends Component {
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
     * @see View::attached()
     */
    attached() {
        // announce listing has been attached
        this.publishEvent(`listing:${this.settings.name}:attached`, this);
        // mark as loading
        this.publishEvent('loading:show', this.__uuid);
    }
    /**
     * @see View::init()
     */
    init() {

    }
}
