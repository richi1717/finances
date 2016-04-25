import axios from 'axios';
import _ from 'lodash';

export const ROOT_URL = 'https://budget-helper.firebaseio.com/';
export const FIREBASE_API = '.json';
// New ES6 injection uses back tick `` with ${} to pass in, very cool!!!

export const FETCH_BILLS = 'FETCH_BILLS';
export const FETCH_CASH = 'FETCH_CASH';
export const FETCH_ACCOUNT = 'FETCH_ACCOUNT';
export const REMOVE_ROW = 'REMOVE_ROW';
export const DELETE_ROW = 'DELETE_ROW';
export const MAKE_PAYMENT = 'MAKE_PAYMENT';
export const ADD_CASH = 'ADD_CASH';
export const ADD_BILL = 'ADD_BILL';
export const ADD_EFFECTS = 'ADD_EFFECTS';
export const POST_ACCOUNT = 'POST_ACCOUNT';

export function fetchBills() {
  const url = `${ROOT_URL}/bills${FIREBASE_API}`;
  const request = axios.get(url);

  return {
    type: FETCH_BILLS,
    payload: request
  };
}

export function fetchCash() {
  const url = `${ROOT_URL}/cash${FIREBASE_API}`;
  const request = axios.get(url);

  return {
    type: FETCH_CASH,
    payload: request
  };
}

export function fetchAccountBalance() {
  const url = `${ROOT_URL}/account/0${FIREBASE_API}`;
  const request = axios.get(url);

  return {
    type: FETCH_ACCOUNT,
    payload: request
  };
}

export function updateCheck(props) {
  console.log(props);
  const url = `${ROOT_URL}/account/0${FIREBASE_API}`;
  const request = axios.patch(url, {
    "amount": parseFloat(props.amount),
    "asof": parseFloat(props.asof)
  });

  return {
    type: POST_ACCOUNT,
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
  const url = `${ROOT_URL}/bills/${id}${FIREBASE_API}`;
  const request = axios.delete(url);
  return {
    type: DELETE_ROW,
    payload: request
  };
}

export function makePayment(props, amount) {
  const urlPost = `${ROOT_URL}/bills/${props.id}/${FIREBASE_API}`;
  const request = axios.patch(urlPost, {
    "name": props.name,
    "amount": parseFloat(props.amount),
    "due": parseFloat(props.due),
    "debt": props.debt,
    "payoff": parseFloat(amount),
    "id": parseFloat(props.id)
  });
  return {
    type: MAKE_PAYMENT,
    payload: request
  };
}

export function addNew(props) {
  const url = `${ROOT_URL}/bills/${props.id}/${FIREBASE_API}`;
  const request = axios.put(url, {
    "name": props.name,
    "amount": parseFloat(props.amount),
    "due": parseFloat(props.due),
    "debt": props.debt,
    "payoff": parseFloat(props.payoff),
    "id": parseFloat(props.id)
  });
  return {
    type: ADD_BILL,
    payload: request
  };
}

export function addEffects(bool) {
  return {
    type: ADD_EFFECTS,
    payload: bool
  };
}
