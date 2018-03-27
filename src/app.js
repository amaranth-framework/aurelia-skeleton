/**
 * Amaranth - Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import appRoutes from 'routes';
import { Base, Routable } from 'static/amaranth-aurelia-utils';
import { traits } from 'static/amaranth-utils';

export class App extends Base {
  constructor(...args) {
    super(...args)
    this.message = 'Hello World!';
    this.appRoutes = appRoutes;
  }
}

traits(App, Routable);
