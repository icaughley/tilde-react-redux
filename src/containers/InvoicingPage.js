import React from "react";
import PropTypes from "prop-types";
import InvoicingList from "../components/InvoicingList";
import {connect} from "react-redux";
import {fetchInvoicingEntries, fetchInvoicingProjects} from "../actions";
import {invoicingProjectsSelector} from '../selectors/selectors';
import SelectInput from '../components/common/SelectInput';

class InvoicingPage extends React.Component {
    componentDidMount() {
        this.props.fetchInvoicingEntries();
        this.props.fetchInvoicingProjects();
    }

    onInvoiceChange(project, value) {
        // this.props.setProjectCloaked(project, this.props.user, value);
    }

    render() {
        return (
            <div className="invoicing-page">
                <h1>Invoicing List</h1>
                <SelectInput
                    name="projectId"
                    label="Project"
                    value={this.props.project}
                    defaultOption="Select Project"
                    options={this.props.invoicingProjects}
                     />
                 <InvoicingList invoicingEntries={this.props.invoicingEntries}/>
            </div>
        );
    }
}

InvoicingPage.propTypes = {
    project: PropTypes.object,
    invoicingEntries: PropTypes.object.isRequired,
    invoicingProjects: PropTypes.array.isRequired,
    fetchInvoicingEntries: PropTypes.func.isRequired,
    fetchInvoicingProjects: PropTypes.func.isRequired
};

function mapStateToProps({invoicingEntries, invoicingProjects}) {
    return {
        invoicingEntries,
        invoicingProjects
    }
}

export default connect(mapStateToProps, {fetchInvoicingEntries, fetchInvoicingProjects})(InvoicingPage);
