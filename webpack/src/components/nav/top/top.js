import { ComponentHelperContent } from 'components/helper/content/content';

import { extend } from 'features/utils';

export class ComponentNavTop extends ComponentHelperContent {
    /**
    * [NAVBAR_COLLAPSE_TARGET_LEFT description]
    * @type {String}
    */
    static NAVBAR_COLLAPSE_TARGET_LEFT = 'nav-left';
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav-top';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            componentsNavbar: [
                {
                    type: 'navbar-nav-left',
                    module: PLATFORM.moduleName('components/nav/nav'),
                    settings: {
                        style: 'navbar-nav'
                    }
                },/*
                {
                    type: 'top-profile',
                    module: PLATFORM.moduleName('models/user/user'),
                    view: PLATFORM.moduleName('models/user/navigation-profile.html'),
                    settings: {
                        fromSession: true,
                        style: 'navbar-nav'
                    }
                },/**/
                {
                    type: 'top-inbox',
                    module: PLATFORM.moduleName('components/nav/top/inbox/inbox')
                }
            ],
            componentsStatic: {
                logo: {
                    style: 'navbar-brand'
                }
            },
            navbarCollapseId: 'nav-top'
        });
    }
    /**
     * @see View::init()
     */
    init() {
        super.init();
        // tie collapse id to container
        this.settings.navbarCollapseId = `${this.settings.navbarCollapseId}-${this.__uuid}`;
        // initialize dropdown id if not available
        if (this.settings.navbarCollapseTarget !== ComponentNavTop.NAVBAR_COLLAPSE_TARGET_LEFT) {
            this.settings.navbarCollapseTarget = this.settings.navbarCollapseId;
        }
    }
    /**
     * Toggle Visibility of left navigation menu
     * @return {void}
     */
    toggleLeftNav() {
        // TODO: Implement loggle-left-nav
    }
}
