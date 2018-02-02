/**
 * Amaranth - Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { LogManager } from 'aurelia-framework';

const _logger = LogManager.getLogger('features/utils');

 /**
  * TODO
  * @param  {any}      target     Object on which we apply deprecated decorator.
  * @param  {String}   key        Key of the object on which we apply deprecated decorator.
  * @param  {String}   descriptor ...
  * @return {void}
  */
export function deprecate(target, key, descriptor) {
    _logger.warn(`Usage of ${className(target)}.${key} is deprecated. Please see documentation.`);
}
