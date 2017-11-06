import Chance from 'chance';

import { Component } from 'features/views/component';
import { extend } from 'features/utils';

/**
 *
 */
export class ComponentHelperListing extends Component {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'components.helper-table';
    /**
     * Constructor
     */
    constructor(...args) {
        super(...args);

        if (this.buildRandom) {
            this.buildRandom();
        } else {
            let chance = new Chance();
            let random = Math.trunc(Math.random() * 1000) % 10 + 1  ;
            this.thead = ['#'].concat(Array(random).fill().map((_, i) => chance.string({length: 5})));
            this.tbody = Array(random).fill().map((_, i) => {
                return [i].concat(Array(random).fill().map((_, i) => chance.string({length: 5})));
            })
        }
    }
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            rows: { // row options
                selectable: true // whether to add select checkboxes in stead of row ids
            },
            actions: [
              { icon: 'fa fa-pencil', title: 'Edit', event: 'listing:edit' },
              { icon: 'fa fa-trash', title: 'Remove', event: 'listing:remove' }
            ]
        })
    }
    /**
     * Mark table in loading state.
     */
    setTableLoading() {
        this.logger.debug('table-id', this.__uuid.toString(), $(`#table-${this.__uuid}`));
        $(`#table-${this.__uuid}`).addClass('table--loading');
    }
    /**
     * Mark table as data has been loaded. This can be triggered when service has done loading the data.
     */
    setTableLoaded() {
        setTimeout(() => {
            this.logger.debug('table-id', this.__uuid.toString(), $(`#table-${this.__uuid}`));
            $(`#table-${this.__uuid}`).removeClass('table--loading');
        }, 500);
    }
    /**
     * [exportToCSV description]
     * @method exportToCSV
     * @return {[type]}    [description]
     */
    exportToCSV() {
        let csv = [this.thead.join(',')];
        this.tbody.forEach((row, i) => csv.push(row.join(',')));
        csv = csv.join('\n');
        this.logger.debug('table-csv-gernerate', csv);
        window.location.href=`data:text/csv;charset=UTF-8,${csv}`;
    }
}