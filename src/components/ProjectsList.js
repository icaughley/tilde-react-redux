import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "../style/style.css";

export default class ProjectsList extends React.Component {
    onCloakedChange(project, e) {
        this.props.onCloakedChange(project, e.target.checked);
    }

    render() {
        const emptyMessage = (
            <p>There no projects yet.</p>
        );

        const rows = _.values(this.props.projects)
            .sort((p1, p2) => {
                return p1.name.localeCompare(p2.name);
            })
            .map(project => {
                return (
                    <tr key={project.id}>
                        <td>{project.id}</td>
                        <td>{project.name}</td>
                        <td><input type="checkbox"
                                   checked={project.cloaked ? "checked" : ""}
                                   onChange={this.onCloakedChange.bind(this, project)}/></td>
                    </tr>
                )
            });

        const projectsTable = (
            <table className="view-projects">
                <thead>
                <tr>
                    <td className="table-heading" colSpan="3">Project Cloaking</td>
                </tr>

                <tr>
                    <th>Project Id</th>
                    <th>Name</th>
                    <th>Cloaked</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        );

        return (
            <div>
                {this.props.projects.length === 0 ? emptyMessage : projectsTable}
            </div>
        );
    }
}

ProjectsList.propTypes = {
    projects: PropTypes.object.isRequired
};
