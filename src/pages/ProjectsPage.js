import React from "react";
import PropTypes from "prop-types";
import ProjectsList from "../components/ProjectsList";
import {connect} from "react-redux";
import {fetchProjects} from "../actions";

class ProjectsPage extends React.Component {
    componentDidMount() {
        this.props.fetchProjects();
    }

    render() {
        return (
            <div>
                <h1>Projects List</h1>
                <ProjectsList projects={this.props.projects}/>
            </div>
        );
    }
}

ProjectsPage.propTypes = {
    projects: PropTypes.array.isRequired,
    fetchProjects: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        projects: state.projects
    }
}

export default connect(mapStateToProps, {fetchProjects})(ProjectsPage);
