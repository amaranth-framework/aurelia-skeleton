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
export class TCHCard extends TDemo {
    /**
     * @type {Array}
     */
    cards = [
        {
            image: 'http://lorempixel.com/1800/1200/people/', 
            title: 'Media Top',
            content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>'
        },
        {
            image: 'http://lorempixel.com/1800/1200/people/', 
            title: 'Media Top',
            content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>'
        },
        {
            image: 'http://lorempixel.com/1800/1200/people/', 
            title: 'Media Top',
            content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>'
        }
    ]
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
