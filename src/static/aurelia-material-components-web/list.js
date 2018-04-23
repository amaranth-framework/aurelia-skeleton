
import { bindable, customElement, inlineView } from 'aurelia-templating';

import { CustomElement } from './custom-element';

import '@material/list/dist/mdc.list.min.css';

const list = `<template>
    <ul class.bind="classSet">
        <slot></slot>
    </ul>
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
@customElement('mdc-list')
@inlineView(list)
export class List extends CustomElement {
    /**
     * @return {String}
     */
    get classSet() {
        return [
            'mdc-list',
            this.styles
        ].join(' ').trim();
    }
}

const listDivider = `<template>
    <hr class.bind="classSet" />
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
@customElement('mdc-list-divider')
@inlineView(listDivider)
export class ListDivider extends CustomElement {
    /**
     * @return {String}
     */
    get classSet() {
        return [
            'mdc-list-divider',
            this.styles
        ].join(' ').trim();
    }
}

const listGroup = `<template>
    <div class.bind="classSet">
        <slot></slot>
    </div>
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
@customElement('mdc-list-group')
@inlineView(listGroup)
export class ListGroup extends CustomElement {
    /**
     * @return {String}
     */
    get classSet() {
        return [
            'mdc-list-group',
            this.styles
        ].join(' ').trim();
    }
}

const listGroupSubheader = `<template>
    <h3 class.bind="classSet">
        <slot></slot>
    </h3>
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
@customElement('mdc-list-group-subheader')
@inlineView(listGroupSubheader)
export class ListGroupSubheader extends CustomElement {
    /**
     * @return {String}
     */
    get classSet() {
        return [
            'mdc-list-group__subheader',
            this.styles
        ].join(' ').trim();
    }
}

const listItem = `<template>
    <li class.bind="classSet">
        <slot></slot>
    </li>
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
@customElement('mdc-list-item')
@inlineView(listItem)
export class ListItem extends CustomElement {
    /**
     * @return {String}
     */
    get classSet() {
        return [
            'mdc-list-item',
            this.styles
        ].join(' ').trim();
    }
}

const listItemSeparator = `<template>
    <li class.bind="classSet" role="separator"></li>
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
@customElement('mdc-list-item-separator')
@inlineView(listItemSeparator)
export class ListItemSeparator extends ListItem {
    /**
     * @return {String}
     */
    get classSet() {
        return [
            'mdc-list-divider',
            this.styles
        ].join(' ').trim();
    }
}

const listItem2Lines = `<template>
    <li class.bind="classSet">
        <span class.bind="classSetLineOne">
            <slot id="lineOne"></slot>
            <span class.bind="classSetLineTwo">
                <slot id="lineTwo"></slot>
            </span>
        </span>
    </li>
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
@customElement('mdc-list-item-two-lines')
@inlineView(listItem2Lines)
export class ListItem2Lines extends ListItem {
    /**
     * @type {String}
     */
    @bindable stylesLineOne = '';
    /**
     * @type {String}
     */
    @bindable stylesLineTwo = '';
    /**
     * @return {String}
     */
    get classSetLineOne() {
        return [
            'mdc-list-item__text',
            this.styles
        ].join(' ').trim();
    }
    /**
     * @return {String}
     */
    get classSetLineOne() {
        return [
            'mdc-list-item__secondary-text',
            this.styles
        ].join(' ').trim();
    }
}