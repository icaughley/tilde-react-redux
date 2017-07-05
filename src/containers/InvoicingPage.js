import React from "react";
import PropTypes from "prop-types";
import InvoicingList from "../components/InvoicingList";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {fetchInvoicingEntries, fetchInvoicingProjects} from "../actions";
import {invoicingProjectsSelector} from "../selectors/selectors";
import SelectInput from "../components/common/SelectInput";

class InvoicingPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedProject: this.props.selectedProject
        };
    }

    componentDidMount() {
        this.props.fetchInvoicingProjects();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedProject.value !== nextProps.selectedProject.value) {
            // Necessary to populate form when existing project is loaded directly.
            this.setState({selectedProject: nextProps.project});
        }
    }

    onProjectSelect(event) {
        this.setState({selectedProject: event.target});
        return this.props.fetchInvoicingEntries(event.target.value);
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
                    value={this.state.selectedProject.text}
                    defaultOption={this.state.selectedProject.text}
                    options={this.props.invoicingProjects}
                    onChange={this.onProjectSelect.bind(this)}/>
                <InvoicingList project={this.state.selectedProject} invoicingEntries={this.props.invoicingEntries}
                onInvoiceChange={this.onInvoiceChange.bind(this)}/>
            </div>
        );
    }
}

InvoicingPage.propTypes = {
    invoicingEntries: PropTypes.object,
    invoicingProjects: PropTypes.array.isRequired,
    fetchInvoicingEntries: PropTypes.func,
    fetchInvoicingProjects: PropTypes.func.isRequired,
    selectedProject: PropTypes.object.isRequired,
};

function mapStateToProps({state, invoicingProjects, invoicingEntries}) {
    let selectedProject = {text: 'Select Project', value: -1};
    return {
        invoicingProjects: invoicingProjectsSelector(invoicingProjects),
        invoicingEntries,
        selectedProject: selectedProject
    }
}

export default connect(mapStateToProps, {fetchInvoicingProjects, fetchInvoicingEntries})(withRouter(InvoicingPage));
