import { waitForVariable } from 'static/amaranth-utils';
import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement, inlineView } from 'aurelia-templating';
import { Router } from 'aurelia-router';

import { List, ListItem } from './list';

const nav = `<template>
    <nav class.bind="classSet">
        <slot></slot>
    </nav>
</template>`;

/**
 * Material Design List
 * @see {@link https://material.io/components/web/catalog/lists/}
 * @see {@link https://material-components-web.appspot.com/list.html}
 *
 * @example
 * <require from="aurelia-material-components-web/button"></require>
 * <mdc-button style="mdc-ripple-upgraded">Button</mdc-button>
 */
@customElement('mdc-nav')
@inlineView(nav)
export class Nav extends List {
    /**
     * @return {String}
     */
    get classSet() {
        return this.prepareClasses({ 'mdc-list': true });
    }
}

const navItem = `<template>
    <a class.bind="classSet" href="#">
        <slot></slot>
    </a>
</template>`;

/**
 * Material Design List
 * @see {@link https://material.io/components/web/catalog/lists/}
 * @see {@link https://material-components-web.appspot.com/list.html}
 *
 * @example
 * <require from="aurelia-material-components-web/button"></require>
 * <mdc-button style="mdc-ripple-upgraded">Button</mdc-button>
 */
@customElement('mdc-nav-item')
@inlineView(navItem)
@inject(Router)
export class NavItem extends ListItem {
    /**
     * @type {Object}
     */
    @bindable route = {}
    constructor(router, ...args) {
        super(...args);
        /**
         * @type {Router}
         */
        this.router = router;
    }
    /**
     * Aurelia Bind Event
     */
    bind(...args) {
        super.bind(...args);
        
        waitForVariable(this.router, (r) => r.routes).then(rs => {
            this.element.querySelector('.mdc-list-item').href = this.router.generate(this.route.name, this.route.params || {});
        });
    }
    /**
     * @return {String}
     */
    get classSet() {
        return this.prepareClasses({
            'mdc-list-item': true,
            'mdc-list-item--selected': (this.route || {}).active
        });
    }
}
