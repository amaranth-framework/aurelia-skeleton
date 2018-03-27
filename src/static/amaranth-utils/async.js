/**
 * Amaranth - Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

/**
 * Obtain a list of HTML Elements based on their selector.
 * @param  {String} selector String defining the selector for the HTML Element.
 * @return {Array}
 */
function selectMethod(selector) {
    // return $(selector);
    return Array.prototype.slice.call(document.querySelectorAll(selector));
}

/**
 * Wait for elements to be ready in DOM.
 * @example
 * waitForElements('#element-id').then(element => console.log(element))
 * waitForElements('.element-class').then(elements => console.log(elements))
 * @param  {String}         selector String defining the selector for the HTML Element.
 * @param  {Number}         count    Default 1. How many html elements should method wait for.
 * @param  {Number}         wait     How many secconds should method wait for before throwing error.
 * @return {Promise<Array>}
 */
export function waitForElements(selector, count = 1, wait = 5) {
    return new Promise((resolve, reject) => {
        let time = 0;
        wait *= 1000;
        const waitInterval = setInterval(() => {
            if (time >= wait) {
                clearInterval(waitInterval);
                reject(new Error(`Wait has timed out for ${selector} :: ${count}`));
            }
            let selected = selectMethod(selector);
            if (selected.length === count) {
                clearInterval(waitInterval);
                resolve(selected);
            }
            time += 100;
        }, 100);
    });
}

/**
 * Test whether the parameter is not undefined.
 * @private
 * @param  {any}     val Variable to test
 * @return {Boolean}``
 */
function _testUndefined(val) {
    return val !== undefined;
}

/**
 * Wait for a variable to be 'ready' / filled in. *
 * @example
 * let obj = {}
 * setTimeout(() => obj.value = 10, 500)
 * waitForVariable(obj, (o) => o.value).then(o => console.log(o.value))
 * @param  {any}          variable   Variable method is waiting for.
 * @param  {Function}     tester     Default 1. How many html elements should method wait for.
 * @param  {Number}       wait       How many secconds should method wait for before throwing error.
 * @param  {String}       descriptor Default: 'variable' descriptor for the waited variable/object.
 * @return {Promise<any>}
 */
export function waitForVariable(variable, tester = _testUndefined, wait = 5, descriptor = 'variable') {
    return new Promise((resolve, reject) => {
        let time = 0;
        wait *= 1000;
        const waitInterval = setInterval(() => {
            if (time >= wait) {
                clearInterval(waitInterval);
                reject(new Error(`Wait has timed out for ${descriptor} :: ${tester}`));
            }
            if (tester(variable)) {
                clearInterval(waitInterval);
                resolve(variable);
            }
            time += 100;
        }, 100);
    });
}
