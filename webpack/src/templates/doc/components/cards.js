import {Template} from 'features/views/template';
import {extend} from 'features/utils';

export class TemplateDocComponentsCards extends Template {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.cards';
    /**
     * @see View::constructor()
     */
    constructor(...args) {
        super(...args);
    }
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            pageTitle: {
                content: {
                    title: 'Cards'
                }
            }
        });
    }
}
