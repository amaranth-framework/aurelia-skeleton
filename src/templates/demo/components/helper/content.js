/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import environment from 'environment';
import { TDemo } from 'templates/demo/demo';
import { extend } from 'features/utils/object';

/**
 * Home Template for helper/card
 */
export class TCHCard extends TDemo {
    /**
     * @type {Array}
     */
    cards = environment.modelList;
    /**
     * Component bindables
     * @type Object
     */
    cb = {
        thead: [ 'OPTION', 'VALUE', 'DEFAULT', 'DESCRIPTION' ],
        tbody: [
            {
                option: 'components',
                type: 'Array<Object>',
                default: '',
                description: 'Array representing the list of components for <code>content</code> to render.'
            },
            {
                option: 'components[].component.model',
                type: 'Object',
                default: '{}',
                description: 'Path to the component\'s class.'
            },
            {
                option: 'components[].component.view',
                type: 'Object',
                default: '{}',
                description: '(optional) Path to the component\'s view. If not provided, <code>component.model + \'.html\'</code> will be used.'
            },
            {
                option: 'components[].settings',
                type: 'Object',
                default: '{}',
                description: 'Setting for the rendering component.'
            },
            {
                option: 'settings.style',
                type: 'String',
                default: '',
                description: 'Additional style classes for content component.'
            }
        ],
        settings: {
            actions: false,
            isSelectable: false,
            style: 'uk-table-divider'
        }
    };
    /**
     * See {@link View#overrideSettingsKey}
     * @type {String}
     */
    overrideSettingsKey = 'templates.demo/components/helper/content';
    /**
     * See {@link View#defaultSettings}
     * @type {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            pageTitle: {
                content: {
                    title: 'Content'
                }
            }
        });
    }
}
