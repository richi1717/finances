import { FETCH_BILLS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_BILLS:
    return [ action.payload, ...state ];
  }

  return state;
}
