import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import _ from "lodash";
import "../style/style.css";

export default class ProjectsList extends React.Component {
    onCloakedChange(project, e) {
        this.props.onCloakedChange(project, e.target.checked);
    }

    tickCross(state) {
        return state ? <i className="checkmark icon"/> : <i className="remove circle icon"/>;
    }

    tdClassName(project, extraClasses )
    {
        return (extraClasses || "" ) + ( project.cloaked ? " disabled" : "" );
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
                        <td className={this.tdClassName(project)}>{project.id}</td>
                        <td className={this.tdClassName(project)}>{project.name}</td>
                        <td className="center aligned">
                            <input type="checkbox"
                                   checked={project.cloaked ? "checked" : ""}
                                   onChange={this.onCloakedChange.bind(this, project)}/>
                        </td>
                        <td className={this.tdClassName(project, "center aligned")}>{this.tickCross(project.billable)}</td>
                        <td className={this.tdClassName(project, "center aligned")}>{this.tickCross(project.working)}</td>
                        <td className="center aligned">
                            <Link to={"/projects/" + project.id} className="ui compact icon button">
                                <i className="edit icon"/>
                            </Link>
                        </td>
                    </tr>
                )
            });

        const projectsTable = (
            <table className="ui striped table">
                <thead>
                <tr>
                    <th>Project Id</th>
                    <th>Name</th>
                    <th>Cloaked</th>
                    <th>Billable</th>
                    <th>Working</th>
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
                {this.props.projects.length === 0 ? emptyMessage : projectsTable}
            </div>
        );
    }
}

ProjectsList.propTypes = {
    projects: PropTypes.object.isRequired
};
