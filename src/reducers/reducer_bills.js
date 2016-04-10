import { FETCH_BILLS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_BILLS:
  console.log(action.payload.data);
    return [ action.payload.data, ...state ];
  }

  return state;
}
