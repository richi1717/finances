import { REMOVE_ROW } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
  case REMOVE_ROW:
  console.log(action.payload);
    return [ action.payload, ...state ];
  }

  return state;
}
