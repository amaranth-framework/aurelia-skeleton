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
                option: 'content',
                type: 'String',
                default: '',
                description: 'Content to display, usable only with <code>&lt;component></code> call of the component.'
            },
            {
                option: 'settings',
                type: 'Object',
                default: '{}',
                description: 'Component settings. Parameters will be described bellow.'
            },
            {
                option: 'settings.faIcon',
                type: 'Object|null',
                default: '',
                description: '<a href="https://fontawesome.io">Font Awesome</a> Icon to display. For <code>&lt;am-a></code> dissociate from <code>settings</code> and use as <code>faIcon</code> attribute.'
            },
            {
                option: 'settings.href',
                type: 'String',
                default: '',
                description: 'Url for the anchor by using a standard string. For <code>&lt;am-a></code> dissociate from <code>settings</code> and use as <code>href</code> attribute.'
            },
            {
                option: 'settings.route',
                type: 'Object',
                default: '',
                description: 'Url for the anchor, by using the Aurelia router. For <code>&lt;am-a></code> dissociate from <code>settings</code> and use as <code>route</code> attribute.'
            },
            // {
            //     option: 'settings.target',
            //     type: 'String',
            //     default: '_self',
            //     description: 'Anchor Target. For <code>&lt;am-a></code> dissociate from <code>settings</code> and use as <code>target</code>.'
            // },
            {
                option: 'settings.title',
                type: 'String',
                default: '',
                description: 'Anchor Title. For <code>&lt;am-a></code> dissociate from <code>settings</code> and use as <code>title</code>.'
            },
            {
                option: 'settings.ukIcon',
                type: 'Object|null',
                default: '',
                description: 'Setting for rendering an icon within the url, by implementing <a href="https://getuikit.com/docs/icon">UIKIt Icon<a>.'
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
