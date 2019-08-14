import React from "react";
import { withRouter } from 'react-router-dom';
import {Modal} from "semantic-ui-react";
import ProjectForm, {projectForm} from "../forms/ProjectForm";
import {updateProject} from "../actions/projectActions";
import projectStore from "../stores/projectStore";

/**
 * This modal is controlled by the URL. When we are at projects/{id}, the modal is displayed.
 */
class EditProjectModal extends React.Component {

    handleClose = () => {
        this.props.history.push("/projects");
    };

    handleSubmit = (values) => {
        this.handleClose();
        return updateProject(values);
    };

    render() {
        const project = projectStore.projects.get(this.props.match.params.id);
        const form = projectForm(this.handleSubmit, project);
        return (
            <Modal size="small"
                   open={true}
                   closeIcon={true}
                   onClose={this.handleClose}>
                <Modal.Header>Edit Project</Modal.Header>
                <Modal.Content>
                    <ProjectForm form={form}/>
                </Modal.Content>
            </Modal>
        );
    }
}

export default withRouter( EditProjectModal );
