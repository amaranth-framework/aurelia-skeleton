/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { TDemo } from 'templates/demo/demo';

/**
 * Home Template for helper/card
 */
export class TCPageTitle extends TDemo {
    /**
     * Component bindables
     * @type Object
     */
    cb = {
        thead: [ 'OPTION', 'VALUE', 'DEFAULT', 'DESCRIPTION' ],
        tbody: [
            {
                option: 'title',
                type: 'String',
                default: '',
                description: 'Title to display, usable only with <code>&lt;component></code> call of the component. <code>&lt;component></code> will wrap title in a <code>&lt;h2></code> tag.'
            },
            {
                option: 'componentsAdditional',
                type: 'Array',
                default: '[]',
                description: 'List of components to render in the additional space. Fore more referecenes on component properties, see the <code>&lt;content></code> component.'
            },
            {
                option: 'componentsContent',
                type: 'Array',
                default: '[{}]',
                description: 'List of components to render in the title area. By default it is rendering the breadcrumbs component. Fore more referecenes on component properties, see the <code>&lt;content></code> component.'
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
                option: 'settings.styles.additional',
                type: 'String',
                default: '',
                description: 'Additional style for the right additional section of the title.'
            },
            {
                option: 'settings.styles.content',
                type: 'String',
                default: '',
                description: 'Additional style for the content section of the page title.'
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
    overrideSettingsKey = 'templates.demo/components/page-title';
}
