/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
/**
 * Amaranth - Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import UUID from 'uuid-js';

/**
 * UUID Version 1
 * @type {Number}
 */
export const UUID_V1 = 1;

/**
 * UUID Version 4
 * @type {Number}
 */
export const UUID_V4 = 4;

/**
 * Obtain a UUID format string
 * @param  {Number} [v=4] UUID Version.
 * @return {String}
 */
export function uuid(v = UUID_V4) {
    return UUID.create(v).toString();
}
