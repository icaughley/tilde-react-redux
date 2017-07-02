import React from "react";
import PropTypes from "prop-types";
import InvoicingList from "../components/InvoicingList";
import {connect} from "react-redux";
import {fetchInvoicingEntries, fetchInvoicingProjects} from "../actions";
import {invoicingProjectsSelector} from "../selectors/selectors";
import SelectInput from "../components/common/SelectInput";

class InvoicingPage extends React.Component {
    componentDidMount() {
        this.props.fetchInvoicingProjects();
    }

    onInvoiceChange(event) {
        this.setState({projectName: event.target.text});
        return this.props.fetchInvoicingEntries(event.target.value);
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
                    onChange={this.onInvoiceChange.bind(this)}
                />
                <InvoicingList projectName={this.props.projectName} invoicingEntries={this.props.invoicingEntries}/>
            </div>
        );
    }
}

InvoicingPage.propTypes = {
    projectName: PropTypes.string,
    invoicingEntries: PropTypes.object,
    invoicingProjects: PropTypes.array.isRequired,
    fetchInvoicingEntries: PropTypes.func,
    fetchInvoicingProjects: PropTypes.func.isRequired
};

function mapStateToProps({invoicingProjects, invoicingEntries, projectName}) {
    return {
        invoicingProjects: invoicingProjectsSelector(invoicingProjects),
        invoicingEntries,
        projectName
    }
}

export default connect(mapStateToProps, {fetchInvoicingProjects, fetchInvoicingEntries})(InvoicingPage);
