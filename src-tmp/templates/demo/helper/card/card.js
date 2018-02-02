/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { TDemo } from 'templates/demo/demo';
import { extend } from 'features/utils';
import environment from 'environment';

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
                option: 'model',
                type: 'Model|Object',
                default: '',
                description: 'Object presenting the data of the card. Can be either extension of the <code>Model</code> abstract class or other Javascript Object defined according to your needs.'
            },
            {
                option: 'settings',
                type: 'Object',
                default: '{}',
                description: 'Component settings. Parameters will be described bellow.'
            },
            {
                option: 'settings.actions',
                type: 'Array<Object>|Boolean',
                default: 'See code',
                description: 'Actions that can be taken against the each table row/model. To deactivate, set to <code>false</code>.'
            },
            {
                option: 'settings.actions.event',
                type: 'String',
                default: '',
                description: 'Action\'s event string.'
            },
            {
                option: 'settings.actions.icon',
                type: 'Object',
                default: '{}',
                description: 'Action\'s <a href="https://getuikit.com/docs/icon">UIkit</a> icon.'
            },
            {
                option: 'settings.actions.faIcon',
                type: 'String',
                default: '',
                description: 'Action\'s <a href="http://fontawesome.io/icons/">Font Awesome</a> icon.'
            },
            {
                option: 'settings.actions.title',
                type: 'String',
                default: '{}',
                description: 'Action\'s title.'
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
                description: 'Additional style classes for different elements on the card. Extend according to your own needs.'
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
