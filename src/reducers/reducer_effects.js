import { ADD_EFFECTS } from '../actions/index';

export default function(state = false, action) {
  switch (action.type) {
  case ADD_EFFECTS:
    switch (action.payload) {
    case false:
      return true;
    case true:
      return false;
    }
  }

  return state;
}
