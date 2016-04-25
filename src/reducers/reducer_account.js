import { FETCH_ACCOUNT } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_ACCOUNT:
    return [ action.payload.data, ...state ];
  }

  return state;
}
