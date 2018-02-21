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
     * @type {Object}
     */
    cb = {
        thead: [ 'OPTION', 'VALUE', 'DEFAULT', 'DESCRIPTION' ],
        tbody: [
            {
                option: 'settings',
                type: 'Object',
                default: '{}',
                description: 'Component settings. Parameters will be described bellow.'
            },
            {
                option: 'settings.icons',
                type: 'Array',
                default: '',
                description: 'Settings  For <code>&lt;am-nav-icon></code> dissociate from <code>settings</code> and use as <code>icons</code> attribute.'
            },
            {
                option: 'settings.style',
                type: 'String',
                default: '',
                description: 'Additional style classes for table.'
            }
        ],
        settings: {
            actions: false,
            isSelectable: false,
            style: 'uk-table-divider'
        }
    };
    /**
     * Demo settins
     * @type {Object}
     */
    iconnav = [
        {
            href: 'https://github.com',
            ukIcon: {
                icon: 'github'
            }
        },
        {
            href: 'https://linkedin.com',
            ukIcon: {
                icon: 'linkein'
            }
        },
        {
            href: 'https://xing.com',
            ukIcon: {
                icon: 'xing'
            }
        },
        {
            href: 'https://gitter.com',
            ukIcon: {
                icon: 'gitter'
            }
        }
    ];
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
