/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import 'highlight.js/styles/github.css';

import { TDemo } from 'templates/demo/demo';
import { extend } from 'features/utils';

/**
 * Home Template (Demo)
 */
export class TCUiKitA extends TDemo {
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
                description: 'Content to display, usabled only with <code>&lt;component></code> call of the component.'
            },
            {
                option: 'settings',
                type: 'Object',
                default: '{}',
                description: 'Component settings. Parameters will be described bellow.'
            },
            {
                option: 'settings.href',
                type: 'String',
                default: '',
                description: 'Url for the anchor by using a standard string.'
            },
            {
                option: 'settings.route',
                type: 'Object',
                default: '',
                description: 'Url for the anchor, by using the Aurelia router.'
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
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.components/uk/a';
    /**
     * @see View:defaultSettings
     * @type {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            pageTitle: {
                content: {
                    title: 'Anchor'
                }
            }
        });
    }
}
