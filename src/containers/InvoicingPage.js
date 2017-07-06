import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import InvoicingList from "../components/InvoicingList";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {fetchInvoicingEntries, fetchInvoicingProjects} from "../actions";
import {invoicingProjectsSelector} from "../selectors/selectors";
import SelectInput from "../components/common/SelectInput";

class InvoicingPage extends React.Component {

    componentDidMount() {
        this.props.fetchInvoicingProjects();
    }

    onProjectSelect(event) {
        const projectID = Number(event.target.value);
        if (projectID === -1) {
            return;
        }
        const project = _.find(this.props.invoicingProjects, e => e.id === projectID);
        return this.props.fetchInvoicingEntries(project);
    }

    onInvoiceChange(event) {
        alert(event.target.checked);
    }

    render() {
        return (
            <div className="invoicing-page">
                <h1>Invoicing List</h1>
                <SelectInput
                    name="projectId"
                    label="Project"
                    value={String(this.props.selectedProject.id)}
                    defaultOption="Select Project"
                    options={invoicingProjectsSelector(this.props.invoicingProjects)}
                    onChange={this.onProjectSelect.bind(this)}/>
                <InvoicingList project={this.props.selectedProject}
                               invoicingEntries={this.props.invoicingEntries}
                               onInvoiceChange={this.onInvoiceChange.bind(this)}/>
            </div>
        );
    }
}

InvoicingPage.propTypes = {
    invoicingEntries: PropTypes.object,
    invoicingProjects: PropTypes.array.isRequired,
    fetchInvoicingEntries: PropTypes.func,
    fetchInvoicingProjects: PropTypes.func.isRequired
};

function mapStateToProps({invoicingProjects, invoicingEntries, selectedProject}) {
    return {invoicingProjects, invoicingEntries, selectedProject};
}

export default connect(mapStateToProps, {fetchInvoicingProjects, fetchInvoicingEntries})(withRouter(InvoicingPage));
