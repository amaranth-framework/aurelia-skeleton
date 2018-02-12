/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { SELECT_BIND_BY_MODEL } from 'components/helper/form/select';
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
     * @type {String}
     */
    selectBindByModel = SELECT_BIND_BY_MODEL;
    /**
     * @type {Object}
     */
    selectSettings = {
        label: 'Name',
        placeholder: 'Enter your name'
    };
    /**
     * @type {String}
     */
    selectValues = [
        {
            label: 'Options 1',
            value: 'option-1'
        },
        {
            label: 'Options 2',
            value: 'option-2'
        },
        {
            label: 'Options 3',
            value: 'option-3',
            disabled: true
        },
        {
            label: 'Options 4',
            value: 'option-4'
        }
    ]
    /**
     * @type {String}
     */
    selectValue = 'option-4';
    /**
     * @type {Object}
     */
    selectValueM = null;
    /**
     * See {@link View#overrideSettingsKey}
     * @type {String}
     */
    overrideSettingsKey = 'templates.demo/components/helper/card';
    /**
     * Constructor
     */
    constructor(...args) {
        super(...args);

        this.selectValueM = this.selectValues[1];
    }
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
