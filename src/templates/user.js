/**
 * Sample Home Template
 *
 */

import { Template, RESTable } from 'amaranth-aurelia-utils';
import { traits, waitForVariable } from 'amaranth-utils';

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

        waitForVariable(this.router, router => router.currentInstruction)
            .then(router => router.currentInstruction.params)
            .then(params => this.getEndpoint().find(`/users/${params.id}`))
            .then(user => this.user = user);
    }
}

traits(Users, RESTable);
