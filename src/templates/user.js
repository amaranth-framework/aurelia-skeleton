/**
 * Sample Home Template
 *
 */

import { Template, RESTable } from 'static/amaranth-aurelia-utils';
import { traits, waitForVariable } from 'static/amaranth-utils';

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
