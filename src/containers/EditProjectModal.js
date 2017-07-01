import React from "react";
import {connect} from "react-redux";
import {Modal} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import ProjectForm from "../forms/ProjectForm";

class EditProjectModal extends React.Component {
    onClose() {
        this.props.history.push('/projects');
    }

    render() {
        return (
            <Modal size="small"
                   open={true}
                   closeIcon={true}
                   onClose={this.onClose.bind(this)}>
                <Modal.Header>Edit Project</Modal.Header>
                <Modal.Content><ProjectForm initialValues={this.props.project}/></Modal.Content>
            </Modal>
        );
    }
}

function mapStateToProps({projects}, ownProps) {
    return {
        project: projects[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps)(withRouter(EditProjectModal))
