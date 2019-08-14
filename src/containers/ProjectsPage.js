import React from "react";
import {Route} from "react-router";
import {observer} from "mobx-react";
import ProjectsList from "../components/ProjectsList";
import {addProject, deleteProject, fetchProjects, setProjectCloaked} from "../actions/projectActions";
import AddModal from "../components/AddProjectModal";
import EditModal from "../containers/EditProjectModal";
import authStore from "../stores/authStore";
import projectStore from "../stores/projectStore";

@observer
class ProjectsPage extends React.Component {
    componentDidMount() {
        fetchProjects(authStore.user);
    }

    onCloakedChange = (project, value) => {
        setProjectCloaked(project, authStore.user, value);
    };

    onAddProjectSubmitted = (values) => {
        addProject(values);
    };

    onDelete = (project) => {
        deleteProject(project);
    };

    render() {
        return (
            <div className="projects-page">
                <Route path="/projects/:id" component={EditModal}/>
                <div className="page-heading">
                    <h1 className="ui ribbon label">Projects List</h1>
                    <AddModal onSubmit={this.onAddProjectSubmitted}/>
                </div>
                <ProjectsList projects={projectStore.projects}
                              onCloakedChange={this.onCloakedChange}
                              onDelete={this.onDelete}/>
            </div>
        );
    }
}

export default ProjectsPage;
