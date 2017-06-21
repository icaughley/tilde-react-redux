import React from "react";
import PropTypes from "prop-types";
import InvoicingList from "../components/InvoicingList";
import {connect} from "react-redux";
import {fetchInvoicings} from "../actions";

class InvoicingPage extends React.Component {
    componentDidMount() {
        this.props.fetchInvoicings();
    }

    render() {
        return (
            <div className="invoicing-page">
                <h1>Invoicing List</h1>
                 <InvoicingList invoicings={this.props.invoicings}/>
            </div>
        );
    }
}

InvoicingPage.propTypes = {
    invoicings: PropTypes.array.isRequired,
    fetchInvoicings: PropTypes.func.isRequired
};

function mapStateToProps({invoicings}) {
    return {
        invoicings
    }
}

export default connect(mapStateToProps, {fetchInvoicings})(InvoicingPage);
