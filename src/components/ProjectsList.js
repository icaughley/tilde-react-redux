import React from "react";
import {observer} from "mobx-react";
import ProjectListRow from "./ProjectListRow";

export default observer((props) => {
    const onCloakedChange = (project, e) => {
        props.onCloakedChange(project, e.target.checked);
    };

    const onDelete = (project) => {
        props.onDelete(project);
    };

    const emptyMessage = (
        <p>There are no projects yet.</p>
    );

    const rows = props.projects.values()
        .sort((p1, p2) => {
            return p1.name.localeCompare(p2.name);
        })
        .map(project => {
            return (
                <ProjectListRow
                    key={project.id}
                    project={project}
                    onDelete={onDelete.bind(null, project)}
                    onCloakedChange={onCloakedChange.bind(null, project)}/>
            )
        });

    const projectsTable = (
        <table className="ui striped table">
            <thead>
            <tr>
                <th>Project Id</th>
                <th>Name</th>
                <th>Cloaked</th>
                <th>Working</th>
                <th>Billable</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    );

    return (
        <div>
            {props.projects.size === 0 ? emptyMessage : projectsTable}
        </div>
    );
});
