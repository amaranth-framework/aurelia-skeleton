/**
 * Aurelia Skeleton (https://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      https://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   https://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { View } from 'features/view/view';

/**
 * Abstract Component View (usable with <compose>)
 * @extends {View}
 */
export class Component extends View {
    /**
     * @return {void}
     */
    activate(...args) {
        super.activate(...args);

        // copy component's bindables which are passed via model.bind
        // <compose view-model="components/page/title" model.bind="{ settings, }"></compose>
        if (args.length === 1) {
            let model = args.shift();

            for (let p in model) {
                this[p] = model[p];
            }
        }
    }
}
