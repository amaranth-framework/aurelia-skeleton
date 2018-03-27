/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
/**
 * Amaranth - Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

// import { excludes, traits } from 'traits-decorator';

import * as Cookies from 'js-cookie';

/**
 * Class used for storing data using differen browser functionalities.
 * @example
 * const storage = new Storage();
 * storage.set('key', 'value');
 * const value = storage.get('value');
 * storage.remove('key')
 */
export class Storage {
    /**
     * @type {String}
     */
    static TYPE_COOKIE = 'cookie';
    /**
     * @type {String}
     */
    static TYPE_LOCAL = 'local';
    /**
     * @type {String}
     */
    static TYPE_SESSION = 'session';
    /**
     * @param  {String} type
     */
    constructor(type = Storage.TYPE_LOCAL) {
        this.type = type;
    }
    /**
     * Obtain vaue for a certain key.
     * @example
     * const storage = new Storage();
     * storage.get('key');
     *
     * @param  {String} key
     * @return {any}
     */
    get(key) {
        if (this.type !== Storage.TYPE_COOKIE) {
            try {
                return JSON.parse(window[`${this.type}Storage`].getItem(key) || 'null');
            } catch (e) {
                console.warn(
                    'Storage#get',
                    `Could not implement (${this.type}) storage. Fallback to cookie.`,
                    e
                ); // eslint-disable-line no-use-before-define
                throw e;
            }
        }
        return JSON.parse(Cookies.get(key) || 'null');
    }
    /**
     * Remove a key from storage
     * @param  {String} key
     */
    remove(key) {
        if (this.type !== Storage.TYPE_COOKIE) {
            try {
                window[`${this.type}Storage`].removeItem(key);
                return true;
            } catch (e) {
                console.warn(
                    'Storage#remove',
                    `Could not implement (${this.type}) storage. Fallback to cookie.`,
                    e
                ); // eslint-disable-line no-use-before-define
            }
        }
        return Cookies.remove(key);
    }
    /**
     * Add a key to storage.
     * @param  {String} key
     * @param  {any}    value
     */
    set(key, value) {
        if (this.type !== Storage.TYPE_COOKIE) {
            try {
                let storage = window[`${this.type}Storage`];
                storage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.warn(
                    'Storage#set',
                    `Could not implement ${this.type} storage. Fallback to cookie.`,
                    e
                ); // eslint-disable-line no-use-before-define
            }
        }
        return Cookies.set(key, JSON.stringify(value));
    }
}
