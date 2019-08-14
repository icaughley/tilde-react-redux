import React from "react";
import PropTypes from "prop-types";
import InvoicingList from "../components/InvoicingList";
import {connect} from "react-redux";
import {fetchInvoicingEntries} from "../actions/invoiceEntryActions";
import {fetchBillableProjects} from "../actions/projectActions";
import {billableProjectsSelector} from "../selectors/selectors";
import SelectInput from "../components/common/SelectInput";

class InvoicingPage extends React.Component {

    componentDidMount() {
        this.props.fetchBillableProjects();
    }

    onProjectSelect(event) {
        const projectID = Number(event.target.value);
        if (projectID === -1) {
            return;
        }
        const project = this.props.billableProjects.get( projectID );
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
                    options={billableProjectsSelector(this.props.billableProjects)}
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
    selectedProject: PropTypes.object.isRequired,
    billableProjects: PropTypes.object.isRequired,
    fetchInvoicingEntries: PropTypes.func,
    fetchBillableProjects: PropTypes.func.isRequired
};

function mapStateToProps({billableProjects, invoicingEntries, selectedProject}) {
    return {billableProjects, invoicingEntries, selectedProject};
}

export default connect(mapStateToProps, {fetchBillableProjects, fetchInvoicingEntries})(InvoicingPage);
