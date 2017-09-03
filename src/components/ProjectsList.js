import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {Button} from "semantic-ui-react";
import "../style/style.css";

const ProjectsList = (props) => {
    const onCloakedChange = (project, e) => {
        props.onCloakedChange(project, e.target.checked);
    };

    const onDelete = (project) => {
        props.onDelete(project);
    };

    const toProject = (project) => {
        props.toProject(project);
    };

    const tickCross = (state) => {
        return state ? <i className="checkmark icon"/> : <i className="remove circle icon"/>;
    };

    const tdClassName = (project, extraClasses) => {
        return (extraClasses || "" ) + ( project.cloaked ? " disabled" : "" );
    };

    const emptyMessage = (
        <p>There no projects yet.</p>
    );

    const rows = _.values(props.projects)
        .sort((p1, p2) => {
            return p1.name.localeCompare(p2.name);
        })
        .map(project => {
            return (
                <tr key={project.id}>
                    <td className={tdClassName(project)}>{project.id}</td>
                    <td className={tdClassName(project)}>{project.name}</td>
                    <td className="center aligned">
                        <input type="checkbox"
                               checked={project.cloaked ? "checked" : ""}
                               onChange={onCloakedChange.bind(null, project)}/>
                    </td>
                    <td className={tdClassName(project, "center aligned")}>{tickCross(project.working)}</td>
                    <td className={tdClassName(project, "center aligned")}>{tickCross(project.billable)}</td>
                    <td className="center aligned">
                        <div className="ui icon buttons">
                            <a href="#" onClick={toProject.bind(null, project)} className="ui compact icon button">
                                <i className="edit icon"/>
                            </a>
                            <Button onClick={onDelete.bind(null, project)}
                                    className="ui compact icon red button">
                                <i className="trash icon"/>
                            </Button>
                        </div>
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
            {props.projects.length === 0 ? emptyMessage : projectsTable}
        </div>
    );
};

ProjectsList.propTypes = {
    projects: PropTypes.object.isRequired,
    onCloakedChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    toProject: PropTypes.func.isRequired
};

export default ProjectsList;
