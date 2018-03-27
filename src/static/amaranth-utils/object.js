/**
 * Amaranth - Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

/**
 * Extend the `target` object with all the objects behind him (in the list of params).
 * As a note, this will not 'extend' arrays. If you need that, please use $.extend from jQuery.
 * @example
 * let obj = { a = 1 };
 * let obj2 = {};
 * exend(true, obj2, obj);
 * @param  {Boolean} deep   Whether to do a deep extend or not.
 * @param  {Object}  target Object to extend
 * @param  {Object}  args   Object(s) to extend with
 * @return {Object}  Extended object
 */
export function extend(deep, target, ...args) {
    const NULL = [null, 'null'];
    args.forEach(object => {
        for (let key in object) {
            if (NULL.includes(object[key])) {
                target[key] = null;
                continue;
            }
            if (deep && typeof object[key] === 'object' && !Array.isArray(object[key])) {
                target[key] = extend(deep, target[key] || {}, object[key]);
            } else {
                target[key] = object[key];
            }
        }
    });
    return target;
}

/**
 * Obtain the name of a class.
 * WARNING: This method will not function correclty if code is passed through an uglifier.
 * @example
 * class Test {};
 * const cn = className(new Test());
 * @param  {Object}  obj           Object to obtain the class name
 * @param  {Boolean} isConstructor Default 'false'. Wheter object is the constructor already or not
 * @return {String}  String name of the class
 */
export function className(obj, isConstructor = false) {
    let _className = isConstructor ? obj.name : obj.constructor.name;
    if (typeof _className === 'undefined') { // Internet Explorer
        // TODO: NOT HAPPY at all with the idea of using regexp; maybe there is another method ?
        _className = (isConstructor ? obj : obj.constructor).toString().match(/ ([^ ]+)\(/)[1];
    }
    return _className;
}

/**
 * Obtain the name of a class's parent (the name of the class which is extended by the current one)
 * WARNING: This method will not function correclty if code is passed through an uglifier.
 * @example
 * class Parent {};
 * class Test extends Parent {};
 * const cn = parentClassName(new Parent());
 * @param  {Object} obj Object to obtain the parent class name
 * @return {String} String name of the class
 */
export function parentClassName(obj) {
    let parentClass = Object.getPrototypeOf(obj.constructor);
    if (typeof parentClass === 'undefined') {
        throw new Error('Could not determine parent class name for ' + className(obj) + '. Does it extend any class?');
    }
    return className(parentClass, true);
}

const excludeDetaults = [ 'constructor', '__proto__' ];

/**
 * Attempt to implement the traits idea from php. Method will copy functionalitied from other classes to target class.
 * @param  {Function} target
 * @param  {Function} args
 * @return {Function}
 */
export function traits(target, ...args) {
    args.forEach(source => {
        Object.keys(source.prototype)
            .filter(key => !excludeDetaults.includes(key))
            .forEach(key => {
                target.prototype[key] = source.prototype[key];
            });
    });
    return target;
}

/**
 * Strip a class's prototype of the function given as arguments.
 * @param  {Function} target
 * @param  {String}   args
 * @return {Function}
 */
export function traitsExclude(target, ...args) {
    let Copy = function() {};
    Object
        .keys(target.prototype)
        .filter(key => !args.includes(key))
        .forEach(key => Copy.prototype[key] = target.prototype[key]);
    return Copy;
}
