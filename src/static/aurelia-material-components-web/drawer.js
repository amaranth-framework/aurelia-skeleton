
import { bindable, customElement, inlineView } from 'aurelia-templating';
import _ from 'lodash';
import { MDCTemporaryDrawer } from '@material/drawer';

import { CustomElement } from './custom-element';

import '@material/drawer/dist/mdc.drawer.min.css';

const template = `<template>
    <nav class.bind="classSet">
        <nav class.bind="classSetContent">
            <slot></slot>
        </nav>
    </nav>
</template>`;

const templatePersistent = `<template>
    <aside class.bind="classSet">
        <nav class.bind="classSetContent">
            <slot></slot>
        </nav>
    </aside>
</template>`;

const templateContent = `<template>
    <div class.bind="classSet">
        <slot></slot>
    </div>
</template>`;

const templateHeader = `<template>
    <header class.bind="classSet">
        <div class.bind="classSetContent">
            <slot></slot>
        </div>
    </header>
</template>`;

/**
 * Material Design Drawer
 * @see {@link https://material.io/components/web/catalog/drawers/}
 * @see {@link https://material-components-web.appspot.com/drawer/index.html}
 *
 * @example
 * <require from="aurelia-material-components-web/drawer"></require>
 * <mdc-drawer>
 *   <!-- Drawer's Content -->
 * </mdc-drawer>
 */
@customElement('mdc-drawer')
@inlineView(template)
export class Drawer extends CustomElement {
    /**
     * @type {String}
     */
    @bindable stylesContent = '';
    /**
     * Aurelia Bind Event
     * @param  {Object}  bindingContext
     * @param  {Object}  overrideContext
     * @param  {Boolean} _systemUpdate default true
     * @return {void}
     */
    bind(bindingContext, overrideContext, _systemUpdate = true) {
        this.parent = _.get(overrideContext, 'parentOverrideContext.bindingContext');
        this.drawerElement = this.element.querySelector('.mdc-drawer');
    }
    /**
     * @return {String}
     */
    get classSet() {
        return [
            'mdc-drawer mdc-drawer--permanent',
            this.styles
        ].join(' ').trim();
    }
    /**
     * @return {String}
     */
    get classSetContent() {
        return [
            'mdc-drawer__drawer',
            this.stylesContent
        ].join(' ').trim();
    }
    /**
     * @type {String}
     */
    OPEN_CLASS_STRING = ' mdc-drawer--open';
    /**
     * @type {RegExp}
     */
    OPEN_CLASS_REGEX = /\s?mdc-drawer--open/g;
    /**
     * Close the drawer
     */
    close() {
        this.drawerElement.className = this.drawerElement.className.replace(this.OPEN_CLASS_REGEX, '');
    }
    /**
     * Open the drawer
     */
    open() {
        if (this.drawerElement.className.indexOf(this.OPEN_CLASS_STRING) > -1) {
            return;
        }
        this.drawerElement.className += this.OPEN_CLASS_STRING;
    }
}

/**
 * Material Design Drawer's Content
 * @see {@link https://material.io/components/web/catalog/drawers/}
 * @see {@link https://material-components-web.appspot.com/drawer/index.html}
 *
 * @example
 * <require from="aurelia-material-components-web/drawer"></require>
 * <mdc-drawer>
 *   <mdc-drawer-content>
 *     <!-- Drawer Content's Content -->
 *   </mdc-drawer-content>
 * </mdc-drawer>
 */
@customElement('mdc-drawer-content')
@inlineView(templateContent)
export class DrawerContent extends CustomElement {
    /**
     * @return {String}
     */
    get classSet() {
        return [
            'mdc-drawer__content',
            this.styles
        ].join(' ').trim();
    }
}

/**
 * Material Design Drawer's Header
 * @see {@link https://material.io/components/web/catalog/drawers/}
 * @see {@link https://material-components-web.appspot.com/drawer/index.html}
 *
 * @example
 * <require from="aurelia-material-components-web/drawer"></require>
 * <mdc-drawer>
 *   <mdc-drawer-header>
 *     <!-- Drawer Header's Content -->
 *   </mdc-drawer-header>
 * </mdc-drawer>
 */
@customElement('mdc-drawer-header')
@inlineView(templateHeader)
export class DrawerHeader extends CustomElement {
    /**
     * @type {String}
     */
    @bindable stylesContent = '';
    /**
     * @return {String}
     */
    get classSet() {
        return [
            'mdc-drawer__header',
            this.styles
        ].join(' ').trim();
    }
    /**
     * @return {String}
     */
    get classSetContent() {
        return [
            'mdc-drawer__header-content',
            this.stylesContent
        ].join(' ').trim();
    }
}

/**
 * Material Design Drawer
 * @see {@link https://material.io/components/web/catalog/drawers/}
 * @see {@link https://material-components-web.appspot.com/drawer/index.html}
 *
 * @example
 * <require from="aurelia-material-components-web/drawer"></require>
 * <mdc-drawer-persistent>
 *   <!-- Drawer's Content -->
 * </mdc-drawer-persistent>
 */
@customElement('mdc-drawer-persistent')
@inlineView(templatePersistent)
export class DrawerPersistent extends Drawer {
    /**
     * @return {String}
     */
    get classSet() {
        return [
            'mdc-drawer mdc-drawer--persistent',
            this.styles
        ].join(' ').trim();
    }
}

/**
 * Material Design Drawer
 * @see {@link https://material.io/components/web/catalog/drawers/}
 * @see {@link https://material-components-web.appspot.com/drawer/index.html}
 *
 * @example
 * <require from="aurelia-material-components-web/drawer"></require>
 * <mdc-drawer-temporary>
 *   <!-- Drawer's Content -->
 * </mdc-drawer-temporary>
 */
@customElement('mdc-drawer-temporary')
@inlineView(templatePersistent)
export class DrawerTemporary extends DrawerPersistent {
    /**
     * Aurelia Bind Event
     * @return {void}
     */
    bind(...args) {
        super.bind(...args);
        this.drawerLegacy = new MDCTemporaryDrawer(this.drawerElement);
    }
    /**
     * @return {String}
     */
    get classSet() {
        return [
            'mdc-drawer mdc-drawer--temporary',
            this.styles
        ].join(' ').trim();
    }
}
