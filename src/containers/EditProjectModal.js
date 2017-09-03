import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Modal} from "semantic-ui-react";
import ProjectForm from "../forms/ProjectForm";
import {updateProject} from "../actions";

/**
 * This modal is controlled by the URL. When we are at projects/{id}, the modal is displayed.
 */
class EditProjectModal extends React.Component {
    handleClose = () => {
        this.props.push("/projects");
    };

    handleSubmit = (values) => {
        this.handleClose();
        return this.props.updateProject(values);
    };

    render() {
        return (
            <Modal size="small"
                   open={true}
                   closeIcon={true}
                   onClose={this.handleClose}>
                <Modal.Header>Edit Project</Modal.Header>
                <Modal.Content>
                    <ProjectForm initialValues={this.props.project} onSubmit={this.handleSubmit}/>
                </Modal.Content>
            </Modal>
        );
    }
}

EditProjectModal.propTypes = {
    updateProject: PropTypes.func.isRequired
};

function mapStateToProps({projects}, ownProps) {
    return {
        project: projects[ownProps.match.params.id]
    }
}

// withRouter will add the history to the props.
export default connect(mapStateToProps, {updateProject, push})(EditProjectModal)
