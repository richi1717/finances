import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBills, fetchCash } from '../actions/index';
import Cash from '../components/cash';
import Payments from '../components/payments';
let paycheck = 100;
paycheck = paycheck * 4;
let total;
let tithe = paycheck * .10;

class Bills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debt: false
    };
    this.addNew = this.addNew.bind(this);
  }

  componentWillMount() {
    this.props.fetchBills();
    this.props.fetchCash();
  }

  render() {
    // console.log(this.props.bills, this.props.cash);
    return <div>
      <button className="btn btn-info" onClick={this.handleClick.bind(this)}>{this.state.debt ? "Show" : "Hide"} Debt?</button>
      {this.paycheck()}
      {this.state.debt ? this.renderTotalNoDebt(this.props.cash, this.props.bills) : this.renderTotal(this.props.cash, this.props.bills)}
      {this.paycheckMinusMoney()}
      <button className="btn btn-secondary" onClick={this.addNew}>Add New Bill</button>
      {this.state.debt ? this.renderWithOutDebt(this.props.bills) : this.renderBills(this.props.bills)}
      {this.renderCash(this.props.cash)}
    </div>;
  }

  addNew() {
    // TODO
    // this.props.addNew();
  }

  paycheck() {
    return <button className="btn btn-info">${paycheck.toFixed(2)}</button>;
  }

  paycheckMinusMoney() {
    const leftover = paycheck - total - tithe;
    return <button className="btn btn-secondary">Left: ${leftover.toFixed(2)}</button>;
  }

  renderTotalNoDebt(cash, bills) {
    bills = bills[0] ? bills[0].data : bills;
    let amount = 0;
    for (const key in bills) {
      if (this.props.rowName.indexOf(bills[key].id) < 0) {
        if (!bills[key].debt) {
          amount = amount + bills[key].amount;
        }
      }
    }
    cash = cash[0] ? cash[0].data : cash;
    for (const key in cash) {
      amount = amount + cash[key].amount;
    }
    total = amount;
    return <button className="btn btn-secondary">Total: ${amount.toFixed(2)}</button>;
  }

  renderTotal(cash, bills) {
    bills = bills[0] ? bills[0].data : bills;
    let amount = 0;
    for (const key in bills) {
      if (this.props.rowName.indexOf(bills[key].id) < 0) {
        amount = amount + bills[key].amount;
      }
    }
    cash = cash[0] ? cash[0].data : cash;
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
    bills = bills[0] ? bills[0].data : bills;
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
    bills = bills[0] ? bills[0].data : bills;
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
    cash = cash[0] ? cash[0].data : cash;
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
  return bindActionCreators({ fetchBills, fetchCash }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Bills);
