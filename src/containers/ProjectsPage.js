import React from "react";
import PropTypes from "prop-types";
import ProjectsList from "../components/ProjectsList";
import {connect} from "react-redux";
import {fetchProjects, setProjectCloaked} from "../actions";

class ProjectsPage extends React.Component {
    componentDidMount() {
        this.props.fetchProjects(this.props.user);
    }

    onCloakedChange(project, value) {
        this.props.setProjectCloaked(project, this.props.user, value);
    }

    render() {
        return (
            <div className="projects-page">
                <h1>Projects List</h1>
                <ProjectsList projects={this.props.projects} onCloakedChange={this.onCloakedChange.bind(this)}/>
            </div>
        );
    }
}

ProjectsPage.propTypes = {
    projects: PropTypes.object.isRequired,
    fetchProjects: PropTypes.func.isRequired,
    setProjectCloaked: PropTypes.func.isRequired
};

function mapStateToProps({auth, projects}) {
    return {
        user: auth.user,
        projects
    }
}

export default connect(mapStateToProps, {fetchProjects, setProjectCloaked})(ProjectsPage);
