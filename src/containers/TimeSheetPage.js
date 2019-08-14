import React from "react";
import {observer} from "mobx-react";
import {computed} from "mobx";
import moment from "moment";
import WorkList from "../components/WorkList";
import TimeSheetControls from "../components/TimeSheetControls";
import workStore from "../stores/workStore";
import projectStore from "../stores/projectStore";
import authStore from "../stores/authStore";
import * as workActions from "../actions/workActions";
import {fetchProjects} from "../actions/projectActions";

@observer
class TimeSheetPage extends React.Component {

    @computed
    get projectOptions() {
        return projectStore.projects.values()
            .filter(p => !p.cloaked)
            .map(p => ({value: '' + p.id, text: p.name}))
            .sort((p1, p2) => p1.text.localeCompare(p2.text));
    };


    defaultStartDate() {
        return moment().startOf('isoWeek').subtract(7, "days");
    }

    componentDidMount() {
        workActions.fetchWork(authStore.user, workStore.range.from || this.defaultStartDate());
        fetchProjects(authStore.user);
    }

    onWeekLeft = () => {
        this.move(-7);
    };

    onMonthLeft = () => {
        this.move(-28);
    };

    onWeekRight = () => {
        this.move(7);
    };

    onMonthRight = () => {
        this.move(28);
    };

    onToday = () => {
        workActions.fetchWork(authStore.user, this.defaultStartDate());
    };

    onAdd = (workRow) => {
        workStore.addWorkRow(workRow.date);
    };

    onDelete = (workRow) => {
        workActions.deleteWorkRow(workRow);
    };

    onEdit = (workRow) => {
        workActions.editWorkRow(workRow);
    };

    onSave = (workRow) => {
        workActions.saveWorkRow(authStore.user, workRow);
    };

    move(days) {
        const newDate = workStore.range.from.clone().add(days, 'days');
        workActions.fetchWork(authStore.user, newDate);
    }

    render() {
        return (
            <div id="timesheet-page">
                <div className="page-heading">
                    <h1 className="ui ribbon label">Time Sheet</h1>
                    <TimeSheetControls onWeekLeft={this.onWeekLeft}
                                       onMonthLeft={this.onMonthLeft}
                                       onToday={this.onToday}
                                       onWeekRight={this.onWeekRight}
                                       onMonthRight={this.onMonthRight}/>
                </div>
                <div>
                    <WorkList rows={workStore.rows}
                              projectOptions={this.projectOptions}
                              projects={projectStore.projects}
                              onSave={this.onSave}
                              onAdd={this.onAdd}
                              onEdit={this.onEdit}
                              onDelete={this.onDelete}/>
                </div>
            </div>
        );
    }
}

export default TimeSheetPage;