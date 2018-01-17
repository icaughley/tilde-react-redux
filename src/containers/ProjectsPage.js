import React from "react";
import {Route} from "react-router";
import {push} from "react-router-redux"
import PropTypes from "prop-types";
import ProjectsList from "../components/ProjectsList";
import {connect} from "react-redux";
import {addProject, deleteProject, fetchProjects, setProjectCloaked} from "../actions";
import AddModal from "../components/AddProjectModal";
import EditModal from "../containers/EditProjectModal";

class ProjectsPage extends React.Component {
    componentDidMount() {
        this.props.fetchProjects(this.props.user);
    }

    onCloakedChange = (project, value) => {
        this.props.setProjectCloaked(project, this.props.user, value);
    };

    onAddProjectSubmitted = (values) => {
        this.props.addProject(values);
    };

    onDelete = (project) => {
        this.props.deleteProject(project);
    };

    toProject = (project) => {
        this.props.push("/projects/" + project.id);
    };

    render() {
        return (
            <div className="projects-page">
                <Route path="/projects/:id" component={EditModal}/>
                <div className="page-heading"><h1 className="ui ribbon label">Projects List</h1> <AddModal onSubmit={this.onAddProjectSubmitted}/></div>
                <ProjectsList projects={this.props.projects}
                              onCloakedChange={this.onCloakedChange}
                              onDelete={this.onDelete}
                              toProject={this.toProject}/>
            </div>
        );
    }
}

ProjectsPage.propTypes = {
    projects: PropTypes.object.isRequired,
    addProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    fetchProjects: PropTypes.func.isRequired,
    setProjectCloaked: PropTypes.func.isRequired
};

function mapStateToProps({auth, projects}) {
    return {
        user: auth.user,
        projects
    }
}

export default connect(mapStateToProps, {push, fetchProjects, setProjectCloaked, addProject, deleteProject})(ProjectsPage);
