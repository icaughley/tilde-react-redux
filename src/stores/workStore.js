import {action, observable} from "mobx";
import moment from "moment";
import _ from "lodash";
import {sortRows} from "../helpers/workRowHelper";

class WorkStore {

    @observable range = {};
    @observable rows = new Map();
    keyCounter = 0;

    @action replaceAll(payload, range) {
        // Copy the data from the action into a new "rows" map.

        this.range = range;
        this.rows.clear();

        _.forEach(payload, w => this.addRowById(this.convertToViewModel(w)));

        this.fillMissingDaysWithEmptyRows(this.rows, range);
        this.setFirstRowForDateFields(this.rows);
    }

    @action addOrReplaceWorkRow(newRow) {
        this.rows.delete(newRow.key);
        this.addRowById(this.convertToViewModel(newRow));
        this.setFirstRowForDateFields(this.rows);
    }

    @action addWorkRow(date) {
        const row = {
            key: this.newKey(),
            date,
            firstRowForDate: false,
            editMode: true
        };
        this.rows.set(row.key, row);
    }

    @action editWorkRow(row) {
        this.rows.get(row.key).editMode = true;
    }

    @action deleteWorkRow(row) {
        const key = row.key || row.id;
        this.rows.delete(key);

        this.fillMissingDaysWithEmptyRows(this.rows, this.range);
        this.setFirstRowForDateFields(this.rows);
    }

    // Adds some extra fields required client side.
    convertToViewModel(w) {

        // Ensure keys are camel case
        w = _.mapKeys(w, (v, k) => _.camelCase(k));

        // Clone the object so that we can extend it.
        return {
            ...w,
            date: moment(w.workdate),
            key: w.id,
            editMode: false
        };
    }

    addRowById(row) {
        this.rows.set(row.id, row);
    }

    // Loops over the rows and works out which is the first one for each date, and then sets the firstRowForDate field.
    setFirstRowForDateFields(rows) {
        let d = null;
        let sortedRows = rows.values().sort(sortRows);

        _.forEach(sortedRows, (row) => {
            row.firstRowForDate = !row.date.isSame(d);
            d = row.date;
        });
    }

    fillMissingDaysWithEmptyRows(rows, range) {
        const values = rows.values();
        const numDays = range.to.diff(range.from, "days") + 1;

        for (let i = 0; i < numDays; i++) {
            const date = range.from.clone().add(i, "days");
            if (!_.some(values, w => w.date.isSame(date))) {
                const key = this.newKey();
                rows.set(key, {
                    editMode: true,
                    date,
                    key
                });
            }
        }
    }

    newKey() {
        this.keyCounter++;
        return `New${_.padStart("" + this.keyCounter, 6, "0")}`;
    }
}

export default new WorkStore();
