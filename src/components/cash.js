import React, { Component } from 'react';
import { ROOT_URL, FIREBASE_API, fetchCash } from '../actions/index';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class Cash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: this.props.cash.amount,
      amount: this.props.cash.amount
    };
  }

  render() {
    return (
      <div>
        {parseFloat(this.props.cash.amount) !== 0 ? <button onClick={this.handleClick.bind(this)} className="btn btn-primary">{this.props.cash.name}</button> : null}
        {parseFloat(this.props.cash.amount) !== 0 ? this.showUpdate() : null}
        {parseFloat(this.props.cash.amount) !== 0 ? <button onClick={this.handleClick.bind(this)} className="btn btn-secondary">${this.props.total}</button> : null}
      </div>
    );
  }

  handleClick() {
    this.setState({ show: !this.state.show });
  }

  showButton() {
    return <button onClick={this.sendUpdate.bind(this)} className="btn btn-info">Submit</button>;
  }

  showUpdate() {
    return (
      <span>
        <input onClick={this.handleClick.bind(this)} onChange={this.handleChange.bind(this)} className="btn btn-success" value={this.state.value} />
        {this.state.show ? this.showButton() : null}
      </span>
    );
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  sendUpdate(e) {
    const cash = this.props.cash;
    cash.amount = this.state.value;
    this.setState({ amount: cash.amount, show: false });
    this.addCash(cash);
  }

  addCash(data) {
    const url = `${ROOT_URL}/cash/${data.id}${FIREBASE_API}`;
    axios.patch(url, {
      name: data.name,
      amount: data.amount
    })
    .then(function (response) {
    })
    .catch(function (response) {
    });
    setTimeout(() => {
      this.props.fetchCash();
    }, 200);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCash }, dispatch);
}

export default connect(null, mapDispatchToProps)(Cash);
