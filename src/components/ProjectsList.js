import React from "react";
import PropTypes from "prop-types";
import "../style/style.css";

export default function ProjectsList({projects}) {
    const emptyMessage = (
        <p>There no projects yet.</p>
    );

    const rows = projects.map(project => {
        return (
            <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
            </tr>
        )
    });

    const projectsTable = (
        <table className="view-projects">
            <thead>
            <tr>
                <td className="table-heading" colspan="2">Project Cloaking</td>
            </tr>

            <tr>
                <th>Project Id</th>
                <th>Name</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    );

    return (
        <div>
            {projects.length === 0 ? emptyMessage : projectsTable}
        </div>
    );
}

ProjectsList.propTypes = {
    projects: PropTypes.array.isRequired
};