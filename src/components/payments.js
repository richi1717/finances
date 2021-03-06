import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeRow, deleteRow, makePayment, fetchBills, addEffects, updateCheck, fetchAccountBalance } from '../actions/index';
// import { today, dd } from '../utils/date';
import { today as Today } from '../utils/date';

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonShow: false,
      paymentShow: false,
      amount: this.props.bills.amount
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
    this.paymentSelect = this.paymentSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    // console.log(today, dd, this.props.bills.due);
    return (
      <div>
        <button onClick={this.handleClick} className={this.props.bills.debt ? "btn btn-warning debt" : "btn btn-warning"}>{this.props.bills.name}</button>
        <button onClick={this.handleClick} className={this.props.bills.debt ? "btn btn-success debt" : "btn btn-success"}>${this.props.bills.amount}</button>
        <button onClick={this.handleClick} className={this.props.bills.debt ? "btn btn-info debt" : "btn btn-info"}>{this.props.bills.debt ? '$' + this.props.bills.payoff : 'Monthly'}</button>
        <button onClick={this.handleClick} className={this.props.bills.debt ? "btn btn-danger debt" : "btn btn-danger"}>{this.props.bills.due}</button>
        {this.renderButtons()}
        {this.renderBills()}
        {this.paymentSelect()}
      </div>
    );
  }

  handleClick() {
    this.setState({
      buttonShow: !this.state.buttonShow,
      amount: this.props.bills.amount
    });
    this.props.addEffects(this.props.blurEffects);
  }

  renderButtons() {
    if (this.state.buttonShow) {
      return (
        <div className="btn-container">
          <button onClick={() => {this.setState({ paymentShow: !this.state.paymentShow });}} className="btn btn-success">Make Payment</button>
          <button onClick={this.handleRemove} className="btn btn-info">Remove Row</button>
          <button onClick={this.handleDelete} className="btn btn-danger">Delete</button>
        </div>
      );
    }
  }

  paymentSelect() {
    if (this.state.paymentShow) {
      return (
        <form onSubmit={this.handlePayment} className="form-container">
          <input onChange={() => {this.setState({ amount: this.refs.amount.value });}} ref="amount" value={this.state.amount} />
          <button className="btn btn-info">Submit</button>
        </form>
      );
    }
  }

  handlePayment(event) {
    event.preventDefault();
    const totalBalance = _.round(parseFloat(this.props.account[0].amount) - this.state.amount, 2);
    const props = {
      amount: totalBalance,
      asof: Today
    };
    this.props.updateCheck(props);
    this.props.makePayment(this.props.bills, this.props.bills.payoff - this.state.amount);
    this.setState({ buttonShow: false, paymentShow: false });
    setTimeout(() => {
      this.props.fetchBills();
      this.props.fetchAccountBalance();
    }, 2000);
  }

  handleRemove() {
    this.props.removeRow(this.props.bills.id);
  }

  handleDelete() {
    this.props.removeRow(this.props.bills.id);
    this.props.deleteRow(this.props.bills.id);
  }

  renderBills() {
    return (
      <button className={this.props.bills.debt ? "btn btn-warning debt" : "btn btn-warning"}>${this.props.total}</button>
    );
  }
}

function mapStateToProps({ blurEffects, account }) {
  return { blurEffects, account };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeRow, deleteRow, makePayment, fetchBills, addEffects, updateCheck, fetchAccountBalance }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
