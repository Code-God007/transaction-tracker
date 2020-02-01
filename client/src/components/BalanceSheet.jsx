import React, { Component } from "react";

export default class BalanceSheet extends Component {
  state = {
    balanceData: []
  };

  componentDidMount() {
    fetch("http://localhost:5000/balance-sheet")
      .then(res => res.json())
      .then(data => {
        this.setState({
          balanceData: data
        });
      });
  }

  render() {
    const { balanceData } = this.state;

    return (
      <div>
        <h1 className="display-4 text-center mt-4">Current Balance Sheet</h1>
        <div className="container mt-4">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Credit (₹)</th>
                <th scope="col">Debit (₹)</th>
                <th scope="col">Balance (₹)</th>
              </tr>
            </thead>
            <tbody>
              {balanceData.map((txn, id) => {
                return (
                  <tr key={id}>
                    <th scope="row">
                      {new Date(txn.dateOf).toString().substr(0, 25)}
                    </th>
                    <td>{txn.description}</td>
                    <td>{txn.isCredit ? txn.amount : "-"}</td>
                    <td>{!txn.isCredit ? txn.amount : "-"}</td>
                    <td>{txn.balance}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
