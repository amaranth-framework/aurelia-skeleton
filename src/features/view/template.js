/**
 * Aurelia Skeleton (https://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      https://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   https://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { View } from 'features/view/view';

/**
 * Abstract Template View (usable in `src/templates`)
 * @extends {View}
 */
export class Template extends View {
    /**
     * Runs at module activation
     *
     * @param {Object} params Route params for module
     * @param {Object} routeConfig Route configuration
     * @param {Object} navigationInstruction Route navigation instruction
     *
     * @memberof Template
     */
    activate(params, routeConfig, navigationInstruction) {
        super.activate(params, routeConfig, navigationInstruction);

        // obtain page title
        // this.routeConfig.navModel.setTitle(this.i18n.tr(this.routeConfig.title));

        // used in self::getViewStrategy() for determining ModelView template
        this.routeModuleId = this.routeConfig.moduleId;

        // setting up a style class on the <body> element to be able to style page dependent elements
        const BODY = document.querySelector('body');
        BODY.className = BODY.className.replace(/page-[^ ]+ /gi, '');
        // step two: add all new classes (if present) prepending 'page-' prefix to each one
        if (this.settings && this.settings.style) {
            BODY.className = this.settings.style.split(' ').map(name => `page-${name} `).join('');
        }
    }
    /**
     * Set default activationStrategy
     *
     * @returns The activation strategy
     *
     * @memberof Template
     */
    determineActivationStrategy() {
        return 'replace';
    }
    /**
     * Get View Strategy (get the template modelView will use)
     * If `this.settings.routeTemplate` is not defined, it will return `routeConfig.moduleId` (which is the default
     * template); otherwise will return the new value.
     *
     * NOTE: Do not add .html in routeTmplate variable, function will concatenate it to the given template by default.
     *
     * @return {String}
     */
    getViewStrategy() {
        this.logger.debug('getViewStrategy', this.routeModuleId, this.settings.template);
        return ((!this.settings || !this.settings.template || typeof this.settings.template !== 'string') ?
            this.routeModuleId : this.settings.template) + '.html';
    }
}
