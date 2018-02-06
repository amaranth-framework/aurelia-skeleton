/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { bindable, customElement } from 'aurelia-framework';

import {Component} from 'features/view/component';
import { bindableHelper } from 'features/utils/constants';
import { extend } from 'features/utils/object';

/**
 * Page title component (also Custom Element).
 * @example
 * <am-title settings.bind="{ settings }">Page Title</am-title>
 * <compose view-model="components/page/title" model.bind="{ settings }"></compose>
 * @extends {Component}
 * @see https://amaranth-framework.github.com/aurelia-skeleton/components/page-title
 * @see http://aurelia.io/docs/templating/custom-elements#introduction
 */
@customElement('am-title')
export class CHPageTitle extends Component {
    @bindable(bindableHelper.twoWay) settings = {};
    /**
     * @type {String}
     */
    overrideSettingsKey = 'components.page/title';
    /**
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            // componentsContent: [
            //     {
            //         type: 'breadcrumb',
            //         module: PLATFORM.moduleName('components/uk/breadcrumb/breadcrumb')
            //     }
            // ],
            componentsAdditional: [],
            content: {
                title: 'Page Title'
            }
        });
    }
}
