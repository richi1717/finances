import { FETCH_CASH } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_CASH:
    return [ action.payload.data, ...state ];
  }

  return state;
}
