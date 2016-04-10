import React, { Component } from 'react';
import { ROOT_URL } from '../actions/index';
import axios from 'axios';

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
        {this.props.cash.amount !== 0 ? <button onClick={this.handleClick.bind(this)} className="btn btn-primary">{this.props.cash.name}</button> : null}
        {this.props.cash.amount !== 0 ? this.showUpdate() : null}
        {this.props.cash.amount !== 0 ? <button onClick={this.handleClick.bind(this)} className="btn btn-secondary">${this.props.total}</button> : null}
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
    const url = `${ROOT_URL}/cash/${data.id}`;
    axios.put(url, {
      name: data.name,
      amount: data.amount
    })
    .then(function (response) {
    })
    .catch(function (response) {
    });
  }
}
