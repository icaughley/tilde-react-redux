import React from "react";
import {connect} from "react-redux";
import {Modal} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import ProjectForm from "../forms/ProjectForm";
import {updateProject} from "../actions";

/**
 * This modal is controlled by the URL. When we are at projects/{id}, the modal is displayed.
 */
class EditProjectModal extends React.Component {
    handleClose() {
        this.props.history.push('/projects');
    }

    handleSubmit(values) {
        this.handleClose();
        return this.props.updateProject(values);
    }

    render() {
        return (
            <Modal size="small"
                   open={true}
                   closeIcon={true}
                   onClose={this.handleClose.bind(this)}>
                <Modal.Header>Edit Project</Modal.Header>
                <Modal.Content>
                    <ProjectForm initialValues={this.props.project} onSubmit={this.handleSubmit.bind(this)}/>
                </Modal.Content>
            </Modal>
        );
    }
}

function mapStateToProps({projects}, ownProps) {
    return {
        project: projects[ownProps.match.params.id]
    }
}

// withRouter will add the history to the props.
export default connect(mapStateToProps, {updateProject})(withRouter(EditProjectModal))
