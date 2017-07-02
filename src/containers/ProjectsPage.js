import React from "react";
import {Route} from "react-router-dom";
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

    onCloakedChange(project, value) {
        this.props.setProjectCloaked(project, this.props.user, value);
    }

    onAddProjectSubmitted(values) {
        this.props.addProject(values);
    }

    onDelete(project) {
        this.props.deleteProject(project);
    }

    render() {
        return (
            <div className="projects-page">
                <Route path="/projects/:id" component={EditModal}/>
                <h1>Projects List <AddModal onSubmit={this.onAddProjectSubmitted.bind(this)}/></h1>
                <ProjectsList projects={this.props.projects}
                              onCloakedChange={this.onCloakedChange.bind(this)}
                              onDelete={this.onDelete.bind(this)}/>
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

export default connect(mapStateToProps, {fetchProjects, setProjectCloaked, addProject, deleteProject})(ProjectsPage);
