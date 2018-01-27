/**
 * Amaranth :: Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { Template } from 'features/views/template';

/**
 *
 */
export class TemplateLogin extends Template {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.login';
    /**
     * Constructor
     * @see Base::constructor() for the rest of the arguments
     * @param {AuthorizeStep} authStep Authorization step
     */
    constructor(...args) {
        super(...args);

        this.user = 'Sincere@april.biz';
        this.pass = 'foopass';
    }
    /**
     * @see View::activate()
     */
    activate(...args) {
        super.activate(...args);
        if (this.config.get('auth-step').isLoggedIn) {
            this.router.navigateToRoute('dashboard');
        }
    }
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            style: 'login sing-up',
            pageTitle: {
                content: {
                    title: 'Login'
                }
            },
            loginForm: {
                style: 'form--material form--centered form--login'
            },
            logo: {
                style: 'logo--lg'
            }
        });
    }
}
