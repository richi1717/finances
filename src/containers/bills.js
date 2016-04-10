import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBills, fetchCash, addNew } from '../actions/index';
import Cash from '../components/cash';
import Payments from '../components/payments';
let paycheck = 1723.41;
paycheck = paycheck * 4;
let total;
let tithe = paycheck * .10;

class Bills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debt: false,
      showNew: false,
      isDebt: true
    };
    this.addNew = this.addNew.bind(this);
    this.createNew = this.createNew.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.debtSelect = this.debtSelect.bind(this);
  }

  componentWillMount() {
    this.props.fetchBills();
    this.props.fetchCash();
  }

  render() {
    console.log(this.props.bills);
    return <div>
      <button className="btn btn-info" onClick={this.handleClick.bind(this)}>{this.state.debt ? "Show" : "Hide"} Debt?</button>
      {this.paycheck()}
      {this.state.debt ? this.renderTotalNoDebt(this.props.cash, this.props.bills) : this.renderTotal(this.props.cash, this.props.bills)}
      {this.paycheckMinusMoney()}
      <button className="btn btn-secondary" onClick={this.createNew}>Add New Bill</button>
      {this.addNew()}
      {this.state.debt ? this.renderWithOutDebt(this.props.bills) : this.renderBills(this.props.bills)}
      {this.renderCash(this.props.cash)}
    </div>;
  }

  createNew() {
    this.setState({ showNew: !this.state.showNew });
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.props.bills[0]);
    let amount = 0;
    for (let key in this.props.bills[0]) {
      amount++;
      // console.log(amount);
    }
    let props = {
      name: this.refs.name.value,
      amount: this.refs.amount.value,
      due: this.refs.due.value,
      payoff: this.refs.payoff.value ? this.refs.payoff.value : null,
      debt: this.state.isDebt,
      id: amount
    };
    this.props.addNew(props);
    this.setState({ showNew: false });
    setTimeout(() => {this.props.fetchBills();}, 2000);
  }

  debtSelect(event) {
    if (event.target.checked && event.target === this.refs.debt) {
      this.setState({ isDebt: true });
    } else if (event.target.checked && event.target === this.refs.notDebt) {
      this.setState({ isDebt: false });
    }
  }

  addNew() {
    if (this.state.showNew) {
      return (
        <form onSubmit={this.handleSubmit} className="form-container">
          <input ref="name" placeholder="Name of Bill" />
          <input ref="amount" placeholder="Amount of Bill" />
          <input ref="due" placeholder="Due Date Each Month" />
          <input ref="payoff" placeholder="Payoff of Debt" />
          <div className="input-group">
            <span className="input-group-addon">
              <input ref="debt" onChange={this.debtSelect} type="checkbox" />
            </span>
            <input type="text" className="form-control" placeholder="Debt" />
            <span className="input-group-addon">
              <input ref="notDebt" onChange={this.debtSelect} type="checkbox" />
            </span>
            <input type="text" className="form-control" placeholder="Not Debt" />
          </div>
          <button className="btn btn-info">Submit</button>
        </form>
      );
    }
  }

  paycheck() {
    return <button className="btn btn-info">${paycheck.toFixed(2)}</button>;
  }

  paycheckMinusMoney() {
    const leftover = paycheck - total - tithe;
    return <button className="btn btn-secondary">Left: ${leftover.toFixed(2)}</button>;
  }

  renderTotalNoDebt(cash, bills) {
    bills = bills[0] ? bills[0]: bills;
    let amount = 0;
    for (const key in bills) {
      if (this.props.rowName.indexOf(bills[key].id) < 0) {
        if (!bills[key].debt) {
          amount = amount + bills[key].amount;
        }
      }
    }
    cash = cash[0] ? cash[0]: cash;
    for (const key in cash) {
      amount = amount + cash[key].amount;
    }
    total = amount;
    return <button className="btn btn-secondary">Total: ${amount.toFixed(2)}</button>;
  }

  renderTotal(cash, bills) {
    console.log(cash, bills);
    bills = bills[0] ? bills[0]: bills;
    let amount = 0;
    for (const key in bills) {
      if (this.props.rowName.indexOf(bills[key].id) < 0) {
        bills[key].amount = parseInt(bills[key].amount, 10);
        amount = amount + bills[key].amount;
      }
    }
    cash = cash[0] ? cash[0]: cash;
    for (const key in cash) {
      amount = amount + cash[key].amount;
    }
    total = amount;
    return <button className="btn btn-secondary">Total: ${amount.toFixed(2)}</button>;
  }

  handleClick() {
    this.setState({ debt: !this.state.debt });
  }

  renderWithOutDebt(bills) {
    bills = bills[0] ? bills[0]: bills;
    const billsArray = [];
    let amount = 0;
    for (const key in bills) {
      if (this.props.rowName.indexOf(bills[key].id) < 0) {
        if (!bills[key].debt) {
          amount = amount + bills[key].amount;
          billsArray.push(
            <Payments bills={bills[key]} total={amount.toFixed(2)} key={key} />
          );
        }
      }
    }
    return billsArray;
  }

  renderBills(bills) {
    bills = bills[0] ? bills[0]: bills;
    // console.log(bills);
    const billsArray = [];
    let amount = 0;
    for (const key in bills) {
      if (this.props.rowName.indexOf(bills[key].id) < 0) {
        amount = amount + bills[key].amount;
        billsArray.push(
          <Payments bills={bills[key]} total={amount.toFixed(2)} key={key} />
        );
      }
    }
    return billsArray;
  }

  renderCash(cash, index) {
    cash = cash[0] ? cash[0]: cash;
    // console.log(cash);
    const cashArray = [];
    let amount = 0;
    for (const key in cash) {
      amount = amount + cash[key].amount;
      cashArray.push(
        <Cash cash={cash[key]} total={amount.toFixed(2)} key={key} />
      );
    }
    return cashArray;
  }
}

function mapStateToProps({ bills, cash, rowName }) {
  return { bills, cash, rowName };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBills, fetchCash, addNew }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Bills);
