import axios from 'axios';
import _ from 'lodash';

export const ROOT_URL = 'http://localhost:3000';
// New ES6 injection uses back tick `` with ${} to pass in, very cool!!!

export const FETCH_BILLS = 'FETCH_BILLS';
export const FETCH_CASH = 'FETCH_CASH';
export const REMOVE_ROW = 'REMOVE_ROW';
export const DELETE_ROW = 'DELETE_ROW';
export const MAKE_PAYMENT = 'MAKE_PAYMENT';
export const ADD_CASH = 'ADD_CASH';
export const ADD_BILL = 'ADD_BILL';

export function fetchBills() {
  const url = `${ROOT_URL}/bills`;
  const request = axios.get(url);

  return {
    type: FETCH_BILLS,
    payload: request
  };
}

export function fetchCash() {
  const url = `${ROOT_URL}/cash`;
  const request = axios.get(url);

  return {
    type: FETCH_CASH,
    payload: request
  };
}

export function removeRow(id) {
  return {
    type: REMOVE_ROW,
    payload: id
  };
}

export function deleteRow(id) {
  const url = `${ROOT_URL}/bills/${id}`;
  const request = axios.delete(url);
  return {
    type: DELETE_ROW,
    payload: request
  };
}

export function makePayment(props, amount) {
  const urlPost = `${ROOT_URL}/bills`;
  const url = `${ROOT_URL}/bills/${props.id}/`;
  // axios.delete(url);
  const request = axios.post(urlPost, {
    "name": props.name,
    "amount": props.amount,
    "due": props.due,
    "debt": props.debt,
    "payoff": amount
  });
  return {
    type: MAKE_PAYMENT,
    payload: request
  };
}

export function addNew(props) {
  const url = `${ROOT_URL}/bills`;
  const request = axios.post(url, {
    "name": props.name,
    "amount": props.amount,
    "due": props.due,
    "debt": props.debt,
    "payoff": props.payoff
  });
  return {
    type: ADD_BILL,
    payload: request
  };
}
