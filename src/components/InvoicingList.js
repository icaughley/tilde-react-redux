import React from "react";
import PropTypes from "prop-types";
import "../style/style.css";

export default function InvoicingList({invoicings}) {
    const emptyMessage = (
        <p>There no invoicing yet.</p>
    );

    const rows = invoicings.map(invoicing => {
        return (
            <tr key={invoicing.id}>
                <td>{invoicing["user-name"]}</td>
                <td>{invoicing.week}</td>
                <td>{invoicing.hours}</td>
            </tr>
        )
    });

    const invoicingsTable = (
        <table className="view-projects">
            <thead>
            <tr>
                <td className="table-heading" colSpan="3">Project Cloaking</td>
            </tr>

            <tr>
                <th>Name</th>
                <th>Week</th>
                <th>Hours</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    );

    return (
        <div>
            {invoicings.length === 0 ? emptyMessage : invoicingsTable}
        </div>
    );
}

InvoicingList.propTypes = {
    invoicings: PropTypes.array.isRequired
};