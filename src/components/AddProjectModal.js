import React from "react";
import {Button, Modal} from "semantic-ui-react";
import ProjectForm from "../forms/ProjectForm";

export default props => {
    return (
        <Modal size="small"
               trigger={<Button className="right floated positive">Add</Button>}
               closeIcon={true}>
            <Modal.Header>Add Project</Modal.Header>
            <Modal.Content><ProjectForm/></Modal.Content>
        </Modal>
    );
}
