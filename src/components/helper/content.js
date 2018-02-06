import { Loader, inject } from 'aurelia-framework';

import { Component } from 'features/view/component';

/**
 * Content Page template
 */
@inject(Loader)
export class CHContent extends Component {
    /**
     * @see Component#overrideSettingsKey
     */
    overrideSettingsKey = 'components.helper/content';
    /**
     * Constructor.
     */
    constructor(loader, ...args) {
        super(...args);

        this.loader = loader;
    }
}
