import React from "react";
import {addProject} from "../actions/projectActions";
import {Button, Modal} from "semantic-ui-react";
import ProjectForm, {projectForm} from "../forms/ProjectForm";

/**
 * This is a Controlled Modal. Like a controlled field, the open-closedness of the modal is added to the local component
 * state, and controlled through handle methods. This is done to allow the submittion of the form to close the modal.
 */
class AddProjectModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {modalOpen: false};
    }

    handleOpen = (e) => this.setState({
        modalOpen: true,
    });

    handleClose = (e) => this.setState({
        modalOpen: false,
    });

    handleSubmit = (values) => {
        this.handleClose();
        return addProject(values);
    };

    render() {
        const form = projectForm(this.handleSubmit);
        return (
            <Modal size="small"
                   trigger={<Button className="right floated positive" onClick={this.handleOpen}>Add</Button>}
                   open={this.state.modalOpen}
                   onClose={this.handleClose}
                   closeIcon={true}>
                <Modal.Header>Add Project</Modal.Header>
                <Modal.Content>
                    <ProjectForm form={form}/>
                </Modal.Content>
            </Modal>
        );
    }
}

export default AddProjectModal;
