import React from "react";
import PropTypes from 'prop-types'

export default function ProjectsList({projects}) {
    const emptyMessage = (
        <p>There no projects yet.</p>
    );

    const projectsList = (
        <p>List of projects</p>
    );

    return (
        <div>
            {projects.length === 0 ? emptyMessage : projectsList}
        </div>
    );
}

ProjectsList.propTypes = {
    projects: PropTypes.array.isRequired
};