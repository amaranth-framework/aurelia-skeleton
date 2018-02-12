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
                option: 'value',
                type: 'String',
                default: '',
                description: 'Bindable parameter for input\'s value.'
            },
            {
                option: 'type',
                type: 'String',
                default: '{}',
                description: 'Input\'s type. See <code>settings.type</code>.'
            },
            {
                option: 'settings',
                type: 'Object',
                default: '{}',
                description: 'Component settings. Parameters will be described bellow.'
            },
            {
                option: 'settings.label',
                type: 'String',
                default: '',
                description: 'Input\'s label.'
            },
            {
                option: 'settings.placeholder',
                type: 'String',
                default: '',
                description: 'Input\'s placeholder.'
            },
            {
                option: 'settings.type',
                type: 'String',
                default: 'text',
                description: 'Input\'s type. Can be <code>color, date, datetime, datetime-local, email, file, hidden, image, month, number, password, range, search, tel, text, time, url, week</code>'
            },
            {
                option: 'settings.style',
                type: 'String',
                default: '',
                description: 'Additional style classes for component.'
            },
            {
                option: 'settings.styles',
                type: 'Object',
                default: '{}',
                description: 'Additional styles classes for component\'s elements.'
            }
        ],
        settings: {
            actions: false,
            isSelectable: false,
            style: 'uk-table-divider'
        }
    };
    /**
     * @type {Object}
     */
    formInputSettings = {
        label: 'Name',
        placeholder: 'Enter your name'
    };
    /**
     * @type {String}
     */
    formInputAsComponentValue = 'John Doe';
    /**
     * @type {String}
     */
    formInputAsTagValue = 'Jane Doe';
    /**
     * See {@link View#overrideSettingsKey}
     * @type {String}
     */
    overrideSettingsKey = 'templates.demo/components/helper/card';
    /**
     * See {@link View#defaultSettings}
     * @type {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            pageTitle: {
                content: {
                    title: 'Card'
                }
            }
        });
    }
}
