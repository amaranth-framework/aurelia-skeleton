/**
 * Amaranth :: Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { bindable, customElement } from 'aurelia-framework';

import { bindableHelper } from 'features/utils/constants';
import { Component } from 'features/view/component';
import { extend } from 'features/utils/object';

/**
 * Card Component
 * @example
 * <compose view-model="components/helper/card" model.bind="{ settings }"></compose>
 * @extends {Component}
 */
export class CHCard extends Component {
    /**
     * See {@link View#overrideSettingsKey}
     * @type {String}
     */
    overrideSettingsKey = 'components.helper/card';
    /**
     * @return {String}
     */
    get cardText() {
        return this.text || this.settings.text;
    }
    /**
     * @return {String}
     */
    get cardTitle() {
        return this.title || this.settings.title;
    }
    /**
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            title: 'Lorem Ipsum'
        });
    }
}

/**
 * Card Custom Element
 * @example
 * <am-card-text settings.bind="{ settings }"></am-card-text>
 * @extends {CHCard}
 * @see https://amaranth-framework.github.com/aurelia-skeleton/helper-components/a
 * @see http://aurelia.io/docs/templating/custom-elements#introduction
 */
@customElement('am-card-text')
export class CHCardElement extends CHCard {
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
