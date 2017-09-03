import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export default class InvoicingList extends React.Component {
    onInvoiceChange(invoicing, e) {
        this.props.onInvoiceChange(invoicing, e.target.checked);
    }

    isEmpty(o) {
        for (var p in o) {
            if (o.hasOwnProperty(p)) {
                return false;
            }
        }
        return true;
    }

    render() {
        const emptyMessage = (
            <p> </p>
        );

        const rows = _.values(this.props.invoicingEntries)
            .map(invoicing => {
                return (
                    <tr key={invoicing.id}>
                        <td>{invoicing["user-name"]}</td>
                        <td>{invoicing.week}</td>
                        <td>{invoicing.hours}</td>
                        <td><input type="checkbox"
                                   onChange={this.onInvoiceChange.bind(this, invoicing)}/></td>
                    </tr>
                )
            });

        const invoicingEntriesTable = (
            <table className="ui striped table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Week</th>
                    <th>Hours</th>
                    <th>Invoice</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        );

        return (
            <div>
                { this.isEmpty(this.props.invoicingEntries) ? emptyMessage : invoicingEntriesTable }
            </div>
        );
    }
}

InvoicingList.propTypes = {
    invoicingEntries: PropTypes.object,
    onInvoiceChange: PropTypes.func.isRequired,
    projectName: PropTypes.string
};