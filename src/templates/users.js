/**
 * Sample Home Template
 *
 */

import { Template, RESTable } from 'amaranth-aurelia-utils';
import { traits } from 'amaranth-utils';

/**
 *
 */
export class Users extends Template {
    /**
     * @type {String}
     */
    overrideSettingsKey = 'templates/users';

    init() {
        super.init();

        this.getEndpoint().find('/users').then(users => this.users = users);
    }
}

traits(Users, RESTable);
