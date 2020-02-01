import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class AddNewTxn extends Component {
  state = {
    description: "",
    isCredit: true,
    amount: "",
    dateOf: "",
    redirectToHome: false,
    error: ""
  };

  checkValid = () => {
    const { description, amount } = this.state;
    if (description.length === 0 || amount === 0) {
      this.setState({
        error: "All Fields are required"
      });
      return false;
    }
    return true;
  };

  clickSubmit = e => {
    e.preventDefault();

    let newTxn;
    newTxn = {
      description: this.state.description,
      isCredit: this.state.isCredit,
      amount: this.state.amount,
      dateOf: this.state.dateOf
    };
    // console.log(newTxn);

    if (this.checkValid()) {
      fetch("http://localhost:5000/balance-sheet/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTxn)
      })
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          this.setState({
            description: "",
            isCredit: true,
            amount: "",
            dateOf: "",
            redirectToHome: true
          });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { description, dateOf, amount, redirectToHome, error } = this.state;

    if (redirectToHome) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <h1 className="display-4 text-center mt-4">Create New Transaction</h1>
        <div
          className="alert alert-danger"
          style={{ display: !error && "none" }}
        >
          {error}
        </div>
        <form>
          <div className="form-group mt-4">
            <label className="text-muted">Description</label>
            <input
              onChange={e => this.setState({ description: e.target.value })}
              placeholder="Description"
              type="text"
              value={description}
              className="form-control"
            />
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="DebitCredit"
              id="inlineRadio1"
              value="Credit"
              onChange={() => this.setState({ isCredit: true })}
            />
            <label
              className="form-check-label text-muted"
              htmlFor="inlineRadio1"
            >
              Credit
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="DebitCredit"
              id="inlineRadio2"
              value="Debit"
              onChange={() => this.setState({ isCredit: false })}
            />
            <label
              className="form-check-label text-muted"
              htmlFor="inlineRadio2"
            >
              Debit
            </label>
          </div>
          <div className="form-group mt-2">
            <label className="text-muted mr-2">Date</label>
            <input
              type="Date"
              value={dateOf}
              onChange={e => this.setState({ dateOf: e.target.value })}
            />
          </div>

          <div className="form-group mt-2">
            <label className="text-muted">Amount</label>
            <input
              onChange={e => this.setState({ amount: e.target.value })}
              placeholder="Amount in ₹"
              type="text"
              value={amount}
              className="form-control"
            />
          </div>
          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
