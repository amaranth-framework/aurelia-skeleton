import { ComponentHelperContent } from 'components/helper/content/content';
import { extend } from 'features/utils';

/**
 *
 */
export class ComponentNavLeft extends ComponentHelperContent {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav-left';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            componentsNavbar: [  // list of components to render
                {
                    type: 'left-profile',
                    module: PLATFORM.moduleName('models/user/user'),
                    view: PLATFORM.moduleName('models/user/navigation-profile.html'),
                    settings: {
                        fromSession: true
                    }
                },
                {
                    type: 'left-nav',
                    module: PLATFORM.moduleName('components/nav/nav'),
                    settings: {
                        content: {
                            title: 'Demo Elements'
                        },
                        filter: { group: 'left-demo', nav: true },
                        style: 'menu'
                    }
                },
                {
                    type: 'left-nav',
                    module: PLATFORM.moduleName('components/nav/nav'),
                    settings: {
                        content: {
                            title: 'UI/UX Experience'
                        },
                        filter: { group: 'left-ui', nav: true },
                        style: 'menu'
                    }
                }
            ],
            navbarCollapseTarget: 'nav-left',
            toggle: true
        });
    }
    /**
     * @see View::init()
     */
    init() {
        super.init();

        this.logger.debug('left-nav', this.settings);
    }
    /**
     * @see View::attached()
     */
    attached() {
        this.toggleEvent = this.events.subscribe('nav-left:toggle', () => this.toggle());

        let toggleTimeout = null;
        $('nav-left').on('mouseover', () => {
            $('nav-left .component--left-toggle').addClass('toggle');
            clearTimeout(toggleTimeout);
            toggleTimeout = setTimeout(() => $('nav-left .component--left-toggle').removeClass('toggle'), 3000);
        });
    }
    /**
     * @see View::detached()
     */
    detached() {
        this.toggleEvent.dispose();
    }
}
