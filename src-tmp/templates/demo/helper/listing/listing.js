/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { TDemo } from 'templates/demo/demo';
import { extend } from 'features/utils';

/**
 * Home Template for helper/card
 */
export class TCHListing extends TDemo {
    /**
     * Component bindables
     * @type Object
     */
    cb = {
        thead: [ 'OPTION', 'VALUE', 'DEFAULT', 'DESCRIPTION' ],
        tbody: [
            {
                option: 'models',
                type: 'Array<Object|String>',
                default: [],
                description: 'Array of models presenting the data of the listing. Can contain both extensions of the <code>Model</code> abstract class or other Javascript Objects defined according to your needs. Only restriction should be the structure of the model list which should be identical for all models.'
            },
            {
                option: 'settings',
                type: 'Object',
                default: '{}',
                description: 'Component settings. Parameters will be described bellow.'
            },
            {
                option: 'settings.card',
                type: 'String',
                default: '',
                description: 'Setting for the card component used within the listing. Additional to default <code>card</code> component, two more settings can be used as presented bellow:'
            },
            {
                option: 'settings.card.model',
                type: 'String',
                default: 'components/helper/card',
                description: 'Path to the card class.'
            },
            {
                option: 'settings.table',
                type: 'String',
                default: 'components/helper/card.html',
                description: 'Path to the card template.'
            },
            {
                option: 'settings.name',
                type: 'String',
                default: 'default',
                description: 'Name for the listing component, used especially in event names.'
            },
            {
                option: 'settings.table.view',
                type: 'String',
                default: '',
                description: 'Setting for the table component used within the listing. Additional to default <code>table</code> component, two more settings can be used as presented bellow:'
            },
            {
                option: 'settings.table.model',
                type: 'String',
                default: 'components/helper/table',
                description: 'Path to the table class.'
            },
            {
                option: 'settings.table.view',
                type: 'String',
                default: 'components/helper/table.html',
                description: 'Path to the table template.'
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
            },
            {
                option: 'settings.styles.cardList',
                type: 'String',
                default: 'uk-child-width-1-3@m',
                description: 'Class used to describe additional classes added to the card grid.'
            },
            {
                option: 'settings.view',
                type: 'Object',
                default: 'card',
                description: 'View mode defined for listing. Can be switched between <code>VIEW_MODE_CARDS</code> (<code>card</code>) and <code>VIEW_MODE_TABLE</code> (<code>table</code>).'
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
    overrideSettingsKey = 'templates.demo/components/helper/listing';
    /**
     * See {@link View#defaultSettings}
     * @type {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            pageTitle: {
                content: {
                    title: 'Listing'
                }
            }
        });
    }
}
