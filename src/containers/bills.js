import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBills, fetchCash, addNew, addEffects, fetchAccountBalance, updateCheck } from '../actions/index';
import Cash from '../components/cash';
import Payments from '../components/payments';
import { check } from '../utils/paycheck';
import { today as Today } from '../utils/date';

let paycheck = check * 4;
let total;
let tithe = paycheck * .10;

class Bills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debt: false,
      showNew: false,
      isDebt: true,
      showAddCheck: false,
      value: check
    };
    this.addNew = this.addNew.bind(this);
    this.createNew = this.createNew.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.debtSelect = this.debtSelect.bind(this);
    this.showBalance = this.showBalance.bind(this);
    this.addCheck = this.addCheck.bind(this);
    this.handleCheckAdd = this.handleCheckAdd.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleCheckSubmit = this.handleCheckSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchBills();
    this.props.fetchCash();
    this.props.fetchAccountBalance();
  }

  render() {
    return <div className={this.props.blurEffects ? "body-effects" : null}>
      <button className="btn btn-info" onClick={this.handleClick.bind(this)}>{this.state.debt ? "Show" : "Hide"} Debt?</button>
      {this.paycheck()}
      {this.state.debt ? this.renderTotalNoDebt(this.props.cash, this.props.bills) : this.renderTotal(this.props.cash, this.props.bills)}
      {this.paycheckMinusMoney()}
      <button className="btn btn-secondary" onClick={this.createNew}>Add New Bill</button>
      {this.addNew()}
      {this.showBalance()}
      {this.addCheck()}
      {this.addCheckForm()}
      {this.state.debt ? this.renderWithOutDebt(this.props.bills) : this.renderBills(this.props.bills)}
      {this.renderCash(this.props.cash)}
    </div>;
  }

  createNew() {
    this.setState({ showNew: !this.state.showNew });
    this.props.addEffects(this.props.blurEffects);
  }

  handleSubmit(event) {
    event.preventDefault();
    let amount = 0;
    for (let key in this.props.bills[0]) {
      amount++;
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

  showBalance() {
    if (this.props.account[0]) {
      return <button className="btn btn-success custom-btn">Balance: ${this.props.account[0].amount}</button>;
    }
  }

  addCheck() {
    return <button className="btn btn-info" onClick={this.handleCheckAdd}>Add Check</button>;
  }

  handleCheckAdd() {
    this.setState({
      showAddCheck: !this.state.showAddCheck
    });
  }

  addCheckForm() {
    let cashAmount = 0;
    const cash = this.props.cash[0];
    for (let key in cash) {
      cashAmount += parseFloat(cash[key].amount);
    };
    cashAmount = cashAmount / 4;
    const totalAdd = _.round((this.state.value * .9) - cashAmount, 2);
    if (this.state.showAddCheck) {
      return (
        <form onSubmit={this.handleCheckSubmit} className="form-container">
          <input ref="check" value={this.state.value} onChange={this.handleCheckChange} />
          X .9 for tithe - ${cashAmount} for cash = ${totalAdd}
          <button className="btn btn-info">Submit</button>
        </form>
      );
    }
  }

  handleCheckSubmit(e) {
    e.preventDefault();
    let cashAmount = 0;
    const cash = this.props.cash[0];
    for (let key in cash) {
      cashAmount += parseFloat(cash[key].amount);
    };
    cashAmount = cashAmount / 4;
    const totalBalance = _.round(parseFloat(this.props.account[0].amount) + (parseFloat(this.refs.check.value) * .9) - cashAmount, 2);
    const props = {
      amount: totalBalance,
      asof: Today
    };
    this.props.updateCheck(props);
    setTimeout(() => {this.props.fetchAccountBalance();}, 2000);
  }

  handleCheckChange() {
    this.setState({
      value: this.refs.check.value
    });
  }

  paycheckMinusMoney() {
    const leftover = paycheck - total - tithe;
    return <button className="btn btn-secondary">Left: ${leftover.toFixed(2)}</button>;
  }

  renderTotalNoDebt(cash, bills) {
    bills = bills[0] ? bills[0]: bills;
    let amount = 0;
    for (const key in bills) {
      if (bills[key] !== null) {
        if (this.props.rowName.indexOf(bills[key].id) < 0) {
          if (!bills[key].debt) {
            amount = amount + bills[key].amount;
          }
        }
      }
    }
    cash = cash[0] ? cash[0]: cash;
    for (const key in cash) {
      amount = amount + parseFloat(cash[key].amount);
    }
    total = amount;
    return <button className="btn btn-secondary">Total: ${amount.toFixed(2)}</button>;
  }

  renderTotal(cash, bills) {
    // console.log(cash, bills);
    bills = bills[0] ? bills[0]: bills;
    let amount = 0;
    for (const key in bills) {
      if (bills[key] !== null) {
        if (this.props.rowName.indexOf(bills[key].id) < 0) {
          bills[key].amount = parseFloat(bills[key].amount, 10);
          amount = amount + bills[key].amount;
        }
      }
    }
    cash = cash[0] ? cash[0]: cash;
    for (const key in cash) {
      amount = amount + parseFloat(cash[key].amount);
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
      if (bills[key] !== null) {
        if (this.props.rowName.indexOf(bills[key].id) < 0) {
          if (!bills[key].debt) {
            amount = amount + bills[key].amount;
            billsArray.push(
              <Payments bills={bills[key]} total={amount.toFixed(2)} key={key} />
            );
          }
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
      if (bills[key] !== null) {
        if (this.props.rowName.indexOf(bills[key].id) < 0) {
          amount = amount + parseFloat(bills[key].amount);
          billsArray.push(
            <Payments bills={bills[key]} total={amount.toFixed(2)} key={key} />
          );
        }
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
      amount = amount + parseFloat(cash[key].amount);
      cashArray.push(
        <Cash cash={cash[key]} total={amount.toFixed(2)} key={key} />
      );
    }
    return cashArray;
  }
}

function mapStateToProps({ bills, cash, rowName, blurEffects, account }) {
  return { bills, cash, rowName, blurEffects, account };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBills, fetchCash, addNew, addEffects, fetchAccountBalance, updateCheck }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Bills);
