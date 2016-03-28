import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeRow, deleteRow, makePayment } from '../actions/index';
import { today, dd } from '../utils/date';

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonShow: false
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
  }
  render() {

    console.log(today, dd, this.props.bills.due);
    return (
      <div>
        <button onClick={this.handleClick.bind(this)} className={this.props.bills.debt ? "btn btn-warning debt" : "btn btn-warning"}>{this.props.bills.name}</button>
        <button onClick={this.handleClick.bind(this)} className={this.props.bills.debt ? "btn btn-success debt" : "btn btn-success"}>${this.props.bills.amount}</button>
        <button onClick={this.handleClick.bind(this)} className={this.props.bills.debt ? "btn btn-info debt" : "btn btn-info"}>{this.props.bills.debt ? '$' + this.props.bills.payoff : 'Monthly'}</button>
        <button onClick={this.handleClick.bind(this)} className={this.props.bills.debt ? "btn btn-danger debt" : "btn btn-danger"}>{this.props.bills.due}</button>
        {this.renderButtons()}
        {this.renderBills()}
      </div>
    );
  }

  handleClick() {
    this.setState({ buttonShow: !this.state.buttonShow });
  }

  renderButtons() {
    if (this.state.buttonShow) {
      return (
        <div className="btn-container">
        <button onClick={this.handlePayment} className="btn btn-success">Make Payment</button>
        <button onClick={this.handleRemove} className="btn btn-info">Remove Row</button>
        <button onClick={this.handleDelete} className="btn btn-danger">Delete</button>
        </div>
      );
    }
  }

  handlePayment() {
    this.props.deleteRow(this.props.bills.id);
    this.props.makePayment(this.props.bills, this.props.bills.payoff - this.props.bills.amount);
    this.setState({ buttonShow: false });
  }

  handleRemove() {
    this.props.removeRow(this.props.bills.id);
  }

  handleDelete() {
    console.log('delete');
    this.props.deleteRow(this.props.bills.id);
    this.props.removeRow(this.props.bills.name);
  }

  renderBills() {
    return (
      <button className={this.props.bills.debt ? "btn btn-warning debt" : "btn btn-warning"}>${this.props.total}</button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeRow, deleteRow, makePayment }, dispatch);
}

export default connect(null, mapDispatchToProps)(Payments);
