/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { TDemo } from 'templates/demo/demo';
import { extend } from 'features/utils/object';
import environment from 'environment';

/**
 * Home Template for helper/card
 */
export class TDHAnchor extends TDemo {
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
                option: 'routes',
                type: 'Array',
                default: '[{route: \'\'}]',
                description: 'Starting point for the breadcrumbs.'
            },
            {
                option: 'settings',
                type: 'Object',
                default: '{}',
                description: 'Component settings. Parameters will be described bellow.'
            },
            {
                option: 'settings.style',
                type: 'String',
                default: '',
                description: 'Additional style classes for table.'
            },
            {
                option: 'settings.styles',
                type: 'Object',
                default: '{}',
                description: 'Additional style classes for different elements on the page title. Extend according to your own needs.'
            },
            {
                option: 'settings.styles.breadcrumb',
                type: 'String',
                default: '',
                description: 'Style for the breadcrumb items.'
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
    overrideSettingsKey = 'templates.demo/components/page/breadcrumb';
}
