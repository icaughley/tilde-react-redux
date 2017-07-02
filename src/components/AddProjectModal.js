import React from "react";
import {Button, Modal} from "semantic-ui-react";
import ProjectForm from "../forms/ProjectForm";

/**
 * This is a Controlled Modal. Like a controlled field, the open-closedness of the modal is added to the local component
 * state, and controlled through handle methods. This is done to allow the submittion of the form to close the modal.
 */
export default class AddProjectModal extends React.Component {
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

    handleSubmit(values) {
        this.handleClose();
        return this.props.onSubmit(values);
    }

    render() {
        return (
            <Modal size="small"
                   trigger={<Button className="right floated positive" onClick={this.handleOpen}>Add</Button>}
                   open={this.state.modalOpen}
                   onClose={this.handleClose}
                   closeIcon={true}>
                <Modal.Header>Add Project</Modal.Header>
                <Modal.Content><ProjectForm onSubmit={this.handleSubmit.bind(this)}/></Modal.Content>
            </Modal>
        );
    }
}
