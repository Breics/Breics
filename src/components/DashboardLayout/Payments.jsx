import React from "react";
import "../../styles/Payments.css";

const transactions = [
  {
    serial: "PR-2021-01",
    type: "Rent",
    address: "15, Mende Str...",
    date: "01/09/2021",
    amount: "₦500,000.01",
    verification: "Unverified",
    payment: "Pending",
  },
  {
    serial: "PR-2021-01",
    type: "Service charge",
    address: "15, Mende Str...",
    date: "01/09/2021",
    amount: "₦10,000.01",
    verification: "Unverified",
    payment: "Pending",
  },
  {
    serial: "PR-2021-01",
    type: "Leak Repairs",
    address: "15, Mende Str...",
    date: "01/09/2021",
    amount: "₦30,000.01",
    verification: "Verified",
    payment: "Paid",
  },
  {
    serial: "PR-2021-01",
    type: "Service charge",
    address: "15, Mende Str...",
    date: "01/09/2021",
    amount: "₦10,000.01",
    verification: "Unverified",
    payment: "Pending",
  },
  {
    serial: "PR-2021-01",
    type: "Rent",
    address: "15, Mende Str...",
    date: "01/09/2021",
    amount: "₦500,000.01",
    verification: "Verified",
    payment: "Paid",
  },
];

const Payments = () => {
  return (
    <div className="payments-dashboard">
      <div className="dashboard-header">
        <h2>Payments</h2>
        <button className="upload-btn">Upload payment</button>
      </div>

      <div className="transaction-history">
        <h4>Transaction History</h4>
        <div className="tabs">
          <button className="tab active">All payments <span>4</span></button>
          <button className="tab">Upcoming payments <span>4</span></button>
        </div>
      </div>

      <div className="filters">
        <input type="text" className="search" placeholder="Search transactions" />
        <select className="filter-select">
          <option>All transactions</option>
        </select>
        <select className="filter-select">
          <option>All dates</option>
        </select>
        <select className="filter-select">
          <option>All status</option>
        </select>
      </div>

      <table className="transactions-table">
        <thead>
          <tr>
            <th>Serial number</th>
            <th>Payment type</th>
            <th>Property address</th>
            <th>Payment Date</th>
            <th>Amount</th>
            <th>Verification status</th>
            <th>Payment status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, i) => (
            <tr key={i}>
              <td>{tx.serial}</td>
              <td className="highlighted-text">{tx.type}</td>
              <td>{tx.address}</td>
              <td>{tx.date}</td>
              <td>{tx.amount}</td>
              <td>
                <span className={`badge ${tx.verification.toLowerCase()}`}>{tx.verification}</span>
              </td>
              <td>
                <span className={`badge ${tx.payment.toLowerCase()}`}>{tx.payment}</span>
              </td>
              <td>
                <div className="actions">
                  <button className="dots">...</button>
                  <div className="action-menu">
                    <ul>
                      <li>Verify transaction</li>
                      <li>Edit transaction details</li>
                      <li>Delete transaction</li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        <label>
          Show:
          <select>
            <option>5 rows</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Payments;
