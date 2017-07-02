import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "../style/style.css";

export default class InvoicingList extends React.Component {
    onInvoiceChange(invoicing, e) {
        this.props.onInvoiceChange(invoicing, e.target.checked);
    }

    render() {
        const emptyMessage = (
            <p>There no invoicing yet.</p>
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
            <table className="view-projects">
                <thead>
                <tr>
                    <td className="table-heading" colSpan="4">{this.props.projectName}</td>
                </tr>

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
                {this.props.invoicingEntries === undefined || this.props.invoicingEntries.length === 0 ? emptyMessage : invoicingEntriesTable}
            </div>
        );
    }
}

InvoicingList.propTypes = {
    invoicingEntries: PropTypes.object,
    projectName: PropTypes.string
};