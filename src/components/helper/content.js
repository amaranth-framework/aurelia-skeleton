/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */
import { Component } from 'features/view/component';

/**
 * Content (component list) component.
 * @example
 * <compose view-model="components/helper/content" model.bind="{ settings, components }"></compose>
 * @extends {Component}
 */
export class CHContent extends Component {
    /**
     * @see Component#overrideSettingsKey
     */
    overrideSettingsKey = 'components.helper/content';
    /**
     * Constructor.
     */
    constructor(...args) {
        super(...args);

        this.components = [];
    }

    attached() {
        this.logger.debug('components', this.components, this.settings);
    }
}
